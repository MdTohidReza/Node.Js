import React from 'react';
import { useForm } from 'react-hook-form';
import { Lead, LeadStatus, LeadSource, CreateLeadPayload } from '../../types';
import { Spinner } from '../ui';

interface LeadFormProps {
  defaultValues?: Partial<Lead>;
  onSubmit: (data: CreateLeadPayload) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLeadPayload>({
    defaultValues: {
      name: defaultValues?.name ?? '',
      email: defaultValues?.email ?? '',
      status: defaultValues?.status ?? LeadStatus.NEW,
      source: defaultValues?.source ?? LeadSource.WEBSITE,
      notes: defaultValues?.notes ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label className="label">Name *</label>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'At least 2 characters' },
          })}
          className="input"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="label">Email *</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
          })}
          type="email"
          className="input"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Status & Source row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Status</label>
          <select {...register('status')} className="input">
            {Object.values(LeadStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Source *</label>
          <select
            {...register('source', { required: 'Source is required' })}
            className="input"
          >
            {Object.values(LeadSource).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.source && (
            <p className="mt-1 text-xs text-red-500">{errors.source.message}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label">Notes</label>
        <textarea
          {...register('notes', { maxLength: { value: 500, message: 'Max 500 characters' } })}
          className="input min-h-[80px] resize-none"
          placeholder="Optional notes about this lead..."
        />
        {errors.notes && (
          <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" className="btn-secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading && <Spinner className="h-4 w-4" />}
          {defaultValues?._id ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
