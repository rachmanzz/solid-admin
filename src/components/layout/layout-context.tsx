import { createContext, createSignal, useContext, type ParentProps } from 'solid-js';

// Shared admin-layout state so Navbar (toggle buttons) and Sidebar (collapse
// width) coordinate without prop-drilling. Reused by any nested component.
type LayoutContextValue = {
  collapsed: () => boolean;
  toggleCollapse: () => void;
  mobileOpen: () => boolean;
  openMobile: () => void;
  closeMobile: () => void;
};

const LayoutContext = createContext<LayoutContextValue>();

export function LayoutProvider(props: ParentProps) {
  const [collapsed, setCollapsed] = createSignal(false);
  const [mobileOpen, setMobileOpen] = createSignal(false);

  const value: LayoutContextValue = {
    collapsed,
    toggleCollapse: () => setCollapsed((c) => !c),
    mobileOpen,
    openMobile: () => setMobileOpen(true),
    closeMobile: () => setMobileOpen(false),
  };

  return <LayoutContext value={value}>{props.children}</LayoutContext>;
}

export function useLayout(): LayoutContextValue {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return ctx;
}
