import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { inventoryService } from '../../services/inventoryService';

const initialState = {
  records: [],
  currentRecord: null,
  lowStockAlerts: [],
  loading: false,
  error: null,
  filters: {},
  totalRecords: 0,
  currentPage: 1,
};

// Async thunks
export const fetchInventoryRecords = createAsyncThunk(
  'inventory/fetchRecords',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await inventoryService.getInventoryRecords(filters);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInventoryRecord = createAsyncThunk(
  'inventory/fetchRecord',
  async (id, { rejectWithValue }) => {
    try {
      const response = await inventoryService.getInventoryRecord(id);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createInventoryRecord = createAsyncThunk(
  'inventory/createRecord',
  async (data, { rejectWithValue }) => {
    try {
      const response = await inventoryService.createInventoryRecord(data);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInventoryRecord = createAsyncThunk(
  'inventory/updateRecord',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await inventoryService.updateInventoryRecord(id, data);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePaymentStatus = createAsyncThunk(
  'inventory/updatePaymentStatus',
  async ({ id, paymentStatus }, { rejectWithValue }) => {
    try {
      const response = await inventoryService.updatePaymentStatus(id, paymentStatus);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLowStockAlerts = createAsyncThunk(
  'inventory/fetchLowStockAlerts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await inventoryService.getLowStockAlerts();
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInventoryRecord = createAsyncThunk(
  'inventory/deleteRecord',
  async (id, { rejectWithValue }) => {
    try {
      const response = await inventoryService.deleteInventoryRecord(id);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearCurrentRecord: (state) => {
      state.currentRecord = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch inventory records
      .addCase(fetchInventoryRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload.data;
        state.totalRecords = action.payload.total;
        state.error = null;
      })
      .addCase(fetchInventoryRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single inventory record
      .addCase(fetchInventoryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecord = action.payload;
        state.error = null;
      })
      .addCase(fetchInventoryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create inventory record
      .addCase(createInventoryRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInventoryRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.unshift(action.payload);
        state.error = null;
      })
      .addCase(createInventoryRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update inventory record
      .addCase(updateInventoryRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex(record => record.id === action.payload.id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
        if (state.currentRecord?.id === action.payload.id) {
          state.currentRecord = action.payload;
        }
      })
      
      // Update payment status
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const index = state.records.findIndex(record => record.id === action.payload.id);
        if (index !== -1) {
          state.records[index] = action.payload;
        }
        if (state.currentRecord?.id === action.payload.id) {
          state.currentRecord = action.payload;
        }
      })
      
      // Fetch low stock alerts
      .addCase(fetchLowStockAlerts.fulfilled, (state, action) => {
        state.lowStockAlerts = action.payload;
      })
      
      // Delete inventory record
      .addCase(deleteInventoryRecord.fulfilled, (state, action) => {
        state.records = state.records.filter(record => record.id !== action.payload);
        if (state.currentRecord?.id === action.payload) {
          state.currentRecord = null;
        }
      });
  },
});

export const { clearError, setFilters, clearCurrentRecord, setCurrentPage } = inventorySlice.actions;
export default inventorySlice.reducer;