import { useState, useEffect } from 'react';
import { orderAPI } from '../utils/api';
import { Icon, useT, H, Body, Card, Badge, Spin, Container } from '../design-system';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const tok = useT();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusVariant = (status) => {
    const map = {
      PENDING: 'wrn',
      CONFIRMED: 'inf',
      PREPARING: 'inf',
      READY: 'pri',
      OUT_FOR_DELIVERY: 'wrn',
      DELIVERED: 'suc',
      CANCELLED: 'err',
    };
    return map[status] || 'default';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: 16 }}>
        <Spin size={48} />
        <Body muted>Loading orders...</Body>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="ds-fade-in" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Icon name="package" size={56} color={tok.color.textMut} />
          </div>
          <H l={2} s={{ marginBottom: 8 }}>No orders yet</H>
          <Body muted>Start ordering from your favourite vendors!</Body>
        </div>
      </div>
    );
  }

  return (
    <Container s={{ paddingTop: 40, paddingBottom: 48 }}>
      <H l={1} s={{ color: tok.color.pri, marginBottom: 32 }} className="ds-slide-up">My Orders</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="ds-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <Card hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <H l={4} s={{ marginBottom: 4 }}>Order #{order.id}</H>
                  <Body muted sz="sm">{order.vendor.name}</Body>
                  <Body muted sz="sm">{new Date(order.createdAt).toLocaleString()}</Body>
                </div>
                <Badge v={statusVariant(order.status)} dot>{order.status}</Badge>
              </div>

              <div style={{ borderTop: `1px solid ${tok.color.border}`, paddingTop: 16 }}>
                <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 600, color: tok.color.text, display: 'block', marginBottom: 8 }}>Items</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', background: tok.color.bgAlt, borderRadius: tok.r.md, padding: '7px 12px' }}>
                      <span style={{ fontFamily: tok.font.body, fontSize: 13, color: tok.color.text, fontWeight: 500 }}>
                        {item.menuItem.name} × {item.quantity}
                      </span>
                      <span style={{ fontFamily: tok.font.body, fontSize: 13, fontWeight: 700, color: tok.color.text }}>
                        ₹{item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: tok.color.bgAlt, borderRadius: tok.r.lg, padding: '12px 16px' }}>
                  <div>
                    <Body sz="sm" muted>
                      <strong>Slot:</strong> {order.deliverySlot.displayName}
                    </Body>
                    <Body sz="sm" muted>
                      <strong>Address:</strong> {order.deliveryAddress}
                    </Body>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Body sz="sm" muted>Total</Body>
                    <span style={{ fontFamily: tok.font.display, fontSize: 22, fontWeight: 800, color: tok.color.pri }}>
                      ₹{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Orders;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await orderAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700',
      CONFIRMED: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-700',
      PREPARING: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-700',
      READY: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700',
      OUT_FOR_DELIVERY: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border border-orange-200 dark:border-orange-700',
      DELIVERED: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-700',
      CANCELLED: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-700',
    };
    return colors[status] || 'bg-gray-100 dark:bg-gray-800/30 text-gray-800 dark:text-gray-400';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#C94B1D] dark:border-[#F37843] mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 dark:text-gray-400 animate-pulse-soft">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-all duration-500">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-4 animate-bounce-soft"><Icon name="package" size={48} color="#C8C1B8"/></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No orders yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start ordering from your favorite vendors!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#C94B1D] dark:text-[#F37843] mb-8 animate-slide-up">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <div 
              key={order.id} 
              className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 border border-gray-200/50 dark:border-gray-700/50 hover:scale-[1.01] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{order.vendor.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Items:</h3>
                <ul className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                      <span className="font-medium">
                        {item.menuItem.name} x {item.quantity}
                      </span>
                      <span className="font-bold">₹{item.subtotal.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center border-t dark:border-gray-700 pt-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Delivery Slot:</span> {order.deliverySlot.displayName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Address:</span> {order.deliveryAddress}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total</p>
                    <p className="text-2xl font-bold text-[#C94B1D] dark:text-[#F37843]">
                      ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
