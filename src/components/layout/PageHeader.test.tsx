import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders title', () => {
    render(() => <PageHeader title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(() => <PageHeader title="Users" description="Manage users" />);
    expect(screen.getByText('Manage users')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(() => <PageHeader title="Settings" />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders action slot when provided', () => {
    render(() => (
      <PageHeader title="Products" action={<button>Add Product</button>} />
    ));
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
  });
});
