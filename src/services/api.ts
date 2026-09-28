const BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7214';

export class ApiError extends Error {
    status: number;
    data: any;

    constructor(status: number, data: any) {
        super(`Erro na requisição: Status ${status}`);
        this.status = status;
        this.data = data;
    }
}

export async function fetchClient<T>( endpoint: string, options: RequestInit = {}, token?: string): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('X-Group-Token', token);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {...options,headers,});

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(response.status, errorData);
    }

    if (response.status === 204) {
        return undefined as unknown as T;
    }

    return response.json();
}