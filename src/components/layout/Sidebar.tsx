import { createEffect, createSignal, For, Show } from 'solid-js';
import type { Accessor } from 'solid-js';
import { Link, useLocation } from '@tanstack/solid-router';

import { icons, menuItems, type MenuItem } from './menu';
import { useLayout } from './layout-context';

function useFocusableItems(container: () => HTMLElement | undefined) {
  const focusables = () => {
    const el = container();
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  };

  const focusFirst = () => focusables()[0]?.focus();
  const focusNext = () => {
    const items = focusables();
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (idx < items.length - 1) items[idx + 1]?.focus();
  };
  const focusPrev = () => {
    const items = focusables();
    const idx = items.indexOf(document.activeElement as HTMLElement);
    if (idx > 0) items[idx - 1]?.focus();
  };

  return { focusFirst, focusNext, focusPrev };
}

// Brand/logo block at the top of the sidebar. Collapses to an icon only.
function Brand(props: { collapsed: boolean }) {
  const logo = (
    <span class="flex items-center justify-center w-10 h-10 rounded-box bg-primary text-primary-content font-bold text-sm shadow-md">
      SA
    </span>
  );
  return (
    <div
      class={[
        'flex items-center h-16 border-b border-base-300',
        props.collapsed ? 'justify-center px-2' : 'gap-3 px-4',
      ]}
    >
      {logo}
      {props.collapsed ? null : <span class="text-lg font-bold tracking-tight">solid-admin</span>}
    </div>
  );
}

// Menu rendering is recursive so nested `children` become submenus.
type MenuListProps = {
  items: MenuItem[];
  collapsed: boolean;
  depth: number;
  openKeys: Accessor<string[]>;
  toggleKey: (route: string) => void;
  flyoutKey: Accessor<string | null>;
  setFlyoutKey: (route: string | null) => void;
  closeMobile: () => void;
  pathname: string;
};

const hasChildren = (item: MenuItem) => (item.children?.length ?? 0) > 0;

// An item is "active" when the current path matches it or lives under it.
const isActivePath = (item: MenuItem, pathname: string) =>
  pathname === item.route || pathname.startsWith(`${item.route}/`);

function MenuList(props: MenuListProps) {
  return (
    <For each={props.items}>
      {(item) =>
        hasChildren(item) ? <ParentItem item={item} {...props} /> : <LeafItem item={item} {...props} />
      }
    </For>
  );
}

// Child-scoped props passed down without the parent `item` sneaking in spreads.
function subMenuProps(props: MenuListProps, items: MenuItem[]): MenuListProps {
  return {
    items,
    collapsed: props.collapsed,
    depth: props.depth + 1,
    openKeys: props.openKeys,
    toggleKey: props.toggleKey,
    flyoutKey: props.flyoutKey,
    setFlyoutKey: props.setFlyoutKey,
    closeMobile: props.closeMobile,
    pathname: props.pathname,
  };
}

// Top-level and submenu leaf items are plain links to their route.
function LeafItem(props: MenuListProps & { item: MenuItem }) {
  const isTop = () => props.depth === 0;
  return (
    <li class={props.collapsed && isTop() ? 'w-full! flex! items-center! justify-center! px-2' : undefined}>
      <Link
        to={props.item.route}
        activeOptions={{ exact: props.item.exact ?? false }}
        onClick={props.closeMobile}
        activeProps={{ class: 'bg-primary/15 text-primary font-semibold' }}
        class={
          props.collapsed && isTop()
            ? 'transition-colors flex! items-center! justify-center! w-11! h-11! p-0! rounded-box'
            : props.depth > 0
              ? 'transition-colors rounded-field text-sm hover:bg-base-300'
              : 'transition-colors rounded-field hover:bg-base-300'
        }
        title={props.collapsed && isTop() ? props.item.label : undefined}
      >
        {props.item.icon()}
        {props.collapsed && isTop() ? null : <span>{props.item.label}</span>}
      </Link>
    </li>
  );
}

