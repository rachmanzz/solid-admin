import { For } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';

import Counter from '../components/Counter';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/ui/Card';
import DataTable from '../components/ui/DataTable';
import StatCard from '../components/ui/StatCard';

type Activity = {
  id: number;
  user: string;
  action: string;
  status: 'done' | 'pending';
};

const stats = [
  { label: 'Users', value: '1,248', trend: '+12%' },
  { label: 'Revenue', value: '$32.4k', trend: '+4.2%' },
  { label: 'Orders', value: '386', trend: '-2%' },
  { label: 'Active now', value: '57', trend: '+9%' },
];

const recent: Activity[] = [
  { id: 1, user: 'Ava Thompson', action: 'Created account', status: 'done' },
  { id: 2, user: 'Liam Chen', action: 'Upgraded plan', status: 'done' },
  { id: 3, user: 'Noah Patel', action: 'Flagged content', status: 'pending' },
  { id: 4, user: 'Mia Garcia', action: 'Deleted project', status: 'done' },
];

const activityColumns = [
  { key: 'id', header: '#', cell: (r: Activity) => r.id },
  { key: 'user', header: 'User', cell: (r: Activity) => r.user },
  { key: 'action', header: 'Action', cell: (r: Activity) => r.action },
  {
    key: 'status',
    header: 'Status',
    cell: (r: Activity) => (
      <span
        class={{
          badge: true,
          'badge-success': r.status === 'done',
          'badge-warning': r.status === 'pending',
        }}
      >
        {r.status}
      </span>
    ),
  },
];

function Home() {
  return (
    <section class="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back to your admin overview."
        action={<button class="btn btn-primary">New report</button>}
      />

      <div class="stats stats-vertical sm:stats-horizontal shadow w-full bg-base-100">
        <For each={stats}>
          {(s) => <StatCard label={s.label} value={s.value} trend={s.trend} />}
        </For>
      </div>

      <Card title="Recent activity">
        <DataTable columns={activityColumns} rows={recent} rowKey={(r) => r.id} />
      </Card>

      <Card title="Interactive demo">
        <p class="text-base-content/60">A live Solid signal, styled with daisyUI.</p>
        <div class="card-actions">
          <Counter />
        </div>
      </Card>
    </section>
  );
}

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Dashboard - solid-admin' }] }),
  component: Home,
});
