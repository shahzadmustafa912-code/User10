export type UserRole = 'admin' | 'user' | 'moderator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: 'active' | 'inactive';
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: 'active' | 'inactive';
}

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserFilters {
  search?: string;
  role?: UserRole | 'all';
  status?: 'active' | 'inactive' | 'all';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
