import type { JSX } from '@solidjs/web';

// Small inline icon set for the admin layout. Using stroke icons (same style as
// the navbar demo) so the menu reads like a standard admin dashboard.
function Icon(props: { d: string; class?: string }) {
  return (
    <svg
      class={props.class ?? 'w-5 h-5'}
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={props.d} />
    </svg>
  );
}

export const icons = {
  dashboard: () => <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />,
  users: () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  orders: () => <Icon d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />,
  analytics: () => <Icon d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  settings: () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h0a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h0a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v0a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />,
  chevron: () => <Icon d="m6 9 6 6 6-6" />,
  clock: () => (
    <Icon d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2" />
  ),
  check: () => <Icon d="M20 6 9 17l-5-5" />,
} satisfies Record<string, () => JSX.Element>;

export type MenuItem = {
  label: string;
  route: string;
  exact?: boolean;
  icon: () => JSX.Element;
  children?: MenuItem[];
};

// The admin menu. Edit this list to add/rename entries — the sidebar and any
// menu-driven UI render from here, so navigation stays in one place. An item
// with `children` renders as a collapsible submenu (the parent itself is the
// expand toggle; add a child pointing at the parent's route for an index link).
export const menuItems: MenuItem[] = [
  { label: 'Dashboard', route: '/', exact: true, icon: icons.dashboard },
  { label: 'Users', route: '/users', icon: icons.users },
  {
    label: 'Orders',
    route: '/orders',
    icon: icons.orders,
    children: [
      { label: 'All Orders', route: '/orders', exact: true, icon: icons.orders },
      { label: 'Pending', route: '/orders/pending', icon: icons.clock },
      { label: 'Completed', route: '/orders/completed', icon: icons.check },
    ],
  },
  { label: 'Analytics', route: '/analytics', icon: icons.analytics },
  { label: 'Settings', route: '/settings', icon: icons.settings },
];
