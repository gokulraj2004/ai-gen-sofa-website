import React from 'react';
import { useCategories } from '../../hooks/useProducts';

interface CategoryFilterProps {
  selectedCategoryId?: string;
  onCategoryChange: (categoryId: string | undefined) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategoryId,
  onCategoryChange,
}) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onCategoryChange(undefined)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategoryId
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
        </li>
        {categories?.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategoryId === category.id
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
              {category.product_count !== undefined && (
                <span className="ml-2 text-xs text-gray-400">({category.product_count})</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;