import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { vendorAPI, menuAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { Icon, useT, H, Body, Card, Btn, Spin, Badge, Container } from '../design-system';

const VendorMenu = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const { addToCart } = useCart();
  const tok = useT();

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

  const filteredMenuItems = menuItems.filter((item) => {
    if (filterType === 'veg') return item.isVeg === true;
    if (filterType === 'non-veg') return item.isVeg === false;
    return true;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
        <Spin size={48} />
        <Body muted>Loading menu...</Body>
      </div>
    );
  }

  const filterBtn = (type, label, activeBg, activeTxt) => {
    const active = filterType === type;
    return (
      <button
        key={type}
        onClick={() => setFilterType(type)}
        style={{
          padding: '8px 18px',
          borderRadius: tok.r.lg,
          fontFamily: tok.font.body,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          border: 'none',
          background: active ? activeBg : 'transparent',
          color: active ? activeTxt : tok.color.textSec,
          transition: 'all 0.15s',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {type !== 'all' && (
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: type === 'veg' ? '#22c55e' : '#ef4444', flexShrink: 0 }} />
        )}
        {label}
      </button>
    );
  };

  return (
    <div>
      {/* Vendor header */}
      <div style={{ background: tok.color.surface, borderBottom: `1px solid ${tok.color.border}`, boxShadow: tok.shadow.sm }}>
        <Container s={{ paddingTop: 32, paddingBottom: 32 }}>
          <div className="ds-slide-up" style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
            <img
              src={vendor.imageUrl}
              alt={vendor.name}
              style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: tok.r.xl, boxShadow: tok.shadow.lg, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <H l={1} s={{ color: tok.color.pri, marginBottom: 6 }}>{vendor.name}</H>
              <Body muted sz="lg" s={{ marginBottom: 12 }}>{vendor.description}</Body>
              <Badge v="wrn" dot>
                <Icon name="star" size={13} color="currentColor" /> {vendor.rating}
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      <Container s={{ paddingTop: 32, paddingBottom: 48 }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <H l={2}>Menu</H>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: tok.color.surface,
            border: `1px solid ${tok.color.border}`,
            borderRadius: tok.r.xl,
            padding: 4,
            boxShadow: tok.shadow.xs,
          }}>
            {filterBtn('all', 'All', tok.color.pri, '#fff')}
            {filterBtn('veg', 'Veg', '#22c55e', '#fff')}
            {filterBtn('non-veg', 'Non-Veg', '#ef4444', '#fff')}
          </div>
        </div>

        {filterType !== 'all' && (
          <div className="ds-slide-down" style={{ marginBottom: 20, fontFamily: tok.font.body, fontSize: 13, color: tok.color.textSec }}>
            Showing <strong style={{ color: tok.color.pri }}>{filteredMenuItems.length}</strong>{' '}
            {filterType === 'veg' ? 'vegetarian' : 'non-vegetarian'} {filteredMenuItems.length === 1 ? 'item' : 'items'}
          </div>
        )}

        {/* Menu grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {filteredMenuItems.map((item, index) => (
            <div
              key={item.id}
              className="ds-fade-in"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <Card hoverable pad={0} s={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Badge v={item.isVeg ? 'suc' : 'err'} dot>
                      {item.isVeg ? 'VEG' : 'NON-VEG'}
                    </Badge>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <H l={4} s={{ marginBottom: 6 }}>{item.name}</H>
                  <Body muted sz="sm" s={{ marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </Body>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: tok.font.display, fontSize: 20, fontWeight: 700, color: tok.color.pri }}>
                      ₹{item.price}
                    </span>
                    <Btn sz="sm" onClick={() => handleAddToCart(item)} icon="plus">
                      Add to Cart
                    </Btn>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {filteredMenuItems.length === 0 && (
          <div className="ds-fade-in" style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <Icon name="utensils" size={48} color={tok.color.textMut} />
            </div>
            <H l={3} s={{ marginBottom: 8 }}>No items found</H>
            <Body muted>Try selecting a different filter</Body>
          </div>
        )}
      </Container>
    </div>
  );
};

export default VendorMenu;

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
