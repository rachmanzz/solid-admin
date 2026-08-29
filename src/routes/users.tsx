import { For } from 'solid-js';
import { Link, createFileRoute } from '@tanstack/solid-router';

const users = [
  { id: '1', name: 'Ava Thompson', title: 'Administrator', role: 'admin' },
  { id: '2', name: 'Liam Chen', title: 'Editor', role: 'editor' },
  { id: '3', name: 'Noah Patel', title: 'Viewer', role: 'viewer' },
  { id: '4', name: 'Mia Garcia', title: 'Editor', role: 'editor' },
];

function UsersPage() {
  return (
    <section class="space-y-6">
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Users</h1>
          <p class="text-base-content/60">Manage accounts and roles.</p>
        </div>
        <button class="btn btn-primary">Add user</button>
      </header>

      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Role</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <For each={users}>
                  {(u) => (
                    <tr>
                      <td class="font-medium">{u.name}</td>
                      <td>{u.title}</td>
                      <td>
                        <span
                          class={{
                            badge: true,
                            'badge-primary': u.role === 'admin',
                            'badge-secondary': u.role === 'editor',
                            'badge-ghost': u.role === 'viewer',
                          }}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td class="text-right">
                        <Link to="/users/$id" params={{ id: u.id }} class="btn btn-sm btn-ghost">
                          View
                        </Link>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute('/users')({
  head: () => ({ meta: [{ title: 'Users - solid-admin' }] }),
  component: UsersPage,
});
