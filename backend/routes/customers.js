const express = require('express');
const router = express.Router();

// Mock customer data
const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'ABC Manufacturing',
    email: 'contact@abcmfg.com',
    phone: '+1-555-0101',
    address: '123 Industrial Ave, Manufacturing City, MC 12345',
    status: 'active',
    creditLimit: 50000,
    currentBalance: 5000,
    joinDate: '2023-06-15'
  },
  {
    id: 'CUST-002',
    name: 'XYZ Industries',
    email: 'orders@xyzind.com',
    phone: '+1-555-0102',
    address: '456 Factory Blvd, Industrial Park, IP 67890',
    status: 'active',
    creditLimit: 75000,
    currentBalance: 12500,
    joinDate: '2023-08-20'
  },
  {
    id: 'CUST-003',
    name: 'DEF Corporation',
    email: 'procurement@defcorp.com',
    phone: '+1-555-0103',
    address: '789 Business Dr, Commerce Center, CC 13579',
    status: 'active',
    creditLimit: 100000,
    currentBalance: 8750,
    joinDate: '2023-10-10'
  }
];

// @route   GET /api/customers
// @desc    Get all customers
// @access  Private
router.get('/', (req, res) => {
  const { status } = req.query;
  let filteredCustomers = mockCustomers;
  
  if (status) {
    filteredCustomers = filteredCustomers.filter(customer => customer.status === status);
  }
  
  res.json({ success: true, customers: filteredCustomers });
});

// @route   GET /api/customers/:id
// @desc    Get customer by ID
// @access  Private
router.get('/:id', (req, res) => {
  const customer = mockCustomers.find(customer => customer.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ success: false, message: 'Customer not found' });
  }
  res.json({ success: true, customer });
});

// @route   POST /api/customers
// @desc    Create new customer
// @access  Private
router.post('/', (req, res) => {
  const { name, email, phone, address, creditLimit } = req.body;
  
  const customerId = `CUST-${String(mockCustomers.length + 1).padStart(3, '0')}`;
  
  const newCustomer = {
    id: customerId,
    name,
    email,
    phone,
    address,
    status: 'active',
    creditLimit: creditLimit || 25000,
    currentBalance: 0,
    joinDate: new Date().toISOString().split('T')[0]
  };
  
  mockCustomers.push(newCustomer);
  res.status(201).json({ success: true, customer: newCustomer });
});

// @route   PUT /api/customers/:id
// @desc    Update customer
// @access  Private
router.put('/:id', (req, res) => {
  const customer = mockCustomers.find(customer => customer.id === req.params.id);
  
  if (!customer) {
    return res.status(404).json({ success: false, message: 'Customer not found' });
  }
  
  const { name, email, phone, address, creditLimit, status } = req.body;
  
  if (name) customer.name = name;
  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  if (address) customer.address = address;
  if (creditLimit) customer.creditLimit = creditLimit;
  if (status) customer.status = status;
  
  res.json({ success: true, customer });
});

// @route   GET /api/customers/:id/orders
// @desc    Get customer orders
// @access  Private
router.get('/:id/orders', (req, res) => {
  // This would typically fetch orders from the orders collection
  // For now, returning mock data
  const customerOrders = [
    {
      id: 'ORD-001',
      status: 'pending',
      totalAmount: 475.00,
      orderDate: '2024-01-15'
    }
  ];
  
  res.json({ success: true, orders: customerOrders });
});

// @route   GET /api/customers/:id/quotations
// @desc    Get customer quotations
// @access  Private
router.get('/:id/quotations', (req, res) => {
  // This would typically fetch quotations from the quotations collection
  // For now, returning mock data
  const customerQuotations = [
    {
      id: 'QUOT-001',
      status: 'pending',
      totalAmount: 1431.00,
      createdDate: '2024-01-15',
      validUntil: '2024-02-15'
    }
  ];
  
  res.json({ success: true, quotations: customerQuotations });
});

module.exports = router;
