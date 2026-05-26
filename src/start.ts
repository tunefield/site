import { createStart } from "@tanstack/react-start";

// SPA mode — no server middleware needed.
// API routes for the funnel will live in /api/* as Vercel serverless functions,
// not inside TanStack Start.
export const startInstance = createStart(() => ({}));
