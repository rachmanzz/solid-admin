import type { JSX } from '@solidjs/web';

// Standard page header: title, optional description, and an optional action
// (button), laid out responsively (stack on mobile, row on desktop).
export default function PageHeader(props: {
  title: string;
  description?: string;
  action?: JSX.Element;
}) {
  return (
    <header class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-2xl font-bold">{props.title}</h1>
        {props.description ? (
          <p class="text-base-content/60">{props.description}</p>
        ) : null}
      </div>
      {props.action ? <div>{props.action}</div> : null}
    </header>
  );
}
