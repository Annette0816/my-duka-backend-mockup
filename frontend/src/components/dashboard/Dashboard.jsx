import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';
import { fetchDashboardStats } from '../../store/slices/reportSlice';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userType } = useAuth();
  const { dashboardStats, loading } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const stats = [
    {
      name: 'Total Products',
      value: dashboardStats?.total_products || 0,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Inventory',
      value: dashboardStats?.total_inventory || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Pending Requests',
      value: dashboardStats?.pending_supply_requests || 0,
      icon: ShoppingCart,
      color: 'bg-yellow-500',
    },
    {
      name: 'Low Stock Alerts',
      value: dashboardStats?.low_stock_alerts || 0,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 capitalize">
          Welcome back, {userType}!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {dashboardStats?.recent_transactions?.length > 0 ? (
              dashboardStats.recent_transactions.slice(0, 5).map((transaction, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.product?.name || 'Unknown Product'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.transaction_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${transaction.total_amount?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {transaction.transaction_type}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent transactions</p>
            )}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {userType === 'clerk' && (
              <button className="w-full btn-primary text-left">
                Add New Inventory Record
              </button>
            )}
            {(userType === 'admin' || userType === 'clerk') && (
              <button className="w-full btn-outline text-left">
                Create Supply Request
              </button>
            )}
            {(userType === 'merchant' || userType === 'admin') && (
              <button className="w-full btn-outline text-left">
                View Reports
              </button>
            )}
            <button className="w-full btn-outline text-left">
              Check Low Stock Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;