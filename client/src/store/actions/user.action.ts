import { createAction } from '@reduxjs/toolkit';
import { UserType } from '@/types';

export const toggleSidebar = createAction('users/toggleSidebar');
export const setUser = createAction<UserType>('users/setUser');
export const clearUser = createAction('users/clearUser');
