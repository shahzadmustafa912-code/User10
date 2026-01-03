'use client';

import { useState } from 'react';
import { UpdatePasswordInput } from '@/types/user';
import { validatePassword } from '@/lib/validators';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

interface PasswordUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdatePasswordInput) => Promise<void>;
  isLoading?: boolean;
}

export default function PasswordUpdateModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: PasswordUpdateModalProps) {
  const [formData, setFormData] = useState<UpdatePasswordInput>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      const passwordValidation = validatePassword(formData.newPassword);
      if (!passwordValidation.valid) {
        newErrors.newPassword = passwordValidation.message || 'Invalid password';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
    } catch (error) {
      console.error('Password update error:', error);
    }
  };

  const handleChange = (field: keyof UpdatePasswordInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Update Password" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Current Password"
          type="password"
          value={formData.currentPassword}
          onChange={(e) => handleChange('currentPassword', e.target.value)}
          error={errors.currentPassword}
          required
          placeholder="Enter current password"
        />

        <Input
          label="New Password"
          type="password"
          value={formData.newPassword}
          onChange={(e) => handleChange('newPassword', e.target.value)}
          error={errors.newPassword}
          required
          placeholder="Enter new password"
          helperText="Min 8 chars, 1 uppercase, 1 lowercase, 1 number"
        />

        <Input
          label="Confirm New Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
          placeholder="Confirm new password"
        />

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Update Password
          </Button>
        </div>
      </form>
    </Modal>
  );
}
