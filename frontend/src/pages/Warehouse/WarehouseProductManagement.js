import React, { useState, useEffect } from 'react';
import { 
  CubeIcon, 
  BuildingStorefrontIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import { useInventory } from '../../context/InventoryContext';

function WarehouseProductManagement() {
  const { inventory, loading } = useInventory();
  const [warehouseSummary, setWarehouseSummary] = useState({});

  useEffect(() => {
    if (inventory.length > 0) {
      // Calculate summary by warehouse
      const summary = {};
      
      inventory.forEach(product => {
        product.warehouses.forEach(warehouse => {
          if (!summary[warehouse.name]) {
            summary[warehouse.name] = {
              name: warehouse.name,
              totalItems: 0,
              totalStock: 0,
              totalReserved: 0,
              totalAvailable: 0,
              totalDispatched: 0, // Mock dispatched data
              products: []
            };
          }
          
          summary[warehouse.name].totalItems += 1;
          summary[warehouse.name].totalStock += warehouse.stock;
          summary[warehouse.name].totalReserved += warehouse.reserved;
          summary[warehouse.name].totalAvailable += warehouse.available;
          summary[warehouse.name].totalDispatched += Math.floor(Math.random() * 20); // Mock dispatched
          
          summary[warehouse.name].products.push({
            ...product,
            warehouseStock: warehouse.stock,
            warehouseReserved: warehouse.reserved,
            warehouseAvailable: warehouse.available,
            warehouseLocation: warehouse.location
          });
        });
      });
      
      setWarehouseSummary(summary);
    }
  }, [inventory]);

  const getStockStatusColor = (available, reorder) => {
    if (available <= 0) return 'text-red-600 bg-red-100';
    if (available <= reorder) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading warehouse data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Warehouse Product Management</h2>
        <p className="mt-1 text-gray-600">Stock summary and management at warehouse level</p>
      </div>

      {/* Overall Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BuildingStorefrontIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Warehouses</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.keys(warehouseSummary).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CubeIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Stock</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(warehouseSummary).reduce((sum, warehouse) => sum + warehouse.totalStock, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClipboardDocumentListIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Reserved</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(warehouseSummary).reduce((sum, warehouse) => sum + warehouse.totalReserved, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Available</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.values(warehouseSummary).reduce((sum, warehouse) => sum + warehouse.totalAvailable, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warehouse Summary */}
      <div className="space-y-6">
        {Object.values(warehouseSummary).map(warehouse => (
          <div key={warehouse.name} className="bg-white rounded-lg shadow">
            {/* Warehouse Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                  <p className="text-sm text-gray-600">{warehouse.totalItems} unique products</p>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Stock</p>
                    <p className="text-xl font-semibold text-gray-900">{warehouse.totalStock}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Available</p>
                    <p className="text-xl font-semibold text-green-600">{warehouse.totalAvailable}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reserved</p>
                    <p className="text-xl font-semibold text-yellow-600">{warehouse.totalReserved}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dispatched</p>
                    <p className="text-xl font-semibold text-blue-600">{warehouse.totalDispatched}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reserved
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {warehouse.products.map(product => (
                    <tr key={`${warehouse.name}-${product.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.sku}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.warehouseLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.warehouseStock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {product.warehouseAvailable}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-600">
                        {product.warehouseReserved}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getStockStatusColor(product.warehouseAvailable, product.reorderLevel)
                        }`}>
                          {product.warehouseAvailable <= 0 ? 'Out of Stock' : 
                           product.warehouseAvailable <= product.reorderLevel ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${(product.warehouseAvailable * product.unitPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Warehouse Footer Summary */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  Total warehouse value: 
                  <span className="font-semibold text-gray-900 ml-1">
                    ${warehouse.products.reduce((sum, product) => 
                      sum + (product.warehouseAvailable * product.unitPrice), 0
                    ).toFixed(2)}
                  </span>
                </span>
                <div className="flex space-x-4 text-xs">
                  <span className="text-green-600">
                    ● Available: {warehouse.totalAvailable}
                  </span>
                  <span className="text-yellow-600">
                    ● Reserved: {warehouse.totalReserved}
                  </span>
                  <span className="text-blue-600">
                    ● Dispatched: {warehouse.totalDispatched}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WarehouseProductManagement;
