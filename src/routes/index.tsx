import { For } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';

import Counter from '../components/Counter';

function Home() {
  const stats = [
    { label: 'Users', value: '1,248', trend: '+12%' },
    { label: 'Revenue', value: '$32.4k', trend: '+4.2%' },
    { label: 'Orders', value: '386', trend: '-2%' },
    { label: 'Active now', value: '57', trend: '+9%' },
  ];

  const recent = [
    { id: 1, user: 'Ava Thompson', action: 'Created account', status: 'done' },
    { id: 2, user: 'Liam Chen', action: 'Upgraded plan', status: 'done' },
    { id: 3, user: 'Noah Patel', action: 'Flagged content', status: 'pending' },
    { id: 4, user: 'Mia Garcia', action: 'Deleted project', status: 'done' },
  ];

  return (
    <section class="space-y-6">
      <header class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Dashboard</h1>
          <p class="text-base-content/60">Welcome back to your admin overview.</p>
        </div>
        <button class="btn btn-primary">New report</button>
      </header>

      <div class="stats stats-vertical sm:stats-horizontal shadow w-full bg-base-100">
        <For each={stats}>
          {(s) => (
            <div class="stat">
              <div class="stat-title">{s.label}</div>
              <div class="stat-value">{s.value}</div>
              <div class="stat-desc">{s.trend} this week</div>
            </div>
          )}
        </For>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">Recent activity</h2>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <For each={recent}>
                  {(r) => (
                    <tr>
                      <th>{r.id}</th>
                      <td>{r.user}</td>
                      <td>{r.action}</td>
                      <td>
                        <span
                          class={{
                            badge: true,
                            'badge-success': r.status === 'done',
                            'badge-warning': r.status === 'pending',
                          }}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">Interactive demo</h2>
          <p class="text-base-content/60">A live Solid signal, styled with daisyUI.</p>
          <div class="card-actions">
            <Counter />
          </div>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Dashboard - solid-admin' }] }),
  component: Home,
});
