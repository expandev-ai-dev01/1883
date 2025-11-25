import { authenticatedClient } from '@/core/lib/api';
import type { ProductListParams, ProductListResponse } from '../types';

/**
 * @service ProductService
 * @domain product
 * @type REST
 */
export const productService = {
  /**
   * Lists products from catalog with pagination, sorting, and filtering
   * @param params - Query parameters for filtering and pagination
   * @returns Promise with product list and pagination metadata
   */
  async list(params?: ProductListParams): Promise<ProductListResponse> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ProductListResponse }>(
      '/product',
      { params }
    );
    return data.data;
  },
};
