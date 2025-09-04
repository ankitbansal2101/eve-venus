const express = require('express');
const router = express.Router();

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'ABC Manufacturing',
    status: 'pending',
    items: [
      { sku: 'VEN-001', name: 'Steel Bolt M10', quantity: 100, unitPrice: 2.50 },
      { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantity: 5, unitPrice: 45.00 }
    ],
    totalAmount: 475.00,
    orderDate: '2024-01-15',
    expectedDelivery: '2024-01-22',
    shippingAddress: '123 Industrial Ave, Manufacturing City, MC 12345'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'XYZ Industries',
    status: 'shipped',
    items: [
      { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 2, unitPrice: 275.00 }
    ],
    totalAmount: 550.00,
    orderDate: '2024-01-10',
    shippedDate: '2024-01-14',
    trackingNumber: 'TRK-XYZ-789',
    expectedDelivery: '2024-01-18',
    shippingAddress: '456 Factory Blvd, Industrial Park, IP 67890'
  }
];

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private
router.get('/', (req, res) => {
  const { status, customerId } = req.query;
  let filteredOrders = mockOrders;
  
  if (status) {
    filteredOrders = filteredOrders.filter(order => order.status === status);
  }
  
  if (customerId) {
    filteredOrders = filteredOrders.filter(order => order.customerId === customerId);
  }
  
  res.json({ success: true, orders: filteredOrders });
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', (req, res) => {
  const order = mockOrders.find(order => order.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, order });
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', (req, res) => {
  const { customerId, customerName, items, shippingAddress } = req.body;
  
  const totalAmount = items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  const orderId = `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`;
  
  const newOrder = {
    id: orderId,
    customerId,
    customerName,
    status: 'pending',
    items,
    totalAmount,
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    shippingAddress
  };
  
  mockOrders.push(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const order = mockOrders.find(order => order.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  
  order.status = status;
  if (status === 'shipped') {
    order.shippedDate = new Date().toISOString().split('T')[0];
    order.trackingNumber = `TRK-${order.id}-${Math.floor(Math.random() * 1000)}`;
  }
  
  res.json({ success: true, order });
});

// @route   DELETE /api/orders/:id
// @desc    Cancel order (if status allows)
// @access  Private
router.delete('/:id', (req, res) => {
  const orderIndex = mockOrders.findIndex(order => order.id === req.params.id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  
  const order = mockOrders[orderIndex];
  if (order.status === 'shipped' || order.status === 'delivered') {
    return res.status(400).json({ 
      success: false, 
      message: 'Cannot cancel order that has been shipped or delivered' 
    });
  }
  
  order.status = 'cancelled';
  res.json({ success: true, message: 'Order cancelled successfully' });
});

module.exports = router;
