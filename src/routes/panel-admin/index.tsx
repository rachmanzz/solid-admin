import { For } from 'solid-js';
import { createFileRoute } from '@tanstack/solid-router';

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

function Home() {
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
        <Card title="Overview" class="w-full sm:col-span-1 xl:col-span-2">
          <LineChart />
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
