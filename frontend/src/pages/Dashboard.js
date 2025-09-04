import React, { useState, useEffect } from 'react';
import { 
  CubeIcon, 
  ExclamationTriangleIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  TruckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [stockLevels, setStockLevels] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Mock API calls - replace with actual API calls
    setOverview({
      totalInventoryValue: 247500.00,
      lowStockItems: 3,
      pendingOrders: 5,
      pendingQuotations: 2,
      todaysShipments: 8,
      warehouseUtilization: 78.5
    });

    setStockLevels([
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
    ]);

    setChartData({
      salesTrend: [
        { month: 'Oct', revenue: 98000 },
        { month: 'Nov', revenue: 112000 },
        { month: 'Dec', revenue: 125750 },
        { month: 'Jan', revenue: 89000 }
      ],
      stockMovement: [
        { date: '1/10', inbound: 150, outbound: 89 },
        { date: '1/11', inbound: 200, outbound: 145 },
        { date: '1/12', inbound: 75, outbound: 234 },
        { date: '1/13', inbound: 125, outbound: 167 },
        { date: '1/14', inbound: 180, outbound: 198 },
        { date: '1/15', inbound: 95, outbound: 123 }
      ],
      orderStatus: [
        { status: 'Pending', count: 5 },
        { status: 'Processing', count: 8 },
        { status: 'Shipped', count: 12 },
        { status: 'Delivered', count: 25 }
      ]
    });

    setAlerts([
      {
        type: 'low_stock',
        severity: 'high',
        sku: 'VEN-002',
        name: 'Aluminum Sheet 1mm',
        message: 'Stock approaching reorder level'
      },
      {
        type: 'overstock',
        severity: 'medium',
        sku: 'VEN-001',
        name: 'Steel Bolt M10',
        message: 'Stock level significantly above optimal'
      }
    ]);

    setActivities([
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
      }
    ]);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (!overview || !chartData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your inventory system performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CubeIcon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(overview.totalInventoryValue)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{overview.lowStockItems}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingBagIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{overview.pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Quotations</p>
              <p className="text-2xl font-bold text-gray-900">{overview.pendingQuotations}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TruckIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Shipments</p>
              <p className="text-2xl font-bold text-gray-900">{overview.todaysShipments}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Warehouse Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{overview.warehouseUtilization}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Levels by Warehouse */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Stock Levels by Warehouse</h2>
        <div className="space-y-4">
          {stockLevels.map((warehouse, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{warehouse.warehouse}</h3>
                <span className="text-sm text-gray-500">
                  {warehouse.utilizationPercent}% Utilized
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Total Items:</span>
                  <span className="ml-2 font-medium">{warehouse.totalItems.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Low Stock:</span>
                  <span className="ml-2 font-medium text-yellow-600">{warehouse.lowStockItems}</span>
                </div>
                <div>
                  <span className="text-gray-500">Out of Stock:</span>
                  <span className="ml-2 font-medium text-red-600">{warehouse.outOfStockItems}</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${warehouse.utilizationPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.salesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Movement */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Stock Movement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.stockMovement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inbound" fill="#10B981" name="Inbound" />
              <Bar dataKey="outbound" fill="#3B82F6" name="Outbound" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData.orderStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="count"
              >
                {chartData.orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {chartData.orderStatus.map((status, index) => (
              <div key={status.status} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{status.status}: {status.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Inventory Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-400' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{alert.name}</p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                  </div>
                  <ExclamationTriangleIcon className={`h-5 w-5 ${
                    alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString()} • {activity.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
