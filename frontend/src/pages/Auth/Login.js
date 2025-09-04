import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: 'demo@venus.com',
    password: 'password123',
    role: 'sales'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = {
        'demo@venus.com': { role: 'sales', name: 'Demo User' },
        'sales@venus.com': { role: 'sales', name: 'Sales Manager' },
        'warehouse@venus.com': { role: 'warehouse', name: 'Warehouse Manager' },
        'customer@venus.com': { role: 'customer', name: 'Customer User' },
        'admin@venus.com': { role: 'admin', name: 'System Admin' }
      };

      const user = mockUsers[formData.email];
      if (user && formData.password === 'password123') {
        onLogin({
          email: formData.email,
          name: user.name,
          role: user.role
        });
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'demo@venus.com', role: 'sales', name: 'Demo User' },
    { email: 'sales@venus.com', role: 'sales', name: 'Sales Manager' },
    { email: 'warehouse@venus.com', role: 'warehouse', name: 'Warehouse Manager' },
    { email: 'customer@venus.com', role: 'customer', name: 'Customer User' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-600">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to VENUS
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inventory Management System
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="input pr-10"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Demo Credentials</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500 text-center">
              Click any credential below to auto-fill (Password: password123)
            </p>
            {demoCredentials.map((cred, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, email: cred.email, role: cred.role }))}
                className="w-full text-left px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{cred.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{cred.role}</span>
                </div>
                <div className="text-xs text-gray-500">{cred.email}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            VENUS Inventory Management System v1.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
