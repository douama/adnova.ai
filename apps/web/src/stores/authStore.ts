import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { api } from "../lib/api";
import type { LoginInput, RegisterInput, LoginResponse, RegisterResponse } from "@adnova/shared/schemas/auth";

type Session = { accessToken: string; refreshToken: string; userId: string; email: string | null };

type AuthState = {
  session: Session | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSession: (session: Session | null) => void;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

const STORAGE_KEY = "adnova.session";

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function saveSession(s: Session | null) {
  if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  else localStorage.removeItem(STORAGE_KEY);
}

export const useAuth = create<AuthState>((set, get) => ({
  session: loadSession(),
  loading: false, // Start false since we loaded synchronously from localStorage
  setLoading: (loading) => set({ loading }),
  setSession: (session) => set({ session }),
  login: async (input: LoginInput) => {
    set({ loading: true });
    try {
      const res = await api<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      });
      const next: Session = {
        accessToken: res.session.accessToken,
        refreshToken: res.session.refreshToken,
        userId: res.user.id,
        email: res.user.email,
      };
      saveSession(next);
      set({ session: next, loading: false });
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },
  register: async (input: RegisterInput) => {
    set({ loading: true });
    try {
      const res = await api<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      });
      const next: Session = {
        accessToken: res.session.accessToken,
        refreshToken: res.session.refreshToken,
        userId: res.user.id,
        email: res.user.email,
      };
      saveSession(next);
      set({ session: next, loading: false });
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },
  logout: async () => {
    const { session } = get();
    if (session?.accessToken) {
      try {
        await api("/auth/logout", { method: "POST", token: session.accessToken });
      } catch {
        // ignore — local cleanup happens regardless
      }
    }
    await supabase.auth.signOut().catch(() => undefined);
    saveSession(null);
    set({ session: null });
  },
}));
