import { useState, useEffect } from 'react';
import { walletAPI } from '../utils/api';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      const [balanceResponse, transactionsResponse] = await Promise.all([
        walletAPI.getBalance(),
        walletAPI.getTransactions(),
      ]);
      setBalance(balanceResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (err) {
      console.error('Error loading wallet data:', err);
      setError('Failed to load wallet data');
    }
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const response = await walletAPI.addMoney(amountValue);
      setBalance(response.data.balance);
      setSuccess(response.data.message);
      setAmount('');
      await loadWalletData(); // Reload to get updated transactions
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add money');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-all duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 animate-slide-up">💰 My Wallet</h1>

        {/* Balance Card */}
        <div className="bg-primary-500 dark:bg-orange-500 rounded-2xl shadow-lg dark:shadow-dark-glass p-8 mb-8 text-white animate-fade-in border border-purple-200/50 dark:border-purple-700/50">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90 mb-2">Available Balance</p>
              <p className="text-4xl font-bold">₹{balance.toFixed(2)}</p>
            </div>
            <div className="text-6xl opacity-30">💰</div>
          </div>
        </div>

        {/* Add Money Section */}
        <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50 animate-slide-up transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="mr-2">💵</span> Add Money
          </h2>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-4 animate-slide-down">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl mb-4 animate-slide-down">
              {success}
            </div>
          )}

          <form onSubmit={handleAddMoney} className="flex gap-4">
            <div className="flex-1">
              <input
                type="number"
                step="0.01"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-500 dark:bg-orange-500 text-white px-6 py-3 rounded-xl hover:shadow-glow hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-semibold"
            >
              {loading ? 'Processing...' : 'Add Money'}
            </button>
          </form>

          {/* Quick Amount Buttons */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <button
              onClick={() => setAmount('100')}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 font-medium"
            >
              ₹100
            </button>
            <button
              onClick={() => setAmount('500')}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 font-medium"
            >
              ₹500
            </button>
            <button
              onClick={() => setAmount('1000')}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 font-medium"
            >
              ₹1000
            </button>
            <button
              onClick={() => setAmount('2000')}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 font-medium"
            >
              ₹2000
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="backdrop-blur-lg bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-dark-glass p-6 border border-gray-200/50 dark:border-gray-700/50 animate-slide-up transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="mr-2">📋</span> Transaction History
          </h2>
          
          {transactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        transaction.type === 'CREDIT'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'CREDIT' ? '+' : '-'}₹
                      {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Balance: ₹{transaction.balanceAfter.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
