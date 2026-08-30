import { render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import DataTable from './DataTable';

type Row = { id: number; name: string };

const columns = [
  { key: 'id', header: '#', cell: (r: Row) => r.id },
  { key: 'name', header: 'Name', cell: (r: Row) => r.name },
];

describe('<DataTable />', () => {
  test('renders headers and rows', () => {
    const rows: Row[] = [
      { id: 1, name: 'Ava' },
      { id: 2, name: 'Liam' },
    ];
    const { getByText } = render(() => (
      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} />
    ));
    expect(getByText('#')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Ava')).toBeInTheDocument();
    expect(getByText('Liam')).toBeInTheDocument();
  });

  test('renders no rows when the list is empty', () => {
    const { queryByText } = render(() => (
      <DataTable columns={columns} rows={[]} rowKey={(r) => r.id} />
    ));
    expect(queryByText('Name')).toBeInTheDocument();
  });
});
