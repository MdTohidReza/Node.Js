import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Lead, LeadFilters, SortOrder, CreateLeadPayload } from '../types';
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from '../hooks/useLeads';
import { useDebounce } from '../hooks/useDebounce';
import { leadsService } from '../services/leadsService';
import LeadTable from '../components/leads/LeadTable';
import LeadFiltersBar from '../components/leads/LeadFiltersBar';
import LeadForm from '../components/leads/LeadForm';
import {
  Modal,
  ConfirmDialog,
  EmptyState,
  Pagination,
  Spinner,
  StatusBadge,
  SourceBadge,
} from '../components/ui';

const LeadsPage: React.FC = () => {
  // Filter state
  const [filters, setFilters] = useState<LeadFilters>({
    sort: SortOrder.LATEST,
    page: 1,
    limit: 10,
  });
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 400);

  // Merge debounced search into query
  const queryFilters: LeadFilters = {
    ...filters,
    search: debouncedSearch || undefined,
    page: debouncedSearch !== (filters.search ?? '') ? 1 : filters.page,
  };

  // Data fetching
  const { data, isLoading, isError, error } = useLeads(queryFilters);
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();
  const deleteMutation = useDeleteLead();

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);

  const handleFilterChange = useCallback((key: keyof LeadFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined, page: 1 }));
  }, []);

  const handleCreate = async (payload: CreateLeadPayload) => {
    await createMutation.mutateAsync(payload);
    setShowCreateModal(false);
  };

  const handleUpdate = async (payload: CreateLeadPayload) => {
    if (!editingLead) return;
    await updateMutation.mutateAsync({ id: editingLead._id, payload });
    setEditingLead(null);
  };

  const handleDelete = async () => {
    if (!deletingLead) return;
    await deleteMutation.mutateAsync(deletingLead._id);
    setDeletingLead(null);
  };

  const handleExportCSV = () => {
    leadsService.exportCSV({
      status: filters.status,
      source: filters.source,
      search: debouncedSearch || undefined,
    });
  };

  const leads = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <div className="p-6 space-y-5 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Leads</h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {pagination ? `${pagination.total} total leads` : 'Manage your leads'}
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <LeadFiltersBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={setSearchInput}
          searchInput={searchInput}
          onExportCSV={handleExportCSV}
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner className="h-8 w-8 text-brand-600" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className="text-sm font-medium text-red-600">Failed to load leads</p>
              <p className="mt-1 text-xs text-gray-500">
                {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            </div>
          </div>
        ) : leads.length === 0 ? (
          <EmptyState
            title="No leads found"
            description={
              debouncedSearch || filters.status || filters.source
                ? 'Try adjusting your filters or search query.'
                : 'Create your first lead to get started.'
            }
            action={
              !debouncedSearch && !filters.status && !filters.source ? (
                <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4" />
                  Add Lead
                </button>
              ) : undefined
            }
          />
        ) : (
          <>
            <LeadTable
              leads={leads}
              onEdit={setEditingLead}
              onDelete={setDeletingLead}
              onView={setViewingLead}
            />
            {pagination && (
              <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
                <Pagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  limit={pagination.limit}
                  onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Create modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New Lead">
        <LeadForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
          isLoading={createMutation.isPending}
        />
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={Boolean(editingLead)} onClose={() => setEditingLead(null)} title="Edit Lead">
        {editingLead && (
          <LeadForm
            defaultValues={editingLead}
            onSubmit={handleUpdate}
            onCancel={() => setEditingLead(null)}
            isLoading={updateMutation.isPending}
          />
        )}
      </Modal>

      {/* View modal */}
      <Modal isOpen={Boolean(viewingLead)} onClose={() => setViewingLead(null)} title="Lead Details">
        {viewingLead && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Name</p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">{viewingLead.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Email</p>
                <p className="mt-1 font-mono text-sm text-gray-900 dark:text-gray-100">{viewingLead.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Status</p>
                <div className="mt-1"><StatusBadge status={viewingLead.status} /></div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Source</p>
                <div className="mt-1"><SourceBadge source={viewingLead.source} /></div>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-medium uppercase text-gray-500">Notes</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {viewingLead.notes || <span className="italic text-gray-400">No notes</span>}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">Created</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {new Date(viewingLead.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button className="btn-secondary" onClick={() => setViewingLead(null)}>Close</button>
              <button
                className="btn-primary"
                onClick={() => { setEditingLead(viewingLead); setViewingLead(null); }}
              >
                Edit Lead
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        isOpen={Boolean(deletingLead)}
        onClose={() => setDeletingLead(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        description={`Are you sure you want to delete "${deletingLead?.name}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default LeadsPage;
