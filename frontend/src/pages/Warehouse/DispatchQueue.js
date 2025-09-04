import React, { useState, useEffect } from 'react';
import { 
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function DispatchQueue() {
  const [dispatchQueue, setDispatchQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingItem, setShippingItem] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    shippingMethod: '',
    trackingNumber: '',
    carrier: ''
  });

  useEffect(() => {
    fetchDispatchQueue();
  }, []);

  const fetchDispatchQueue = async () => {
    try {
      // Mock data - replace with actual API call
      setDispatchQueue([
        {
          id: 'DISP-001',
          orderId: 'ORD-001',
          pickListId: 'PL-001',
          customerName: 'ABC Manufacturing',
          customerAddress: '123 Industrial Ave, Manufacturing City, MC 12345',
          status: 'ready',
          packagedDate: '2024-01-15',
          priority: 'high',
          shippingMethod: null,
          trackingNumber: null,
          carrier: null,
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 100 },
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 5 }
          ]
        },
        {
          id: 'DISP-002',
          orderId: 'ORD-002',
          pickListId: 'PL-002',
          customerName: 'XYZ Industries',
          customerAddress: '456 Factory Blvd, Industrial Park, IP 67890',
          status: 'shipped',
          packagedDate: '2024-01-12',
          shippedDate: '2024-01-14',
          priority: 'medium',
          shippingMethod: 'Express',
          trackingNumber: 'TRK-XYZ-789',
          carrier: 'FastShip Express',
          items: [
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 2 }
          ]
        },
        {
          id: 'DISP-003',
          orderId: 'ORD-003',
          pickListId: 'PL-003',
          customerName: 'DEF Corporation',
          customerAddress: '789 Business Dr, Commerce Center, CC 13579',
          status: 'ready',
          packagedDate: '2024-01-16',
          priority: 'low',
          shippingMethod: null,
          trackingNumber: null,
          carrier: null,
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 50 },
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 1 }
          ]
        }
      ]);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch dispatch queue');
      setLoading(false);
    }
  };

  const handleStartShipping = (dispatchItem) => {
    setShippingItem(dispatchItem);
    setShippingDetails({
      shippingMethod: 'Standard',
      trackingNumber: '',
      carrier: 'FastShip Express'
    });
  };

  const handleConfirmShipment = async () => {
    if (!shippingDetails.trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }

    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDispatchQueue(prev => prev.map(dispatch => 
        dispatch.id === shippingItem.id 
          ? {
              ...dispatch,
              status: 'shipped',
              shippedDate: new Date().toISOString().split('T')[0],
              shippingMethod: shippingDetails.shippingMethod,
              trackingNumber: shippingDetails.trackingNumber,
              carrier: shippingDetails.carrier
            }
          : dispatch
      ));
      
      setShippingItem(null);
      setShippingDetails({ shippingMethod: '', trackingNumber: '', carrier: '' });
      toast.success('Shipment confirmed successfully');
    } catch (error) {
      toast.error('Failed to confirm shipment');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ready':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const shippingMethods = [
    'Standard',
    'Express',
    'Overnight',
    'Economy'
  ];

  const carriers = [
    'FastShip Express',
    'QuickDelivery Co',
    'Reliable Transport',
    'Express Logistics'
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Total in Queue</div>
          <div className="text-2xl font-bold text-gray-900">{dispatchQueue.length}</div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Ready to Ship</div>
          <div className="text-2xl font-bold text-blue-600">
            {dispatchQueue.filter(item => item.status === 'ready').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Shipped</div>
          <div className="text-2xl font-bold text-green-600">
            {dispatchQueue.filter(item => item.status === 'shipped').length}
          </div>
        </div>
      </div>

      {/* Dispatch Queue */}
      <div className="space-y-4">
        {dispatchQueue.map((dispatch) => (
          <div key={dispatch.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(dispatch.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{dispatch.id}</h3>
                    <span className={`text-xs font-medium uppercase ${getPriorityColor(dispatch.priority)}`}>
                      {dispatch.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Order: {dispatch.orderId} • Pick List: {dispatch.pickListId}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(dispatch.status)}`}>
                {dispatch.status}
              </span>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Customer:</span>
                <p className="mt-1 text-sm text-gray-900">{dispatch.customerName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Shipping Address:</span>
                <p className="mt-1 text-sm text-gray-900">{dispatch.customerAddress}</p>
              </div>
            </div>

            {/* Dates and Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Packaged:</span>
                <p className="text-sm text-gray-900">{dispatch.packagedDate}</p>
              </div>
              {dispatch.shippedDate && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Shipped:</span>
                  <p className="text-sm text-gray-900">{dispatch.shippedDate}</p>
                </div>
              )}
              {dispatch.shippingMethod && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Method:</span>
                  <p className="text-sm text-gray-900">{dispatch.shippingMethod}</p>
                </div>
              )}
              {dispatch.trackingNumber && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Tracking:</span>
                  <p className="text-sm font-mono text-blue-600">{dispatch.trackingNumber}</p>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Items</h4>
              <div className="space-y-2">
                {dispatch.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="ml-2 text-sm text-gray-500">{item.sku}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            {dispatch.status === 'ready' && (
              <div className="border-t pt-4 flex justify-end">
                <button
                  onClick={() => handleStartShipping(dispatch)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <TruckIcon className="h-4 w-4" />
                  <span>Ship Order</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Shipping Modal */}
      {shippingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Confirm Shipment - {shippingItem.id}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Customer:</span>
                  <p className="text-sm text-gray-900">{shippingItem.customerName}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipping Method
                  </label>
                  <select
                    className="input"
                    value={shippingDetails.shippingMethod}
                    onChange={(e) => setShippingDetails(prev => ({
                      ...prev,
                      shippingMethod: e.target.value
                    }))}
                  >
                    {shippingMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carrier
                  </label>
                  <select
                    className="input"
                    value={shippingDetails.carrier}
                    onChange={(e) => setShippingDetails(prev => ({
                      ...prev,
                      carrier: e.target.value
                    }))}
                  >
                    {carriers.map(carrier => (
                      <option key={carrier} value={carrier}>{carrier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tracking Number *
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={shippingDetails.trackingNumber}
                    onChange={(e) => setShippingDetails(prev => ({
                      ...prev,
                      trackingNumber: e.target.value
                    }))}
                    placeholder="Enter tracking number"
                    required
                  />
                </div>

                {/* Items Summary */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Items being shipped:</h4>
                  <div className="space-y-1">
                    {shippingItem.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShippingItem(null);
                    setShippingDetails({ shippingMethod: '', trackingNumber: '', carrier: '' });
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmShipment}
                  className="btn btn-primary"
                >
                  Confirm Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {dispatchQueue.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No items in dispatch queue</h3>
          <p className="mt-1 text-sm text-gray-500">
            Items will appear here after they have been picked and packaged.
          </p>
        </div>
      )}
    </div>
  );
}

export default DispatchQueue;
