import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { initializeAuth, getCurrentUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, userType, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth());

    // If authenticated but no user data, fetch current user
    if (isAuthenticated && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, user]);

  return {
    user,
    userType,
    isAuthenticated,
    loading,
    error,
  };
};