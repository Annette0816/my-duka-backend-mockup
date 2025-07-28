import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SupplyRequest, SupplyRequestFormData } from '../../types';
import { supplyRequestService } from '../../services/supplyRequestService';

interface SupplyRequestState {
  requests: SupplyRequest[];
  currentRequest: SupplyRequest | null;
  pendingRequests: SupplyRequest[];
  loading: boolean;
  error: string | null;
  totalRequests: number;
  currentPage: number;
}

const initialState: SupplyRequestState = {
  requests: [],
  currentRequest: null,
  pendingRequests: [],
  loading: false,
  error: null,
  totalRequests: 0,
  currentPage: 1,
};

// Async thunks
export const fetchSupplyRequests = createAsyncThunk(
  'supplyRequests/fetchRequests',
  async (status?: string, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.getSupplyRequests(status);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSupplyRequest = createAsyncThunk(
  'supplyRequests/fetchRequest',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.getSupplyRequest(id);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSupplyRequest = createAsyncThunk(
  'supplyRequests/createRequest',
  async (data: SupplyRequestFormData, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.createSupplyRequest(data);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveSupplyRequest = createAsyncThunk(
  'supplyRequests/approveRequest',
  async ({ id, notes }: { id: number; notes?: string }, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.approveSupplyRequest(id, notes);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const declineSupplyRequest = createAsyncThunk(
  'supplyRequests/declineRequest',
  async ({ id, notes }: { id: number; notes?: string }, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.declineSupplyRequest(id, notes);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPendingSupplyRequests = createAsyncThunk(
  'supplyRequests/fetchPendingRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.getPendingSupplyRequests();
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSupplyRequest = createAsyncThunk(
  'supplyRequests/deleteRequest',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.deleteSupplyRequest(id);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const supplyRequestSlice = createSlice({
  name: 'supplyRequests',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch supply requests
      .addCase(fetchSupplyRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.data;
        state.totalRequests = action.payload.total;
        state.error = null;
      })
      .addCase(fetchSupplyRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch single supply request
      .addCase(fetchSupplyRequest.fulfilled, (state, action) => {
        state.currentRequest = action.payload;
      })
      
      // Create supply request
      .addCase(createSupplyRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplyRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.unshift(action.payload);
        state.error = null;
      })
      .addCase(createSupplyRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Approve supply request
      .addCase(approveSupplyRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        state.pendingRequests = state.pendingRequests.filter(req => req.id !== action.payload.id);
      })
      
      // Decline supply request
      .addCase(declineSupplyRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        state.pendingRequests = state.pendingRequests.filter(req => req.id !== action.payload.id);
      })
      
      // Fetch pending supply requests
      .addCase(fetchPendingSupplyRequests.fulfilled, (state, action) => {
        state.pendingRequests = action.payload;
      })
      
      // Delete supply request
      .addCase(deleteSupplyRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter(req => req.id !== action.payload);
        state.pendingRequests = state.pendingRequests.filter(req => req.id !== action.payload);
      });
  },
});

export const { clearError, clearCurrentRequest } = supplyRequestSlice.actions;
export default supplyRequestSlice.reducer;