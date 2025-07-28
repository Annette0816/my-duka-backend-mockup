import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SalesReport, InventoryReport, PaymentReport, ReportFilter, DashboardStats } from '../../types';
import { reportService } from '../../services/reportService';

interface ReportState {
  salesReport: SalesReport | null;
  inventoryReport: InventoryReport | null;
  paymentReport: PaymentReport | null;
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  filters: ReportFilter;
}

const initialState: ReportState = {
  salesReport: null,
  inventoryReport: null,
  paymentReport: null,
  dashboardStats: null,
  loading: false,
  error: null,
  filters: {},
};

// Async thunks
export const fetchSalesReport = createAsyncThunk(
  'reports/fetchSalesReport',
  async (filters?: ReportFilter, { rejectWithValue }) => {
    try {
      const response = await reportService.getSalesReport(filters);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInventoryReport = createAsyncThunk(
  'reports/fetchInventoryReport',
  async (filters?: ReportFilter, { rejectWithValue }) => {
    try {
      const response = await reportService.getInventoryReport(filters);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPaymentReport = createAsyncThunk(
  'reports/fetchPaymentReport',
  async (filters?: ReportFilter, { rejectWithValue }) => {
    try {
      const response = await reportService.getPaymentReport(filters);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'reports/fetchDashboardStats',
  async (storeId?: number, { rejectWithValue }) => {
    try {
      const response = await reportService.getDashboardStats(storeId);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const exportReport = createAsyncThunk(
  'reports/exportReport',
  async ({ reportType, format, filters }: { reportType: string; format: 'csv' | 'pdf'; filters?: ReportFilter }, { rejectWithValue }) => {
    try {
      const response = await reportService.exportReport(reportType, format, filters);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response.data;
    } catch (error: any) {
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
      // Fetch sales report
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
        state.error = action.payload as string;
      })
      
      // Fetch inventory report
      .addCase(fetchInventoryReport.fulfilled, (state, action) => {
        state.inventoryReport = action.payload;
      })
      
      // Fetch payment report
      .addCase(fetchPaymentReport.fulfilled, (state, action) => {
        state.paymentReport = action.payload;
      })
      
      // Fetch dashboard stats
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      });
  },
});

export const { clearError, setFilters, clearReports } = reportSlice.actions;
export default reportSlice.reducer;