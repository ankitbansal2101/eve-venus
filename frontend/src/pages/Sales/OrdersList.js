import React, { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Mock data - replace with actual API call
      setOrders([
        {
          id: 'ORD-001',
          customerId: 'CUST-001',
          customerName: 'ABC Manufacturing',
          status: 'pending',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 100, unitPrice: 2.50 },
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 5, unitPrice: 45.00 }
          ],
          totalAmount: 475.00,
          orderDate: '2024-01-15',
          expectedDelivery: '2024-01-22',
          shippingAddress: '123 Industrial Ave, Manufacturing City, MC 12345'
        },
        {
          id: 'ORD-002',
          customerId: 'CUST-002',
          customerName: 'XYZ Industries',
          status: 'shipped',
          items: [
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 2, unitPrice: 275.00 }
          ],
          totalAmount: 550.00,
          orderDate: '2024-01-10',
          shippedDate: '2024-01-14',
          trackingNumber: 'TRK-XYZ-789',
          expectedDelivery: '2024-01-18',
          shippingAddress: '456 Factory Blvd, Industrial Park, IP 67890'
        },
        {
          id: 'ORD-003',
          customerId: 'CUST-003',
          customerName: 'DEF Corporation',
          status: 'delivered',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 50, unitPrice: 2.50 },
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 1, unitPrice: 275.00 }
          ],
          totalAmount: 400.00,
          orderDate: '2024-01-05',
          shippedDate: '2024-01-08',
          deliveredDate: '2024-01-12',
          trackingNumber: 'TRK-DEF-456',
          shippingAddress: '789 Business Dr, Commerce Center, CC 13579'
        }
      ]);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-lg capitalize ${
              filter === status
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Order ID</th>
                <th className="table-header">Customer</th>
                <th className="table-header">Status</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Order Date</th>
                <th className="table-header">Expected Delivery</th>
                <th className="table-header">Tracking</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="table-cell font-medium text-primary-600">
                    {order.id}
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerId}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell font-medium">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="table-cell text-gray-500">
                    {order.orderDate}
                  </td>
                  <td className="table-cell text-gray-500">
                    {order.expectedDelivery}
                  </td>
                  <td className="table-cell">
                    {order.trackingNumber ? (
                      <span className="font-mono text-sm text-blue-600">
                        {order.trackingNumber}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' ? 'No orders have been created yet.' : `No ${filter} orders found.`}
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal - Selected Order */}
      {filteredOrders.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Items Breakdown */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Order Items</h3>
            <div className="space-y-4">
              {filteredOrders.slice(0, 1).map(order => (
                <div key={order.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-primary-600">{order.id}</span>
                    <span className="text-sm text-gray-500">{order.customerName}</span>
                  </div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.quantity} × {formatCurrency(item.unitPrice)}</div>
                        <div className="text-sm text-gray-500">{formatCurrency(item.quantity * item.unitPrice)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <div className="text-sm font-medium text-gray-500">Total Orders</div>
                <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              </div>
              <div className="card">
                <div className="text-sm font-medium text-gray-500">Pending</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <div className="text-sm font-medium text-gray-500">Shipped</div>
                <div className="text-2xl font-bold text-purple-600">
                  {orders.filter(o => o.status === 'shipped').length}
                </div>
              </div>
              <div className="card">
                <div className="text-sm font-medium text-gray-500">Total Value</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(orders.reduce((sum, o) => sum + o.totalAmount, 0))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersList;
