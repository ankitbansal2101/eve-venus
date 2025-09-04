# VENUS - Inventory Management System

A comprehensive web-based inventory management system designed for mid-sized manufacturers. VENUS provides a complete solution for managing inventory, sales, warehouse operations, and customer relationships through an intuitive, modern interface.

## 🌟 Features

### 📊 Main Dashboard
- Real-time inventory overview across multiple warehouses
- Stock levels monitoring with low-stock alerts
- Key performance metrics and analytics
- Interactive charts showing sales trends and stock movement
- Recent activity feed

### 🛒 Sales Dashboard
- **Quotation Management**: Create, view, and manage customer quotations
- **Order Management**: Track order status and history
- **Stock Check**: Real-time inventory availability checking
- **Stock Reservation**: Reserve inventory for pending orders
- Conversion of approved quotations to orders

### 🏭 Warehouse Dashboard
- **Inbound Goods**: Manage incoming inventory and receiving process
- **Pick Lists**: Generate and manage order picking workflows
- **Dispatch Queue**: Handle order packaging and shipping
- Real-time inventory location tracking
- Barcode-ready interface for warehouse operations

### 👥 Customer Portal
- **Order Tracking**: Real-time order status and shipment tracking
- **Order Management**: View order history and details
- **Order Actions**: Cancel orders (based on status) and request returns
- **Quotation Viewing**: Access to all customer quotations

### 📈 Reports & Analytics
- Comprehensive business intelligence dashboard
- Sales performance analytics
- Product performance metrics
- Customer segmentation analysis
- Inventory turnover reports
- Export functionality for all reports

## 🏗️ Technical Architecture

### Frontend (React)
- **Framework**: React 18.2.0 with functional components and hooks
- **Routing**: React Router DOM for single-page application navigation
- **Styling**: Tailwind CSS for modern, responsive design
- **Charts**: Recharts for interactive data visualization
- **Icons**: Heroicons for consistent iconography
- **Notifications**: React Hot Toast for user feedback

### Backend (Node.js)
- **Framework**: Express.js for RESTful API development
- **Security**: Helmet.js for security headers, CORS for cross-origin requests
- **Rate Limiting**: Express rate limit for API protection
- **Validation**: Express Validator for input validation
- **Logging**: Morgan for HTTP request logging

### Key Frontend Components
```
src/
├── components/
│   └── Layout/
│       ├── Sidebar.js          # Navigation sidebar with persona switcher
│       └── Header.js           # Top navigation with search and user menu
├── pages/
│   ├── Dashboard.js            # Main analytics dashboard
│   ├── Sales/                  # Sales management components
│   ├── Warehouse/              # Warehouse operations components
│   ├── Customer/               # Customer portal components
│   ├── Reports.js              # Business intelligence dashboard
│   └── Auth/                   # Authentication components
└── App.js                      # Main application component
```

### Backend API Endpoints
```
/api/auth          # Authentication and user management
/api/inventory     # Inventory management and stock operations
/api/orders        # Order processing and management
/api/quotations    # Quotation creation and management
/api/warehouse     # Warehouse operations (inbound, picking, dispatch)
/api/customers     # Customer management
/api/dashboard     # Analytics and reporting data
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd VENUS
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:3000

### Alternative: Start servers separately

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm install
npm start
```

## 👤 Demo Credentials

The application includes demo authentication with the following test accounts:

| Email | Password | Role | Access |
|-------|----------|------|--------|
| `demo@venus.com` | `password123` | Sales | Full sales dashboard access |
| `sales@venus.com` | `password123` | Sales | Sales management |
| `warehouse@venus.com` | `password123` | Warehouse | Warehouse operations |
| `customer@venus.com` | `password123` | Customer | Customer portal |

## 🎯 User Personas

### Sales Team
- Create and manage quotations
- Check real-time inventory availability
- Reserve stock for orders
- Convert quotations to orders
- Track sales performance

### Warehouse Team
- Manage inbound goods receiving
- Generate and process pick lists
- Handle dispatch and shipping
- Track inventory locations
- Update stock levels

### Customers
- Track order status in real-time
- View order history and details
- Cancel orders (when permitted)
- Request returns
- Access quotations

### Management
- View comprehensive analytics
- Monitor key performance indicators
- Track inventory across warehouses
- Generate business reports
- Oversee all operations

## 💡 Key Features Highlights

### Real-time Inventory Management
- Live stock level updates
- Multi-warehouse support
- Low stock alerts and notifications
- Inventory reservation system

### Advanced Order Processing
- Complete order lifecycle management
- Automated pick list generation
- Shipping integration ready
- Customer self-service portal

### Business Intelligence
- Interactive charts and analytics
- Export capabilities
- Performance tracking
- Trend analysis

### Modern UI/UX
- Responsive design for all devices
- Intuitive navigation with persona switcher
- Clean, minimal interface
- Accessibility-focused design

## 🛠️ Development

### Project Structure
```
VENUS/
├── backend/                 # Node.js API server
│   ├── routes/             # API route handlers
│   ├── package.json        # Backend dependencies
│   └── server.js          # Express server configuration
├── frontend/               # React application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── package.json           # Root package with scripts
└── README.md             # This file
```

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend development server
- `npm run build` - Build the frontend for production
- `npm run install-all` - Install dependencies for all packages

### Environment Setup

Create a `.env` file in the backend directory for environment variables:
```env
PORT=5000
NODE_ENV=development
```

## 🔮 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Real-time WebSocket notifications
- Barcode scanning integration
- Mobile application
- Advanced reporting with PDF export
- Multi-tenant support
- Integration with ERP systems
- Advanced inventory forecasting
- Supplier management portal

## 📦 Technology Stack

**Frontend:**
- React 18.2.0
- React Router DOM 6.15.0
- Tailwind CSS 3.x
- Recharts 2.8.0
- Heroicons 2.0.18
- Axios 1.5.0

**Backend:**
- Node.js
- Express.js 4.18.2
- CORS 2.8.5
- Helmet 7.1.0
- Morgan 1.10.0
- Express Validator 7.0.1

**Development Tools:**
- Concurrently for running multiple scripts
- Nodemon for backend auto-restart
- React Scripts for frontend tooling

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**VENUS Inventory Management System** - Streamlining inventory operations for modern manufacturers.
