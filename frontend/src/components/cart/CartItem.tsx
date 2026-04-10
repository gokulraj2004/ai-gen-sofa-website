import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

interface CartItemProps {
  item: CartItemType;
  showControls?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, showControls = true }) => {
  const { updateItem, removeItem } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.product.stock_quantity) return;
    await updateItem(item.id, newQuantity);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        {item.product.image_url ? (
          <img
            src={item.product.image_url}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
        <p className="text-sm text-gray-500">{formatCurrency(item.product.price)}</p>
        {showControls && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
              disabled={item.quantity >= item.product.stock_quantity}
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="ml-auto text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <div className="text-sm font-medium text-gray-900">{formatCurrency(item.line_total)}</div>
    </div>
  );
};

export default CartItem;