// JWT token storage for the auth data layer. The API returns a bearer token on
// login/register; client.ts reads it here to attach the Authorization header.
const TOKEN_KEY = 'solid-admin.auth.token';

export function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (typeof localStorage === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}
