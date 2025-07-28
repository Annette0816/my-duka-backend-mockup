import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import inventorySlice from './slices/inventorySlice';
import supplyRequestSlice from './slices/supplyRequestSlice';
import reportSlice from './slices/reportSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    inventory: inventorySlice,
    supplyRequests: supplyRequestSlice,
    reports: reportSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;