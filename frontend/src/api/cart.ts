import apiClient from './client';
import { Cart, CartItemAdd, CartItemUpdate } from '../types';

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const { data } = await apiClient.get<Cart>('/cart');
    return data;
  },

  addItem: async (item: CartItemAdd): Promise<Cart> => {
    const { data } = await apiClient.post<Cart>('/cart/items', item);
    return data;
  },

  updateItem: async (itemId: string, update: CartItemUpdate): Promise<Cart> => {
    const { data } = await apiClient.put<Cart>(`/cart/items/${itemId}`, update);
    return data;
  },

  removeItem: async (itemId: string): Promise<Cart> => {
    const { data } = await apiClient.delete<Cart>(`/cart/items/${itemId}`);
    return data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete('/cart');
  },
};