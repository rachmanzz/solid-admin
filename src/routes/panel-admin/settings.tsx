import { createFileRoute } from '@tanstack/solid-router';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';

function Settings() {
  return (
    <section class="space-y-6">
      <PageHeader title="Settings" description="Configure your workspace." />
      <Card title="General settings">
        <p class="text-base-content/60">
          This is a placeholder page. Add your settings forms here.
        </p>
      </Card>
    </section>
  );
}

export const Route = createFileRoute('/panel-admin/settings')({
  head: () => ({ meta: [{ title: 'Settings - solid-admin' }] }),
  component: Settings,
});
