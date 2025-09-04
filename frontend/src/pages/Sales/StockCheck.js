import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function StockCheck() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reserveQuantities, setReserveQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    const filtered = inventory.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchTerm, inventory]);

  const fetchInventory = async () => {
    try {
      // Mock data - replace with actual API call
      const mockInventory = [
        { 
          id: 1, 
          sku: 'VEN-001', 
          name: 'Steel Bolt M10', 
          category: 'Fasteners',
          stock: 1500, 
          reserved: 200, 
          available: 1300,
          location: 'WH-A-001',
          warehouse: 'Main Warehouse',
          reorderLevel: 500,
          unitPrice: 2.50
        },
        { 
          id: 2, 
          sku: 'VEN-002', 
          name: 'Aluminum Sheet 1mm', 
          category: 'Raw Materials',
          stock: 85, 
          reserved: 15, 
          available: 70,
          location: 'WH-B-012',
          warehouse: 'Main Warehouse',
          reorderLevel: 20,
          unitPrice: 45.00
        },
        { 
          id: 3, 
          sku: 'VEN-003', 
          name: 'Motor Assembly 3HP', 
          category: 'Components',
          stock: 25, 
          reserved: 5, 
          available: 20,
          location: 'WH-C-005',
          warehouse: 'Component Warehouse',
          reorderLevel: 10,
          unitPrice: 275.00
        }
      ];
      setInventory(mockInventory);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch inventory');
      setLoading(false);
    }
  };

  const handleReserveStock = async (itemId) => {
    const quantity = reserveQuantities[itemId];
    if (!quantity || quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    const item = inventory.find(i => i.id === itemId);
    if (quantity > item.available) {
      toast.error('Not enough stock available');
      return;
    }

    try {
      // Mock API call - replace with actual API call
      setInventory(prev => prev.map(i => 
        i.id === itemId 
          ? { 
              ...i, 
              reserved: i.reserved + parseInt(quantity),
              available: i.available - parseInt(quantity)
            }
          : i
      ));
      
      setReserveQuantities(prev => ({ ...prev, [itemId]: '' }));
      toast.success(`Reserved ${quantity} units of ${item.name}`);
    } catch (error) {
      toast.error('Failed to reserve stock');
    }
  };

  const getStockStatusColor = (item) => {
    if (item.available <= 0) return 'text-red-600';
    if (item.available <= item.reorderLevel) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStockStatusIcon = (item) => {
    if (item.available <= 0) return <XCircleIcon className="h-5 w-5 text-red-500" />;
    if (item.available <= item.reorderLevel) return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
    return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
  };

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
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by SKU, name, or category..."
          className="input pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Stock Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <div key={item.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.sku} • {item.category}</p>
              </div>
              {getStockStatusIcon(item)}
            </div>

            {/* Stock Information */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Stock:</span>
                <span className="font-medium">{item.stock.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reserved:</span>
                <span className="font-medium">{item.reserved.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Available:</span>
                <span className={`font-medium ${getStockStatusColor(item)}`}>
                  {item.available.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Unit Price:</span>
                <span className="font-medium">{formatCurrency(item.unitPrice)}</span>
              </div>
            </div>

            {/* Location */}
            <div className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Location:</span> {item.location} ({item.warehouse})
            </div>

            {/* Reserve Stock Section */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reserve Stock
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input flex-1"
                  min="1"
                  max={item.available}
                  value={reserveQuantities[item.id] || ''}
                  onChange={(e) => setReserveQuantities(prev => ({
                    ...prev,
                    [item.id]: e.target.value
                  }))}
                />
                <button
                  onClick={() => handleReserveStock(item.id)}
                  className="btn btn-primary px-4"
                  disabled={item.available <= 0}
                >
                  Reserve
                </button>
              </div>
              {item.available <= 0 && (
                <p className="text-xs text-red-600 mt-1">Out of stock</p>
              )}
              {item.available > 0 && item.available <= item.reorderLevel && (
                <p className="text-xs text-yellow-600 mt-1">Low stock - reorder soon</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredInventory.length === 0 && (
        <div className="text-center py-12">
          <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search terms.
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Total Items</div>
          <div className="text-2xl font-bold text-gray-900">{inventory.length}</div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">In Stock</div>
          <div className="text-2xl font-bold text-green-600">
            {inventory.filter(item => item.available > item.reorderLevel).length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Low Stock</div>
          <div className="text-2xl font-bold text-yellow-600">
            {inventory.filter(item => item.available > 0 && item.available <= item.reorderLevel).length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Out of Stock</div>
          <div className="text-2xl font-bold text-red-600">
            {inventory.filter(item => item.available <= 0).length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockCheck;
