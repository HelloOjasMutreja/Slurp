import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vendorAPI } from '../utils/api';
import { Icon } from '../design-system';

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const response = await vendorAPI.getAll();
      setVendors(response.data);
    } catch (error) {
      console.error('Error loading vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#C94B1D] dark:border-[#F37843] mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 dark:text-gray-400 animate-pulse-soft">Loading vendors...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold text-[#C94B1D] dark:text-[#F37843] mb-4">
            Welcome to Slurp
          </h1>
          <p className="mt-4 text-2xl text-gray-600 dark:text-gray-400 font-medium">
            Order delicious food from Java Canteen vendors
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Available daily from <span className="font-bold text-[#C94B1D] dark:text-[#F37843]">11 AM – 7 PM</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor, index) => (
            <Link
              key={vendor.id}
              to={`/vendor/${vendor.id}`}
              className="group backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] border border-gray-200/50 dark:border-gray-700/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={vendor.imageUrl}
                  alt={vendor.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold shadow-lg flex items-center space-x-1">
                  <Icon name="star" size={14} color="#fff"/>
                  <span>{vendor.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#C94B1D] dark:group-hover:text-[#F37843] transition-colors">
                  {vendor.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-2">{vendor.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[#C94B1D] dark:text-[#F37843] font-bold text-lg group-hover:scale-110 transition-transform">
                    View Menu <Icon name="arrowR" size={16} color="currentColor"/>
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#C94B1D] dark:bg-[#E85A25] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-md">
                    <Icon name="arrowR" size={18} color="#fff"/>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {vendors.length === 0 && !loading && (
          <div className="text-center py-16 animate-fade-in">
            <div className="flex justify-center mb-4"><Icon name="utensils" size={48} color="#C8C1B8"/></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No vendors available</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for delicious food options!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
