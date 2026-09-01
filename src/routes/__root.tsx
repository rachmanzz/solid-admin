import { HeadContent, Outlet, createRootRoute } from '@tanstack/solid-router';

// The root route: a clean shell that renders the matched route. The admin
// chrome (sidebar + navbar) lives on the /panel-admin layout route so the
// landing page at `/` is rendered without it. <HeadContent /> renders whatever
// the matched routes declare in their `head` options (titles here).
export const Route = createRootRoute({
  head: () => ({ meta: [{ title: 'solid-admin' }] }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  notFoundComponent: () => (
    <main class="flex min-h-screen items-center justify-center p-6">
      <div class="text-center">
        <h1 class="text-4xl font-bold">404</h1>
        <p class="mt-2 text-base-content/70">Page Not Found</p>
      </div>
    </main>
  ),
});
