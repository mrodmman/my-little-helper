import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/starter-vault")({
  component: () => <Outlet />,
});
