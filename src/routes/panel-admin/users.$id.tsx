import { Link, createFileRoute } from '@tanstack/solid-router';
import { Show } from 'solid-js';
import { useUser } from '../../hooks/useUsers';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';

function UserPage() {
  const params = Route.useParams();
  const query = useUser(() => params().id);

  return (
    <section class="space-y-6">
      <PageHeader title="Users" description="User details." />

      <Show when={!query.isLoading && !query.isError} fallback={<span class="loading loading-spinner loading-lg" />}>
        <Show when={query.data} fallback={<Card>User not found.</Card>}>
          {(user) => (
            <Card title={user().name}>
              <dl class="space-y-2 text-sm">
                <div>
                  <dt class="text-base-content/50">Email</dt>
                  <dd>{user().email}</dd>
                </div>
                <div>
                  <dt class="text-base-content/50">Role</dt>
                  <dd>
                    <span class={{ badge: true, 'badge-primary': user().role === 'admin', 'badge-ghost': user().role === 'user' }}>
                      {user().role}
                    </span>
                  </dd>
                </div>
              </dl>
              <div class="card-actions justify-start mt-4">
                <Link to="/panel-admin/users" class="btn btn-outline btn-sm">
                  Back to users
                </Link>
              </div>
            </Card>
          )}
        </Show>
      </Show>
    </section>
  );
}

export const Route = createFileRoute('/panel-admin/users/$id')({
  head: () => ({
    meta: [{ title: `User - solid-admin` }],
  }),
  component: UserPage,
});
