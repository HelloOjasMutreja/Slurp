import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Icon, useT, H, Body, Card, Btn, Container } from '../design-system';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod || 'online';
  const message = location.state?.message || 'Order placed successfully!';
  const mapRef = useRef(null);
  const hostelPositionRef = useRef({ lat: 12.9786, lng: 77.6000 });
  const [riderPosition, setRiderPosition] = useState({ lat: 12.9716, lng: 77.5946 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const tok = useT();

  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setMapLoaded(true);
      document.body.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded || !window.L || !mapRef.current) return;

    const hostelPosition = hostelPositionRef.current;
    const map = window.L.map(mapRef.current).setView([riderPosition.lat, riderPosition.lng], 13);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const riderIcon = window.L.divIcon({
      className: 'custom-div-icon',
      html: `<div style='background-color:${tok.color.pri};width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:14px;'>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const riderMarker = window.L.marker([riderPosition.lat, riderPosition.lng], { icon: riderIcon }).addTo(map);
    riderMarker.bindPopup('<b>Your Delivery Rider</b><br>On the way!').openPopup();

    const hostelIcon = window.L.divIcon({
      className: 'custom-div-icon',
      html: `<div style='background-color:${tok.color.suc};width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:14px;font-weight:bold;color:white;'>H</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    window.L.marker([hostelPosition.lat, hostelPosition.lng], { icon: hostelIcon })
      .addTo(map)
      .bindPopup('<b>Your Hostel</b><br>Destination');

    const routeLine = window.L.polyline([
      [riderPosition.lat, riderPosition.lng],
      [hostelPosition.lat, hostelPosition.lng]
    ], { color: tok.color.pri, weight: 4, opacity: 0.7, dashArray: '10, 10' }).addTo(map);

    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    const moveInterval = setInterval(() => {
      setRiderPosition(prev => {
        const newLat = prev.lat + (hostelPosition.lat - prev.lat) * 0.05;
        const newLng = prev.lng + (hostelPosition.lng - prev.lng) * 0.05;
        riderMarker.setLatLng([newLat, newLng]);
        routeLine.setLatLngs([[newLat, newLng], [hostelPosition.lat, hostelPosition.lng]]);
        const distance = Math.sqrt(Math.pow(hostelPosition.lat - newLat, 2) + Math.pow(hostelPosition.lng - newLng, 2));
        if (distance < 0.001) {
          clearInterval(moveInterval);
          riderMarker.bindPopup('<b>Delivery Complete!</b><br>Rider has arrived.').openPopup();
        }
        return { lat: newLat, lng: newLng };
      });
    }, 2000);

    return () => { clearInterval(moveInterval); map.remove(); };
  }, [mapLoaded]);

  const getPaymentMessage = () => {
    if (paymentMethod === 'wallet') return 'Payment has been deducted from your wallet.';
    if (paymentMethod === 'cod') return 'Payment will be collected on delivery.';
    return 'Payment has been processed successfully.';
  };

  return (
    <Container s={{ paddingTop: 40, paddingBottom: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Success Card */}
        <Card s={{ textAlign: 'center' }} className="ds-slide-up">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: tok.r.full, background: tok.color.sucSub, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: tok.shadow.md }}>
              <Icon name="checkCirc" size={40} color={tok.color.suc} />
            </div>
          </div>
          <H l={2} s={{ marginBottom: 8 }}>Order Placed Successfully!</H>
          {message && (
            <Body sz="md" s={{ color: tok.color.sucText, fontWeight: 600, marginBottom: 8 }}>{message}</Body>
          )}
          <Body muted>
            Your order <strong style={{ color: tok.color.pri }}>#{orderId}</strong> has been confirmed!
          </Body>
          <Body muted sz="sm" s={{ marginTop: 8 }}>{getPaymentMessage()}</Body>
        </Card>

        {/* Tracking Card */}
        <Card>
          <H l={3} s={{ textAlign: 'center', marginBottom: 4 }}>Live Delivery Tracking</H>
          <Body s={{ textAlign: 'center', color: tok.color.sucText, fontWeight: 600, marginBottom: 16 }}>
            Your order is on the way — arriving in 20 minutes
          </Body>

          <div
            ref={mapRef}
            style={{ width: '100%', height: 360, borderRadius: tok.r.lg, overflow: 'hidden', border: `1px solid ${tok.color.border}`, background: tok.color.bgAlt }}
          >
            {!mapLoaded && (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: `3px solid ${tok.color.border}`, borderTopColor: tok.color.pri, animation: 'ds-spin 0.7s linear infinite' }} />
                <Body muted>Loading map...</Body>
              </div>
            )}
          </div>

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { icon: 'clock', label: 'ETA', value: '20 mins', color: tok.color.inf },
              { icon: 'checkCirc', label: 'Status', value: 'In Transit', color: tok.color.suc },
              { icon: 'truck', label: 'Rider', value: 'On the way', color: tok.color.pri },
            ].map(({ icon, label, value, color }) => (
              <div key={label} style={{ textAlign: 'center', background: tok.color.bgAlt, border: `1px solid ${tok.color.border}`, borderRadius: tok.r.lg, padding: '14px 10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                  <Icon name={icon} size={26} color={color} />
                </div>
                <Body sz="sm" muted>{label}</Body>
                <div style={{ fontFamily: tok.font.body, fontSize: 15, fontWeight: 700, color }}>{value}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn full sz="lg" onClick={() => navigate('/orders')} icon="package">View My Orders</Btn>
            <Btn full sz="lg" v="muted" onClick={() => navigate('/')} icon="home">Back to Home</Btn>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default OrderSuccess;
