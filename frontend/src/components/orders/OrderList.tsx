import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types';

interface OrderListProps {
  orders: Order[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
        <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          to={`/orders/${order.id}`}
          className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-semibold text-gray-900">Order #{order.order_number}</span>
              <span className="ml-3 text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                statusColors[order.status] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{order.items.length} item(s)</span>
            <span className="font-semibold text-gray-900">${order.total}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrderList;