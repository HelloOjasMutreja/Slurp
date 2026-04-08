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
