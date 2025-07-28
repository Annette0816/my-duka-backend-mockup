import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, userType } = useAuth();
  const { notifications } = useAppSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
  };

  const unreadNotifications = notifications.length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-2xl font-semibold text-gray-900">
            MyDuka Inventory
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="relative flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 rounded-full p-2">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.username || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {userType}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;