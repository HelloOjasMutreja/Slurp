// LocalStorage mock — no backend required
import { VENDORS, MENU_ITEMS, DELIVERY_SLOTS, SEED_USERS } from './mockData';

// ── helpers ──────────────────────────────────────────────────────────────────

const delay = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));
const ok = (data) => ({ data });
const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

const apiError = (message) => {
  const err = new Error(message);
  err.response = { data: { message, error: message } };
  return err;
};

// ── storage helpers ───────────────────────────────────────────────────────────

const getUsers = () => {
  const raw = localStorage.getItem('slurp_users');
  if (!raw) {
    localStorage.setItem('slurp_users', JSON.stringify(SEED_USERS));
    return [...SEED_USERS];
  }
  return JSON.parse(raw);
};

const saveUsers = (users) => localStorage.setItem('slurp_users', JSON.stringify(users));

const getOrders = () => {
  const raw = localStorage.getItem('slurp_orders');
  return raw ? JSON.parse(raw) : [];
};

const saveOrders = (orders) => localStorage.setItem('slurp_orders', JSON.stringify(orders));

const getCurrentUser = () => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

const getWallet = (userId) => {
  const raw = localStorage.getItem(`slurp_wallet_${userId}`);
  return raw ? JSON.parse(raw) : { balance: 100, loyaltyPoints: 0, transactions: [] };
};

const saveWallet = (userId, wallet) =>
  localStorage.setItem(`slurp_wallet_${userId}`, JSON.stringify(wallet));

// ── authAPI ───────────────────────────────────────────────────────────────────

export const authAPI = {
  login: async ({ username, password }) => {
    await delay();
    const user = getUsers().find((u) => u.username === username && u.password === password);
    if (!user) throw apiError('Invalid username or password');
    const token = `MOCK_${user.id}_${Date.now()}`;
    return ok({ token, username: user.username, email: user.email, role: user.role, userId: user.id });
  },

  register: async ({ username, email, password, fullName, phone, address, role }) => {
    await delay();
    const users = getUsers();
    if (users.find((u) => u.username === username)) throw apiError('Username already exists');
    const newUser = {
      id: 'u_' + uid(),
      username,
      email,
      password,
      fullName,
      phone,
      address,
      role: role || 'CUSTOMER',
    };
    saveUsers([...users, newUser]);
    const token = `MOCK_${newUser.id}_${Date.now()}`;
    return ok({ token, username: newUser.username, email: newUser.email, role: newUser.role, userId: newUser.id });
  },
};

// ── vendorAPI ─────────────────────────────────────────────────────────────────

export const vendorAPI = {
  getAll: async () => {
    await delay();
    return ok(VENDORS);
  },

  getById: async (id) => {
    await delay();
    const vendor = VENDORS.find((v) => v.id === id);
    if (!vendor) throw apiError('Vendor not found');
    return ok(vendor);
  },
};

// ── menuAPI ───────────────────────────────────────────────────────────────────

export const menuAPI = {
  getByVendor: async (vendorId) => {
    await delay();
    return ok(MENU_ITEMS.filter((m) => m.vendorId === vendorId));
  },

  getById: async (id) => {
    await delay();
    const item = MENU_ITEMS.find((m) => m.id === id);
    if (!item) throw apiError('Menu item not found');
    return ok(item);
  },
};

// ── slotAPI ───────────────────────────────────────────────────────────────────

export const slotAPI = {
  getActive: async () => {
    await delay();
    return ok({ slots: DELIVERY_SLOTS, isOrderingOpen: true });
  },
};

// ── orderAPI ──────────────────────────────────────────────────────────────────

