import React, { useState } from 'react';
import { OrderCreate } from '../../types';

interface CheckoutFormProps {
  onSubmit: (data: OrderCreate) => void;
  isLoading: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<OrderCreate>({
    shipping_address_line1: '',
    shipping_address_line2: '',
    shipping_city: '',
    shipping_state: '',
    shipping_zip: '',
    shipping_country: 'US',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="shipping_address_line1" className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 1 *
        </label>
        <input
          id="shipping_address_line1"
          name="shipping_address_line1"
          type="text"
          required
          value={formData.shipping_address_line1}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          placeholder="123 Main St"
        />
      </div>

      <div>
        <label htmlFor="shipping_address_line2" className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 2
        </label>
        <input
          id="shipping_address_line2"
          name="shipping_address_line2"
          type="text"
          value={formData.shipping_address_line2 || ''}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          placeholder="Apt 4B"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="shipping_city" className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            id="shipping_city"
            name="shipping_city"
            type="text"
            required
            value={formData.shipping_city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
        <div>
          <label htmlFor="shipping_state" className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            id="shipping_state"
            name="shipping_state"
            type="text"
            required
            value={formData.shipping_state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="shipping_zip" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code *
          </label>
          <input
            id="shipping_zip"
            name="shipping_zip"
            type="text"
            required
            value={formData.shipping_zip}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
        <div>
          <label htmlFor="shipping_country" className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <input
            id="shipping_country"
            name="shipping_country"
            type="text"
            required
            value={formData.shipping_country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CheckoutForm;