import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import Sidebar from './Sidebar';
import { LayoutProvider } from './layout-context';

vi.mock('@tanstack/solid-router', () => ({
  useLocation: () => () => ({ pathname: '/' }),
  Link: (props: any) => (
    <a href={props.to} onClick={props.onClick} title={props.title}>
      {props.children}
    </a>
  ),
  useNavigate: () => vi.fn(),
}));

describe('Sidebar', () => {
  it('renders brand and menu items', () => {
    render(() => (
      <LayoutProvider>
        <Sidebar />
      </LayoutProvider>
    ));
    expect(screen.getByText('SA')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('has correct width classes for expanded state', () => {
    const { container } = render(() => (
      <LayoutProvider>
        <Sidebar />
      </LayoutProvider>
    ));
    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('w-72');
  });

  it('renders submenu parent items with aria-haspopup', () => {
    render(() => (
      <LayoutProvider>
        <Sidebar />
      </LayoutProvider>
    ));
    const ordersButtons = screen.getAllByRole('button', { name: /Orders/ });
    expect(ordersButtons.length).toBeGreaterThan(0);
    expect(ordersButtons[0]).toHaveAttribute('aria-haspopup', 'menu');
  });
});
