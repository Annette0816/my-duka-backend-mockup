import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reportService } from '../../services/reportService';

const initialState = {
  salesReport: null,
  inventoryReport: null,
  paymentReport: null,
  dashboardStats: null,
  loading: false,
  error: null,
  filters: {},
};

export const fetchSalesReport = createAsyncThunk(
  'reports/fetchSalesReport',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await reportService.getSalesReport(filters);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInventoryReport = createAsyncThunk(
  'reports/fetchInventoryReport',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await reportService.getInventoryReport(filters);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'reports/fetchDashboardStats',
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await reportService.getDashboardStats(storeId);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearReports: (state) => {
      state.salesReport = null;
      state.inventoryReport = null;
      state.paymentReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesReport.fulfilled, (state, action) => {
        state.loading = false;
        state.salesReport = action.payload;
        state.error = null;
      })
      .addCase(fetchSalesReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInventoryReport.fulfilled, (state, action) => {
        state.inventoryReport = action.payload;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      });
  },
});

export const { clearError, setFilters, clearReports } = reportSlice.actions;
export default reportSlice.reducer;