import { createFileRoute } from '@tanstack/solid-router';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';

function Analytics() {
  return (
    <section class="space-y-6">
      <PageHeader title="Analytics" description="Track performance across your admin." />
      <Card title="Reports">
        <p class="text-base-content/60">
          This is a placeholder page. Add charts, metrics, or reports here.
        </p>
      </Card>
    </section>
  );
}

export const Route = createFileRoute('/panel-admin/analytics')({
  head: () => ({ meta: [{ title: 'Analytics - solid-admin' }] }),
  component: Analytics,
});
