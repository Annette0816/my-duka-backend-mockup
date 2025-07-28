import { apiService } from './api';
import { SalesReport, InventoryReport, PaymentReport, ReportFilter } from '../types';

export const reportService = {
  // Get sales report
  getSalesReport: async (filters?: ReportFilter) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    if (filters?.period) params.append('period', filters.period);
    
    const queryString = params.toString();
    const url = queryString ? `/reports/sales?${queryString}` : '/reports/sales';
    
    return await apiService.get<SalesReport>(url);
  },

  // Get inventory report
  getInventoryReport: async (filters?: ReportFilter) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/reports/inventory?${queryString}` : '/reports/inventory';
    
    return await apiService.get<InventoryReport>(url);
  },

  // Get payment report
  getPaymentReport: async (filters?: ReportFilter) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/reports/payments?${queryString}` : '/reports/payments';
    
    return await apiService.get<PaymentReport>(url);
  },

  // Get dashboard statistics
  getDashboardStats: async (storeId?: number) => {
    const url = storeId ? `/reports/dashboard?store_id=${storeId}` : '/reports/dashboard';
    return await apiService.get(url);
  },

  // Get performance report by store
  getStorePerformance: async (storeId: number, filters?: ReportFilter) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.period) params.append('period', filters.period);
    
    const queryString = params.toString();
    const url = queryString ? `/reports/store/${storeId}/performance?${queryString}` : `/reports/store/${storeId}/performance`;
    
    return await apiService.get(url);
  },

  // Get product performance report
  getProductPerformance: async (productId: number, filters?: ReportFilter) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/reports/product/${productId}/performance?${queryString}` : `/reports/product/${productId}/performance`;
    
    return await apiService.get(url);
  },

  // Export report data
  exportReport: async (reportType: string, format: 'csv' | 'pdf', filters?: ReportFilter) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    params.append('format', format);
    
    const queryString = params.toString();
    const url = `/reports/${reportType}/export?${queryString}`;
    
    return await apiService.get(url, {
      responseType: 'blob',
    });
  },
};