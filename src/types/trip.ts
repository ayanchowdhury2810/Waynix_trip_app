/**
 * Trip-related data models
 */

export interface Trip {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    imageUrl?: string;
    status: 'planned' | 'ongoing' | 'completed';
}

export interface CreateTripRequest {
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
}

export interface UpdateTripRequest extends Partial<CreateTripRequest> {
    status?: Trip['status'];
}
