import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  InboxArrowDownIcon, 
  ListBulletIcon, 
  TruckIcon,
  CubeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import InboundGoods from './InboundGoods';
import PickLists from './PickLists';
import DispatchQueue from './DispatchQueue';
import ItemStock from './ItemStock';
import WarehouseProductManagement from './WarehouseProductManagement';

const warehouseNavItems = [
  { name: 'Inbound Goods', path: '/warehouse', icon: InboxArrowDownIcon },
  { name: 'Pick Lists', path: '/warehouse/picklists', icon: ListBulletIcon },
  { name: 'Dispatch Queue', path: '/warehouse/dispatch', icon: TruckIcon },
  { name: 'Items & Stock', path: '/warehouse/items', icon: CubeIcon },
  { name: 'Warehouse Product Management', path: '/warehouse/management', icon: ChartBarIcon }
];

function WarehouseDashboard() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Warehouse Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage inbound goods, pick lists, dispatch operations, item stock levels, and warehouse product management</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {warehouseNavItems.map((item) => {
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
        <Route index element={<InboundGoods />} />
        <Route path="picklists" element={<PickLists />} />
        <Route path="dispatch" element={<DispatchQueue />} />
        <Route path="items" element={<ItemStock />} />
        <Route path="management" element={<WarehouseProductManagement />} />
      </Routes>
    </div>
  );
}

export default WarehouseDashboard;
