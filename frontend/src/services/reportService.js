import { apiService } from './api';

export const reportService = {
  // Get sales report
  getSalesReport: async (filters) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    if (filters?.period) params.append('period', filters.period);
    
    const queryString = params.toString();
    const url = queryString ? `/reports/sales?${queryString}` : '/reports/sales';
    
    return await apiService.get(url);
  },

  // Get inventory report
  getInventoryReport: async (filters) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/reports/inventory?${queryString}` : '/reports/inventory';
    
    return await apiService.get(url);
  },

  // Get payment report
  getPaymentReport: async (filters) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/reports/payments?${queryString}` : '/reports/payments';
    
    return await apiService.get(url);
  },

  // Get dashboard statistics
  getDashboardStats: async (storeId) => {
    const url = storeId ? `/reports/dashboard?store_id=${storeId}` : '/reports/dashboard';
    return await apiService.get(url);
  },

  // Get performance report by store
  getStorePerformance: async (storeId, filters) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.period) params.append('period', filters.period);
    
    const queryString = params.toString();
    const url = queryString ? `/reports/store/${storeId}/performance?${queryString}` : `/reports/store/${storeId}/performance`;
    
    return await apiService.get(url);
  },

  // Export report data
  exportReport: async (reportType, format, filters) => {
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