export const orderAPI = {
  create: async (orderData) => {
    await delay();
    const currentUser = getCurrentUser();
    const users = getUsers();
    const user = users.find((u) => u.id === currentUser?.userId);
    const vendor = VENDORS.find((v) => v.id === orderData.vendorId);
    const slot = DELIVERY_SLOTS.find((s) => s.id === orderData.slotId);

    const orderItems = orderData.items.map((item) => {
      const menuItem = MENU_ITEMS.find((m) => m.id === item.menuItemId);
      return { id: uid(), menuItem, quantity: item.quantity, subtotal: menuItem.price * item.quantity };
    });

    const subtotal = orderItems.reduce((sum, i) => sum + i.subtotal, 0);
    const PLATFORM_FEE = 2;
    const DELIVERY_FEE = subtotal < 100 ? 10 : 0;
    const baseTotal = subtotal + PLATFORM_FEE + DELIVERY_FEE;

    // Apply loyalty discount
    let loyaltyDiscount = 0;
    if (orderData.useLoyaltyPoints && user) {
      const wallet = getWallet(user.id);
      loyaltyDiscount = parseFloat(Math.min(wallet.loyaltyPoints, baseTotal).toFixed(2));
    }

    const total = parseFloat((baseTotal - loyaltyDiscount).toFixed(2));

    if (orderData.paymentMethod === 'wallet' && user) {
      // Deduct wallet balance for wallet payments
      const wallet = getWallet(user.id);
      if (wallet.balance < total) throw apiError('Insufficient wallet balance');
      wallet.balance = parseFloat((wallet.balance - total).toFixed(2));
      wallet.transactions.unshift({
        id: uid(),
        type: 'DEBIT',
        amount: total,
        description: `Order payment to ${vendor?.name}`,
        balanceAfter: wallet.balance,
        createdAt: new Date().toISOString(),
      });
      const pointsEarned = parseFloat((subtotal * 0.005).toFixed(2));
      wallet.loyaltyPoints = parseFloat(
        Math.max(0, wallet.loyaltyPoints + pointsEarned - loyaltyDiscount).toFixed(2),
      );
      saveWallet(user.id, wallet);
    } else if (orderData.useLoyaltyPoints && user) {
      // Deduct spent loyalty points for non-wallet payments
      const wallet = getWallet(user.id);
      wallet.loyaltyPoints = parseFloat(Math.max(0, wallet.loyaltyPoints - loyaltyDiscount).toFixed(2));
      saveWallet(user.id, wallet);
    }

    const order = {
      id: uid(),
      customer: { id: user?.id, fullName: user?.fullName, username: user?.username },
      vendor,
      items: orderItems,
      status: 'CONFIRMED',
      total,
      deliverySlot: slot,
      deliveryAddress: orderData.deliveryAddress,
      customerPhone: orderData.customerPhone,
      paymentMethod: orderData.paymentMethod,
      createdAt: new Date().toISOString(),
      userId: currentUser?.userId,
    };

    saveOrders([order, ...getOrders()]);
    return ok(order);
  },

  getMyOrders: async () => {
    await delay();
    const currentUser = getCurrentUser();
    return ok(getOrders().filter((o) => o.userId === currentUser?.userId));
  },

  getById: async (id) => {
    await delay();
    const order = getOrders().find((o) => o.id === id);
    if (!order) throw apiError('Order not found');
    return ok(order);
  },
};

// ── paymentAPI ────────────────────────────────────────────────────────────────

