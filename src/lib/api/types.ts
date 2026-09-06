// Domain / API data-transfer types. Shared across api modules, hooks, and routes.
// Shapes follow https://api-testing.rahman-tech.my.id/openapi.json.

export type Role = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  created_at: number;
};

export type UserCreate = {
  email: string;
  name: string;
  password: string;
};

export type UserUpdate = {
  email?: string;
  name?: string;
  password?: string;
  role?: Role;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: number;
};

export type ProductCreate = {
  name: string;
  description?: string;
  price: number;
  stock?: number;
};

export type ProductUpdate = {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
};

export type TransactionStatus = 'pending' | 'completed' | 'cancelled';

export type Transaction = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  total: number;
  status: TransactionStatus;
  created_at: number;
};

export type TransactionCreate = {
  user_id: string;
  product_id: string;
  quantity: number;
};

export type TransactionUpdate = {
  status?: TransactionStatus;
  quantity?: number;
};

export type Login = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

// The `error` field in a failed API envelope. It is a human-readable string on
// most errors, but validation errors serialize a ZodError object with a
// `message` property instead.
export type ApiErrorPayload = string | { message?: string } | Record<string, unknown>;

// Normalized error thrown by the fetch layer.
export type ApiError = Error & { status?: number };
