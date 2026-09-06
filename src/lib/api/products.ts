import { request } from './client';
import type { Product, ProductCreate, ProductUpdate } from './types';

export function fetchProducts(): Promise<Product[]> {
  return request<Product[]>('/api/v1/products');
}

export function fetchProduct(id: string): Promise<Product> {
  return request<Product>(`/api/v1/products/${id}`);
}

export function createProduct(input: ProductCreate): Promise<Product> {
  return request<Product>('/api/v1/products', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateProduct(id: string, input: ProductUpdate): Promise<Product> {
  return request<Product>(`/api/v1/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: string): Promise<void> {
  return request<void>(`/api/v1/products/${id}`, { method: 'DELETE' });
}
