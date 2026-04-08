import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { walletAPI } from '../utils/api';
import { Icon, useT, Av, Btn, Body } from '../design-system';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [walletBalance, setWalletBalance] = useState(0);
  const tok = useT();

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

  const navLink = {
    color: tok.color.textSec,
    fontFamily: tok.font.body,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'color 0.15s',
    padding: '6px 2px',
  };

  return (
    <nav style={{
      background: tok.color.surface,
      borderBottom: `1px solid ${tok.color.border}`,
      boxShadow: tok.shadow.sm,
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'background 0.2s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: tok.font.display,
              fontSize: 26,
              fontWeight: 800,
              color: tok.color.pri,
              letterSpacing: -0.5,
            }}>
              Slurp
            </span>
          </Link>

          {/* Nav items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: tok.r.lg,
                background: tok.color.muted,
                border: `1px solid ${tok.color.border}`,
                cursor: 'pointer',
                color: tok.color.textSec,
                transition: 'background 0.15s',
              }}
            >
              <Icon name={isDark ? 'sun' : 'moon'} size={18} color={tok.color.textSec} />
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/" style={navLink}>Home</Link>

                {/* Wallet balance */}
                <Link to="/wallet" style={{
                  ...navLink,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: tok.color.sucSub,
                  border: `1px solid ${tok.color.sucBor}`,
                  borderRadius: tok.r.lg,
                  padding: '5px 12px',
                  color: tok.color.sucText,
                }}>
                  <Icon name="wallet" size={15} color={tok.color.sucText} />
                  <span style={{ fontWeight: 700, fontSize: 13 }}>₹{walletBalance.toFixed(2)}</span>
                </Link>

                <Link to="/orders" style={navLink}>My Orders</Link>

                {user?.role === 'ADMIN' && (
                  <Link to="/admin" style={{
                    ...navLink,
                    background: tok.color.priSub,
                    border: `1px solid ${tok.color.priMut}`,
                    borderRadius: tok.r.lg,
                    padding: '5px 12px',
                    color: tok.color.pri,
                  }}>
                    Admin
                  </Link>
                )}

                {/* Cart */}
                <Link to="/cart" style={{ ...navLink, position: 'relative' }}>
                  Cart
                  {getItemCount() > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: -8,
                      right: -10,
                      background: tok.color.pri,
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      borderRadius: tok.r.full,
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: tok.font.body,
                    }}>
                      {getItemCount()}
                    </span>
                  )}
                </Link>

                {/* User area */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: tok.color.bgAlt,
                  border: `1px solid ${tok.color.border}`,
                  borderRadius: tok.r.xl,
                  padding: '4px 12px 4px 8px',
                }}>
                  <Av name={user?.username} size={26} />
                  <span style={{
                    fontFamily: tok.font.body,
                    fontSize: 13,
                    fontWeight: 600,
                    color: tok.color.text,
                  }}>
                    {user?.username}
                  </span>
                  <Btn v="danger" sz="sm" onClick={logout} icon="logOut">
                    Logout
                  </Btn>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" style={navLink}>Login</Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Btn sz="md">Register</Btn>
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
