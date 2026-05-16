import apiClient from './apiClient';
import {
  ApiResponse,
  Lead,
  CreateLeadPayload,
  UpdateLeadPayload,
  PaginatedResponse,
  LeadFilters,
} from '../types';

export const leadsService = {
  getLeads: async (filters: LeadFilters): Promise<PaginatedResponse<Lead>> => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.limit) params.append('limit', String(filters.limit));

    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Lead>>>(
      `/leads?${params.toString()}`
    );
    if (!data.success || !data.data) throw new Error(data.message);
    return data.data;
  },

  getLeadById: async (id: string): Promise<Lead> => {
    const { data } = await apiClient.get<ApiResponse<Lead>>(`/leads/${id}`);
    if (!data.success || !data.data) throw new Error(data.message);
    return data.data;
  },

  createLead: async (payload: CreateLeadPayload): Promise<Lead> => {
    const { data } = await apiClient.post<ApiResponse<Lead>>('/leads', payload);
    if (!data.success || !data.data) throw new Error(data.message);
    return data.data;
  },

  updateLead: async (id: string, payload: UpdateLeadPayload): Promise<Lead> => {
    const { data } = await apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, payload);
    if (!data.success || !data.data) throw new Error(data.message);
    return data.data;
  },

  deleteLead: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`);
  },

  exportCSV: (filters: Omit<LeadFilters, 'page' | 'limit' | 'sort'>): void => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);

    const token = localStorage.getItem('token');
    const baseURL = import.meta.env.VITE_API_URL ?? '/api';
    const url = `${baseURL}/leads/export/csv?${params.toString()}`;

    // Fetch and trigger download
    fetch(url, {
      headers: { Authorization: `Bearer ${token ?? ''}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `leads-${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
      });
  },
};
