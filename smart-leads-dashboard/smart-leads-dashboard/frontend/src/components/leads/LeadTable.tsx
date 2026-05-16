import React from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Lead, UserRole } from '../../types';
import { StatusBadge, SourceBadge } from '../ui';
import { useAuthStore } from '../../store/authStore';

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onView: (lead: Lead) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, onEdit, onDelete, onView }) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === UserRole.ADMIN;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCreatedByName = (lead: Lead): string => {
    if (typeof lead.createdBy === 'object' && 'name' in lead.createdBy) {
      return lead.createdBy.name;
    }
    return 'Unknown';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            {['Name', 'Email', 'Status', 'Source', 'Created By', 'Date', 'Actions'].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/60">
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40"
            >
              <td className="px-4 py-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {lead.name}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                  {lead.email}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3">
                <SourceBadge source={lead.source} />
              </td>
              <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                {getCreatedByName(lead)}
              </td>
              <td className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => onView(lead)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                    title="View lead"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(lead)}
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
                    title="Edit lead"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(lead)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      title="Delete lead (Admin only)"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
