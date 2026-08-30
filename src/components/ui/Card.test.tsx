import { render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders children inside card container', () => {
    render(() => <Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies card class for styling', () => {
    const { container } = render(() => <Card>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('card');
  });

  it('renders title when provided', () => {
    render(() => <Card title="Test Title">Content</Card>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(() => (
      <Card title="Title" actions={<button>Action</button>}>
        Content
      </Card>
    ));
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
