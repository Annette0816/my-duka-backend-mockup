import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Store, 
  FileText,
  Settings,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../hooks/redux';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['merchant', 'admin', 'clerk'],
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    roles: ['merchant', 'admin', 'clerk'],
  },
  {
    name: 'Supply Requests',
    href: '/supply-requests',
    icon: ShoppingCart,
    roles: ['admin', 'clerk'],
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['merchant', 'admin'],
  },
  {
    name: 'Stores',
    href: '/stores',
    icon: Store,
    roles: ['merchant'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['merchant', 'admin'],
  },
  {
    name: 'Products',
    href: '/products',
    icon: FileText,
    roles: ['merchant', 'admin'],
  },
];

const Sidebar: React.FC = () => {
  const { userType } = useAuth();
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  const filteredMenuItems = menuItems.filter(item => 
    userType && item.roles.includes(userType)
  );

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ${
      sidebarOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-primary-600">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-white" />
            {sidebarOpen && (
              <span className="ml-2 text-white text-xl font-bold">MyDuka</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {filteredMenuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && (
                <span className="ml-3">{item.name}</span>
              )}
            </NavLink>
          ))}

          {/* Quick Actions */}
          {sidebarOpen && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quick Actions
              </p>
              <div className="mt-2 space-y-1">
                {userType === 'clerk' && (
                  <NavLink
                    to="/inventory/new"
                    className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 mr-3" />
                    Add Inventory
                  </NavLink>
                )}
                {(userType === 'admin' || userType === 'clerk') && (
                  <NavLink
                    to="/supply-requests/new"
                    className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100"
                  >
                    <ShoppingCart className="h-4 w-4 mr-3" />
                    Request Supply
                  </NavLink>
                )}
                <NavLink
                  to="/reports"
                  className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100"
                >
                  <AlertTriangle className="h-4 w-4 mr-3" />
                  View Alerts
                </NavLink>
              </div>
            </div>
          )}
        </nav>

        {/* Settings */}
        <div className="p-2 border-t border-gray-200">
          <NavLink
            to="/settings"
            className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && (
              <span className="ml-3">Settings</span>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;