import React, { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import RequestQuotation from './RequestQuotation';

function MyQuotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    fetchMyQuotations();
  }, []);

  const fetchMyQuotations = async () => {
    try {
      // Mock data - replace with actual API call based on customer ID
      setQuotations([
        {
          id: 'QUOT-001',
          status: 'pending',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 200, unitPrice: 2.50, totalPrice: 500.00 },
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 3, unitPrice: 275.00, totalPrice: 825.00 }
          ],
          subtotal: 1325.00,
          tax: 106.00,
          totalAmount: 1431.00,
          validUntil: '2024-02-15',
          createdDate: '2024-01-15',
          notes: 'Bulk discount applied for steel bolts',
          validityDays: 31,
          isExpired: false
        },
        {
          id: 'QUOT-002',
          status: 'approved',
          items: [
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 10, unitPrice: 45.00, totalPrice: 450.00 }
          ],
          subtotal: 450.00,
          tax: 36.00,
          totalAmount: 486.00,
          validUntil: '2024-02-20',
          createdDate: '2024-01-18',
          approvedDate: '2024-01-20',
          notes: 'Standard pricing applied',
          validityDays: 35,
          isExpired: false
        },
        {
          id: 'QUOT-003',
          status: 'expired',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 100, unitPrice: 2.50, totalPrice: 250.00 },
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 3, unitPrice: 45.00, totalPrice: 135.00 }
          ],
          subtotal: 385.00,
          tax: 30.80,
          totalAmount: 415.80,
          validUntil: '2024-01-05',
          createdDate: '2023-12-15',
          notes: '',
          validityDays: 21,
          isExpired: true
        }
      ]);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch quotations');
      setLoading(false);
    }
  };

  const handleRequestNewQuotation = () => {
    setShowRequestModal(true);
  };

  const handleQuotationRequestSuccess = (newRequest) => {
    // Add the new quotation request to the list with pending status
    const newQuotation = {
      id: newRequest.id,
      status: 'pending',
      items: newRequest.items,
      subtotal: newRequest.items.reduce((sum, item) => sum + (item.quantity * item.estimatedUnitPrice), 0),
      tax: 0, // Will be calculated when quotation is processed
      totalAmount: newRequest.items.reduce((sum, item) => sum + (item.quantity * item.estimatedUnitPrice), 0),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      createdDate: newRequest.submittedDate,
      notes: newRequest.projectDetails.notes || 'Customer quotation request',
      validityDays: 30,
      isExpired: false,
      requestDetails: newRequest
    };

    setQuotations(prev => [newQuotation, ...prev]);
    toast.success('Your quotation request has been added to the list. You will receive an update when it\'s processed.');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'expired':
        return <CalendarIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRemainingDays = (validUntil) => {
    const today = new Date();
    const validDate = new Date(validUntil);
    const diffTime = validDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredQuotations = quotations.filter(quote => 
    filter === 'all' || quote.status === filter
  );

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
      {/* Header with Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Quotations</h2>
          <p className="text-gray-600">View and manage your quotation requests</p>
        </div>
        <button
          onClick={handleRequestNewQuotation}
          className="btn btn-primary"
        >
          Request New Quotation
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Total Quotations</div>
          <div className="text-2xl font-bold text-gray-900">{quotations.length}</div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {quotations.filter(q => q.status === 'pending').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Approved</div>
          <div className="text-2xl font-bold text-green-600">
            {quotations.filter(q => q.status === 'approved').length}
          </div>
        </div>
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Total Value</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(quotations.reduce((sum, q) => sum + q.totalAmount, 0))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'pending', 'approved', 'rejected', 'expired'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-lg capitalize ${
              filter === status
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Quotations List */}
      <div className="space-y-4">
        {filteredQuotations.map((quotation) => {
          const remainingDays = getRemainingDays(quotation.validUntil);
          
          return (
            <div key={quotation.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(quotation.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{quotation.id}</h3>
                    <p className="text-sm text-gray-500">Created on {quotation.createdDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(quotation.status)}`}>
                    {quotation.status}
                  </span>
                  <div className="text-lg font-bold text-gray-900 mt-1">
                    {formatCurrency(quotation.totalAmount)}
                  </div>
                </div>
              </div>

              {/* Validity Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Valid Until:</span>
                  <p className={`${quotation.isExpired ? 'text-red-600' : 'text-gray-900'}`}>
                    {quotation.validUntil}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Validity:</span>
                  <p className={`${
                    quotation.isExpired ? 'text-red-600' : 
                    remainingDays <= 7 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {quotation.isExpired ? 'Expired' : 
                     remainingDays <= 0 ? 'Expires today' :
                     `${remainingDays} days remaining`}
                  </p>
                </div>
                {quotation.approvedDate && (
                  <div>
                    <span className="font-medium text-gray-500">Approved:</span>
                    <p className="text-green-600">{quotation.approvedDate}</p>
                  </div>
                )}
              </div>

              {/* Items Preview */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Items ({quotation.items.length})</h4>
                <div className="space-y-2">
                  {quotation.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="ml-2 text-sm text-gray-500">{item.sku}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {item.quantity} × {formatCurrency(item.unitPrice)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.totalPrice)}
                        </div>
                      </div>
                    </div>
                  ))}
                  {quotation.items.length > 2 && (
                    <div className="text-sm text-gray-500 py-2">
                      +{quotation.items.length - 2} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {quotation.notes && (
                <div className="border-t pt-4">
                  <span className="text-sm font-medium text-gray-500">Notes:</span>
                  <p className="text-sm text-gray-600 mt-1">{quotation.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="border-t pt-4 flex items-center justify-between">
                <button
                  onClick={() => setSelectedQuotation(quotation)}
                  className="btn btn-secondary flex items-center space-x-2"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>View Details</span>
                </button>

                {quotation.status === 'approved' && !quotation.isExpired && (
                  <button
                    onClick={() => toast.info('Feature coming soon: Convert to order')}
                    className="btn btn-primary"
                  >
                    Convert to Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quotation Details Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Quotation Details - {selectedQuotation.id}
                </h2>
                <button
                  onClick={() => setSelectedQuotation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Status and Validity */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedQuotation.status)}
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedQuotation.status)}`}>
                    {selectedQuotation.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Valid Until</div>
                  <div className={`font-medium ${
                    selectedQuotation.isExpired ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {selectedQuotation.validUntil}
                  </div>
                </div>
              </div>

              {/* All Items */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">All Items</h3>
                <div className="space-y-3">
                  {selectedQuotation.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {item.quantity} × {formatCurrency(item.unitPrice)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(item.totalPrice)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quotation Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(selectedQuotation.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">{formatCurrency(selectedQuotation.tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedQuotation.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedQuotation.notes && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded p-3">
                    {selectedQuotation.notes}
                  </p>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Created:</span>
                  <p className="text-gray-900">{selectedQuotation.createdDate}</p>
                </div>
                {selectedQuotation.approvedDate && (
                  <div>
                    <span className="font-medium text-gray-500">Approved:</span>
                    <p className="text-green-600">{selectedQuotation.approvedDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredQuotations.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No quotations found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'You haven\'t requested any quotations yet.' : `No ${filter} quotations found.`}
          </p>
          <button
            onClick={handleRequestNewQuotation}
            className="mt-4 btn btn-primary"
          >
            Request Your First Quotation
          </button>
        </div>
      )}

      {/* Request Quotation Modal */}
      <RequestQuotation 
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        onSuccess={handleQuotationRequestSuccess}
      />
    </div>
  );
}

export default MyQuotations;
