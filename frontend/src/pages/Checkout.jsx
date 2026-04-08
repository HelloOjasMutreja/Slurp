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
      // Create order with payment method
      const orderData = {
        vendorId,
        slotId: selectedSlot, // Keep as UUID string
        deliveryAddress,
        customerPhone,
        items: cart.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
        useLoyaltyPoints: useLoyaltyPoints,
        paymentMethod: paymentMethod, // Add payment method to order
      };

      const orderResponse = await orderAPI.create(orderData);
      const orderId = orderResponse.data.id;
      const newOrder = orderResponse.data;

      // For wallet payment, order is already confirmed and paid
      if (paymentMethod === 'wallet') {
        // Clear cart and navigate to success page
        clearCart();
        navigate(`/order-success/${orderId}`, { 
          state: { 
            paymentMethod,
            order: newOrder,
            message: 'Order placed successfully! Payment deducted from wallet.'
          } 
        });
      } else if (paymentMethod === 'cod') {
        // For COD, confirm the order and create payment transaction
        await paymentAPI.confirmCOD(orderId);
        
        // Clear cart and navigate to success page
        clearCart();
        navigate(`/order-success/${orderId}`, { 
          state: { 
            paymentMethod,
            order: newOrder,
            message: 'Order placed successfully! Pay cash on delivery.'
          } 
        });
      } else {
        // Create payment order for online payment (card/UPI/mock)
        const paymentResponse = await paymentAPI.createOrder(orderId);
        const { providerOrderId } = paymentResponse.data;

        // Simulate payment (in real scenario, this would redirect to payment gateway)
        const mockPaymentId = 'MOCK_PAY_' + Math.random().toString(36).substr(2, 9);
        const mockSignature = 'MOCK_SIG_' + Math.random().toString(36).substr(2, 9);

        // Verify payment
        await paymentAPI.verify({
          providerOrderId,
          providerPaymentId: mockPaymentId,
          providerSignature: mockSignature,
        });

        // Clear cart and navigate to success page
        clearCart();
        navigate(`/order-success/${orderId}`, { 
          state: { 
            paymentMethod,
            order: newOrder,
            message: 'Order placed successfully! Payment completed.'
          } 
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error occurred';
      alert(`Failed to place order: ${errorMessage}`);
      // Navigate to order failed page on error
      navigate('/order-failed');
    } finally {
      setLoading(false);
    }
  };

  const PLATFORM_FEE = 2;
  const DELIVERY_FEE = 10;
  const subtotal = getTotal();
  const deliveryFee = subtotal < 100 ? DELIVERY_FEE : 0;
  
  // Calculate loyalty discount
  const baseTotal = subtotal + deliveryFee + PLATFORM_FEE;
  const loyaltyDiscount = useLoyaltyPoints ? Math.min(loyaltyPoints, baseTotal) : 0;
  const total = baseTotal - loyaltyDiscount;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-glass dark:shadow-dark-glass p-8 border border-gray-200/50 dark:border-gray-700/50 animate-slide-up">
          <h1 className="text-3xl font-bold text-[#C94B1D] dark:text-[#F37843] mb-8">
            Checkout
          </h1>

          <div className="space-y-8">
            {/* Delivery Details */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                Delivery Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94B1D] focus:border-[#C94B1D] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    required
                    placeholder="Enter your delivery address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94B1D] focus:border-[#C94B1D] bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Slot Selection */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                Select Delivery Slot
              </h2>
              {!isOrderingOpen ? (
                <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-500 rounded-xl p-6 text-center animate-fade-in">
                  <div className="text-red-600 dark:text-red-400 text-xl font-bold mb-3 flex items-center justify-center">
                    Ordering Closed for Today
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    Please come back tomorrow between <span className="font-bold text-[#C94B1D] dark:text-[#F37843]">11 AM – 7 PM</span> to place your order.
                  </p>
                </div>
              ) : slots.length === 0 ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-500 rounded-xl p-6 text-center animate-fade-in">
                  <div className="text-yellow-600 dark:text-yellow-400 text-xl font-bold mb-3 flex items-center justify-center">
                    No Available Slots
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    All delivery slots for today have passed. Please come back tomorrow between <span className="font-bold text-[#C94B1D] dark:text-[#F37843]">11 AM – 7 PM</span>.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slots.map((slot, index) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id.toString())}
                      className={`p-5 border-2 rounded-xl text-center transition-all duration-300 font-semibold animate-fade-in ${
                        selectedSlot === slot.id.toString()
                          ? 'border-[#C94B1D] bg-orange-50 dark:bg-[#2a1208] shadow-glow scale-105 text-[#C94B1D] dark:text-[#F37843]'
                          : 'border-gray-300 dark:border-gray-600 hover:border-[#C94B1D] dark:hover:border-[#F37843] hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-lg mb-1">{slot.displayName}</div>
                      {selectedSlot === slot.id.toString() && (
                        <div className="text-sm text-green-600 dark:text-green-400 font-bold animate-bounce-soft">
                          ✓ Selected
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                Payment Method
              </h2>
              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'wallet'
                      ? 'border-[#C94B1D] bg-orange-50 dark:bg-[#2a1208] shadow-lg scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 hover:border-[#C94B1D] dark:hover:border-[#F37843] hover:scale-[1.01] bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-3"><Icon name="wallet" size={28}/></span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Wallet</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Available Balance: <span className="font-bold text-green-600 dark:text-green-400">₹{walletBalance.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'wallet' && (
                      <span className="text-[#C94B1D] dark:text-[#F37843] text-2xl animate-scale-up">✓</span>
                    )}
                  </div>
                  {paymentMethod === 'wallet' && walletBalance < total && (
                    <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg font-medium animate-slide-down">
                      Insufficient balance. Please add ₹{(total - walletBalance).toFixed(2)} more.
                    </div>
                  )}
                </div>
                <div
                  onClick={() => setPaymentMethod('mock')}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'mock'
                      ? 'border-[#C94B1D] bg-orange-50 dark:bg-[#2a1208] shadow-lg scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 hover:border-[#C94B1D] dark:hover:border-[#F37843] hover:scale-[1.01] bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500"><Icon name="creditCard" size={28}/></span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Other Payment Methods</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Credit/Debit Card, UPI, Net Banking
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'mock' && (
                      <span className="text-[#C94B1D] dark:text-[#F37843] text-2xl animate-scale-up">✓</span>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'cod'
                      ? 'border-[#C94B1D] bg-orange-50 dark:bg-[#2a1208] shadow-lg scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 hover:border-[#C94B1D] dark:hover:border-[#F37843] hover:scale-[1.01] bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-3 text-gray-500"><Icon name="creditCard" size={28}/></span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Cash on Delivery</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Pay when you receive your order
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && (
                      <span className="text-[#C94B1D] dark:text-[#F37843] text-2xl animate-scale-up">✓</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Loyalty Program Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                Campus Loyalty Program
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-5 shadow-lg backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Available Points:</span>
                    <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                      {loyaltyPoints.toFixed(1)} pts (₹{loyaltyPoints.toFixed(2)})
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">You'll Earn:</span>
                    <span className="font-bold text-lg text-green-600 dark:text-green-400">+{pointsToEarn.toFixed(1)} pts</span>
                  </div>
                  {useLoyaltyPoints && loyaltyPoints > 0 && (
                    <div className="flex justify-between items-center bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg border-2 border-green-400 dark:border-green-600">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Points Applied:</span>
                      <span className="font-bold text-lg text-green-600 dark:text-green-400">-{loyaltyDiscount.toFixed(1)} pts</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 bg-white/30 dark:bg-gray-800/30 p-2 rounded-lg">
                    Earn 0.5 points for every ₹100 spent • 1 point = ₹1 discount
                  </p>
                  {useLoyaltyPoints && loyaltyPoints > 0 && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 p-3 rounded-lg flex items-center animate-pulse-soft">
                      You're saving ₹{loyaltyDiscount.toFixed(2)} with loyalty points!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                Order Summary
              </h2>
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="font-medium">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t-2 dark:border-gray-600 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {subtotal < 100 && (
                    <div className="flex justify-between text-amber-600 dark:text-amber-400">
                      <span className="text-sm">Delivery Fee (orders below ₹100)</span>
                      <span className="font-semibold">₹{deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span className="text-sm">Platform Fee</span>
                    <span className="font-semibold">₹{PLATFORM_FEE.toFixed(2)}</span>
                  </div>
                  {loyaltyDiscount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg animate-slide-down">
                      <span className="font-medium">Loyalty Discount</span>
                      <span className="font-bold">-₹{loyaltyDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white pt-3 border-t-2 dark:border-gray-600">
                    <span>Total</span>
                    <span className="text-[#C94B1D] dark:text-[#F37843]">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || !selectedSlot || !isOrderingOpen || (paymentMethod === 'wallet' && walletBalance < total)}
              className="w-full bg-[#C94B1D] dark:bg-[#E85A25] text-white py-4 rounded-xl hover:shadow-glow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : !isOrderingOpen ? (
                'Ordering Closed'
              ) : (
                `Place Order & Pay ₹${total.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
