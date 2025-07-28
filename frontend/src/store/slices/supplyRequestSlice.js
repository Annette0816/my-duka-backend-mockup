import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supplyRequestService } from '../../services/supplyRequestService';

const initialState = {
  requests: [],
  currentRequest: null,
  pendingRequests: [],
  loading: false,
  error: null,
  totalRequests: 0,
  currentPage: 1,
};

export const fetchSupplyRequests = createAsyncThunk(
  'supplyRequests/fetchRequests',
  async (status, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.getSupplyRequests(status);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSupplyRequest = createAsyncThunk(
  'supplyRequests/createRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.createSupplyRequest(data);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveSupplyRequest = createAsyncThunk(
  'supplyRequests/approveRequest',
  async ({ id, notes }, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.approveSupplyRequest(id, notes);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const declineSupplyRequest = createAsyncThunk(
  'supplyRequests/declineRequest',
  async ({ id, notes }, { rejectWithValue }) => {
    try {
      const response = await supplyRequestService.declineSupplyRequest(id, notes);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
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
        state.error = action.payload;
      })
      .addCase(createSupplyRequest.fulfilled, (state, action) => {
        state.requests.unshift(action.payload);
      })
      .addCase(approveSupplyRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(declineSupplyRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      });
  },
});

export const { clearError, clearCurrentRequest } = supplyRequestSlice.actions;
export default supplyRequestSlice.reducer;