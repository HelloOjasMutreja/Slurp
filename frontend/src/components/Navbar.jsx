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
