export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

export interface UpdateUserRequest {
    name?: string;
    email?: string;
}
