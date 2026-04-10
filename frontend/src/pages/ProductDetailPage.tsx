import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsApi } from '../api/products';
import { Product } from '../types';
import ProductDetail from '../components/products/ProductDetail';

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await productsApi.getProduct(slug);
        setProduct(data);
      } catch {
        setError('Product not found.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error || !product) {
    return <div className="text-center py-12 text-red-500">{error || 'Product not found.'}</div>;
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;