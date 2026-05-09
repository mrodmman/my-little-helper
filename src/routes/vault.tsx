import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/rpc/auth";

export const Route = createFileRoute("/vault")({
  beforeLoad: async () => {
    const user = await getAuthUser();
    if (!user) throw redirect({ to: "/login" });
    throw redirect({ to: "/" });
  },
  component: VaultRedirectInfo,
});

function VaultRedirectInfo() {
  return null;
}
