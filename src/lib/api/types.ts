// Domain / API data-transfer types. Shared across api modules, hooks, and routes.
export type Role = 'admin' | 'editor' | 'viewer';

export type User = {
  id: string;
  name: string;
  title: string;
  role: Role;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type ErrorResponse = {
  message?: string;
  status?: number;
};

// Normalized error thrown by the fetch layer.
export type ApiError = Error & ErrorResponse;
