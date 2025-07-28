import { apiService } from './api';
import { SupplyRequest, SupplyRequestFormData, PaginatedResponse } from '../types';

export const supplyRequestService = {
  // Get all supply requests
  getSupplyRequests: async (status?: string) => {
    const url = status ? `/supply-requests?status=${status}` : '/supply-requests';
    return await apiService.get<PaginatedResponse<SupplyRequest>>(url);
  },

  // Get supply request by ID
  getSupplyRequest: async (id: number) => {
    return await apiService.get<SupplyRequest>(`/supply-requests/${id}`);
  },

  // Create new supply request
  createSupplyRequest: async (data: SupplyRequestFormData) => {
    return await apiService.post<SupplyRequest>('/supply-requests', data);
  },

  // Update supply request
  updateSupplyRequest: async (id: number, data: Partial<SupplyRequestFormData>) => {
    return await apiService.put<SupplyRequest>(`/supply-requests/${id}`, data);
  },

  // Approve supply request
  approveSupplyRequest: async (id: number, notes?: string) => {
    return await apiService.put<SupplyRequest>(`/supply-requests/${id}/approve`, { notes });
  },

  // Decline supply request
  declineSupplyRequest: async (id: number, notes?: string) => {
    return await apiService.put<SupplyRequest>(`/supply-requests/${id}/decline`, { notes });
  },

  // Delete supply request
  deleteSupplyRequest: async (id: number) => {
    return await apiService.delete(`/supply-requests/${id}`);
  },

  // Get supply requests by store
  getSupplyRequestsByStore: async (storeId: number) => {
    return await apiService.get<SupplyRequest[]>(`/supply-requests/store/${storeId}`);
  },

  // Get pending supply requests
  getPendingSupplyRequests: async () => {
    return await apiService.get<SupplyRequest[]>('/supply-requests?status=Pending');
  },
};