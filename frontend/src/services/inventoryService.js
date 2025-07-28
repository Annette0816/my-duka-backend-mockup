import { apiService } from './api';

export const inventoryService = {
  // Get all inventory records
  getInventoryRecords: async (filters) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    if (filters?.product_id) params.append('product_id', filters.product_id.toString());
    if (filters?.payment_status !== undefined) params.append('payment_status', filters.payment_status.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/inventory?${queryString}` : '/inventory';
    
    return await apiService.get(url);
  },

  // Get inventory record by ID
  getInventoryRecord: async (id) => {
    return await apiService.get(`/inventory/${id}`);
  },

  // Create new inventory record
  createInventoryRecord: async (data) => {
    return await apiService.post('/inventory', data);
  },

  // Update inventory record
  updateInventoryRecord: async (id, data) => {
    return await apiService.put(`/inventory/${id}`, data);
  },

  // Delete inventory record
  deleteInventoryRecord: async (id) => {
    return await apiService.delete(`/inventory/${id}`);
  },

  // Update payment status
  updatePaymentStatus: async (id, paymentStatus) => {
    return await apiService.put(`/inventory/${id}/payment-status`, {
      payment_status: paymentStatus
    });
  },

  // Get low stock alerts
  getLowStockAlerts: async () => {
    return await apiService.get('/inventory/low-stock');
  },

  // Get inventory by store
  getInventoryByStore: async (storeId) => {
    return await apiService.get(`/inventory/store/${storeId}`);
  },
};