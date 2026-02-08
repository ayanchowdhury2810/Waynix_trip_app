import { User, UpdateUserRequest } from '../types/user';
import { ApiResponse } from '../types/api';
import { apiClient } from '../api/apiClient';

class UserService {
    async getProfile(): Promise<ApiResponse<User>> {
        return apiClient.get<ApiResponse<User>>('/profile');
    }

    async updateProfile(data: UpdateUserRequest): Promise<ApiResponse<User>> {
        return apiClient.patch<ApiResponse<User>>('/profile', data);
    }
}

export const userService = new UserService();
