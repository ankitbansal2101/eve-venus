import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  CubeIcon, 
  ShoppingBagIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import QuotationsList from './QuotationsList';
import CreateQuotation from './CreateQuotation';
import OrdersList from './OrdersList';
import StockCheck from './StockCheck';

const salesNavItems = [
  { name: 'Quotations', path: '/sales', icon: DocumentTextIcon },
  { name: 'Orders', path: '/sales/orders', icon: ShoppingBagIcon },
  { name: 'Stock Check', path: '/sales/stock', icon: CubeIcon }
];

function SalesDashboard() {
  const location = useLocation();
  const [showCreateQuotation, setShowCreateQuotation] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage quotations, orders, and check stock availability</p>
        </div>
        <button
          onClick={() => setShowCreateQuotation(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Quotation</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {salesNavItems.map((item) => {
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
        <Route index element={<QuotationsList />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="stock" element={<StockCheck />} />
      </Routes>

      {/* Create Quotation Modal */}
      {showCreateQuotation && (
        <CreateQuotation 
          isOpen={showCreateQuotation}
          onClose={() => setShowCreateQuotation(false)}
        />
      )}
    </div>
  );
}

export default SalesDashboard;
