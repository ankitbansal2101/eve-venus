import React, { useState, useEffect } from 'react';
import { 
  DocumentChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

function Reports() {
  const [dateRange, setDateRange] = useState('last30days');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setReportData({
        summary: {
          totalRevenue: 245750.00,
          totalOrders: 48,
          averageOrderValue: 512.50,
          inventoryTurnover: 4.2,
          topCustomers: 15,
          lowStockItems: 3
        },
        salesByMonth: [
          { month: 'Sep', revenue: 89000, orders: 18 },
          { month: 'Oct', revenue: 98000, orders: 20 },
          { month: 'Nov', revenue: 112000, orders: 22 },
          { month: 'Dec', revenue: 125750, orders: 25 },
          { month: 'Jan', revenue: 89000, orders: 17 }
        ],
        productPerformance: [
          { name: 'Steel Bolt M10', sold: 2500, revenue: 6250, profit: 1875 },
          { name: 'Motor Assembly 3HP', sold: 18, revenue: 4950, profit: 1485 },
          { name: 'Aluminum Sheet 1mm', sold: 75, revenue: 3375, profit: 1012 }
        ],
        customerSegments: [
          { name: 'Manufacturing', count: 12, revenue: 125000 },
          { name: 'Industrial', count: 8, revenue: 85000 },
          { name: 'Automotive', count: 5, revenue: 55000 },
          { name: 'Construction', count: 7, revenue: 45000 }
        ],
        inventoryStatus: [
          { category: 'Fasteners', inStock: 85, lowStock: 5, outOfStock: 0 },
          { category: 'Raw Materials', inStock: 12, lowStock: 2, outOfStock: 1 },
          { category: 'Components', inStock: 8, lowStock: 1, outOfStock: 0 },
          { category: 'Tools', inStock: 25, lowStock: 0, outOfStock: 0 }
        ],
        orderTrends: [
          { date: '1/1', orders: 3, value: 1250 },
          { date: '1/7', orders: 5, value: 2100 },
          { date: '1/14', orders: 4, value: 1875 },
          { date: '1/21', orders: 6, value: 2850 },
          { date: '1/28', orders: 4, value: 1925 }
        ]
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch report data:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const handleExportReport = () => {
    // Mock export functionality
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Report Type,Value\n" +
      "Total Revenue," + reportData.summary.totalRevenue + "\n" +
      "Total Orders," + reportData.summary.totalOrders + "\n" +
      "Average Order Value," + reportData.summary.averageOrderValue + "\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `venus-report-${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="text-center py-12">
        <DocumentChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
        <p className="mt-1 text-sm text-gray-500">
          Unable to load report data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600">Comprehensive insights into your business performance</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input"
            >
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last90days">Last 90 days</option>
              <option value="last12months">Last 12 months</option>
            </select>
          </div>
          
          {/* Export Button */}
          <button
            onClick={handleExportReport}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(reportData.summary.totalRevenue)}
          </div>
          <div className="text-xs text-green-600 mt-1">↗ 12.5% vs last period</div>
        </div>
        
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">{reportData.summary.totalOrders}</div>
          <div className="text-xs text-green-600 mt-1">↗ 8.3% vs last period</div>
        </div>
        
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Avg Order Value</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(reportData.summary.averageOrderValue)}
          </div>
          <div className="text-xs text-red-600 mt-1">↘ 2.1% vs last period</div>
        </div>
        
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Inventory Turnover</div>
          <div className="text-2xl font-bold text-gray-900">{reportData.summary.inventoryTurnover}x</div>
          <div className="text-xs text-green-600 mt-1">↗ 5.2% vs last period</div>
        </div>
        
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Active Customers</div>
          <div className="text-2xl font-bold text-gray-900">{reportData.summary.topCustomers}</div>
          <div className="text-xs text-blue-600 mt-1">3 new this period</div>
        </div>
        
        <div className="card">
          <div className="text-sm font-medium text-gray-500">Low Stock Items</div>
          <div className="text-2xl font-bold text-yellow-600">{reportData.summary.lowStockItems}</div>
          <div className="text-xs text-gray-500 mt-1">Requires attention</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData.salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'revenue' ? formatCurrency(value) : value,
                name === 'revenue' ? 'Revenue' : 'Orders'
              ]} />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Trends */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Order Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.orderTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products by Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Segments */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Segments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reportData.customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="revenue"
              >
                {reportData.customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {reportData.customerSegments.map((segment, index) => (
              <div key={segment.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{segment.name}: {segment.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance Table */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Product Performance Details</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Product</th>
                  <th className="table-header">Units Sold</th>
                  <th className="table-header">Revenue</th>
                  <th className="table-header">Profit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.productPerformance.map((product, index) => (
                  <tr key={index}>
                    <td className="table-cell font-medium">{product.name}</td>
                    <td className="table-cell">{product.sold.toLocaleString()}</td>
                    <td className="table-cell">{formatCurrency(product.revenue)}</td>
                    <td className="table-cell text-green-600">{formatCurrency(product.profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Status */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Inventory Status by Category</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Category</th>
                  <th className="table-header">In Stock</th>
                  <th className="table-header">Low Stock</th>
                  <th className="table-header">Out of Stock</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.inventoryStatus.map((category, index) => (
                  <tr key={index}>
                    <td className="table-cell font-medium">{category.category}</td>
                    <td className="table-cell text-green-600">{category.inStock}</td>
                    <td className="table-cell text-yellow-600">{category.lowStock}</td>
                    <td className="table-cell text-red-600">{category.outOfStock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Action Items & Recommendations</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-yellow-900">Low Stock Alert</div>
              <div className="text-sm text-yellow-700">
                3 items are running low on stock. Consider reordering soon to avoid stockouts.
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-blue-900">Growth Opportunity</div>
              <div className="text-sm text-blue-700">
                Manufacturing segment shows 15% growth. Consider expanding product offerings for this segment.
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-green-900">Strong Performance</div>
              <div className="text-sm text-green-700">
                Steel Bolt M10 continues to be the top performer with consistent demand.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
