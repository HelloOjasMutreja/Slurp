import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { slotAPI, orderAPI, paymentAPI, walletAPI } from '../utils/api';

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
          <h1 className="text-3xl font-bold text-primary-600 dark:text-orange-400 mb-8">
            Checkout
          </h1>

          <div className="space-y-8">
            {/* Delivery Details */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2">📍</span> Delivery Details
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
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Slot Selection */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2">⏰</span> Select Delivery Slot
              </h2>
              {!isOrderingOpen ? (
                <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-500 rounded-xl p-6 text-center animate-fade-in">
                  <div className="text-red-600 dark:text-red-400 text-xl font-bold mb-3 flex items-center justify-center">
                    <span className="text-3xl mr-2">⏰</span> Ordering Closed for Today
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    Please come back tomorrow between <span className="font-bold text-primary-600 dark:text-orange-400">11 AM – 7 PM</span> to place your order.
                  </p>
                </div>
              ) : slots.length === 0 ? (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-500 rounded-xl p-6 text-center animate-fade-in">
                  <div className="text-yellow-600 dark:text-yellow-400 text-xl font-bold mb-3 flex items-center justify-center">
                    <span className="text-3xl mr-2">⚠️</span> No Available Slots
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">
                    All delivery slots for today have passed. Please come back tomorrow between <span className="font-bold text-primary-600 dark:text-orange-400">11 AM – 7 PM</span>.
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
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-glow scale-105 text-primary-700 dark:text-orange-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-orange-400 hover:scale-105 hover:shadow-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
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
                <span className="mr-2">💳</span> Payment Method
              </h2>
              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'wallet'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-lg scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-orange-400 hover:scale-[1.01] bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">💰</span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Wallet</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Available Balance: <span className="font-bold text-green-600 dark:text-green-400">₹{walletBalance.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'wallet' && (
                      <span className="text-primary-600 dark:text-orange-400 text-2xl animate-scale-up">✓</span>
                    )}
                  </div>
                  {paymentMethod === 'wallet' && walletBalance < total && (
                    <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg font-medium animate-slide-down">
                      ⚠️ Insufficient balance. Please add ₹{(total - walletBalance).toFixed(2)} more.
                    </div>
                  )}
                </div>
                <div
                  onClick={() => setPaymentMethod('mock')}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'mock'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-lg scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-orange-400 hover:scale-[1.01] bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">💳</span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Other Payment Methods</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Credit/Debit Card, UPI, Net Banking
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'mock' && (
                      <span className="text-primary-600 dark:text-orange-400 text-2xl animate-scale-up">✓</span>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'cod'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 shadow-lg scale-[1.02]'
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-orange-400 hover:scale-[1.01] bg-white dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">💵</span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Cash on Delivery</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          Pay when you receive your order
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && (
                      <span className="text-primary-600 dark:text-orange-400 text-2xl animate-scale-up">✓</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Loyalty Program Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2">🏫</span> Campus Loyalty Program
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
                    ✨ Earn 0.5 points for every ₹100 spent • 1 point = ₹1 discount
                  </p>
                  {useLoyaltyPoints && loyaltyPoints > 0 && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 p-3 rounded-lg flex items-center animate-pulse-soft">
                      <span className="mr-2">🎉</span> 
                      You're saving ₹{loyaltyDiscount.toFixed(2)} with loyalty points!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2">📋</span> Order Summary
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
                      <span className="font-medium">🎉 Loyalty Discount</span>
                      <span className="font-bold">-₹{loyaltyDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white pt-3 border-t-2 dark:border-gray-600">
                    <span>Total</span>
                    <span className="text-primary-600 dark:text-orange-400">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || !selectedSlot || !isOrderingOpen || (paymentMethod === 'wallet' && walletBalance < total)}
              className="w-full bg-primary-500 dark:bg-orange-500 text-white py-4 rounded-xl hover:shadow-glow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-bold text-lg"
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
                '🔒 Ordering Closed'
              ) : (
                `Place Order & Pay ₹${total.toFixed(2)} →`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
