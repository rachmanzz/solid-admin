// Base URL for all API calls. Override per-environment via import.meta.env.
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? '/api';
