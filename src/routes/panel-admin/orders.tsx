import { createFileRoute } from '@tanstack/solid-router';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';

function Orders() {
  return (
    <section class="space-y-6">
      <PageHeader title="Orders" description="Manage customer orders." />
      <Card title="Orders list">
        <p class="text-base-content/60">
          This is a placeholder page. Add your order table or business logic here.
        </p>
      </Card>
    </section>
  );
}

export const Route = createFileRoute('/panel-admin/orders')({
  head: () => ({ meta: [{ title: 'Orders - solid-admin' }] }),
  component: Orders,
});
