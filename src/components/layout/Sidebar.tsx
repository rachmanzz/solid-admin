import { For } from 'solid-js';
import { Link } from '@tanstack/solid-router';

const links = [
  { to: '/', label: 'Dashboard', exact: true },
  { to: '/users', label: 'Users' },
];

// Left navigation drawer: the site-wide menu with active-link highlighting.
export default function Sidebar() {
  return (
    <aside class="bg-base-200 min-h-full w-64 p-4">
      <ul class="menu gap-1 text-base-content">
        <li class="menu-title">Main</li>
        <For each={links}>
          {(link) => (
            <li>
              <Link
                to={link.to}
                activeProps={{ class: 'font-semibold' }}
                activeOptions={{ exact: link.exact ?? false }}
              >
                {link.label}
              </Link>
            </li>
          )}
        </For>
      </ul>
    </aside>
  );
}
