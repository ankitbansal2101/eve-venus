import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function PickLists() {
  const [pickLists, setPickLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePickList, setActivePickList] = useState(null);
  const [pickQuantities, setPickQuantities] = useState({});

  useEffect(() => {
    fetchPickLists();
  }, []);

  const fetchPickLists = async () => {
    try {
      // Mock data - replace with actual API call
      setPickLists([
        {
          id: 'PL-001',
          orderId: 'ORD-001',
          status: 'pending',
          priority: 'high',
          createdDate: '2024-01-15',
          assignedTo: 'Warehouse Team A',
          customerName: 'ABC Manufacturing',
          items: [
            { 
              sku: 'VEN-001', 
              name: 'Steel Bolt M10', 
              quantity: 100, 
              location: 'WH-A-001',
              picked: false,
              pickedQuantity: 0
            },
            { 
              sku: 'VEN-002', 
              name: 'Aluminum Sheet 1mm', 
              quantity: 5, 
              location: 'WH-B-012',
              picked: false,
              pickedQuantity: 0
            }
          ]
        },
        {
          id: 'PL-002',
          orderId: 'ORD-002',
          status: 'completed',
          priority: 'medium',
          createdDate: '2024-01-10',
          completedDate: '2024-01-12',
          assignedTo: 'Warehouse Team B',
          customerName: 'XYZ Industries',
          items: [
            { 
              sku: 'VEN-003', 
              name: 'Motor Assembly 3HP', 
              quantity: 2, 
              location: 'WH-C-005',
              picked: true,
              pickedQuantity: 2
            }
          ]
        },
        {
          id: 'PL-003',
          orderId: 'ORD-004',
          status: 'in_progress',
          priority: 'high',
          createdDate: '2024-01-16',
          assignedTo: 'Warehouse Team A',
          customerName: 'DEF Corporation',
          items: [
            { 
              sku: 'VEN-001', 
              name: 'Steel Bolt M10', 
              quantity: 50, 
              location: 'WH-A-001',
              picked: true,
              pickedQuantity: 50
            },
            { 
              sku: 'VEN-003', 
              name: 'Motor Assembly 3HP', 
              quantity: 1, 
              location: 'WH-C-005',
              picked: false,
              pickedQuantity: 0
            }
          ]
        }
      ]);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch pick lists');
      setLoading(false);
    }
  };

  const handleStartPicking = (pickList) => {
    setActivePickList(pickList);
    const quantities = {};
    pickList.items.forEach(item => {
      quantities[item.sku] = item.pickedQuantity;
    });
    setPickQuantities(quantities);
  };

  const handleUpdatePick = async () => {
    try {
      const items = activePickList.items.map(item => ({
        sku: item.sku,
        picked: (pickQuantities[item.sku] || 0) === item.quantity,
        pickedQuantity: pickQuantities[item.sku] || 0
      }));

      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const allPicked = items.every(item => item.picked);
      
      setPickLists(prev => prev.map(pl => 
        pl.id === activePickList.id 
          ? {
              ...pl,
              status: allPicked ? 'completed' : 'in_progress',
              completedDate: allPicked ? new Date().toISOString().split('T')[0] : undefined,
              items: pl.items.map(item => ({
                ...item,
                picked: items.find(i => i.sku === item.sku)?.picked || false,
                pickedQuantity: items.find(i => i.sku === item.sku)?.pickedQuantity || 0
              }))
            }
          : pl
      ));
      
      setActivePickList(null);
      setPickQuantities({});
      toast.success('Pick list updated successfully');
    } catch (error) {
      toast.error('Failed to update pick list');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <div className="text-sm font-medium text-gray-500">Total Pick Lists</div>
          <div className="text-2xl font-bold text-gray-900">{pickLists.length}</div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {pickLists.filter(pl => pl.status === 'pending').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">In Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {pickLists.filter(pl => pl.status === 'in_progress').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {pickLists.filter(pl => pl.status === 'completed').length}
          </div>
        </div>
      </div>

      {/* Pick Lists Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Pick List Management</h2>
          <p className="text-sm text-gray-600">Manage order picking and fulfillment workflows</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Pick List ID</th>
                <th className="table-header">Order Details</th>
                <th className="table-header text-center">Priority</th>
                <th className="table-header text-center">Status</th>
                <th className="table-header text-center">Progress</th>
                <th className="table-header text-center">Assigned To</th>
                <th className="table-header text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pickLists.map((pickList) => {
                const completedItems = pickList.items.filter(item => item.picked).length;
                const totalItems = pickList.items.length;
                const progressPercentage = Math.round((completedItems / totalItems) * 100);
                
                return (
                  <tr key={pickList.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(pickList.status)}
                        <div className="font-medium text-primary-600">{pickList.id}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div>
                        <div className="font-medium text-gray-900">Order: {pickList.orderId}</div>
                        <div className="text-sm text-gray-500">{pickList.customerName}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Created: {pickList.createdDate}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pickList.priority === 'high' ? 'bg-red-100 text-red-800' :
                        pickList.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {pickList.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="table-cell text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(pickList.status)}`}>
                        {pickList.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="table-cell text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              progressPercentage === 100 ? 'bg-green-500' :
                              progressPercentage > 0 ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {completedItems}/{totalItems}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <div className="text-sm text-gray-900">{pickList.assignedTo}</div>
                    </td>
                    <td className="table-cell text-center">
                      {pickList.status !== 'completed' && (
                        <button
                          onClick={() => handleStartPicking(pickList)}
                          className="btn btn-primary text-xs py-1 px-3"
                        >
                          {pickList.status === 'pending' ? 'Start' : 'Update'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Picking Modal */}
      {activePickList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Pick Items - {activePickList.id}
              </h2>
              
              <div className="space-y-4">
                {activePickList.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.sku}</p>
                        <p className="text-sm text-gray-500">Location: {item.location}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Required: {item.quantity}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Picked Quantity
                      </label>
                      <input
                        type="number"
                        className="input"
                        value={pickQuantities[item.sku] || ''}
                        onChange={(e) => setPickQuantities(prev => ({
                          ...prev,
                          [item.sku]: parseInt(e.target.value) || 0
                        }))}
                        min="0"
                        max={item.quantity}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setActivePickList(null);
                    setPickQuantities({});
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePick}
                  className="btn btn-primary"
                >
                  Update Pick List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PickLists;
