// Calls is_super_admin() RPC once per session, caches the result.
// SECURITY DEFINER on the DB side : safe to expose to authenticated users.
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useAuth } from "../stores/authStore";

type SuperAdminState =
  | { status: "loading" }
  | { status: "ready"; isSuperAdmin: boolean }
  | { status: "error"; error: string };

export function useIsSuperAdmin(): SuperAdminState {
  const session = useAuth((s) => s.session);
  const [state, setState] = useState<SuperAdminState>({ status: "loading" });

  useEffect(() => {
    if (!session) {
      setState({ status: "ready", isSuperAdmin: false });
      return;
    }
    let cancelled = false;
    setState({ status: "loading" });
    supabase
      .rpc("is_super_admin")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setState({ status: "error", error: error.message });
        } else {
          setState({ status: "ready", isSuperAdmin: Boolean(data) });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  return state;
}
