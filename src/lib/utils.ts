// Pure, side-effect-free helpers. No fetch, no DOM, no storage — keep imports
// of this module dependency-free so it is trivially unit-testable.

export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(value: string | number | Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale).format(new Date(value));
}
