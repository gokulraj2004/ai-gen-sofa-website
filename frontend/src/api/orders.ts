import apiClient from './client';
import { Order, OrderCreate, OrderListResponse, OrderListParams } from '../types';

export const ordersApi = {
  getOrders: async (params?: OrderListParams): Promise<OrderListResponse> => {
    const { data } = await apiClient.get<OrderListResponse>('/orders', { params });
    return data;
  },

  getOrder: async (id: string): Promise<Order> => {
    const { data } = await apiClient.get<Order>(`/orders/${id}`);
    return data;
  },

  createOrder: async (orderData: OrderCreate): Promise<Order> => {
    const { data } = await apiClient.post<Order>('/orders', orderData);
    return data;
  },
};