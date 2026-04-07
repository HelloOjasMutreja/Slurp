import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { vendorAPI, menuAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { Icon } from '../design-system';

const VendorMenu = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // 'all', 'veg', 'non-veg'
  const { addToCart } = useCart();

  useEffect(() => {
    const loadVendorAndMenu = async () => {
      try {
        const [vendorRes, menuRes] = await Promise.all([
          vendorAPI.getById(id),
          menuAPI.getByVendor(id),
        ]);
        setVendor(vendorRes.data);
        setMenuItems(menuRes.data);
      } catch (error) {
        console.error('Error loading vendor menu:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVendorAndMenu();
  }, [id]);

  const handleAddToCart = (menuItem) => {
    const success = addToCart(menuItem, vendor);
    if (success) {
      alert('Added to cart!');
    }
  };

  // Filter menu items based on selected filter type
  const filteredMenuItems = menuItems.filter((item) => {
    if (filterType === 'veg') return item.isVeg === true;
    if (filterType === 'non-veg') return item.isVeg === false;
    return true; // 'all' - show everything
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#C94B1D] dark:border-[#F37843] mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 dark:text-gray-400 animate-pulse-soft">Loading menu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
      <div className="bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start space-x-6 animate-slide-up">
            <img
              src={vendor.imageUrl}
              alt={vendor.name}
              className="w-36 h-36 object-cover rounded-2xl shadow-xl ring-4 ring-white dark:ring-gray-700 hover:scale-105 transition-transform duration-300"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#C94B1D] dark:text-[#F37843] mb-2">
                {vendor.name}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">{vendor.description}</p>
              <div className="mt-3 flex items-center bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full w-fit">
                <Icon name="star" size={16} color="#F5B927"/>
                <span className="ml-1 text-gray-900 dark:text-gray-100 font-semibold">{vendor.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Menu</h2>
          
          {/* Toggle Filter Buttons with Glassy Effect */}
          <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-1.5 shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
            <button
              onClick={() => setFilterType('all')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                filterType === 'all'
                  ? 'bg-[#C94B1D] text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('veg')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                filterType === 'veg'
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block border border-green-700"></span>
              <span>Veg</span>
            </button>
            <button
              onClick={() => setFilterType('non-veg')}
              className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                filterType === 'non-veg'
                  ? 'bg-red-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block border border-red-700"></span>
              <span>Non-Veg</span>
            </button>
          </div>
        </div>
        
          {filterType !== 'all' && (
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg inline-block animate-slide-down">
              Showing <span className="font-bold text-[#C94B1D] dark:text-[#F37843]">{filteredMenuItems.length}</span> {filterType === 'veg' ? 'vegetarian' : 'non-vegetarian'} {filteredMenuItems.length === 1 ? 'item' : 'items'}
            </div>
          )}
        
        {/* Menu Grid with Enhanced Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item, index) => (
            <div
              key={item.id}
              className="group backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-gray-200/50 dark:border-gray-700/50 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  {item.isVeg ? (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-soft flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white inline-block"></span> VEG
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-soft flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-white inline-block"></span> NON-VEG
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#C94B1D] dark:group-hover:text-[#F37843] transition-colors">
                    {item.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#C94B1D] dark:text-[#F37843]">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#C94B1D] dark:bg-[#E85A25] text-white px-6 py-2.5 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredMenuItems.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="flex justify-center mb-4"><Icon name="utensils" size={48} color="#C8C1B8"/></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorMenu;
