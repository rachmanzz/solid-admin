// Theme resolution for the custom daisyUI themes (admin / admin-dark).
// Safe to import on the server: the DOM APIs are only touched when the
// functions are called (client side), never at module load.

export const THEME_LIGHT = 'admin';
export const THEME_DARK = 'admin-dark';
const STORAGE_KEY = 'theme';

type Theme = 'light' | 'dark';

function storedPreference(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function systemPreference(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(): Theme {
  return storedPreference() ?? systemPreference();
}

// Sets data-theme on <html> to the resolved theme. Call on the client only.
export function applyTheme(): void {
  document.documentElement.dataset.theme = resolveTheme() === 'dark' ? THEME_DARK : THEME_LIGHT;
}

// Returns an unsubscribe function. Keeps <html>'s theme in sync with the OS
// unless the user has set an explicit localStorage override.
export function watchSystemTheme(): () => void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = () => {
    if (!storedPreference()) applyTheme();
  };
  media.addEventListener('change', handler);
  return () => media.removeEventListener('change', handler);
}
