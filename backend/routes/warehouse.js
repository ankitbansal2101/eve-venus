const express = require('express');
const router = express.Router();

// Mock warehouse data
const mockInboundGoods = [
  {
    id: 'IB-001',
    purchaseOrder: 'PO-2024-001',
    supplier: 'Steel Suppliers Inc',
    expectedDate: '2024-01-20',
    status: 'expected',
    items: [
      { sku: 'VEN-001', name: 'Steel Bolt M10', expectedQuantity: 1000, receivedQuantity: 0 }
    ]
  },
  {
    id: 'IB-002',
    purchaseOrder: 'PO-2024-002',
    supplier: 'Aluminum Works Ltd',
    expectedDate: '2024-01-18',
    receivedDate: '2024-01-18',
    status: 'received',
    items: [
      { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', expectedQuantity: 50, receivedQuantity: 50 }
    ]
  }
];

const mockPickLists = [
  {
    id: 'PL-001',
    orderId: 'ORD-001',
    status: 'pending',
    priority: 'high',
    createdDate: '2024-01-15',
    assignedTo: 'Warehouse Team A',
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
  }
];

const mockDispatchQueue = [
  {
    id: 'DISP-001',
    orderId: 'ORD-002',
    pickListId: 'PL-002',
    customerName: 'XYZ Industries',
    status: 'ready',
    packagedDate: '2024-01-12',
    shippingMethod: 'Express',
    trackingNumber: null,
    items: [
      { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantity: 2 }
    ]
  }
];

// @route   GET /api/warehouse/inbound
// @desc    Get inbound goods
// @access  Private
router.get('/inbound', (req, res) => {
  res.json({ success: true, inboundGoods: mockInboundGoods });
});

// @route   PUT /api/warehouse/inbound/:id/receive
// @desc    Receive inbound goods
// @access  Private
router.put('/inbound/:id/receive', (req, res) => {
  const { items } = req.body;
  const inbound = mockInboundGoods.find(item => item.id === req.params.id);
  
  if (!inbound) {
    return res.status(404).json({ success: false, message: 'Inbound goods not found' });
  }
  
  inbound.status = 'received';
  inbound.receivedDate = new Date().toISOString().split('T')[0];
  
  // Update received quantities
  items.forEach(receivedItem => {
    const item = inbound.items.find(i => i.sku === receivedItem.sku);
    if (item) {
      item.receivedQuantity = receivedItem.receivedQuantity;
    }
  });
  
  res.json({ success: true, inbound });
});

// @route   GET /api/warehouse/picklists
// @desc    Get pick lists
// @access  Private
router.get('/picklists', (req, res) => {
  const { status } = req.query;
  let filteredPickLists = mockPickLists;
  
  if (status) {
    filteredPickLists = filteredPickLists.filter(pl => pl.status === status);
  }
  
  res.json({ success: true, pickLists: filteredPickLists });
});

// @route   PUT /api/warehouse/picklists/:id/pick
// @desc    Update pick list items
// @access  Private
router.put('/picklists/:id/pick', (req, res) => {
  const { items } = req.body;
  const pickList = mockPickLists.find(pl => pl.id === req.params.id);
  
  if (!pickList) {
    return res.status(404).json({ success: false, message: 'Pick list not found' });
  }
  
  // Update picked items
  items.forEach(pickedItem => {
    const item = pickList.items.find(i => i.sku === pickedItem.sku);
    if (item) {
      item.picked = pickedItem.picked;
      item.pickedQuantity = pickedItem.pickedQuantity;
    }
  });
  
  // Check if all items are picked
  const allPicked = pickList.items.every(item => item.picked);
  if (allPicked) {
    pickList.status = 'completed';
    pickList.completedDate = new Date().toISOString().split('T')[0];
  }
  
  res.json({ success: true, pickList });
});

// @route   GET /api/warehouse/dispatch
// @desc    Get dispatch queue
// @access  Private
router.get('/dispatch', (req, res) => {
  res.json({ success: true, dispatchQueue: mockDispatchQueue });
});

// @route   PUT /api/warehouse/dispatch/:id/ship
// @desc    Confirm shipment
// @access  Private
router.put('/dispatch/:id/ship', (req, res) => {
  const { shippingMethod, trackingNumber } = req.body;
  const dispatch = mockDispatchQueue.find(d => d.id === req.params.id);
  
  if (!dispatch) {
    return res.status(404).json({ success: false, message: 'Dispatch item not found' });
  }
  
  dispatch.status = 'shipped';
  dispatch.shippedDate = new Date().toISOString().split('T')[0];
  dispatch.shippingMethod = shippingMethod;
  dispatch.trackingNumber = trackingNumber;
  
  res.json({ success: true, dispatch });
});

// @route   GET /api/warehouse/locations
// @desc    Get warehouse locations
// @access  Private
router.get('/locations', (req, res) => {
  const locations = [
    { id: 'WH-A-001', zone: 'A', aisle: '001', description: 'Raw Materials - Steel' },
    { id: 'WH-B-012', zone: 'B', aisle: '012', description: 'Raw Materials - Aluminum' },
    { id: 'WH-C-005', zone: 'C', aisle: '005', description: 'Components - Motors' }
  ];
  
  res.json({ success: true, locations });
});

module.exports = router;
