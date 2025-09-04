import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function TrackOrder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter an order ID or tracking number');
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock tracking data
      const mockTrackingData = {
        'ORD-002': {
          orderId: 'ORD-002',
          trackingNumber: 'TRK-XYZ-789',
          status: 'shipped',
          customerName: 'ABC Manufacturing',
          shippingAddress: '456 Factory Blvd, Industrial Park, IP 67890',
          orderDate: '2024-01-10',
          shippedDate: '2024-01-14',
          expectedDelivery: '2024-01-18',
          carrier: 'FastShip Express',
          shippingMethod: 'Express',
          items: [
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 2 }
          ],
          trackingHistory: [
            {
              status: 'Order Placed',
              description: 'Your order has been placed and confirmed',
              date: '2024-01-10',
              time: '09:30 AM',
              completed: true
            },
            {
              status: 'Processing',
              description: 'Your order is being prepared for shipment',
              date: '2024-01-12',
              time: '02:15 PM',
              completed: true
            },
            {
              status: 'Shipped',
              description: 'Your order has been shipped and is on its way',
              date: '2024-01-14',
              time: '11:45 AM',
              completed: true
            },
            {
              status: 'Out for Delivery',
              description: 'Your order is out for delivery',
              date: '2024-01-18',
              time: '08:30 AM',
              completed: false,
              estimated: true
            },
            {
              status: 'Delivered',
              description: 'Your order has been delivered',
              date: '2024-01-18',
              time: '03:00 PM',
              completed: false,
              estimated: true
            }
          ]
        },
        'TRK-XYZ-789': {
          orderId: 'ORD-002',
          trackingNumber: 'TRK-XYZ-789',
          status: 'shipped',
          customerName: 'ABC Manufacturing',
          shippingAddress: '456 Factory Blvd, Industrial Park, IP 67890',
          orderDate: '2024-01-10',
          shippedDate: '2024-01-14',
          expectedDelivery: '2024-01-18',
          carrier: 'FastShip Express',
          shippingMethod: 'Express',
          items: [
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 2 }
          ],
          trackingHistory: [
            {
              status: 'Order Placed',
              description: 'Your order has been placed and confirmed',
              date: '2024-01-10',
              time: '09:30 AM',
              completed: true
            },
            {
              status: 'Processing',
              description: 'Your order is being prepared for shipment',
              date: '2024-01-12',
              time: '02:15 PM',
              completed: true
            },
            {
              status: 'Shipped',
              description: 'Your order has been shipped and is on its way',
              date: '2024-01-14',
              time: '11:45 AM',
              completed: true
            },
            {
              status: 'Out for Delivery',
              description: 'Your order is out for delivery',
              date: '2024-01-18',
              time: '08:30 AM',
              completed: false,
              estimated: true
            },
            {
              status: 'Delivered',
              description: 'Your order has been delivered',
              date: '2024-01-18',
              time: '03:00 PM',
              completed: false,
              estimated: true
            }
          ]
        }
      };

      const result = mockTrackingData[searchQuery.toUpperCase()];
      
      if (result) {
        setTrackingResult(result);
      } else {
        setTrackingResult(null);
        toast.error('Order not found. Please check your order ID or tracking number.');
      }
    } catch (error) {
      toast.error('Failed to track order');
    } finally {
      setLoading(false);
    }
  };

  const getTrackingStepIcon = (step) => {
    if (step.completed) {
      return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
    } else if (step.status === 'Out for Delivery') {
      return <TruckIcon className="h-6 w-6 text-blue-500" />;
    } else if (step.status === 'Delivered') {
      return <MapPinIcon className="h-6 w-6 text-gray-400" />;
    } else {
      return <ClockIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Track Your Order</h2>
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter Order ID or Tracking Number (e.g., ORD-002 or TRK-XYZ-789)"
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </div>
      </div>

      {/* Tracking Result */}
      {trackingResult && (
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Order {trackingResult.orderId}</h2>
                <p className="text-sm text-gray-500">Tracking: {trackingResult.trackingNumber}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Status</div>
                <div className="text-lg font-semibold text-primary-600 capitalize">
                  {trackingResult.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Carrier:</span> {trackingResult.carrier}</p>
                  <p><span className="font-medium">Method:</span> {trackingResult.shippingMethod}</p>
                  <p><span className="font-medium">Expected Delivery:</span> {trackingResult.expectedDelivery}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Delivery Address</h3>
                <p className="text-sm text-gray-600">{trackingResult.shippingAddress}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Items ({trackingResult.items.length})</h3>
              <div className="space-y-2">
                {trackingResult.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="ml-2 text-sm text-gray-500">{item.sku}</span>
                    </div>
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h2>
            
            <div className="space-y-6">
              {trackingResult.trackingHistory.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getTrackingStepIcon(step)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-medium ${
                          step.completed ? 'text-gray-900' : 
                          step.estimated ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {step.status}
                        </h3>
                        <p className={`text-sm ${
                          step.completed ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      
                      <div className="text-right text-sm text-gray-500">
                        <div>{step.date}</div>
                        <div>{step.time}</div>
                        {step.estimated && (
                          <div className="text-xs text-gray-400">(Estimated)</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline connector */}
                  {index < trackingResult.trackingHistory.length - 1 && (
                    <div className="absolute left-6 mt-8 w-0.5 h-6 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Status Card */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <TruckIcon className="h-8 w-8 text-primary-600" />
              <div>
                <h3 className="font-semibold text-primary-900">
                  Your order is on its way!
                </h3>
                <p className="text-sm text-primary-700">
                  Expected delivery: {trackingResult.expectedDelivery} via {trackingResult.carrier}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample tracking numbers for demo */}
      <div className="card">
        <h3 className="font-medium text-gray-900 mb-3">Sample Tracking</h3>
        <p className="text-sm text-gray-600 mb-3">
          Try these sample order IDs or tracking numbers:
        </p>
        <div className="flex flex-wrap gap-2">
          {['ORD-002', 'TRK-XYZ-789'].map((sample) => (
            <button
              key={sample}
              onClick={() => {
                setSearchQuery(sample);
                setTimeout(handleSearch, 100);
              }}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded font-mono text-gray-700"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
