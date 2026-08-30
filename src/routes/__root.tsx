import { HeadContent, Outlet, createRootRoute } from '@tanstack/solid-router';

import AppShell from '../components/layout/AppShell';
import Navbar from '../components/layout/Navbar';

// The root route: the site-wide admin shell every route renders inside, plus
// the not-found boundary. <HeadContent /> renders whatever the matched routes
// declare in their `head` options (titles here).
export const Route = createRootRoute({
  head: () => ({ meta: [{ title: 'solid-admin' }] }),
  component: () => (
    <>
      <HeadContent />
      <AppShell>
        <Navbar />
        <main class="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </AppShell>
    </>
  ),
  notFoundComponent: () => (
    <main class="p-6">
      <h1 class="text-2xl font-bold">Page Not Found</h1>
      <p class="mt-2">
        Visit{' '}
        <a class="link" href="https://docs.solidjs.com" target="_blank" rel="noreferrer">
          docs.solidjs.com
        </a>{' '}
        to learn how to build Solid apps.
      </p>
    </main>
  ),
});
