import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useInventory } from '../../context/InventoryContext';

// Individual Item Row Component with expand functionality
function ItemStockRow({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStockStatus = (item) => {
    const totalAvailable = item.warehouses.reduce((sum, wh) => sum + wh.available, 0);
    
    if (totalAvailable === 0) return 'out_of_stock';
    if (totalAvailable <= item.reorderLevel) return 'low_stock';
    return 'in_stock';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'low_stock':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'out_of_stock':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <CubeIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const status = getStockStatus(item);
  const totalStock = item.warehouses.reduce((sum, wh) => sum + wh.stock, 0);
  const totalReserved = item.warehouses.reduce((sum, wh) => sum + wh.reserved, 0);
  const totalAvailable = item.warehouses.reduce((sum, wh) => sum + wh.available, 0);

  return (
    <>
      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <td className="table-cell">
          <div className="flex items-center justify-center">
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </td>
        <td className="table-cell">
          <div className="flex items-center space-x-3">
            {getStatusIcon(status)}
            <div>
              <div className="font-medium text-gray-900">{item.name}</div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">SKU:</span> {item.sku} 
                <span className="ml-3 font-medium">Category:</span> {item.category}
              </div>
              <div className="text-xs text-gray-600 mt-1">{item.description}</div>
            </div>
          </div>
        </td>
        <td className="table-cell text-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(status)}`}>
            {status.replace('_', ' ')}
          </span>
        </td>
        <td className="table-cell text-center font-medium">
          {totalStock.toLocaleString()}
        </td>
        <td className="table-cell text-center text-gray-600">
          {totalReserved.toLocaleString()}
        </td>
        <td className={`table-cell text-center font-medium ${
          status === 'out_of_stock' ? 'text-red-600' : 
          status === 'low_stock' ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {totalAvailable.toLocaleString()}
        </td>
        <td className="table-cell text-center font-medium">
          {formatCurrency(item.unitPrice)}
        </td>
        <td className="table-cell text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-gray-400 hover:text-gray-600"
            title={isExpanded ? 'Collapse Details' : 'View Details'}
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        </td>
      </tr>
      
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan="8" className="px-6 py-4">
            <div className="space-y-4">
              {/* Item Details */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CubeIcon className="h-5 w-5 text-primary-600 mr-2" />
                  Product Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">{item.reorderLevel.toLocaleString()}</div>
                    <div className="text-xs text-blue-700">Reorder Level</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-600">{formatCurrency(item.unitPrice)}</div>
                    <div className="text-xs text-purple-700">Unit Price</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-lg font-semibold text-indigo-600">{formatCurrency(totalAvailable * item.unitPrice)}</div>
                    <div className="text-xs text-indigo-700">Available Value</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-lg font-semibold text-emerald-600">{item.warehouses.length}</div>
                    <div className="text-xs text-emerald-700">Warehouse{item.warehouses.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              </div>

              {/* Warehouse Breakdown */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Warehouse Distribution
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Location Code</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Reserved</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Available</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Value</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {item.warehouses.map((warehouse, index) => {
                        const warehousePercentage = ((warehouse.available / totalAvailable) * 100) || 0;
                        const warehouseValue = warehouse.available * item.unitPrice;
                        const warehouseStatus = warehouse.available === 0 ? 'empty' : 
                                              warehouse.available <= (item.reorderLevel / item.warehouses.length) ? 'low' : 'good';
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900">{warehouse.name}</div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                {warehouse.location}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-gray-900">
                              {warehouse.stock.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600">
                              {warehouse.reserved.toLocaleString()}
                            </td>
                            <td className={`px-4 py-3 text-center font-medium ${
                              warehouseStatus === 'empty' ? 'text-red-600' :
                              warehouseStatus === 'low' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {warehouse.available.toLocaleString()}
                              {totalAvailable > 0 && (
                                <div className="text-xs text-gray-500">
                                  {warehousePercentage.toFixed(1)}%
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center font-medium text-gray-900">
                              {formatCurrency(warehouseValue)}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                warehouseStatus === 'empty' ? 'bg-red-100 text-red-800' :
                                warehouseStatus === 'low' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-green-100 text-green-800'
                              }`}>
                                {warehouseStatus === 'empty' ? 'Empty' : 
                                 warehouseStatus === 'low' ? 'Low' : 'Good'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function ItemStock() {
  const { inventory, loading } = useInventory();
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Update filtered items when inventory or filters change
  useEffect(() => {
    if (!inventory) return;
    setFilteredItems(inventory);
  }, [inventory]);

  useEffect(() => {
    if (!inventory) return;
    
    let filtered = inventory;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category.toLowerCase() === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => {
        const totalStock = item.warehouses.reduce((sum, wh) => sum + wh.stock, 0);
        const totalAvailable = item.warehouses.reduce((sum, wh) => sum + wh.available, 0);
        
        switch (statusFilter) {
          case 'in_stock':
            return totalAvailable > item.reorderLevel;
          case 'low_stock':
            return totalAvailable > 0 && totalAvailable <= item.reorderLevel;
          case 'out_of_stock':
            return totalAvailable === 0;
          default:
            return true;
        }
      });
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, categoryFilter, statusFilter, inventory]);


  const getStockStatus = (item) => {
    const totalAvailable = item.warehouses.reduce((sum, wh) => sum + wh.available, 0);
    
    if (totalAvailable === 0) return 'out_of_stock';
    if (totalAvailable <= item.reorderLevel) return 'low_stock';
    return 'in_stock';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'low_stock':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'out_of_stock':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <CubeIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const categories = [...new Set(inventory?.map(item => item.category) || [])];

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
          <div className="text-sm font-medium text-gray-500">Total Items</div>
          <div className="text-2xl font-bold text-gray-900">{inventory?.length || 0}</div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">In Stock</div>
          <div className="text-2xl font-bold text-green-600">
            {inventory?.filter(item => getStockStatus(item) === 'in_stock').length || 0}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Low Stock</div>
          <div className="text-2xl font-bold text-yellow-600">
            {inventory?.filter(item => getStockStatus(item) === 'low_stock').length || 0}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Out of Stock</div>
          <div className="text-2xl font-bold text-red-600">
            {inventory?.filter(item => getStockStatus(item) === 'out_of_stock').length || 0}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items by SKU, name, or category..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-4 w-4 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Product Inventory</h2>
          <p className="text-sm text-gray-600">Complete stock overview across all warehouses</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header w-16"></th>
                <th className="table-header">Product Details</th>
                <th className="table-header text-center">Status</th>
                <th className="table-header text-center">Total Stock</th>
                <th className="table-header text-center">Reserved</th>
                <th className="table-header text-center">Available</th>
                <th className="table-header text-center">Unit Price</th>
                <th className="table-header text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <ItemStockRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemStock;