// Items with children render an expanding accordion (expanded sidebar) or a
// flyout menu to the right (collapsed sidebar).
function ParentItem(props: MenuListProps & { item: MenuItem }) {
  const active = () => isActivePath(props.item, props.pathname);
  const isOpen = () => props.openKeys().includes(props.item.route) || active();
  const flyoutOpen = () => props.collapsed && props.flyoutKey() === props.item.route;
  let flyoutRef: HTMLDivElement | undefined;

  const { focusFirst, focusNext, focusPrev } = useFocusableItems(() => flyoutRef);

  const handleFlyoutKey = (e: KeyboardEvent) => {
    if (!flyoutOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      props.setFlyoutKey(null);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusNext();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusPrev();
    }
  };

  createEffect(
    () => flyoutOpen(),
    (open) => {
      if (open) focusFirst();
    },
  );

  return (
    <li class={props.collapsed ? 'relative w-full! flex! items-center! justify-center! px-2' : undefined}>
      <button
        type="button"
        onClick={() =>
          props.collapsed
            ? props.setFlyoutKey(flyoutOpen() ? null : props.item.route)
            : props.toggleKey(props.item.route)
        }
        title={props.collapsed ? props.item.label : undefined}
        aria-expanded={flyoutOpen() ? 'true' : undefined}
        aria-haspopup="menu"
        class={[
          'transition-colors',
          props.collapsed
            ? 'flex! items-center! justify-center! w-11! h-11! p-0! rounded-box'
            : 'flex w-full items-center gap-3 rounded-field px-3 py-2 hover:bg-base-300',
          { 'bg-primary/15 text-primary': active() && props.collapsed },
          { 'bg-primary/10 text-primary font-semibold': active() && !props.collapsed },
        ]}
      >
        {props.item.icon()}
        <Show when={!props.collapsed}>
          <span class="flex-1 text-left">{props.item.label}</span>
          <span class={['transition-transform', { 'rotate-180': isOpen() }]}>{icons.chevron()}</span>
        </Show>
      </button>

      <Show when={!props.collapsed && isOpen()}>
        <ul class="mt-1">
          <MenuList {...subMenuProps(props, props.item.children!)} />
        </ul>
      </Show>

      <Show when={flyoutOpen()}>
        <div
          ref={flyoutRef}
          role="menu"
          onKeyDown={handleFlyoutKey}
          class="absolute left-full top-0 z-50 ml-2 w-48 flex! flex-col! rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
        >
          <span class="mb-1 block px-3 pt-1 text-xs font-semibold uppercase tracking-wider text-base-content/60">
            {props.item.label}
          </span>
          <For each={props.item.children!}>
            {(child) => (
              <Link
                to={child.route}
                role="menuitem"
                activeOptions={{ exact: child.exact ?? false }}
                onClick={() => {
                  props.closeMobile();
                  props.setFlyoutKey(null);
                }}
                activeProps={{ class: 'bg-primary/15 text-primary font-semibold' }}
                class="flex items-center gap-3 rounded-field px-3 py-2 text-sm transition-colors hover:bg-base-300"
              >
                {child.icon()}
                <span>{child.label}</span>
              </Link>
            )}
          </For>
        </div>
        <div class="fixed inset-0 z-40" onClick={() => props.setFlyoutKey(null)} />
      </Show>
    </li>
  );
}

export default function Sidebar(props: { forceFull?: boolean }) {
  const { collapsed, closeMobile } = useLayout();
  const collapsedNow = () => (props.forceFull ? false : collapsed());
  const location = useLocation();
  const [openKeys, setOpenKeys] = createSignal<string[]>([]);
  const [flyoutKey, setFlyoutKey] = createSignal<string | null>(null);

  // Dropping the flyout when the sidebar collapses/expands.
  createEffect(
    () => collapsedNow(),
    () => {
      setFlyoutKey(null);
    },
  );

  const toggleKey = (route: string) =>
    setOpenKeys((prev) => (prev.includes(route) ? prev.filter((k) => k !== route) : [...prev, route]));

  return (
    <aside
      class={[
        'flex flex-col h-full bg-base-200 transition-[width] duration-200',
        collapsedNow() ? 'w-16' : 'w-72',
      ]}
    >
      <Brand collapsed={collapsedNow()} />

      <nav class={['flex-1 overflow-y-auto', collapsedNow() ? 'py-2' : 'px-3 pb-4']}>
        <ul class={['menu text-base-content', collapsedNow() ? 'w-full flex flex-col items-center gap-1 p-0' : 'gap-1 w-full']}>
          {!collapsedNow() ? <li class="menu-title text-xs font-semibold uppercase tracking-wider text-base-content/60">Main</li> : null}
          <MenuList
            items={menuItems}
            collapsed={collapsedNow()}
            depth={0}
            openKeys={openKeys}
            toggleKey={toggleKey}
            flyoutKey={flyoutKey}
            setFlyoutKey={setFlyoutKey}
            closeMobile={closeMobile}
            pathname={location().pathname}
          />
        </ul>
      </nav>

      {!collapsedNow() ? (
        <div class="border-t border-base-300 px-4 py-3">
          <p class="text-xs font-medium text-base-content/60">v1.0 · Admin template</p>
        </div>
      ) : null}
    </aside>
  );
}