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
