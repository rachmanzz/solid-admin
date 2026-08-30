import { Link, createFileRoute } from '@tanstack/solid-router';
import { Show } from 'solid-js';
import { useUserProfile } from '../hooks/useUserProfile';

function UserPage() {
  const params = Route.useParams();
  const query = useUserProfile(params().id);

  return (
    <main>
      <h1>Users</h1>
      <section>
        <Show when={query.data} fallback={<p>Loading...</p>}>
          {(data) => (
            <>
              <h2>{data().name}</h2>
              <p>{data().title}</p>
            </>
          )}
        </Show>
        <p>
          <Link
            to="/users/$id"
            params={(prev) => ({ id: String(Number(prev.id) + 1) })}
          >
            Next user
          </Link>
        </p>
      </section>
    </main>
  );
}

export const Route = createFileRoute('/users/$id')({
  head: ({ params }) => ({
    meta: [{ title: `User ${params.id} - Solid App` }],
  }),
  component: UserPage,
});
