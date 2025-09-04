import React, { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function CreateQuotation({ isOpen, onClose }) {
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    items: [{ sku: '', name: '', quantity: 1, unitPrice: 0, totalPrice: 0 }],
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCustomers();
      fetchInventory();
    }
  }, [isOpen]);

  const fetchCustomers = async () => {
    // Mock data - replace with actual API call
    setCustomers([
      { id: 'CUST-001', name: 'ABC Manufacturing' },
      { id: 'CUST-002', name: 'XYZ Industries' },
      { id: 'CUST-003', name: 'DEF Corporation' }
    ]);
  };

  const fetchInventory = async () => {
    // Mock data - replace with actual API call
    setInventory([
      { sku: 'VEN-001', name: 'Steel Bolt M10', unitPrice: 2.50 },
      { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', unitPrice: 45.00 },
      { sku: 'VEN-003', name: 'Motor Assembly 3HP', unitPrice: 275.00 }
    ]);
  };

  const handleCustomerChange = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    setFormData(prev => ({
      ...prev,
      customerId,
      customerName: customer ? customer.name : ''
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    if (field === 'sku') {
      const inventoryItem = inventory.find(item => item.sku === value);
      if (inventoryItem) {
        newItems[index].name = inventoryItem.name;
        newItems[index].unitPrice = inventoryItem.unitPrice;
      }
    }
    
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].totalPrice = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { sku: '', name: '', quantity: 1, unitPrice: 0, totalPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerId) {
      toast.error('Please select a customer');
      return;
    }
    
    if (formData.items.some(item => !item.sku || item.quantity <= 0)) {
      toast.error('Please fill in all item details');
      return;
    }
    
    setLoading(true);
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Quotation created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create quotation');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Quotation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer *
              </label>
              <select
                className="input"
                value={formData.customerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
                required
              >
                <option value="">Select a customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <input
                type="text"
                className="input"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Optional notes"
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU *
                      </label>
                      <select
                        className="input"
                        value={item.sku}
                        onChange={(e) => handleItemChange(index, 'sku', e.target.value)}
                        required
                      >
                        <option value="">Select item</option>
                        {inventory.map(inventoryItem => (
                          <option key={inventoryItem.sku} value={inventoryItem.sku}>
                            {inventoryItem.sku}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={item.name}
                        readOnly
                        placeholder="Auto-filled"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        className="input"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="input"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={`$${item.totalPrice.toFixed(2)}`}
                        readOnly
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="btn btn-secondary p-2"
                        disabled={formData.items.length === 1}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t pt-6">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Quotation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuotation;
