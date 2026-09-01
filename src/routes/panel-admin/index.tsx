import { For, createSignal } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';

import type { LineChartData } from '../../components/ui/LineChart';
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import LineChart from '../../components/ui/LineChart';

type Activity = {
  id: number;
  user: string;
  action: string;
  time: string;
  status: 'done' | 'pending';
};

const stats = [
  { label: 'Sales', value: '2,847', trend: '+18%' },
  { label: 'Revenue', value: '$48.6k', trend: '+12.5%' },
  { label: 'Subscription', value: '1,423', trend: '+7%' },
  { label: 'Users', value: '5,892', trend: '+24%' },
];

const recent: Activity[] = [
  { id: 1, user: 'Ava Thompson', action: 'Created account', time: '2 min ago', status: 'done' },
  { id: 2, user: 'Liam Chen', action: 'Upgraded plan', time: '18 min ago', status: 'done' },
  { id: 3, user: 'Noah Patel', action: 'Flagged content', time: '1 hr ago', status: 'pending' },
  { id: 4, user: 'Mia Garcia', action: 'Deleted project', time: '3 hr ago', status: 'done' },
  { id: 5, user: 'Ethan Kim', action: 'Refunded order', time: '5 hr ago', status: 'done' },
];

const periodOptions = [
  { label: '7d', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [42, 48, 45, 61, 58, 72, 78] },
  { label: '30d', labels: ['W1', 'W2', 'W3', 'W4'], values: [120, 164, 158, 210] },
  { label: '90d', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], values: [240, 320, 300, 390, 370, 460, 510] },
];

function Home() {
  const [period, setPeriod] = createSignal('7d');

  const chartData = (): LineChartData => {
    const p = periodOptions.find((o) => o.label === period()) ?? periodOptions[0];
    return {
      labels: p.labels,
      values: p.values,
    };
  };

  return (
    <section class="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back to your admin overview."
        action={<button class="btn btn-primary">New report</button>}
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <For each={stats}>
          {(s) => (
            <Card>
              <StatCard label={s.label} value={s.value} trend={s.trend} />
            </Card>
          )}
        </For>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card
          title="Overview"
          class="w-full sm:col-span-1 xl:col-span-2"
          actions={
            <div class="join">
              <For each={periodOptions}>
                {(o) => (
                  <button
                    class={o.label === period() ? 'btn btn-sm join-item btn-primary' : 'btn btn-sm join-item'}
                    onClick={() => setPeriod(o.label)}
                  >
                    {o.label}
                  </button>
                )}
              </For>
            </div>
          }
        >
          <LineChart data={chartData} />
        </Card>

        <Card title="Recent activity" class="w-full">
          <ul class="list">
            <For each={recent}>
              {(item) => (
                <li class="list-row">
                  <div class="avatar avatar-placeholder">
                    <div class="bg-primary text-primary-content w-10 rounded-full">
                      <span class="text-xs">{item.user.charAt(0)}</span>
                    </div>
                  </div>
                  <div class="list-col-grow">
                    <div class="font-medium">{item.user}</div>
                    <div class="text-xs text-base-content/50">{item.action}</div>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <div class="badge badge-soft badge-primary px-3 py-1.5">{item.status}</div>
                    <span class="text-xs text-base-content/40">{item.time}</span>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </Card>
      </div>
    </section>
  );
}

export const Route = createFileRoute('/panel-admin/')({
  head: () => ({ meta: [{ title: 'Dashboard - solid-admin' }] }),
  component: Home,
});
