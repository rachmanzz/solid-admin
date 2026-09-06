import { useMutation, useQuery, useQueryClient } from '@tanstack/solid-query';

import {
  createTransaction,
  deleteTransaction,
  fetchTransaction,
  fetchTransactions,
  updateTransaction,
} from '../lib/api/transactions';
import { queryKeys } from '../lib/queries/keys';
import type {
  Transaction,
  TransactionCreate,
  TransactionUpdate,
} from '../lib/api/types';

export function useTransactions() {
  return useQuery(() => ({
    queryKey: queryKeys.transactions.all,
    queryFn: fetchTransactions,
  }));
}

export function useTransaction(id: () => string) {
  return useQuery(() => ({
    queryKey: queryKeys.transactions.byId(id()),
    queryFn: () => fetchTransaction(id()),
  }));
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: createTransaction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all }),
  }));
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: ({ id, input }: { id: string; input: TransactionUpdate }) =>
      updateTransaction(id, input),
    onSuccess: (updated: Transaction) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.byId(updated.id) }),
  }));
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: deleteTransaction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.transactions.all }),
  }));
}
