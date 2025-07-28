import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, getCurrentUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, userType, isAuthenticated, loading, error } = useSelector(
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