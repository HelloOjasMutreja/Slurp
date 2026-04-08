import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vendorAPI } from '../utils/api';
import { Icon, useT, H, Body, Card, Spin, Container, Badge } from '../design-system';

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const tok = useT();

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
        <Spin size={48} />
        <Body muted>Loading vendors...</Body>
      </div>
    );
  }

  return (
    <Container s={{ paddingTop: 48, paddingBottom: 48 }}>
      {/* Hero */}
      <div className="ds-slide-up" style={{ textAlign: 'center', marginBottom: 48 }}>
        <H l={1} s={{ fontSize: 48, color: tok.color.pri, marginBottom: 12 }}>Welcome to Slurp</H>
        <Body sz="lg" muted>Order delicious food from Java Canteen vendors</Body>
        <p style={{ marginTop: 8, fontFamily: tok.font.body, fontSize: 13, color: tok.color.textMut }}>
          Available daily from{' '}
          <span style={{ fontWeight: 700, color: tok.color.pri }}>11 AM – 7 PM</span>
        </p>
      </div>

      {/* Vendor grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {vendors.map((vendor, index) => (
          <Link
            key={vendor.id}
            to={`/vendor/${vendor.id}`}
            className="ds-fade-in"
            style={{ textDecoration: 'none', animationDelay: `${index * 80}ms` }}
          >
            <Card hoverable pad={0} s={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={vendor.imageUrl}
                  alt={vendor.name}
                  style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <Badge v="wrn" dot>
                    <Icon name="star" size={12} color="currentColor" />
                    {' '}{vendor.rating}
                  </Badge>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <H l={3} s={{ marginBottom: 8 }}>{vendor.name}</H>
                <Body muted sz="sm" s={{ marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {vendor.description}
                </Body>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: tok.color.pri, fontFamily: tok.font.body, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
                    View Menu <Icon name="arrowR" size={14} color={tok.color.pri} />
                  </span>
                  <div style={{ width: 34, height: 34, borderRadius: tok.r.full, background: tok.color.pri, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="arrowR" size={16} color="#fff" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {vendors.length === 0 && !loading && (
        <div className="ds-fade-in" style={{ textAlign: 'center', padding: '64px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Icon name="utensils" size={48} color={tok.color.textMut} />
          </div>
          <H l={3} s={{ marginBottom: 8 }}>No vendors available</H>
          <Body muted>Check back later for delicious food options!</Body>
        </div>
      )}
    </Container>
  );
};

export default Home;
