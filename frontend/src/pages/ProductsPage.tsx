import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productsApi } from '../api/products';
import { Product, Category, ProductQueryParams } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const categoryId = searchParams.get('category_id') || undefined;
  const search = searchParams.get('search') || undefined;
  const sortBy = (searchParams.get('sort_by') as ProductQueryParams['sort_by']) || undefined;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params: ProductQueryParams = { page, category_id: categoryId, search, sort_by: sortBy };
        const data = await productsApi.getProducts(params);
        setProducts(data.items);
        setTotalPages(data.total_pages);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [page, categoryId, search, sortBy]);

  useEffect(() => {
    productsApi.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const updateParams = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    if (updates.category_id !== undefined || updates.search !== undefined || updates.sort_by !== undefined) {
      newParams.set('page', '1');
    }
    setSearchParams(newParams);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => updateParams({ category_id: undefined })}
                  className={`text-sm ${!categoryId ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => updateParams({ category_id: cat.id })}
                    className={`text-sm ${categoryId === cat.id ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Sort By</h3>
            <select
              value={sortBy || ''}
              onChange={(e) => updateParams({ sort_by: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
              <option value="name_desc">Name: Z-A</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </aside>

        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No products found.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                      <p className="text-primary-600 font-bold mt-1">{formatCurrency(product.price)}</p>
                      {product.stock_quantity <= 0 && (
                        <span className="text-red-500 text-sm">Out of Stock</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateParams({ page: String(p) })}
                      className={`px-3 py-1 rounded ${
                        p === page
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;