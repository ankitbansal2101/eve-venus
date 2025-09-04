const express = require('express');
const router = express.Router();

// @route   GET /api/dashboard/overview
// @desc    Get dashboard overview stats
// @access  Private
router.get('/overview', (req, res) => {
  const overview = {
    totalInventoryValue: 247500.00,
    lowStockItems: 3,
    pendingOrders: 5,
    pendingQuotations: 2,
    todaysShipments: 8,
    warehouseUtilization: 78.5
  };
  
  res.json({ success: true, overview });
});

// @route   GET /api/dashboard/stock-levels
// @desc    Get stock levels across warehouses
// @access  Private
router.get('/stock-levels', (req, res) => {
  const stockLevels = [
    {
      warehouse: 'Main Warehouse',
      totalItems: 1610,
      lowStockItems: 2,
      outOfStockItems: 0,
      utilizationPercent: 85.2
    },
    {
      warehouse: 'Component Warehouse',
      totalItems: 25,
      lowStockItems: 1,
      outOfStockItems: 0,
      utilizationPercent: 62.5
    }
  ];
  
  res.json({ success: true, stockLevels });
});

// @route   GET /api/dashboard/sales-metrics
// @desc    Get sales metrics
// @access  Private
router.get('/sales-metrics', (req, res) => {
  const salesMetrics = {
    monthlyRevenue: 125750.00,
    quotationsGenerated: 15,
    quotationConversionRate: 73.3,
    averageOrderValue: 512.50,
    topSellingItems: [
      { sku: 'VEN-001', name: 'Steel Bolt M10', quantitySold: 2500, revenue: 6250.00 },
      { sku: 'VEN-003', name: 'Motor Assembly 3HP', quantitySold: 18, revenue: 4950.00 },
      { sku: 'VEN-002', name: 'Aluminum Sheet 1mm', quantitySold: 75, revenue: 3375.00 }
    ]
  };
  
  res.json({ success: true, salesMetrics });
});

// @route   GET /api/dashboard/warehouse-metrics
// @desc    Get warehouse metrics
// @access  Private
router.get('/warehouse-metrics', (req, res) => {
  const warehouseMetrics = {
    inboundToday: 3,
    outboundToday: 8,
    pendingPickLists: 4,
    completedPickLists: 12,
    averagePickTime: '00:18:30',
    dispatchQueue: 2
  };
  
  res.json({ success: true, warehouseMetrics });
});

// @route   GET /api/dashboard/inventory-alerts
// @desc    Get inventory alerts
// @access  Private
router.get('/inventory-alerts', (req, res) => {
  const alerts = [
    {
      type: 'low_stock',
      severity: 'high',
      sku: 'VEN-002',
      name: 'Aluminum Sheet 1mm',
      currentStock: 70,
      reorderLevel: 20,
      message: 'Stock approaching reorder level'
    },
    {
      type: 'overstock',
      severity: 'medium',
      sku: 'VEN-001',
      name: 'Steel Bolt M10',
      currentStock: 1300,
      optimalLevel: 800,
      message: 'Stock level significantly above optimal'
    },
    {
      type: 'expired_quotation',
      severity: 'low',
      quotationId: 'QUOT-005',
      customerName: 'GHI Manufacturing',
      expiryDate: '2024-01-14',
      message: 'Quotation expired, follow up recommended'
    }
  ];
  
  res.json({ success: true, alerts });
});

// @route   GET /api/dashboard/recent-activity
// @desc    Get recent system activity
// @access  Private
router.get('/recent-activity', (req, res) => {
  const activities = [
    {
      id: 1,
      type: 'order_created',
      description: 'New order ORD-003 created for ABC Manufacturing',
      timestamp: '2024-01-15T14:30:00Z',
      user: 'Sales Rep 1'
    },
    {
      id: 2,
      type: 'stock_received',
      description: 'Received 50 units of Aluminum Sheet 1mm',
      timestamp: '2024-01-15T13:15:00Z',
      user: 'Warehouse Team A'
    },
    {
      id: 3,
      type: 'quotation_approved',
      description: 'Quotation QUOT-002 approved by DEF Corporation',
      timestamp: '2024-01-15T12:45:00Z',
      user: 'System'
    },
    {
      id: 4,
      type: 'shipment_dispatched',
      description: 'Order ORD-002 dispatched to XYZ Industries',
      timestamp: '2024-01-15T11:20:00Z',
      user: 'Warehouse Team B'
    }
  ];
  
  res.json({ success: true, activities });
});

// @route   GET /api/dashboard/performance-charts
// @desc    Get data for performance charts
// @access  Private
router.get('/performance-charts', (req, res) => {
  const chartData = {
    salesTrend: [
      { month: 'Oct', revenue: 98000 },
      { month: 'Nov', revenue: 112000 },
      { month: 'Dec', revenue: 125750 },
      { month: 'Jan', revenue: 89000 }
    ],
    stockMovement: [
      { date: '2024-01-10', inbound: 150, outbound: 89 },
      { date: '2024-01-11', inbound: 200, outbound: 145 },
      { date: '2024-01-12', inbound: 75, outbound: 234 },
      { date: '2024-01-13', inbound: 125, outbound: 167 },
      { date: '2024-01-14', inbound: 180, outbound: 198 },
      { date: '2024-01-15', inbound: 95, outbound: 123 }
    ],
    orderStatus: [
      { status: 'Pending', count: 5 },
      { status: 'Processing', count: 8 },
      { status: 'Shipped', count: 12 },
      { status: 'Delivered', count: 25 }
    ]
  };
  
  res.json({ success: true, chartData });
});

module.exports = router;
