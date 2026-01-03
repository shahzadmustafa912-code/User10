'use client';

import { useState } from 'react';
import { User, CreateUserInput, UpdateUserInput, UserRole } from '@/types/user';
import { validateEmail, validatePassword, validateName } from '@/lib/validators';
import Input from './Input';
import Select from './Select';
import Button from './Button';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserInput | UpdateUserInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({ user, onSubmit, onCancel, isLoading }: UserFormProps) {
  const isEditMode = !!user;

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    role: user?.role || ('user' as UserRole),
    status: user?.status || ('active' as 'active' | 'inactive'),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!isEditMode && formData.password) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message || 'Invalid password';
      }
    }

    if (!isEditMode && !formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!isEditMode) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEditMode) {
        const updateData: UpdateUserInput = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        };
        await onSubmit(updateData);
      } else {
        const createData: CreateUserInput = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          status: formData.status,
        };
        await onSubmit(createData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
        placeholder="Enter full name"
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        required
        placeholder="user@example.com"
      />

      {!isEditMode && (
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          required
          placeholder="Enter password"
          helperText="Min 8 chars, 1 uppercase, 1 lowercase, 1 number"
        />
      )}

      {!isEditMode && (
        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
          placeholder="Confirm password"
        />
      )}

      <Select
        label="Role"
        value={formData.role}
        onChange={(e) => handleChange('role', e.target.value)}
        options={roleOptions}
        required
      />

      <Select
        label="Status"
        value={formData.status}
        onChange={(e) => handleChange('status', e.target.value)}
        options={statusOptions}
        required
      />

      <div className="flex gap-3 justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {isEditMode ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}
