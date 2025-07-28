import { apiService } from './api';

export const supplyRequestService = {
  // Get all supply requests
  getSupplyRequests: async (status) => {
    const url = status ? `/supply-requests?status=${status}` : '/supply-requests';
    return await apiService.get(url);
  },

  // Get supply request by ID
  getSupplyRequest: async (id) => {
    return await apiService.get(`/supply-requests/${id}`);
  },

  // Create new supply request
  createSupplyRequest: async (data) => {
    return await apiService.post('/supply-requests', data);
  },

  // Update supply request
  updateSupplyRequest: async (id, data) => {
    return await apiService.put(`/supply-requests/${id}`, data);
  },

  // Approve supply request
  approveSupplyRequest: async (id, notes) => {
    return await apiService.put(`/supply-requests/${id}/approve`, { notes });
  },

  // Decline supply request
  declineSupplyRequest: async (id, notes) => {
    return await apiService.put(`/supply-requests/${id}/decline`, { notes });
  },

  // Delete supply request
  deleteSupplyRequest: async (id) => {
    return await apiService.delete(`/supply-requests/${id}`);
  },

  // Get supply requests by store
  getSupplyRequestsByStore: async (storeId) => {
    return await apiService.get(`/supply-requests/store/${storeId}`);
  },

  // Get pending supply requests
  getPendingSupplyRequests: async () => {
    return await apiService.get('/supply-requests?status=Pending');
  },
};