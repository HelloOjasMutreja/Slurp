import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { walletAPI } from '../utils/api';
import { Icon } from '../design-system';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      loadWalletBalance();
    }
  }, [isAuthenticated]);

  const loadWalletBalance = async () => {
    try {
      const response = await walletAPI.getBalance();
      setWalletBalance(response.data);
    } catch (error) {
      console.error('Error loading wallet balance:', error);
    }
  };

  return (
    <nav className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center group">
            <span className="text-3xl font-bold text-[#C94B1D] dark:text-[#F37843] group-hover:scale-105 transition-transform duration-300">
              Slurp
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            {/* Dark Mode Toggle with Enhanced Animation */}
            <button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg group"
              aria-label="Toggle dark mode"
            >
              <div className="relative">
                {isDark ? (
                  <span className="group-hover:rotate-45 transition-transform duration-300 inline-block text-gray-700 dark:text-gray-200"><Icon name="sun" size={22}/></span>
                ) : (
                  <span className="group-hover:-rotate-12 transition-transform duration-300 inline-block text-gray-700 dark:text-gray-200"><Icon name="moon" size={22}/></span>
                )}
              </div>
            </button>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className="text-gray-700 dark:text-gray-300 hover:text-[#C94B1D] dark:hover:text-[#F37843] transition-all duration-300 font-semibold hover:scale-105"
                >
                  Home
                </Link>
                <Link 
                  to="/wallet" 
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-[#C94B1D] dark:hover:text-[#F37843] transition-all duration-300 font-semibold bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg hover:scale-105 hover:shadow-md"
                >
                  <Icon name="wallet" size={16}/>
                  <span className="font-bold">₹{walletBalance.toFixed(2)}</span>
                </Link>
                <Link 
                  to="/orders" 
                  className="text-gray-700 dark:text-gray-300 hover:text-[#C94B1D] dark:hover:text-[#F37843] transition-all duration-300 font-semibold hover:scale-105"
                >
                  My Orders
                </Link>
                {user?.role === 'ADMIN' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-700 dark:text-gray-300 hover:text-[#C94B1D] dark:hover:text-[#F37843] transition-all duration-300 font-semibold hover:scale-105 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded-lg"
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  to="/cart" 
                  className="relative text-gray-700 dark:text-gray-300 hover:text-[#C94B1D] dark:hover:text-[#F37843] transition-all duration-300 font-semibold hover:scale-105"
                >
                  Cart
                  {getItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#C94B1D] dark:bg-[#E85A25] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce-soft">
                      {getItemCount()}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
                  <span className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300"><Icon name="user" size={15}/> {user?.username}</span>
                  <button
                    onClick={logout}
                    className="bg-[#C94B1D] dark:bg-[#E85A25] text-white px-4 py-2 rounded-lg hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 dark:text-gray-300 hover:text-[#C94B1D] dark:hover:text-[#F37843] transition-all duration-300 font-semibold hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#C94B1D] dark:bg-[#E85A25] text-white px-6 py-2 rounded-xl hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
