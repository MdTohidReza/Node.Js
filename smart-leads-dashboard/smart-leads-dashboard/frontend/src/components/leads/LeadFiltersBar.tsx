import React from 'react';
import { Search, Download, SlidersHorizontal } from 'lucide-react';
import { LeadStatus, LeadSource, SortOrder, LeadFilters } from '../../types';

interface LeadFiltersBarProps {
  filters: LeadFilters;
  onFilterChange: (key: keyof LeadFilters, value: string) => void;
  onSearchChange: (value: string) => void;
  searchInput: string;
  onExportCSV: () => void;
}

const LeadFiltersBar: React.FC<LeadFiltersBarProps> = ({
  filters,
  onFilterChange,
  onSearchChange,
  searchInput,
  onExportCSV,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email..."
          className="input pl-9"
        />
      </div>

      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-gray-400" />

        {/* Status filter */}
        <select
          value={filters.status ?? ''}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="input w-auto min-w-[120px]"
        >
          <option value="">All Status</option>
          {Object.values(LeadStatus).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Source filter */}
        <select
          value={filters.source ?? ''}
          onChange={(e) => onFilterChange('source', e.target.value)}
          className="input w-auto min-w-[120px]"
        >
          <option value="">All Sources</option>
          {Object.values(LeadSource).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sort ?? SortOrder.LATEST}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          className="input w-auto min-w-[110px]"
        >
          <option value={SortOrder.LATEST}>Latest</option>
          <option value={SortOrder.OLDEST}>Oldest</option>
        </select>

        {/* Export CSV */}
        <button
          onClick={onExportCSV}
          className="btn-secondary gap-2"
          title="Export filtered leads as CSV"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  );
};

export default LeadFiltersBar;
