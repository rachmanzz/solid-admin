import { For } from 'solid-js';
import { Link, createFileRoute } from '@tanstack/solid-router';

const features = [
  {
    title: 'Reactive by default',
    description:
      'Fine-grained signals, memos, and effects keep the UI in sync with zero wasted renders.',
  },
  {
    title: 'Typesafe routing',
    description:
      'TanStack Router derives full type safety from the file-based route tree — links, params, and loaders.',
  },
  {
    title: 'Semantic theming',
    description:
      'Custom daisyUI themes with light and dark support driven by semantic color tokens.',
  },
  {
    title: 'Responsive shell',
    description:
      'A mobile-first admin layout with a collapsible sidebar and slide-over drawer.',
  },
];

function ScaffoldLogo() {
  return (
    <span class="flex items-center justify-center w-9 h-9 rounded-box bg-primary text-primary-content font-bold text-sm">
      SA
    </span>
  );
}

function Landing() {
  return (
    <div class="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* Top navigation */}
      <header class="navbar bg-base-200 px-4 lg:px-8">
        <div class="navbar-start">
          <div class="flex items-center gap-2">
            <ScaffoldLogo />
            <span class="text-lg font-bold tracking-tight">solid-admin</span>
          </div>
        </div>
        <div class="navbar-end">
          <Link to="/panel-admin" class="btn btn-primary btn-sm">
            Open the panel
          </Link>
        </div>
      </header>

      <main class="flex-1">
        {/* Hero */}
        <section class="hero bg-base-100">
          <div class="hero-content text-center py-20 lg:py-28">
            <div class="max-w-3xl">
              <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
                A fast, static admin template built with{' '}
                <span class="text-primary">SolidJS 2</span>
              </h1>
              <p class="py-6 text-lg text-base-content/70">
                solid-admin pairs Solid's fine-grained reactivity with TanStack Router for
                typesafe navigation and a Tailwind CSS v4 + daisyUI 5 styling system. Ship a
                polished admin UI to any static host.
              </p>
              <div class="flex flex-wrap justify-center gap-3">
                <Link to="/panel-admin" class="btn btn-primary">
                  Open the panel
                </Link>
                <a
                  class="btn btn-outline"
                  href="https://github.com/rachmanzz/solid-admin"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section class="max-w-6xl mx-auto px-4 pb-20">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <For each={features}>
              {(f) => (
                <div class="card">
                  <div class="card-body">
                    <h2 class="card-title text-lg">{f.title}</h2>
                    <p class="text-sm text-base-content/70">{f.description}</p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer class="footer footer-center sm:footer-horizontal bg-base-200 px-6 py-6 text-base-content/70">
        <aside>
          <p>© {new Date().getFullYear()} solid-admin · Admin template</p>
        </aside>
      </footer>
    </div>
  );
}

export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'solid-admin' }] }),
  component: Landing,
});
