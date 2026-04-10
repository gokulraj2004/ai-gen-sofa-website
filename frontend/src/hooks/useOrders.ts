import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../api/orders';
import { OrderCreate, OrderListParams } from '../types';
import { useAuth } from './useAuth';

export const useOrders = (params?: OrderListParams) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => ordersApi.getOrders(params),
    enabled: isAuthenticated,
  });
};

export const useOrder = (orderId: string) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersApi.getOrder(orderId),
    enabled: isAuthenticated && !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderCreate) => ordersApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};