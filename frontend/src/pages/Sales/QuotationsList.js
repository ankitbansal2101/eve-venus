import React, { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  PencilIcon, 
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function QuotationsList() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      // Mock data - replace with actual API call
      setQuotations([
        {
          id: 'QUOT-001',
          customerId: 'CUST-001',
          customerName: 'ABC Manufacturing',
          status: 'pending',
          totalAmount: 1431.00,
          validUntil: '2024-02-15',
          createdDate: '2024-01-15',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 200, unitPrice: 2.50 },
            { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 3, unitPrice: 275.00 }
          ]
        },
        {
          id: 'QUOT-002',
          customerId: 'CUST-003',
          customerName: 'DEF Corporation',
          status: 'approved',
          totalAmount: 486.00,
          validUntil: '2024-02-20',
          createdDate: '2024-01-18',
          approvedDate: '2024-01-20',
          items: [
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 10, unitPrice: 45.00 }
          ]
        },
        {
          id: 'QUOT-003',
          customerId: 'CUST-002',
          customerName: 'XYZ Industries',
          status: 'expired',
          totalAmount: 750.00,
          validUntil: '2024-01-10',
          createdDate: '2024-01-01',
          items: [
            { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 100, unitPrice: 2.50 },
            { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 5, unitPrice: 45.00 }
          ]
        }
      ]);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch quotations');
      setLoading(false);
    }
  };

  const handleStatusChange = async (quotationId, newStatus) => {
    try {
      // Mock API call - replace with actual API call
      setQuotations(prev => prev.map(q => 
        q.id === quotationId 
          ? { ...q, status: newStatus, approvedDate: newStatus === 'approved' ? new Date().toISOString().split('T')[0] : undefined }
          : q
      ));
      toast.success(`Quotation ${newStatus} successfully`);
    } catch (error) {
      toast.error('Failed to update quotation status');
    }
  };

  const convertToOrder = async (quotationId) => {
    try {
      // Mock API call - replace with actual API call
      toast.success('Quotation converted to order successfully');
    } catch (error) {
      toast.error('Failed to convert quotation to order');
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

  const filteredQuotations = quotations.filter(q => 
    filter === 'all' || q.status === filter
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
      {/* Filters */}
      <div className="flex items-center justify-between">
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
        <button
          onClick={fetchQuotations}
          className="btn btn-secondary flex items-center space-x-2"
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Quotations Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Quotation ID</th>
                <th className="table-header">Customer</th>
                <th className="table-header">Status</th>
                <th className="table-header">Amount</th>
                <th className="table-header">Valid Until</th>
                <th className="table-header">Created</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50">
                  <td className="table-cell font-medium text-primary-600">
                    {quotation.id}
                  </td>
                  <td className="table-cell">
                    <div>
                      <div className="font-medium text-gray-900">{quotation.customerName}</div>
                      <div className="text-sm text-gray-500">{quotation.customerId}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(quotation.status)}`}>
                      {quotation.status}
                    </span>
                  </td>
                  <td className="table-cell font-medium">
                    {formatCurrency(quotation.totalAmount)}
                  </td>
                  <td className="table-cell">
                    <span className={`${new Date(quotation.validUntil) < new Date() ? 'text-red-600' : 'text-gray-900'}`}>
                      {quotation.validUntil}
                    </span>
                  </td>
                  <td className="table-cell text-gray-500">
                    {quotation.createdDate}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      
                      {quotation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(quotation.id, 'approved')}
                            className="text-green-400 hover:text-green-600"
                            title="Approve"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(quotation.id, 'rejected')}
                            className="text-red-400 hover:text-red-600"
                            title="Reject"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      
                      {quotation.status === 'approved' && (
                        <button
                          onClick={() => convertToOrder(quotation.id)}
                          className="btn btn-primary text-xs py-1 px-2"
                        >
                          Convert to Order
                        </button>
                      )}
                      
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredQuotations.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No quotations found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' ? 'No quotations have been created yet.' : `No ${filter} quotations found.`}
            </p>
          </div>
        )}
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
    </div>
  );
}

export default QuotationsList;
