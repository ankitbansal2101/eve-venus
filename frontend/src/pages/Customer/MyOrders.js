import React, { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(null);
  const [returnReason, setReturnReason] = useState('');

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      // Mock data - replace with actual API call based on customer ID
      setOrders([
        {
          id: 'ORD-001',
          status: 'pending',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 100, unitPrice: 2.50, totalPrice: 250.00 },
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 5, unitPrice: 45.00, totalPrice: 225.00 }
          ],
          subtotal: 475.00,
          tax: 38.00,
          totalAmount: 513.00,
          orderDate: '2024-01-15',
          expectedDelivery: '2024-01-22',
          shippingAddress: '123 Industrial Ave, Manufacturing City, MC 12345',
          canCancel: true,
          canReturn: false
        },
        {
          id: 'ORD-002',
          status: 'shipped',
          items: [
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 2, unitPrice: 275.00, totalPrice: 550.00 }
          ],
          subtotal: 550.00,
          tax: 44.00,
          totalAmount: 594.00,
          orderDate: '2024-01-10',
          shippedDate: '2024-01-14',
          trackingNumber: 'TRK-XYZ-789',
          expectedDelivery: '2024-01-18',
          shippingAddress: '456 Factory Blvd, Industrial Park, IP 67890',
          canCancel: false,
          canReturn: false
        },
        {
          id: 'ORD-003',
          status: 'delivered',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 50, unitPrice: 2.50, totalPrice: 125.00 },
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 1, unitPrice: 275.00, totalPrice: 275.00 }
          ],
          subtotal: 400.00,
          tax: 32.00,
          totalAmount: 432.00,
          orderDate: '2024-01-05',
          shippedDate: '2024-01-08',
          deliveredDate: '2024-01-12',
          trackingNumber: 'TRK-DEF-456',
          shippingAddress: '789 Business Dr, Commerce Center, CC 13579',
          canCancel: false,
          canReturn: true
        }
      ]);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled', canCancel: false, canReturn: false }
          : order
      ));
      
      setShowCancelModal(null);
      toast.success('Order cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel order');
    }
  };

  const handleReturnRequest = async (orderId) => {
    if (!returnReason.trim()) {
      toast.error('Please provide a reason for return');
      return;
    }

    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: 'return_requested', canReturn: false }
          : order
      ));
      
      setShowReturnModal(null);
      setReturnReason('');
      toast.success('Return request submitted successfully');
    } catch (error) {
      toast.error('Failed to submit return request');
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
      case 'return_requested':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
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
      case 'return_requested': return 'bg-orange-100 text-orange-800';
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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Shipped</div>
          <div className="text-2xl font-bold text-purple-600">
            {orders.filter(o => o.status === 'shipped').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Delivered</div>
          <div className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'delivered').length}
          </div>
        </div>
      </div>

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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-500">Ordered on {order.orderDate}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                  {order.status.replace('_', ' ')}
                </span>
                <div className="text-lg font-bold text-gray-900 mt-1">
                  {formatCurrency(order.totalAmount)}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Expected Delivery:</span>
                <p className="text-gray-900">{order.expectedDelivery}</p>
              </div>
              {order.trackingNumber && (
                <div>
                  <span className="font-medium text-gray-500">Tracking:</span>
                  <p className="text-blue-600 font-mono">{order.trackingNumber}</p>
                </div>
              )}
              {order.deliveredDate && (
                <div>
                  <span className="font-medium text-gray-500">Delivered:</span>
                  <p className="text-green-600">{order.deliveredDate}</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Items ({order.items.length})</h4>
              <div className="space-y-2">
                {order.items.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="ml-2 text-sm text-gray-500">{item.sku}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        {item.quantity} × {formatCurrency(item.unitPrice)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(item.totalPrice)}
                      </div>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-sm text-gray-500 py-2">
                    +{order.items.length - 2} more items
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t pt-4 flex items-center justify-between">
              <button
                onClick={() => setSelectedOrder(order)}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <EyeIcon className="h-4 w-4" />
                <span>View Details</span>
              </button>

              <div className="flex items-center space-x-2">
                {order.canCancel && (
                  <button
                    onClick={() => setShowCancelModal(order)}
                    className="btn btn-secondary text-red-600 hover:bg-red-50"
                  >
                    Cancel Order
                  </button>
                )}
                {order.canReturn && (
                  <button
                    onClick={() => setShowReturnModal(order)}
                    className="btn btn-secondary text-orange-600 hover:bg-orange-50"
                  >
                    Request Return
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Order Details - {selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Order Status */}
              <div className="flex items-center space-x-3 mb-6">
                {getStatusIcon(selectedOrder.status)}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedOrder.status)}`}>
                  {selectedOrder.status.replace('_', ' ')}
                </span>
              </div>

              {/* All Items */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">All Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {item.quantity} × {formatCurrency(item.unitPrice)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.totalPrice)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">{formatCurrency(selectedOrder.tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Cancel Order</h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to cancel order {showCancelModal.id}? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowCancelModal(null)}
                  className="btn btn-secondary"
                >
                  Keep Order
                </button>
                <button
                  onClick={() => handleCancelOrder(showCancelModal.id)}
                  className="btn bg-red-600 text-white hover:bg-red-700"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return Request Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Request Return</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for returning order {showReturnModal.id}:
              </p>
              <textarea
                className="input w-full h-24 resize-none mb-4"
                placeholder="Enter reason for return..."
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
              />
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowReturnModal(null);
                    setReturnReason('');
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReturnRequest(showReturnModal.id)}
                  className="btn bg-orange-600 text-white hover:bg-orange-700"
                >
                  Submit Return Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'You haven\'t placed any orders yet.' : `No ${filter} orders found.`}
          </p>
        </div>
      )}
    </div>
  );
}

export default MyOrders;