export const paymentAPI = {
  createOrder: async (orderId) => {
    await delay();
    return ok({ providerOrderId: `MOCK_PROVIDER_${orderId}` });
  },

  verify: async ({ providerOrderId }) => {
    await delay();
    const orderId = providerOrderId.replace('MOCK_PROVIDER_', '');
    const orders = getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = 'CONFIRMED';
      const currentUser = getCurrentUser();
      if (currentUser) {
        const wallet = getWallet(currentUser.userId);
        const pointsEarned = parseFloat((order.total * 0.005).toFixed(2));
        wallet.loyaltyPoints = parseFloat((wallet.loyaltyPoints + pointsEarned).toFixed(2));
        wallet.transactions.unshift({
          id: uid(),
          type: 'DEBIT',
          amount: order.total,
          description: `Online payment for order to ${order.vendor?.name}`,
          balanceAfter: wallet.balance,
          createdAt: new Date().toISOString(),
        });
        saveWallet(currentUser.userId, wallet);
      }
      saveOrders(orders);
    }
    return ok({ success: true });
  },

  getByOrderId: async (orderId) => {
    await delay();
    const order = getOrders().find((o) => o.id === orderId);
    return ok({ orderId, status: order?.status || 'UNKNOWN' });
  },

  payWithWallet: async (orderId) => {
    await delay();
    const orders = getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) throw apiError('Order not found');
    const currentUser = getCurrentUser();
    if (currentUser) {
      const wallet = getWallet(currentUser.userId);
      if (wallet.balance < order.total) throw apiError('Insufficient wallet balance');
      wallet.balance = parseFloat((wallet.balance - order.total).toFixed(2));
      wallet.transactions.unshift({
        id: uid(),
        type: 'DEBIT',
        amount: order.total,
        description: `Wallet payment for order to ${order.vendor?.name}`,
        balanceAfter: wallet.balance,
        createdAt: new Date().toISOString(),
      });
      const pointsEarned = parseFloat((order.total * 0.005).toFixed(2));
      wallet.loyaltyPoints = parseFloat((wallet.loyaltyPoints + pointsEarned).toFixed(2));
      saveWallet(currentUser.userId, wallet);
    }
    order.status = 'CONFIRMED';
    saveOrders(orders);
    return ok({ success: true });
  },

  confirmCOD: async (orderId) => {
    await delay();
    const orders = getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = 'CONFIRMED';
      const currentUser = getCurrentUser();
      if (currentUser) {
        const wallet = getWallet(currentUser.userId);
        const pointsEarned = parseFloat((order.total * 0.005).toFixed(2));
        wallet.loyaltyPoints = parseFloat((wallet.loyaltyPoints + pointsEarned).toFixed(2));
        saveWallet(currentUser.userId, wallet);
      }
      saveOrders(orders);
    }
    return ok({ success: true });
  },
};

// ── adminAPI ──────────────────────────────────────────────────────────────────

export const adminAPI = {
  getAllOrders: async () => {
    await delay();
    return ok(getOrders());
  },

  getAllVendors: async () => {
    await delay();
    return ok(VENDORS);
  },

  getAllUsers: async () => {
    await delay();
    // Strip passwords before returning
    return ok(getUsers().map((u) => { const { password: _password, ...safe } = u; return safe; }));
  },

  getStats: async () => {
    await delay();
    const orders = getOrders();
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    return ok({
      totalOrders: orders.length,
      totalVendors: VENDORS.length,
      totalUsers: getUsers().length,
      totalRevenue,
    });
  },

  updateOrderStatus: async (id, status) => {
    await delay();
    const orders = getOrders();
    const order = orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
      saveOrders(orders);
    }
    return ok({ success: true });
  },
};

// ── walletAPI ─────────────────────────────────────────────────────────────────

export const walletAPI = {
  addMoney: async (amount) => {
    await delay();
    const currentUser = getCurrentUser();
    if (!currentUser) throw apiError('Not authenticated');
    const wallet = getWallet(currentUser.userId);
    wallet.balance = parseFloat((wallet.balance + amount).toFixed(2));
    wallet.transactions.unshift({
      id: uid(),
      type: 'CREDIT',
      amount,
      description: 'Money added to wallet',
      balanceAfter: wallet.balance,
      createdAt: new Date().toISOString(),
    });
    saveWallet(currentUser.userId, wallet);
    return ok({ balance: wallet.balance, message: `\u20B9${amount} added to your wallet successfully!` });
  },

  getBalance: async () => {
    await delay();
    const currentUser = getCurrentUser();
    if (!currentUser) return ok(0);
    return ok(getWallet(currentUser.userId).balance);
  },

  getTransactions: async () => {
    await delay();
    const currentUser = getCurrentUser();
    if (!currentUser) return ok([]);
    return ok(getWallet(currentUser.userId).transactions);
  },

  getLoyaltyPoints: async () => {
    await delay();
    const currentUser = getCurrentUser();
    if (!currentUser) return ok(0);
    return ok(getWallet(currentUser.userId).loyaltyPoints);
  },

  calculateLoyaltyPoints: async (orderTotal) => {
    await delay();
    const currentUser = getCurrentUser();
    if (!currentUser) return ok({ currentPoints: 0, pointsEarnedFromOrder: 0 });
    const wallet = getWallet(currentUser.userId);
    return ok({
      currentPoints: wallet.loyaltyPoints,
      pointsEarnedFromOrder: parseFloat((orderTotal * 0.005).toFixed(2)),
    });
  },
};

export default {};
