import { Show } from 'solid-js';
import { Link, createFileRoute } from '@tanstack/solid-router';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import DataTable from '../../components/ui/DataTable';
import EmptyState from '../../components/ui/EmptyState';
import { useUsers } from '../../hooks/useUsers';
import type { User } from '../../lib/api/types';

const userColumns = [
  { key: 'name', header: 'Name', cell: (u: User) => <span class="font-medium">{u.name}</span> },
  { key: 'title', header: 'Title', cell: (u: User) => u.title },
  {
    key: 'role',
    header: 'Role',
    cell: (u: User) => (
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
    ),
  },
  {
    key: 'actions',
    header: '',
    cell: (u: User) => (
      <Link to="/panel-admin/users/$id" params={{ id: u.id }} class="btn btn-sm btn-ghost">
        View
      </Link>
    ),
  },
];

function UsersPage() {
  const query = useUsers();

  return (
    <section class="space-y-6">
      <PageHeader
        title="Users"
        description="Manage accounts and roles."
        action={<button class="btn btn-primary">Add user</button>}
      />

      <Card>
        <Show when={query.data} fallback={<span class="loading loading-spinner loading-lg" />}>
          {(users) => (
            <Show when={users().length > 0} fallback={<EmptyState message="No users found." />}>
              <DataTable columns={userColumns} rows={users()} />
            </Show>
          )}
        </Show>
      </Card>
    </section>
  );
}

export const Route = createFileRoute('/panel-admin/users')({
  head: () => ({ meta: [{ title: 'Users - solid-admin' }] }),
  component: UsersPage,
});
