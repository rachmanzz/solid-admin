import { HeadContent, Link, Outlet, createRootRoute } from '@tanstack/solid-router';

// The root route: the site-wide admin shell every route renders inside, plus
// the not-found boundary. <HeadContent /> renders whatever the matched routes
// declare in their `head` options (titles here).
export const Route = createRootRoute({
  head: () => ({ meta: [{ title: 'solid-admin' }] }),
  component: () => (
    <div class="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col min-h-screen">
        <HeadContent />
        <nav class="navbar bg-base-300 w-full sticky top-0 z-10">
          <div class="flex-none lg:hidden">
            <label for="admin-drawer" class="btn btn-square btn-ghost" aria-label="open sidebar">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div class="flex-1 px-2 text-lg font-bold">solid-admin</div>
          <div class="flex-none gap-2">
            <button class="btn btn-ghost btn-circle" aria-label="notifications">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content w-9 rounded-full">
                <span class="text-sm">SA</span>
              </div>
            </div>
          </div>
        </nav>
        <main class="p-6 flex-1">
          <Outlet />
        </main>
      </div>
      <div class="drawer-side z-20">
        <label for="admin-drawer" class="drawer-overlay" aria-label="close sidebar" />
        <aside class="bg-base-200 min-h-full w-64 p-4">
          <ul class="menu gap-1 text-base-content">
            <li class="menu-title">Main</li>
            <li>
              <Link to="/" activeProps={{ class: 'font-semibold' }} activeOptions={{ exact: true }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/users" activeProps={{ class: 'font-semibold' }}>
                Users
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
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
