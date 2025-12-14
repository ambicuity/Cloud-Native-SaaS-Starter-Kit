import { apiService } from './api';
import { User, CreateUserDto, UpdateUserDto } from '../types';

export const userService = {
  async getAll() {
    return apiService.get<User[]>('/api/users');
  },

  async getById(id: string) {
    return apiService.get<User>(`/api/users/${id}`);
  },

  async create(data: CreateUserDto) {
    return apiService.post<User>('/api/users', data);
  },

  async update(id: string, data: UpdateUserDto) {
    return apiService.put<User>(`/api/users/${id}`, data);
  },

  async delete(id: string) {
    return apiService.delete<void>(`/api/users/${id}`);
  },
};
