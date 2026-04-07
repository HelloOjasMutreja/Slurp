import { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, ordersRes, vendorsRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getAllOrders(),
        adminAPI.getAllVendors(),
      ]);
      setStats(statsRes.data);
      setOrders(ordersRes.data);
      setVendors(vendorsRes.data);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      loadData(); // Reload data
      alert('Order status updated!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500 dark:border-orange-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 dark:text-gray-400 animate-pulse-soft">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary-600 dark:text-orange-400 mb-8 animate-slide-up">🛠️ Admin Dashboard</h1>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {['stats', 'orders', 'vendors'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'border-primary-500 dark:border-orange-500 text-primary-600 dark:text-orange-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 animate-fade-in">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Orders</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalOrders}</p>
            </div>
            <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Vendors</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalVendors}</p>
            </div>
            <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalUsers}</p>
            </div>
            <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold text-primary-600 dark:text-orange-400 mt-2">
                ₹{stats.totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-semibold">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        {order.customer.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{order.vendor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-bold">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 font-semibold">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all duration-300"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PREPARING">Preparing</option>
                          <option value="READY">Ready</option>
                          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor, index) => (
              <div 
                key={vendor.id} 
                className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={vendor.imageUrl}
                  alt={vendor.name}
                  className="w-full h-40 object-cover rounded-xl mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{vendor.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{vendor.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-yellow-500 dark:text-yellow-400 font-bold">★ {vendor.rating}</span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      vendor.active
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    }`}
                  >
                    {vendor.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
