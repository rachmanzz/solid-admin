import { render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import StatCard from './StatCard';

describe('<StatCard />', () => {
  test('renders label, value, and trend', () => {
    const { getByText } = render(() => (
      <StatCard label="Users" value="1,248" trend="+12%" />
    ));
    expect(getByText('Users')).toBeInTheDocument();
    expect(getByText('1,248')).toBeInTheDocument();
    expect(getByText('+12% this week')).toBeInTheDocument();
  });

  test('renders without a trend', () => {
    const { queryByText } = render(() => <StatCard label="Users" value="5" />);
    expect(queryByText('this week')).not.toBeInTheDocument();
  });
});
