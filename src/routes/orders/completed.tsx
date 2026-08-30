import { createFileRoute } from '@tanstack/solid-router';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';

function CompletedOrders() {
  return (
    <section class="space-y-6">
      <PageHeader title="Completed Orders" description="Orders that have been fulfilled." />
      <Card title="Completed orders list">
        <p class="text-base-content/60">
          This is a placeholder page. Add completed-order table or business logic here.
        </p>
      </Card>
    </section>
  );
}

export const Route = createFileRoute('/orders/completed')({
  head: () => ({ meta: [{ title: 'Completed Orders - solid-admin' }] }),
  component: CompletedOrders,
});