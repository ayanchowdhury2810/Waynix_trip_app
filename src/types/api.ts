/**
 * General API response structure
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

/**
 * Common Error structure
 */
export interface ApiError {
    message: string;
    code: string;
    details?: any;
}
