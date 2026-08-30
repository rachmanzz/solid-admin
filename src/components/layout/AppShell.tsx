import type { ParentProps } from 'solid-js';
import type { JSX } from '@solidjs/web';
import { Show } from 'solid-js';

import { LayoutProvider, useLayout } from './layout-context';
import Sidebar from './Sidebar';

// Renders the sidebar in two responsive ways while mounting it once each:
// - Desktop (`lg+`): the sidebar sits in normal flow, its width follows the
//   collapsed state (icon-only when collapsed).
// - Mobile (<lg): the sidebar is a slide-over drawer with an overlay; it always
//   shows full width (forceFull), independent of desktop collapse state.
function Shell(props: ParentProps) {
  const { mobileOpen, closeMobile } = useLayout();

  return (
    <div class="flex min-h-screen bg-(--background) text-(--foreground)">
      {/* Desktop sidebar: in-flow, collapsible */}
      <div class="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <div class="lg:hidden">
        <Show when={mobileOpen()}>
          <div class="fixed inset-0 z-40 bg-black/50" onClick={closeMobile} aria-hidden="true" />
        </Show>
        {/*
          Off-canvas drawer. Kept mounted so the transition runs; translate is
          driven by mobileOpen. Only interactive when open.
        */}
        <aside
          class={[
            'fixed inset-y-0 left-0 z-50 transition-transform duration-200',
            mobileOpen() ? 'translate-x-0' : '-translate-x-full',
          ]}
        >
          <Sidebar forceFull />
        </aside>
      </div>

      {/* Main column: Navbar + content */}
      <div class="flex-1 flex flex-col min-w-0">{props.children}</div>
    </div>
  );
}

// The responsive admin shell: provides shared layout state (collapse + mobile
// drawer) and renders the sidebar + main content column. Children are the
// Navbar and page content.
export default function AppShell(props: ParentProps<{ children?: JSX.Element }>) {
  return (
    <LayoutProvider>
      <Shell>{props.children}</Shell>
    </LayoutProvider>
  );
}
