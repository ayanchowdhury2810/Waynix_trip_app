import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { userService } from '../services/userService';

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService.getProfile()
            .then(res => setUser(res.data))
            .finally(() => setLoading(false));
    }, []);

    return { user, loading };
};
