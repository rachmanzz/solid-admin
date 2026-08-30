import { For } from 'solid-js';

// Generic data table: renders headers and rows for any row shape (T). Each
// column maps the row to a JSX cell. Handles the empty state gracefully.
export default function DataTable<T extends object>(props: {
  columns: { key: string; header: string; cell: (row: T) => unknown }[];
  rows: T[];
  rowKey: (row: T) => string | number;
}) {
  return (
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <For each={props.columns}>
              {(col) => <th>{col.header}</th>}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={props.rows}>
            {(row) => (
              <tr>
                <For each={props.columns}>
                  {(col) => <td>{col.cell(row)}</td>}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
