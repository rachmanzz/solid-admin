import { Link, createFileRoute } from '@tanstack/solid-router';
import { Show } from 'solid-js';
import { useUserProfile } from '../hooks/useUserProfile';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';

function UserPage() {
  const params = Route.useParams();
  const query = useUserProfile(params().id);

  return (
    <section class="space-y-6">
      <PageHeader title="Users" description="User profile details." />

      <Show when={query.data} fallback={<span class="loading loading-spinner loading-lg" />}>
        {(data) => (
          <Card title={data().name}>
            <p class="text-base-content/60">{data().title}</p>
            <div class="card-actions justify-end mt-4">
              <Link
                to="/users/$id"
                params={(prev) => ({ id: String(Number(prev.id) + 1) })}
                class="btn btn-primary btn-sm"
              >
                Next user
              </Link>
            </div>
          </Card>
        )}
      </Show>
    </section>
  );
}

export const Route = createFileRoute('/users/$id')({
  head: ({ params }) => ({
    meta: [{ title: `User ${params.id} - Solid App` }],
  }),
  component: UserPage,
});
