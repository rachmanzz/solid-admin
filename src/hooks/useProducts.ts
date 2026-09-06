import { useMutation, useQuery, useQueryClient } from '@tanstack/solid-query';

import {
  createProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from '../lib/api/products';
import { queryKeys } from '../lib/queries/keys';
import type { Product, ProductUpdate } from '../lib/api/types';

export function useProducts() {
  return useQuery(() => ({
    queryKey: queryKeys.products.all,
    queryFn: fetchProducts,
  }));
}

export function useProduct(id: () => string) {
  return useQuery(() => ({
    queryKey: queryKeys.products.byId(id()),
    queryFn: () => fetchProduct(id()),
  }));
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.products.all }),
  }));
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: ({ id, input }: { id: string; input: ProductUpdate }) => updateProduct(id, input),
    onSuccess: (updated: Product) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.products.byId(updated.id) }),
  }));
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation(() => ({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.products.all }),
  }));
}
