import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';
import { LeadStatus } from '../../types';

// ─── Spinner ──────────────────────────────────────────────────────────────────

export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <Loader2 className={clsx('animate-spin', className ?? 'h-5 w-5')} />
);

// ─── Status Badge ─────────────────────────────────────────────────────────────

const badgeClass: Record<LeadStatus, string> = {
  [LeadStatus.NEW]: 'badge-new',
  [LeadStatus.CONTACTED]: 'badge-contacted',
  [LeadStatus.QUALIFIED]: 'badge-qualified',
  [LeadStatus.LOST]: 'badge-lost',
};

export const StatusBadge: React.FC<{ status: LeadStatus }> = ({ status }) => (
  <span className={badgeClass[status]}>{status}</span>
);

// ─── Source Badge ─────────────────────────────────────────────────────────────

export const SourceBadge: React.FC<{ source: string }> = ({ source }) => (
  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
    {source}
  </span>
);

// ─── Empty State ──────────────────────────────────────────────────────────────

export const EmptyState: React.FC<{
  title: string;
  description: string;
  action?: React.ReactNode;
}> = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    {action}
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="card relative z-10 w-full max-w-lg animate-slide-up overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

export const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}> = ({ isOpen, onClose, onConfirm, title, description, isLoading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">{description}</p>
    <div className="flex justify-end gap-3">
      <button className="btn-secondary" onClick={onClose} disabled={isLoading}>Cancel</button>
      <button className="btn-danger" onClick={onConfirm} disabled={isLoading}>
        {isLoading ? <Spinner className="h-4 w-4" /> : null}
        Delete
      </button>
    </div>
  </Modal>
);

// ─── Pagination ───────────────────────────────────────────────────────────────

export const Pagination: React.FC<{
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
}> = ({ page, totalPages, total, limit, onPageChange }) => {
  if (totalPages <= 1) return null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium text-gray-900 dark:text-gray-100">{from}–{to}</span> of{' '}
        <span className="font-medium text-gray-900 dark:text-gray-100">{total}</span> leads
      </span>
      <div className="flex gap-1">
        <button
          className="btn-secondary px-3 py-1.5 text-xs"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce<(number | '...')[]>((acc, p, i, arr) => {
            if (i > 0 && typeof arr[i - 1] === 'number' && (p as number) - (arr[i - 1] as number) > 1) {
              acc.push('...');
            }
            acc.push(p);
            return acc;
          }, [])
          .map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-gray-400">…</span>
            ) : (
              <button
                key={p}
                className={clsx(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition',
                  p === page
                    ? 'bg-brand-600 text-white'
                    : 'btn-secondary'
                )}
                onClick={() => onPageChange(p as number)}
              >
                {p}
              </button>
            )
          )}
        <button
          className="btn-secondary px-3 py-1.5 text-xs"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
};
