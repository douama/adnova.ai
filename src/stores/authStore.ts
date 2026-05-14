// ─── Auth store (Supabase-native) ───────────────────────────────────────────
// Plus de proxy worker — le client React parle directement à Supabase Auth.
// La session JWT est managée par supabase-js (refresh auto, persisté dans
// localStorage clé "adnova.auth").
//
// À la signup, le trigger Postgres `handle_new_user` crée automatiquement :
//   • user_profile (1:1)
//   • tenant personnel (slug dérivé de l'email)
//   • tenant_members row avec role 'owner'
//   • subscription trial 14 jours
// → l'app est immédiatement utilisable après signup.
import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;             // true pendant la restauration de session au boot
  initialized: boolean;          // true une fois le listener auth installé

  init: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
};

export type SignUpInput = {
  email: string;
  password: string;
  fullName?: string;
  company?: string;
  locale?: string;
};

export const useAuth = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  loading: true,
  initialized: false,

  /**
   * À appeler une fois au démarrage de l'app (depuis App.tsx).
   * Restaure la session depuis localStorage et installe le listener
   * pour les changements (login, logout, refresh).
   */
  init: async () => {
    if (get().initialized) return;
    set({ initialized: true });

    // Charger la session existante (si refresh OK)
    const { data } = await supabase.auth.getSession();
    set({
      session: data.session,
      user: data.session?.user ?? null,
      loading: false,
    });

    // Écouter tous les changements (login, logout, refresh, OAuth callback)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({
        session,
        user: session?.user ?? null,
        loading: false,
      });
    });
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // onAuthStateChange va set la session — pas besoin de set ici.
    } finally {
      set({ loading: false });
    }
  },

  signInWithMagicLink: async (email) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (input) => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            // Ces metadata sont lues par le trigger handle_new_user
            // pour pré-remplir user_profile.full_name et tenants.name
            full_name: input.fullName,
            company: input.company,
            locale: input.locale ?? "fr",
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    // onAuthStateChange clear la session.
  },
}));

// Hook pratique pour les composants qui veulent juste savoir "est connecté ?"
export const useIsAuthenticated = () => useAuth((s) => !!s.session);
