import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { walletAPI } from '../utils/api';
import { Icon, useT, H, Body, Card, Btn, Tog, Divider, Container } from '../design-system';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [pointsToEarn, setPointsToEarn] = useState(0);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  const tok = useT();

  const PLATFORM_FEE = 2;
  const DELIVERY_FEE = 10;
  const subtotal = getTotal();
  const deliveryFee = subtotal < 100 ? DELIVERY_FEE : 0;
  let total = subtotal + deliveryFee + PLATFORM_FEE;
  const loyaltyDiscount = useLoyaltyPoints ? Math.min(loyaltyPoints, total) : 0;
  total = total - loyaltyDiscount;

  useEffect(() => {
    loadLoyaltyInfo();
  }, [subtotal]);

  const loadLoyaltyInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await walletAPI.calculateLoyaltyPoints(subtotal);
      setLoyaltyPoints(response.data.currentPoints);
      setPointsToEarn(response.data.pointsEarnedFromOrder);
    } catch (error) {
      console.error('Error loading loyalty info:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { useLoyaltyPoints } });
  };

  const row = (label, value, highlight, small) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
      <span style={{ fontFamily: tok.font.body, fontSize: small ? 13 : 14, color: tok.color.textSec }}>{label}</span>
      <span style={{ fontFamily: tok.font.body, fontSize: small ? 13 : 14, fontWeight: 600, color: highlight || tok.color.text }}>{value}</span>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="ds-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Icon name="shoppingCart" size={56} color={tok.color.textMut} />
          </div>
          <H l={2} s={{ marginBottom: 8 }}>Your cart is empty</H>
          <Body muted s={{ marginBottom: 24 }}>Start adding delicious items!</Body>
          <Btn onClick={() => navigate('/')} icon="arrowL" sz="lg">Browse Vendors</Btn>
        </div>
      </div>
    );
  }

  return (
    <Container s={{ paddingTop: 40, paddingBottom: 48, maxWidth: 720 }}>
      <Card>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <H l={1} s={{ color: tok.color.pri }}>Your Cart</H>
          <Btn v="ghost" sz="sm" onClick={clearCart} icon="x">Clear Cart</Btn>
        </div>

        {/* Cart items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {cart.map((item, index) => (
            <div
              key={item.id}
              className="ds-fade-in"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 0',
                borderBottom: `1px solid ${tok.color.border}`,
                animationDelay: `${index * 40}ms`,
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: tok.r.lg, flexShrink: 0, boxShadow: tok.shadow.sm }}
              />
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: tok.font.body, fontSize: 15, fontWeight: 600, color: tok.color.text }}>{item.name}</span>
                <div style={{ color: tok.color.pri, fontFamily: tok.font.body, fontWeight: 600, fontSize: 14, marginTop: 2 }}>₹{item.price}</div>
              </div>
              {/* Qty controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ width: 32, height: 32, borderRadius: tok.r.full, border: `1px solid ${tok.color.border}`, background: tok.color.surface, cursor: 'pointer', fontWeight: 700, fontSize: 16, color: tok.color.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon name="minus" size={14} color={tok.color.text} />
                </button>
                <span style={{ width: 28, textAlign: 'center', fontFamily: tok.font.body, fontWeight: 600, color: tok.color.text }}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ width: 32, height: 32, borderRadius: tok.r.full, border: 'none', background: tok.color.pri, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Icon name="plus" size={14} color="#fff" />
                </button>
              </div>
              <div style={{ textAlign: 'right', minWidth: 80 }}>
                <div style={{ fontFamily: tok.font.body, fontWeight: 700, fontSize: 15, color: tok.color.text }}>₹{(item.price * item.quantity).toFixed(2)}</div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: tok.color.err, fontFamily: tok.font.body, fontSize: 12, fontWeight: 500, marginTop: 2 }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing summary */}
        <div style={{ marginTop: 20, background: tok.color.bgAlt, borderRadius: tok.r.lg, padding: 16, border: `1px solid ${tok.color.border}` }}>
          {row('Subtotal', `₹${subtotal.toFixed(2)}`)}
          {subtotal < 100 && row('Delivery Fee (orders below ₹100)', `₹${deliveryFee.toFixed(2)}`, tok.color.wrn, true)}
          {row('Platform Fee', `₹${PLATFORM_FEE.toFixed(2)}`, null, true)}
          {loyaltyDiscount > 0 && (
            <div className="ds-slide-down" style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontFamily: tok.font.body, fontSize: 14, color: tok.color.sucText, fontWeight: 600 }}>Loyalty Discount</span>
              <span style={{ fontFamily: tok.font.body, fontSize: 14, fontWeight: 700, color: tok.color.sucText }}>-₹{loyaltyDiscount.toFixed(2)}</span>
            </div>
          )}
          <Divider s={{ margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: tok.font.display, fontSize: 18, fontWeight: 700, color: tok.color.text }}>Total</span>
            <span style={{ fontFamily: tok.font.display, fontSize: 22, fontWeight: 800, color: tok.color.pri }}>₹{total.toFixed(2)}</span>
          </div>
          {subtotal < 100 && (
            <div style={{ marginTop: 10, fontFamily: tok.font.body, fontSize: 12, color: tok.color.err, background: tok.color.errSub, border: `1px solid ${tok.color.errBor}`, borderRadius: tok.r.md, padding: '8px 12px' }}>
              Add ₹{(100 - subtotal).toFixed(2)} more to avoid the delivery fee
            </div>
          )}
        </div>

        {/* Loyalty Program */}
        <div style={{ marginTop: 20, borderTop: `1px solid ${tok.color.border}`, paddingTop: 20 }}>
          <div style={{ background: tok.color.infSub, border: `1px solid ${tok.color.infBor}`, borderRadius: tok.r.lg, padding: 16, marginBottom: 14 }}>
            <H l={4} s={{ color: tok.color.infText, marginBottom: 12 }}>Campus Loyalty Program</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: tok.color.surface, borderRadius: tok.r.md, padding: '8px 12px' }}>
                <Body sz="sm" muted>Available Points</Body>
                <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.infText }}>{loyaltyPoints.toFixed(1)} pts (₹{loyaltyPoints.toFixed(2)})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: tok.color.surface, borderRadius: tok.r.md, padding: '8px 12px' }}>
                <Body sz="sm" muted>You'll Earn</Body>
                <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.sucText }}>+{pointsToEarn.toFixed(1)} pts</span>
              </div>
              <p style={{ fontFamily: tok.font.body, fontSize: 11.5, color: tok.color.textMut, margin: 0 }}>
                Earn 0.5 points for every ₹100 spent • 1 point = ₹1 discount
              </p>
            </div>
          </div>

          {loyaltyPoints > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: `1.5px solid ${tok.color.infBor}`, borderRadius: tok.r.lg, background: tok.color.surface }}>
              <Tog
                checked={useLoyaltyPoints}
                onChange={(v) => setUseLoyaltyPoints(v)}
                label="Use Loyalty Points"
              />
              {useLoyaltyPoints && (
                <span className="ds-scale-in" style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.sucText }}>
                  Save ₹{loyaltyDiscount.toFixed(2)}
                </span>
              )}
            </div>
          )}
        </div>

        <Btn full sz="lg" onClick={handleCheckout} iconRight="arrowR" s={{ marginTop: 24 }}>
          Proceed to Checkout
        </Btn>
      </Card>
    </Container>
  );
};

export default Cart;
