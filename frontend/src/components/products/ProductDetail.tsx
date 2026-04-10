import React, { useState } from 'react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../hooks/useCart';
import Button from '../ui/Button';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem({ product_id: product.id, quantity });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div>
        {product.category?.name && (
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            {product.category.name}
          </p>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {product.compare_at_price && (
            <span className="text-xl text-gray-500 line-through">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

        {product.stock_quantity > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">{product.stock_quantity} available</span>
            </div>
            <Button onClick={handleAddToCart} isLoading={isAdding} size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        ) : (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg font-medium">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;