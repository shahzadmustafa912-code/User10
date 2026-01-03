'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { User, UserFilters, CreateUserInput, UpdateUserInput, UpdatePasswordInput } from '@/types/user';
import { userApi, ApiError } from '@/lib/api';
import { debounce } from '@/lib/utils';
import UserTable from '@/components/UserTable';
import UserFiltersComponent from '@/components/UserFilters';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import UserForm from '@/components/UserForm';
import PasswordUpdateModal from '@/components/PasswordUpdateModal';
import Button from '@/components/Button';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    role: 'all',
    status: 'all',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userApi.getUsers(filters);
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch users. Please try again.');
      }
      // Set mock data for demo purposes
      setUsers([
        {
          id: '1',
          name: 'Muhammad Affaq Mustafa',
          email: 'affaqmustfa90@gmail.com',
          role: 'admin',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Nabeel Ahmed',
          email: 'nabeelahmed56@example.com',
          role: 'user',
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Ali Hassan',
          email: 'alihassan45@example.com',
          role: 'moderator',
          status: 'inactive',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 3,
        itemsPerPage: 10,
      });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounced filter change
  const debouncedFilterChange = useMemo(
    () => debounce((newFilters: UserFilters) => {
      setFilters(newFilters);
    }, 300),
    []
  );

  const handleFilterChange = (newFilters: UserFilters) => {
    debouncedFilterChange(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Create user
  const handleCreateUser = async (data: CreateUserInput | UpdateUserInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await userApi.createUser(data as CreateUserInput);
      setSuccess('User created successfully!');
      setIsCreateModalOpen(false);
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create user. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit user
  const handleEditUser = async (data: CreateUserInput | UpdateUserInput) => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await userApi.updateUser(selectedUser.id, data as UpdateUserInput);
      setSuccess('User updated successfully!');
      setIsEditModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update user. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update password
  const handleUpdatePassword = async (data: UpdatePasswordInput) => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await userApi.updatePassword(selectedUser.id, data);
      setSuccess('Password updated successfully!');
      setIsPasswordModalOpen(false);
      setSelectedUser(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete user
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await userApi.deleteUser(selectedUser.id);
      setSuccess('User deleted successfully!');
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to delete user. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openPasswordModal = (user: User) => {
    setSelectedUser(user);
    setIsPasswordModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your users, roles, and permissions
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New User
            </span>
          </Button>
        </div>

        {/* Filters */}
        <UserFiltersComponent filters={filters} onFilterChange={handleFilterChange} />

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <UserTable
            users={users}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onUpdatePassword={openPasswordModal}
            isLoading={isLoading}
          />

          {/* Pagination */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Create User Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New User"
          size="lg"
        >
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={isSubmitting}
          />
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          title="Edit User"
          size="lg"
        >
          {selectedUser && (
            <UserForm
              user={selectedUser}
              onSubmit={handleEditUser}
              onCancel={() => {
                setIsEditModalOpen(false);
                setSelectedUser(null);
              }}
              isLoading={isSubmitting}
            />
          )}
        </Modal>

        {/* Password Update Modal */}
        <PasswordUpdateModal
          isOpen={isPasswordModalOpen}
          onClose={() => {
            setIsPasswordModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleUpdatePassword}
          isLoading={isSubmitting}
        />

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
          }}
          title="Delete User"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action
              cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedUser(null);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteUser} isLoading={isSubmitting}>
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
