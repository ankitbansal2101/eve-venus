const express = require('express');
const router = express.Router();

// Mock inventory data
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

// @route   GET /api/inventory
// @desc    Get all inventory items
// @access  Private
router.get('/', (req, res) => {
  res.json({ success: true, inventory: mockInventory });
});

// @route   GET /api/inventory/:id
// @desc    Get inventory item by ID
// @access  Private
router.get('/:id', (req, res) => {
  const item = mockInventory.find(item => item.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.json({ success: true, item });
});

// @route   POST /api/inventory/reserve
// @desc    Reserve stock for an order
// @access  Private
router.post('/reserve', (req, res) => {
  const { itemId, quantity } = req.body;
  const item = mockInventory.find(item => item.id === itemId);
  
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  
  if (item.available < quantity) {
    return res.status(400).json({ 
      success: false, 
      message: 'Insufficient stock available',
      available: item.available
    });
  }
  
  // Mock reservation logic
  item.reserved += quantity;
  item.available -= quantity;
  
  res.json({ 
    success: true, 
    message: 'Stock reserved successfully',
    item 
  });
});

// @route   GET /api/inventory/low-stock
// @desc    Get items with low stock
// @access  Private
router.get('/reports/low-stock', (req, res) => {
  const lowStockItems = mockInventory.filter(item => item.available <= item.reorderLevel);
  res.json({ success: true, lowStockItems });
});

module.exports = router;
