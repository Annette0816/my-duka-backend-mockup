import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  isLoading: false,
  modals: {},
  sidebarOpen: true,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.notifications.push(notification);
    },
    
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  openModal,
  closeModal,
  toggleSidebar,
  setSidebarOpen,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;