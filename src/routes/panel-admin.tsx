import { Outlet, createFileRoute } from '@tanstack/solid-router';

import AppShell from '../components/layout/AppShell';
import Navbar from '../components/layout/Navbar';

// The admin panel layout: every /panel-admin/* page renders inside the
// responsive admin shell (sidebar + top bar). The root route stays clean so
// the landing page at `/` does not inherit the admin chrome.
export const Route = createFileRoute('/panel-admin')({
  component: () => (
    <AppShell>
      <Navbar />
      <main class="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </AppShell>
  ),
});
