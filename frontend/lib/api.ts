import { User, CreateUserInput, UpdateUserInput, UpdatePasswordInput, UserFilters, PaginatedResponse } from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(response.status, error.message || 'Request failed');
  }

  return response.json();
}

export const userApi = {
  // Get all users with filters and pagination
  getUsers: async (filters: UserFilters = {}): Promise<PaginatedResponse<User>> => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.role && filters.role !== 'all') params.append('role', filters.role);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    return fetchAPI<PaginatedResponse<User>>(`/users${queryString ? `?${queryString}` : ''}`);
  },

  // Get single user by ID
  getUser: async (id: string): Promise<User> => {
    return fetchAPI<User>(`/users/${id}`);
  },

  // Create new user
  createUser: async (data: CreateUserInput): Promise<User> => {
    return fetchAPI<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update user
  updateUser: async (id: string, data: UpdateUserInput): Promise<User> => {
    return fetchAPI<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Update user password
  updatePassword: async (id: string, data: UpdatePasswordInput): Promise<{ message: string }> => {
    return fetchAPI<{ message: string }>(`/users/${id}/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete user
  deleteUser: async (id: string): Promise<{ message: string }> => {
    return fetchAPI<{ message: string }>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

export { ApiError };
