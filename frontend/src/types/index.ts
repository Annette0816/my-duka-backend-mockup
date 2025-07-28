// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Merchant extends User {
  is_superuser: boolean;
}

export interface Admin extends User {
  merchant_id: number;
  store_id?: number;
}

export interface Clerk extends User {
  admin_id?: number;
  store_id?: number;
}

export type UserType = 'merchant' | 'admin' | 'clerk';

// Authentication Types
export interface AuthState {
  user: User | null;
  userType: UserType | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user_type: UserType;
  user_id: number;
}

// Store Types
export interface Store {
  id: number;
  name: string;
  location: string;
  merchant_id: number;
  created_at: string;
  updated_at: string;
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description?: string;
  category: string;
  buying_price: number;
  selling_price: number;
  merchant_id: number;
  created_at: string;
  updated_at: string;
}

// Inventory Types
export interface InventoryRecord {
  id: number;
  product_id: number;
  store_id: number;
  clerk_id?: number;
  quantity_received: number;
  items_in_stock: number;
  items_spoilt: number;
  payment_status: boolean;
  buying_price_at_record: number;
  selling_price_at_record: number;
  date_recorded: string;
  updated_at: string;
  product?: Product;
  store?: Store;
  clerk?: Clerk;
}

export interface InventoryFormData {
  product_id: number;
  quantity_received: number;
  items_in_stock: number;
  items_spoilt: number;
  payment_status: boolean;
  buying_price_at_record: number;
  selling_price_at_record: number;
}

// Supply Request Types
export interface SupplyRequest {
  id: number;
  product_id: number;
  store_id: number;
  requested_by_clerk_id?: number;
  approved_by_admin_id?: number;
  quantity_requested: number;
  status: 'Pending' | 'Approved' | 'Declined';
  notes?: string;
  request_date: string;
  response_date?: string;
  updated_at: string;
  product?: Product;
  store?: Store;
  clerk?: Clerk;
  admin?: Admin;
}

export interface SupplyRequestFormData {
  product_id: number;
  quantity_requested: number;
  notes?: string;
}

// Transaction Types
export interface Transaction {
  id: number;
  product_id: number;
  store_id: number;
  clerk_id?: number;
  transaction_type: 'Sale' | 'Purchase' | 'Return';
  quantity: number;
  unit_price: number;
  total_amount: number;
  transaction_date: string;
  created_at: string;
  product?: Product;
  store?: Store;
  clerk?: Clerk;
}

// Report Types
export interface ReportData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface SalesReport {
  period: string;
  total_sales: number;
  total_revenue: number;
  top_products: {
    product_name: string;
    quantity_sold: number;
    revenue: number;
  }[];
}

export interface InventoryReport {
  total_products: number;
  total_stock: number;
  low_stock_products: Product[];
  spoilt_items: number;
}

export interface PaymentReport {
  paid_suppliers: number;
  unpaid_suppliers: number;
  total_paid_amount: number;
  total_unpaid_amount: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Form Types
export interface FormErrors {
  [key: string]: string;
}

// Dashboard Types
export interface DashboardStats {
  total_products: number;
  total_inventory: number;
  pending_supply_requests: number;
  low_stock_alerts: number;
  recent_transactions: Transaction[];
}

// Filter Types
export interface DateFilter {
  start_date?: string;
  end_date?: string;
}

export interface InventoryFilter extends DateFilter {
  store_id?: number;
  product_id?: number;
  payment_status?: boolean;
}

export interface ReportFilter extends DateFilter {
  store_id?: number;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}