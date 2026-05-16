import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, UserCheck, UserX } from 'lucide-react';
import { useLeads } from '../hooks/useLeads';
import { LeadStatus, LeadSource } from '../types';
import { Spinner } from '../components/ui';
import { useAuthStore } from '../store/authStore';

const StatCard: React.FC<{
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}> = ({ label, value, icon, color }) => (
  <div className="card p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>{icon}</div>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: allLeads, isLoading } = useLeads({ limit: 100 });
  const { data: recentLeads } = useLeads({ limit: 5, sort: 'latest' });

console.log("allLeads", allLeads);
console.log("recentLeads", recentLeads);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    );
  }

const leads = allLeads?.items ?? [];
const total = allLeads?.pagination?.total ?? 0;

  const byStatus = (status: LeadStatus) => leads.filter((l) => l.status === status).length;
  const bySource = (source: LeadSource) => leads.filter((l) => l.source === source).length;

  const qualifiedRate = total > 0 ? Math.round((byStatus(LeadStatus.QUALIFIED) / total) * 100) : 0;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          Here's what's happening with your leads today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Leads"
          value={total}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          color="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          label="Qualified"
          value={byStatus(LeadStatus.QUALIFIED)}
          icon={<UserCheck className="h-5 w-5 text-green-600" />}
          color="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard
          label="Lost"
          value={byStatus(LeadStatus.LOST)}
          icon={<UserX className="h-5 w-5 text-red-600" />}
          color="bg-red-50 dark:bg-red-900/20"
        />
        <StatCard
          label="Qualify Rate"
          value={`${qualifiedRate}%`}
          icon={<TrendingUp className="h-5 w-5 text-brand-600" />}
          color="bg-brand-50 dark:bg-brand-900/20"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status breakdown */}
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Leads by Status</h2>
          <div className="space-y-3">
            {Object.values(LeadStatus).map((status) => {
              const count = byStatus(status);
              const pct = total > 0 ? (count / total) * 100 : 0;
              const colors: Record<LeadStatus, string> = {
                [LeadStatus.NEW]: 'bg-blue-500',
                [LeadStatus.CONTACTED]: 'bg-yellow-500',
                [LeadStatus.QUALIFIED]: 'bg-green-500',
                [LeadStatus.LOST]: 'bg-red-500',
              };
              return (
                <div key={status}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">{status}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className={`h-full rounded-full transition-all ${colors[status]}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source breakdown */}
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Leads by Source</h2>
          <div className="space-y-3">
            {Object.values(LeadSource).map((source) => {
              const count = bySource(source);
              const pct = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={source}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">{source}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Leads</h2>
          <button
            onClick={() => navigate('/leads')}
            className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            View all →
          </button>
        </div>
        {recentLeads?.items.length === 0 ? (
          <p className="text-sm text-gray-500">No leads yet.</p>
        ) : (
          <div className="space-y-2">
            {recentLeads?.items.map((lead) => (
              <div key={lead._id} className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{lead.source}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium
                    ${lead.status === LeadStatus.NEW ? 'badge-new' :
                      lead.status === LeadStatus.CONTACTED ? 'badge-contacted' :
                      lead.status === LeadStatus.QUALIFIED ? 'badge-qualified' : 'badge-lost'}`}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
