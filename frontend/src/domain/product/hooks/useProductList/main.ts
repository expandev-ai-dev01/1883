import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services';
import type { UseProductListOptions } from './types';

export const useProductList = (options: UseProductListOptions = {}) => {
  const { filters, enabled = true } = options;

  const queryKey = ['products', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.list(filters),
    enabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    products: data?.products ?? [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
};
