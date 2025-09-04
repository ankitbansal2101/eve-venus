import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { InventoryProvider } from './context/InventoryContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import SalesDashboard from './pages/Sales/SalesDashboard';
import WarehouseDashboard from './pages/Warehouse/WarehouseDashboard';
import CustomerPortal from './pages/Customer/CustomerPortal';
import Reports from './pages/Reports';
import Login from './pages/Auth/Login';

function App() {
  const [user, setUser] = useState({
    name: 'Demo User',
    email: 'demo@venus.com',
    role: 'sales'
  });
  const [currentPersona, setCurrentPersona] = useState('sales');

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <InventoryProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar 
            currentPersona={currentPersona} 
            onPersonaChange={setCurrentPersona}
            user={user}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header user={user} onLogout={() => setUser(null)} />
            
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <div className="container mx-auto px-6 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/sales/*" element={<SalesDashboard />} />
                  <Route path="/warehouse/*" element={<WarehouseDashboard />} />
                  <Route path="/customer/*" element={<CustomerPortal />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </div>
            </main>
          </div>
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </InventoryProvider>
  );
}

export default App;
