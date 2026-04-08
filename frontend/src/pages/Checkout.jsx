import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { slotAPI, orderAPI, paymentAPI, walletAPI } from '../utils/api';
import { Icon, useT, H, Body, Card, Btn, Inp, Lbl, Alert, Spin, Divider, Container } from '../design-system';

const Checkout = () => {
  const { cart, vendorId, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mock');
  const [walletBalance, setWalletBalance] = useState(0);
  const [isOrderingOpen, setIsOrderingOpen] = useState(true);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [pointsToEarn, setPointsToEarn] = useState(0);
  const useLoyaltyPoints = location.state?.useLoyaltyPoints || false;
  const tok = useT();

  useEffect(() => {
    loadSlots();
    loadWalletBalance();
    loadLoyaltyInfo();
  }, []);

  const loadSlots = async () => {
    try {
      const response = await slotAPI.getActive();
      setSlots(response.data.slots || []);
      setIsOrderingOpen(response.data.isOrderingOpen);
    } catch (error) {
      console.error('Error loading slots:', error);
    }
  };

  const loadWalletBalance = async () => {
    try {
      const response = await walletAPI.getBalance();
      setWalletBalance(response.data);
    } catch (error) {
      console.error('Error loading wallet balance:', error);
    }
  };

  const loadLoyaltyInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const subtotal = getTotal();
      const response = await walletAPI.calculateLoyaltyPoints(subtotal);
      setLoyaltyPoints(response.data.currentPoints);
      setPointsToEarn(response.data.pointsEarnedFromOrder);
    } catch (error) {
      console.error('Error loading loyalty info:', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedSlot) {
      alert('Please select a delivery slot');
      return;
    }

    const PLATFORM_FEE = 2;
    const subtotal = getTotal();
    const total = subtotal + PLATFORM_FEE;

    if (paymentMethod === 'wallet' && walletBalance < total) {
      alert('Insufficient wallet balance. Please add money to your wallet or use another payment method.');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        vendorId,
        slotId: selectedSlot,
        deliveryAddress,
        customerPhone,
        items: cart.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
        useLoyaltyPoints,
        paymentMethod,
      };

      const orderResponse = await orderAPI.create(orderData);
      const orderId = orderResponse.data.id;
      const newOrder = orderResponse.data;

      if (paymentMethod === 'wallet') {
        clearCart();
        navigate(`/order-success/${orderId}`, {
          state: { paymentMethod, order: newOrder, message: 'Order placed successfully! Payment deducted from wallet.' }
        });
      } else if (paymentMethod === 'cod') {
        await paymentAPI.confirmCOD(orderId);
        clearCart();
        navigate(`/order-success/${orderId}`, {
          state: { paymentMethod, order: newOrder, message: 'Order placed successfully! Pay cash on delivery.' }
        });
      } else {
        const paymentResponse = await paymentAPI.createOrder(orderId);
        const { providerOrderId } = paymentResponse.data;
        const mockPaymentId = 'MOCK_PAY_' + Math.random().toString(36).substr(2, 9);
        const mockSignature = 'MOCK_SIG_' + Math.random().toString(36).substr(2, 9);
        await paymentAPI.verify({ providerOrderId, providerPaymentId: mockPaymentId, providerSignature: mockSignature });
        clearCart();
        navigate(`/order-success/${orderId}`, {
          state: { paymentMethod, order: newOrder, message: 'Order placed successfully! Payment completed.' }
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      alert(`Failed to place order: ${errorMessage}`);
      navigate('/order-failed');
    } finally {
      setLoading(false);
    }
  };

  const PLATFORM_FEE = 2;
  const DELIVERY_FEE = 10;
  const subtotal = getTotal();
  const deliveryFee = subtotal < 100 ? DELIVERY_FEE : 0;
  const baseTotal = subtotal + deliveryFee + PLATFORM_FEE;
  const loyaltyDiscount = useLoyaltyPoints ? Math.min(loyaltyPoints, baseTotal) : 0;
  const total = baseTotal - loyaltyDiscount;

  const sectionStyle = {
    background: tok.color.bgAlt,
    border: `1px solid ${tok.color.border}`,
    borderRadius: tok.r.xl,
    padding: 24,
  };

  const paymentOption = (value, icon, title, subtitle, extra) => {
    const selected = paymentMethod === value;
    return (
      <div
        key={value}
        onClick={() => setPaymentMethod(value)}
        style={{
          padding: 16,
          border: `2px solid ${selected ? tok.color.pri : tok.color.border}`,
          borderRadius: tok.r.lg,
          cursor: 'pointer',
          background: selected ? tok.color.priSub : tok.color.surface,
          transition: 'all 0.15s',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name={icon} size={24} color={tok.color.textSec} />
            <div>
              <div style={{ fontFamily: tok.font.body, fontWeight: 700, fontSize: 14, color: tok.color.text }}>{title}</div>
              <div style={{ fontFamily: tok.font.body, fontSize: 12, color: tok.color.textSec }}>{subtitle}</div>
            </div>
          </div>
          {selected && <Icon name="checkCirc" size={20} color={tok.color.pri} />}
        </div>
        {extra}
      </div>
    );
  };

  return (
    <Container s={{ paddingTop: 40, paddingBottom: 48, maxWidth: 720 }}>
      <Card>
        <H l={1} s={{ color: tok.color.pri, marginBottom: 32 }}>Checkout</H>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Delivery Details */}
          <div style={sectionStyle}>
            <H l={3} s={{ marginBottom: 16 }}>Delivery Details</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Lbl req>Delivery Address</Lbl>
                <Inp
                  placeholder="Enter your delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Lbl req>Phone Number</Lbl>
                <Inp
                  type="tel"
                  placeholder="Enter your phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Delivery Slot */}
          <div style={sectionStyle}>
            <H l={3} s={{ marginBottom: 16 }}>Select Delivery Slot</H>
            {!isOrderingOpen ? (
              <Alert v="err" title="Ordering Closed for Today">
                Please come back tomorrow between <strong>11 AM – 7 PM</strong> to place your order.
              </Alert>
            ) : slots.length === 0 ? (
              <Alert v="wrn" title="No Available Slots">
                All delivery slots for today have passed. Please come back tomorrow between <strong>11 AM – 7 PM</strong>.
              </Alert>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {slots.map((slot, index) => {
                  const sel = selectedSlot === slot.id.toString();
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id.toString())}
                      className="ds-fade-in"
                      style={{
                        padding: '14px 12px',
                        border: `2px solid ${sel ? tok.color.pri : tok.color.border}`,
                        borderRadius: tok.r.lg,
                        background: sel ? tok.color.priSub : tok.color.surface,
                        cursor: 'pointer',
                        fontFamily: tok.font.body,
                        fontSize: 14,
                        fontWeight: 600,
                        color: sel ? tok.color.pri : tok.color.text,
                        transition: 'all 0.15s',
                        animationDelay: `${index * 80}ms`,
                        textAlign: 'center',
                      }}
                    >
                      <div>{slot.displayName}</div>
                      {sel && (
                        <div style={{ fontSize: 11, color: tok.color.suc, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                          <Icon name="check" size={11} color={tok.color.suc} sw={2.5} /> Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div style={sectionStyle}>
            <H l={3} s={{ marginBottom: 16 }}>Payment Method</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {paymentOption(
                'wallet', 'wallet', 'Wallet',
                `Available Balance: ₹${walletBalance.toFixed(2)}`,
                paymentMethod === 'wallet' && walletBalance < total ? (
                  <div style={{ marginTop: 10 }}>
                    <Alert v="err">Insufficient balance. Please add ₹{(total - walletBalance).toFixed(2)} more.</Alert>
                  </div>
                ) : null
              )}
              {paymentOption('mock', 'creditCard', 'Other Payment Methods', 'Credit/Debit Card, UPI, Net Banking')}
              {paymentOption('cod', 'creditCard', 'Cash on Delivery', 'Pay when you receive your order')}
            </div>
          </div>

          {/* Loyalty */}
          <div style={sectionStyle}>
            <H l={3} s={{ marginBottom: 16 }}>Campus Loyalty Program</H>
            <div style={{ background: tok.color.infSub, border: `1px solid ${tok.color.infBor}`, borderRadius: tok.r.lg, padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: tok.color.surface, borderRadius: tok.r.md, padding: '8px 12px' }}>
                  <Body sz="sm" muted>Available Points</Body>
                  <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.infText }}>{loyaltyPoints.toFixed(1)} pts (₹{loyaltyPoints.toFixed(2)})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: tok.color.surface, borderRadius: tok.r.md, padding: '8px 12px' }}>
                  <Body sz="sm" muted>You'll Earn</Body>
                  <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.sucText }}>+{pointsToEarn.toFixed(1)} pts</span>
                </div>
                {useLoyaltyPoints && loyaltyPoints > 0 && (
                  <div className="ds-slide-down" style={{ display: 'flex', justifyContent: 'space-between', background: tok.color.sucSub, border: `1px solid ${tok.color.sucBor}`, borderRadius: tok.r.md, padding: '8px 12px' }}>
                    <Body sz="sm">Points Applied</Body>
                    <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.sucText }}>-{loyaltyDiscount.toFixed(1)} pts</span>
                  </div>
                )}
                <p style={{ fontFamily: tok.font.body, fontSize: 11.5, color: tok.color.textMut, margin: 0 }}>
                  Earn 0.5 points for every ₹100 spent • 1 point = ₹1 discount
                </p>
                {useLoyaltyPoints && loyaltyPoints > 0 && (
                  <Alert v="suc">You're saving ₹{loyaltyDiscount.toFixed(2)} with loyalty points!</Alert>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={sectionStyle}>
            <H l={3} s={{ marginBottom: 16 }}>Order Summary</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="ds-fade-in"
                  style={{ display: 'flex', justifyContent: 'space-between', background: tok.color.surface, borderRadius: tok.r.md, padding: '8px 12px', animationDelay: `${index * 40}ms` }}
                >
                  <span style={{ fontFamily: tok.font.body, fontSize: 13, color: tok.color.text, fontWeight: 500 }}>
                    {item.name} × {item.quantity}
                  </span>
                  <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.text }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${tok.color.border}`, marginTop: 8, paddingTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <Body sz="sm" muted>Subtotal</Body>
                  <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 600 }}>₹{subtotal.toFixed(2)}</span>
                </div>
                {subtotal < 100 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <Body sz="sm" muted>Delivery Fee</Body>
                    <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 600, color: tok.color.wrn }}>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <Body sz="sm" muted>Platform Fee</Body>
                  <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 600 }}>₹{PLATFORM_FEE.toFixed(2)}</span>
                </div>
                {loyaltyDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <Body sz="sm">Loyalty Discount</Body>
                    <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.sucText }}>-₹{loyaltyDiscount.toFixed(2)}</span>
                  </div>
                )}
                <Divider s={{ margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: tok.font.display, fontSize: 17, fontWeight: 700, color: tok.color.text }}>Total</span>
                  <span style={{ fontFamily: tok.font.display, fontSize: 22, fontWeight: 800, color: tok.color.pri }}>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Place Order */}
          <Btn
            onClick={handlePlaceOrder}
            disabled={loading || !selectedSlot || !isOrderingOpen || (paymentMethod === 'wallet' && walletBalance < total)}
            loading={loading}
            full
            sz="lg"
            icon="creditCard"
          >
            {!loading && (!isOrderingOpen ? 'Ordering Closed' : `Place Order & Pay ₹${total.toFixed(2)}`)}
          </Btn>
        </div>
      </Card>
    </Container>
  );
};

export default Checkout;
