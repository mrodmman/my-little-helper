/**
 * /intel layout — transparent wrapper for /intel/* routes.
 * Hub content lives in intel/index.tsx; articles in intel.$slug.tsx.
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/intel")({
  component: () => <Outlet />,
});
