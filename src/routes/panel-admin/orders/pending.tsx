import { createFileRoute } from '@tanstack/solid-router';

import PageHeader from '../../../components/layout/PageHeader';
import Card from '../../../components/ui/Card';

function PendingOrders() {
  return (
    <section class="space-y-6">
      <PageHeader title="Pending Orders" description="Orders waiting to be processed." />
      <Card title="Pending orders list">
        <p class="text-base-content/60">
          This is a placeholder page. Add pending-order table or business logic here.
        </p>
      </Card>
    </section>
  );
}

export const Route = createFileRoute('/panel-admin/orders/pending')({
  head: () => ({ meta: [{ title: 'Pending Orders - solid-admin' }] }),
  component: PendingOrders,
});