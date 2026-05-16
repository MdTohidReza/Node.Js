import apiClient from './apiClient';
import { ApiResponse, User } from '../types';

interface AuthData {
  token: string;
  user: User;
}

export const authService = {
  register: async (payload: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<AuthData> => {
    const { data } = await apiClient.post<ApiResponse<AuthData>>('/auth/register', payload);
    if (!data.success || !data.data) throw new Error(data.message);
    return data.data;
  },

  login: async (payload: { email: string; password: string }): Promise<AuthData> => {
    const { data } = await apiClient.post<ApiResponse<AuthData>>('/auth/login', payload);
    if (!data.success || !data.data) throw new Error(data.message);
    return data.data;
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me');
    if (!data.success || !data.data) throw new Error(data.message);
    return data.data;
  },
};
