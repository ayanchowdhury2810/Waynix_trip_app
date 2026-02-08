import { useState, useEffect } from 'react';
import { Trip } from '../types/trip';
import { tripService } from '../services/tripService';

/**
 * Hook to manage Trips state and loading
 */
export const useTrips = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const response = await tripService.getTrips();
            setTrips(response.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch trips');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return { trips, loading, error, refresh: fetchTrips };
};
