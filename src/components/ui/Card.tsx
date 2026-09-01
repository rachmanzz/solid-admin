import type { ParentProps } from 'solid-js';
import type { JSX } from '@solidjs/web';

// Consistent daisyUI surface wrapper: one source of truth for padding, shadow,
// and background so every panel in the admin looks the same.
export default function Card(props: ParentProps<{ title?: string; actions?: JSX.Element; class?: string }>) {
  return (
    <section class={`card bg-base-100 shadow-sm ${props.class ?? ''}`}>
      <div class="card-body">
        {props.title ? (
          <div class="flex items-center justify-between">
            <h2 class="card-title">{props.title}</h2>
            {props.actions ? <div>{props.actions}</div> : null}
          </div>
        ) : null}
        {props.children}
      </div>
    </section>
  );
}
