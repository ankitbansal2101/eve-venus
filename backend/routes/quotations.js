const express = require('express');
const router = express.Router();

// Mock quotations data
const mockQuotations = [
  {
    id: 'QUOT-001',
    customerId: 'CUST-001',
    customerName: 'ABC Manufacturing',
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
    notes: 'Bulk discount applied for steel bolts'
  },
  {
    id: 'QUOT-002',
    customerId: 'CUST-003',
    customerName: 'DEF Corporation',
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
    notes: 'Standard pricing applied'
  }
];

// @route   GET /api/quotations
// @desc    Get all quotations
// @access  Private
router.get('/', (req, res) => {
  const { status, customerId } = req.query;
  let filteredQuotations = mockQuotations;
  
  if (status) {
    filteredQuotations = filteredQuotations.filter(quote => quote.status === status);
  }
  
  if (customerId) {
    filteredQuotations = filteredQuotations.filter(quote => quote.customerId === customerId);
  }
  
  res.json({ success: true, quotations: filteredQuotations });
});

// @route   GET /api/quotations/:id
// @desc    Get quotation by ID
// @access  Private
router.get('/:id', (req, res) => {
  const quotation = mockQuotations.find(quote => quote.id === req.params.id);
  if (!quotation) {
    return res.status(404).json({ success: false, message: 'Quotation not found' });
  }
  res.json({ success: true, quotation });
});

// @route   POST /api/quotations
// @desc    Create new quotation
// @access  Private
router.post('/', (req, res) => {
  const { customerId, customerName, items, notes } = req.body;
  
  const itemsWithTotals = items.map(item => ({
    ...item,
    totalPrice: item.quantity * item.unitPrice
  }));
  
  const subtotal = itemsWithTotals.reduce((total, item) => total + item.totalPrice, 0);
  const tax = subtotal * 0.08; // 8% tax
  const totalAmount = subtotal + tax;
  
  const quotationId = `QUOT-${String(mockQuotations.length + 1).padStart(3, '0')}`;
  
  const newQuotation = {
    id: quotationId,
    customerId,
    customerName,
    status: 'pending',
    items: itemsWithTotals,
    subtotal,
    tax,
    totalAmount,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdDate: new Date().toISOString().split('T')[0],
    notes: notes || ''
  };
  
  mockQuotations.push(newQuotation);
  res.status(201).json({ success: true, quotation: newQuotation });
});

// @route   PUT /api/quotations/:id/status
// @desc    Update quotation status
// @access  Private
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const quotation = mockQuotations.find(quote => quote.id === req.params.id);
  
  if (!quotation) {
    return res.status(404).json({ success: false, message: 'Quotation not found' });
  }
  
  quotation.status = status;
  if (status === 'approved') {
    quotation.approvedDate = new Date().toISOString().split('T')[0];
  }
  
  res.json({ success: true, quotation });
});

// @route   POST /api/quotations/:id/convert-to-order
// @desc    Convert quotation to order
// @access  Private
router.post('/:id/convert-to-order', (req, res) => {
  const quotation = mockQuotations.find(quote => quote.id === req.params.id);
  
  if (!quotation) {
    return res.status(404).json({ success: false, message: 'Quotation not found' });
  }
  
  if (quotation.status !== 'approved') {
    return res.status(400).json({ 
      success: false, 
      message: 'Only approved quotations can be converted to orders' 
    });
  }
  
  // Mock order creation
  const orderId = `ORD-FROM-${quotation.id}`;
  
  res.json({ 
    success: true, 
    message: 'Quotation converted to order successfully',
    orderId 
  });
});

module.exports = router;
