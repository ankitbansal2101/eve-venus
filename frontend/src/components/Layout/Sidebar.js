import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChartBarIcon, 
  ShoppingCartIcon, 
  BuildingStorefrontIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const personas = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: ChartBarIcon,
    path: '/dashboard',
    description: 'Overview & Analytics'
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: ShoppingCartIcon,
    path: '/sales',
    description: 'Quotations & Orders'
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    icon: BuildingStorefrontIcon,
    path: '/warehouse',
    description: 'Inventory & Dispatch'
  },
  {
    id: 'customer',
    name: 'Customer Portal',
    icon: UserGroupIcon,
    path: '/customer',
    description: 'Order Tracking'
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: DocumentChartBarIcon,
    path: '/reports',
    description: 'Analytics & Reports'
  }
];

function Sidebar({ currentPersona, onPersonaChange, user }) {
  const location = useLocation();

  const handlePersonaClick = (persona) => {
    onPersonaChange(persona.id);
  };

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-6 bg-primary-600">
        <h1 className="text-2xl font-bold text-white">VENUS</h1>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-2">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isActive = location.pathname.startsWith(persona.path) || 
                           (persona.path === '/dashboard' && location.pathname === '/');
            
            return (
              <Link
                key={persona.id}
                to={persona.path}
                onClick={() => handlePersonaClick(persona)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                <div>
                  <div>{persona.name}</div>
                  <div className="text-xs text-gray-500">{persona.description}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Settings */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button className="group flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900">
          <CogIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
          Settings
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
