import apiClient from './client';
import { Product, ProductListResponse, ProductQueryParams, Category } from '../types';

export const productsApi = {
  getProducts: async (params?: ProductQueryParams): Promise<ProductListResponse> => {
    const { data } = await apiClient.get<ProductListResponse>('/products', { params });
    return data;
  },

  getProduct: async (slug: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${slug}`);
    return data;
  },

  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>('/categories');
    return data;
  },
};