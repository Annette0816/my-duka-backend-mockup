import { apiService } from './api';
import { InventoryRecord, InventoryFormData, InventoryFilter, PaginatedResponse } from '../types';

export const inventoryService = {
  // Get all inventory records
  getInventoryRecords: async (filters?: InventoryFilter) => {
    const params = new URLSearchParams();
    
    if (filters?.start_date) params.append('start_date', filters.start_date);
    if (filters?.end_date) params.append('end_date', filters.end_date);
    if (filters?.store_id) params.append('store_id', filters.store_id.toString());
    if (filters?.product_id) params.append('product_id', filters.product_id.toString());
    if (filters?.payment_status !== undefined) params.append('payment_status', filters.payment_status.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/inventory?${queryString}` : '/inventory';
    
    return await apiService.get<PaginatedResponse<InventoryRecord>>(url);
  },

  // Get inventory record by ID
  getInventoryRecord: async (id: number) => {
    return await apiService.get<InventoryRecord>(`/inventory/${id}`);
  },

  // Create new inventory record
  createInventoryRecord: async (data: InventoryFormData) => {
    return await apiService.post<InventoryRecord>('/inventory', data);
  },

  // Update inventory record
  updateInventoryRecord: async (id: number, data: Partial<InventoryFormData>) => {
    return await apiService.put<InventoryRecord>(`/inventory/${id}`, data);
  },

  // Delete inventory record
  deleteInventoryRecord: async (id: number) => {
    return await apiService.delete(`/inventory/${id}`);
  },

  // Update payment status
  updatePaymentStatus: async (id: number, paymentStatus: boolean) => {
    return await apiService.put<InventoryRecord>(`/inventory/${id}/payment-status`, {
      payment_status: paymentStatus
    });
  },

  // Get low stock alerts
  getLowStockAlerts: async () => {
    return await apiService.get<InventoryRecord[]>('/inventory/low-stock');
  },

  // Get inventory by store
  getInventoryByStore: async (storeId: number) => {
    return await apiService.get<InventoryRecord[]>(`/inventory/store/${storeId}`);
  },
};