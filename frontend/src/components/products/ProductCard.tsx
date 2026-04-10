import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="aspect-w-4 aspect-h-3 bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        {product.category && (
          <span className="text-xs text-primary-600 font-medium uppercase tracking-wide">
            {product.category.name}
          </span>
        )}
        <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.compare_at_price && (
            <span className="text-sm text-gray-400 line-through">${product.compare_at_price}</span>
          )}
        </div>
        {product.stock_quantity <= 0 && (
          <span className="mt-2 inline-block text-xs text-red-600 font-medium">Out of Stock</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;