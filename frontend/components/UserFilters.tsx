'use client';

import { UserFilters as UserFiltersType, UserRole } from '@/types/user';
import Input from './Input';
import Select from './Select';

interface UserFiltersProps {
  filters: UserFiltersType;
  onFilterChange: (filters: UserFiltersType) => void;
}

export default function UserFilters({ filters, onFilterChange }: UserFiltersProps) {
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'user', label: 'User' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value, page: 1 });
  };

  const handleRoleChange = (value: string) => {
    onFilterChange({ ...filters, role: value as UserRole | 'all', page: 1 });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filters, status: value as 'active' | 'inactive' | 'all', page: 1 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Input
        type="text"
        placeholder="Search by name or email..."
        value={filters.search || ''}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <Select
        value={filters.role || 'all'}
        onChange={(e) => handleRoleChange(e.target.value)}
        options={roleOptions}
      />

      <Select
        value={filters.status || 'all'}
        onChange={(e) => handleStatusChange(e.target.value)}
        options={statusOptions}
      />
    </div>
  );
}
