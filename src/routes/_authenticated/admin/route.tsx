import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [state, setState] = useState<"loading" | "ok" | "forbidden">("loading");
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes.user) return navigate({ to: "/auth" });
      setEmail(userRes.user.email);
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userRes.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setState(data ? "ok" : "forbidden");
    })();
  }, [navigate]);

  if (state === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-surface">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (state === "forbidden") {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-4">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold">Akses Ditolak</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Akun ini bukan admin. Hubungi pengelola sekolah untuk mendapat akses.
          </p>
          <Button
            className="mt-6"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth", replace: true });
            }}
          >
            Keluar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar email={email} />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
