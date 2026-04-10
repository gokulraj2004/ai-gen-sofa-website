import React from 'react';
import { Order } from '../../types';

interface OrderDetailProps {
  order: Order;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const OrderDetailComponent: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Order #{order.order_number}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              statusColors[order.status] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {order.status}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Placed on {new Date(order.created_at).toLocaleDateString()} at{' '}
          {new Date(order.created_at).toLocaleTimeString()}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Items</h3>
        <div className="divide-y">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-4">
              {item.product_image_url && (
                <img
                  src={item.product_image_url}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h4 className="font-medium">{item.product_name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.unit_price}</p>
              </div>
              <span className="font-medium">${item.line_total}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Shipping Address</h3>
          <p className="text-gray-600">
            {order.shipping_address_line1}
            <br />
            {order.shipping_address_line2 && (
              <>
                {order.shipping_address_line2}
                <br />
              </>
            )}
            {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
            <br />
            {order.shipping_country}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span>${order.tax}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComponent;