import { Trip, CreateTripRequest, UpdateTripRequest } from '../types/trip';
import { ApiResponse } from '../types/api';
import { apiClient } from '../api/apiClient';

/**
 * Service to handle Trip-related API calls.
 * Uses the apiClient for networking.
 */
class TripService {
    async getTrips(): Promise<ApiResponse<Trip[]>> {
        return apiClient.get<ApiResponse<Trip[]>>('/trips');
    }

    async createTrip(data: CreateTripRequest): Promise<ApiResponse<Trip>> {
        return apiClient.post<ApiResponse<Trip>>('/trips', data);
    }

    async updateTrip(id: string, data: UpdateTripRequest): Promise<ApiResponse<Trip>> {
        return apiClient.patch<ApiResponse<Trip>>(`/trips/${id}`, data);
    }
}

export const tripService = new TripService();
