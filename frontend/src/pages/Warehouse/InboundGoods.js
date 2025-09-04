import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useInventory } from '../../context/InventoryContext';

// Individual Inbound Goods Row Component with expand functionality
function InboundGoodsRow({ inbound, onReceive }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'expected':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'received':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'expected': return 'bg-blue-100 text-blue-800';
      case 'received': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="table-cell">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
            <div>
              <div className="font-medium text-primary-600">{inbound.id}</div>
            </div>
          </div>
        </td>
        <td className="table-cell">
          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
            {inbound.purchaseOrder}
          </span>
        </td>
        <td className="table-cell">
          <div className="font-medium text-gray-900">{inbound.supplier}</div>
        </td>
        <td className="table-cell text-center">
          <div className="flex items-center justify-center space-x-2">
            {getStatusIcon(inbound.status)}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(inbound.status)}`}>
              {inbound.status}
            </span>
          </div>
        </td>
        <td className="table-cell text-center">
          <div className={`${inbound.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
            {inbound.expectedDate}
          </div>
          {inbound.receivedDate && (
            <div className="text-xs text-green-600 mt-1">
              Received: {inbound.receivedDate}
            </div>
          )}
        </td>
        <td className="table-cell text-center">
          <div className="text-sm font-medium text-gray-900">
            {inbound.items.length} item{inbound.items.length !== 1 ? 's' : ''}
          </div>
        </td>
        <td className="table-cell text-center">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600"
              title="View Details"
            >
              <EyeIcon className="h-5 w-5" />
            </button>
            {inbound.status !== 'received' && (
              <button
                onClick={() => onReceive(inbound)}
                className="btn btn-primary text-xs py-1 px-3"
              >
                Receive
              </button>
            )}
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan="7" className="px-6 py-4">
            <div className="space-y-4">
              {/* Shipment Details */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Shipment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-semibold text-blue-600">{inbound.purchaseOrder}</div>
                    <div className="text-xs text-blue-700">Purchase Order</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-600">{inbound.supplier}</div>
                    <div className="text-xs text-purple-700">Supplier</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className={`text-lg font-semibold ${inbound.status === 'overdue' ? 'text-red-600' : 'text-emerald-600'}`}>
                      {inbound.expectedDate}
                    </div>
                    <div className="text-xs text-emerald-700">Expected Date</div>
                  </div>
                </div>
              </div>

              {/* Items Details */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Items in Shipment
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">SKU</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Expected Qty</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Received Qty</th>
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {inbound.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            {item.warehouse && (
                              <div className="text-xs text-gray-500 mt-1">
                                Destination: {item.warehouse}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                              {item.sku}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center font-medium text-gray-900">
                            {item.expectedQuantity.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {inbound.status === 'received' ? (
                              <span className="font-medium text-green-600">
                                {item.receivedQuantity.toLocaleString()}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {inbound.status === 'received' ? (
                              item.receivedQuantity === item.expectedQuantity ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Complete
                                </span>
                              ) : item.receivedQuantity > 0 ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Partial
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Missing
                                </span>
                              )
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
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

function InboundGoods() {
  const { inboundGoods, loading, updateInventoryFromReceipt } = useInventory();
  const [receivingItem, setReceivingItem] = useState(null);
  const [receiveQuantities, setReceiveQuantities] = useState({});


  const handleStartReceiving = (inbound) => {
    setReceivingItem(inbound);
    const quantities = {};
    inbound.items.forEach(item => {
      quantities[item.sku] = item.expectedQuantity;
    });
    setReceiveQuantities(quantities);
  };

  const handleReceiveGoods = async () => {
    try {
      const items = receivingItem.items.map(item => ({
        sku: item.sku,
        receivedQuantity: receiveQuantities[item.sku] || 0,
        warehouse: item.warehouse || 'Main Warehouse' // Default warehouse if not specified
      }));

      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update inventory levels through context
      updateInventoryFromReceipt(receivingItem.id, items);
      
      setReceivingItem(null);
      setReceiveQuantities({});
      toast.success(`Goods received successfully! Stock levels have been updated.`);
    } catch (error) {
      toast.error('Failed to receive goods');
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
          <div className="text-sm font-medium text-gray-500">Total Inbound</div>
          <div className="text-2xl font-bold text-gray-900">{inboundGoods.length}</div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Expected</div>
          <div className="text-2xl font-bold text-blue-600">
            {inboundGoods.filter(item => item.status === 'expected').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Overdue</div>
          <div className="text-2xl font-bold text-red-600">
            {inboundGoods.filter(item => item.status === 'overdue').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Received</div>
          <div className="text-2xl font-bold text-green-600">
            {inboundGoods.filter(item => item.status === 'received').length}
          </div>
        </div>
      </div>

      {/* Inbound Goods Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Inbound Goods Management</h2>
          <p className="text-sm text-gray-600">Track and receive incoming inventory shipments</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Inbound ID</th>
                <th className="table-header">Purchase Order</th>
                <th className="table-header">Supplier</th>
                <th className="table-header text-center">Status</th>
                <th className="table-header text-center">Expected Date</th>
                <th className="table-header text-center">Items</th>
                <th className="table-header text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inboundGoods.map((inbound) => (
                <InboundGoodsRow key={inbound.id} inbound={inbound} onReceive={handleStartReceiving} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receive Goods Modal */}
      {receivingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Receive Goods - {receivingItem.id}
              </h2>
              
              <div className="space-y-4">
                {receivingItem.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.sku}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Expected: {item.expectedQuantity.toLocaleString()}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Received Quantity
                      </label>
                      <input
                        type="number"
                        className="input"
                        value={receiveQuantities[item.sku] || ''}
                        onChange={(e) => setReceiveQuantities(prev => ({
                          ...prev,
                          [item.sku]: parseInt(e.target.value) || 0
                        }))}
                        min="0"
                        max={item.expectedQuantity}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setReceivingItem(null);
                    setReceiveQuantities({});
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReceiveGoods}
                  className="btn btn-primary"
                >
                  Confirm Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InboundGoods;
