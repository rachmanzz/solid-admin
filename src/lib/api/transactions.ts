import { request } from './client';
import type { Transaction, TransactionCreate, TransactionUpdate } from './types';

export function fetchTransactions(): Promise<Transaction[]> {
  return request<Transaction[]>('/api/v1/transactions');
}

export function fetchTransaction(id: string): Promise<Transaction> {
  return request<Transaction>(`/api/v1/transactions/${id}`);
}

export function createTransaction(input: TransactionCreate): Promise<Transaction> {
  return request<Transaction>('/api/v1/transactions', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateTransaction(id: string, input: TransactionUpdate): Promise<Transaction> {
  return request<Transaction>(`/api/v1/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteTransaction(id: string): Promise<void> {
  return request<void>(`/api/v1/transactions/${id}`, { method: 'DELETE' });
}
