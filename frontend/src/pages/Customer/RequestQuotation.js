import React, { useState, useEffect } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function RequestQuotation({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [formData, setFormData] = useState({
    customerInfo: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      address: ''
    },
    items: [
      { 
        sku: '', 
        name: '', 
        description: '', 
        quantity: 1, 
        estimatedUnitPrice: 0,
        notes: '' 
      }
    ],
    projectDetails: {
      projectName: '',
      expectedDeliveryDate: '',
      priority: 'medium',
      notes: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      // Mock available items - in real app, fetch from API
      setAvailableItems([
        { sku: 'VEN-001', name: 'Steel Bolt M10', estimatedPrice: 2.50 },
        { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', estimatedPrice: 45.00 },
        { sku: 'VEN-003', name: 'Motor Assembly 3HP', estimatedPrice: 275.00 },
        { sku: 'VEN-004', name: 'Hydraulic Cylinder', estimatedPrice: 185.00 },
        { sku: 'VEN-005', name: 'Stainless Steel Pipe 2"', estimatedPrice: 28.75 }
      ]);

      // Pre-fill customer info (in real app, get from user session)
      setFormData(prev => ({
        ...prev,
        customerInfo: {
          companyName: 'ABC Manufacturing',
          contactName: 'John Doe',
          email: 'john.doe@abcmfg.com',
          phone: '+1-555-0101',
          address: '123 Industrial Ave, Manufacturing City, MC 12345'
        }
      }));
    }
  }, [isOpen]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Auto-fill item details when SKU is selected
    if (field === 'sku') {
      const selectedItem = availableItems.find(item => item.sku === value);
      if (selectedItem) {
        newItems[index].name = selectedItem.name;
        newItems[index].estimatedUnitPrice = selectedItem.estimatedPrice;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { 
        sku: '', 
        name: '', 
        description: '', 
        quantity: 1, 
        estimatedUnitPrice: 0,
        notes: '' 
      }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.customerInfo.companyName || !formData.customerInfo.email) {
      toast.error('Please fill in company name and email');
      return;
    }
    
    if (formData.items.some(item => !item.sku || item.quantity <= 0)) {
      toast.error('Please select items and specify valid quantities');
      return;
    }
    
    setLoading(true);
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate quotation request ID
      const requestId = `QR-${Date.now().toString().slice(-6)}`;
      
      toast.success(`Quotation request ${requestId} submitted successfully! You will receive a response within 24-48 hours.`);
      
      if (onSuccess) {
        onSuccess({
          id: requestId,
          ...formData,
          status: 'submitted',
          submittedDate: new Date().toISOString().split('T')[0]
        });
      }
      
      onClose();
    } catch (error) {
      toast.error('Failed to submit quotation request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const estimatedTotal = formData.items.reduce((total, item) => 
    total + (item.quantity * item.estimatedUnitPrice), 0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto m-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Request New Quotation</h2>
            <p className="text-sm text-gray-600 mt-1">Submit your requirements and get a detailed quotation</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.customerInfo.companyName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, companyName: e.target.value }
                  }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.customerInfo.contactName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, contactName: e.target.value }
                  }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="input"
                  value={formData.customerInfo.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, email: e.target.value }
                  }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input"
                  value={formData.customerInfo.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    customerInfo: { ...prev.customerInfo, phone: e.target.value }
                  }))}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Address
              </label>
              <textarea
                className="input h-20 resize-none"
                value={formData.customerInfo.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customerInfo: { ...prev.customerInfo, address: e.target.value }
                }))}
                placeholder="Enter complete shipping address"
              />
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.projectDetails.projectName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    projectDetails: { ...prev.projectDetails, projectName: e.target.value }
                  }))}
                  placeholder="Optional project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  className="input"
                  value={formData.projectDetails.expectedDeliveryDate}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    projectDetails: { ...prev.projectDetails, expectedDeliveryDate: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="input"
                  value={formData.projectDetails.priority}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    projectDetails: { ...prev.projectDetails, priority: e.target.value }
                  }))}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Items Required</h3>
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
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product / SKU *
                      </label>
                      <select
                        className="input"
                        value={item.sku}
                        onChange={(e) => handleItemChange(index, 'sku', e.target.value)}
                        required
                      >
                        <option value="">Select product...</option>
                        {availableItems.map(availableItem => (
                          <option key={availableItem.sku} value={availableItem.sku}>
                            {availableItem.sku} - {availableItem.name}
                          </option>
                        ))}
                        <option value="custom">Custom Item (specify in description)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Est. Unit Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="input"
                        value={item.estimatedUnitPrice}
                        onChange={(e) => handleItemChange(index, 'estimatedUnitPrice', parseFloat(e.target.value) || 0)}
                        placeholder="Optional"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Est. Total
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={`$${(item.quantity * item.estimatedUnitPrice).toFixed(2)}`}
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="btn btn-secondary p-2 text-red-600 hover:bg-red-50"
                        disabled={formData.items.length === 1}
                        title="Remove item"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Description / Specifications
                    </label>
                    <textarea
                      className="input h-16 resize-none"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Provide detailed specifications, requirements, or notes for this item..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Notes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Notes & Special Requirements
              </label>
              <textarea
                className="input h-24 resize-none"
                value={formData.projectDetails.notes}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  projectDetails: { ...prev.projectDetails, notes: e.target.value }
                }))}
                placeholder="Any special requirements, delivery instructions, or additional information..."
              />
            </div>
          </div>

          {/* Summary */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Request Summary</h4>
                <p className="text-sm text-gray-600">
                  {formData.items.length} item{formData.items.length !== 1 ? 's' : ''} requested
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  Estimated Total: ${estimatedTotal.toFixed(2)}
                </div>
                <p className="text-xs text-gray-500">
                  *Actual pricing may vary based on specifications
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting Request...' : 'Submit Quotation Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestQuotation;
