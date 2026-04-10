import React, { createContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Cart, CartItemAdd } from '../types';
import { cartApi } from '../api/cart';
import { useAuth } from '../hooks/useAuth';

export interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (data: CartItemAdd) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  itemCount: number;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await cartApi.getCart();
      setCart(data);
    } catch {
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, fetchCart]);

  const addItem = async (data: CartItemAdd) => {
    const updatedCart = await cartApi.addItem(data);
    setCart(updatedCart);
  };

  const updateItem = async (itemId: string, quantity: number) => {
    const updatedCart = await cartApi.updateItem(itemId, { quantity });
    setCart(updatedCart);
  };

  const removeItem = async (itemId: string) => {
    const updatedCart = await cartApi.removeItem(itemId);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    await cartApi.clearCart();
    setCart(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        itemCount: cart?.item_count ?? 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};