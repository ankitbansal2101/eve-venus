import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  DocumentTextIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import MyOrders from './MyOrders';
import TrackOrder from './TrackOrder';
import MyQuotations from './MyQuotations';

const customerNavItems = [
  { name: 'My Orders', path: '/customer', icon: ShoppingBagIcon },
  { name: 'Track Order', path: '/customer/track', icon: ClockIcon },
  { name: 'My Quotations', path: '/customer/quotations', icon: DocumentTextIcon }
];

function CustomerPortal() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Portal</h1>
        <p className="mt-2 text-gray-600">Track your orders, manage quotations, and view order history</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {customerNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  isActive
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <Routes>
        <Route index element={<MyOrders />} />
        <Route path="track" element={<TrackOrder />} />
        <Route path="quotations" element={<MyQuotations />} />
      </Routes>
    </div>
  );
}

export default CustomerPortal;
