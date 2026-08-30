import type { JSX, ParentProps } from 'solid-js';

// The responsive admin shell: a collapsible drawer (sidebar on the left) and
// the main content area. `sidebar` is rendered inside the drawer; children are
// the page content (Navbar + Outlet, typically composed by the route).
export default function AppShell(props: ParentProps<{ sidebar?: JSX.Element }>) {
  return (
    <div class="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col min-h-screen">{props.children}</div>
      <div class="drawer-side z-20">
        <label for="admin-drawer" class="drawer-overlay" aria-label="close sidebar" />
        {props.sidebar}
      </div>
    </div>
  );
}
