import React, { useState } from 'react';
import {
  ShieldAlert,
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  XCircle,
  BarChart3,
  Search,
  Check,
  X
} from 'lucide-react';
import { UserProfile, Company, University } from '../types';

interface AdminPanelProps {
  users: UserProfile[];
  companies: Company[];
  universities: University[];
  onApproveUser: (userId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  users,
  companies,
  universities,
  onApproveUser
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'companies' | 'universities'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-4">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-md border border-rose-800/50">
            System Administration
          </span>
          <h2 className="text-xl font-extrabold mt-2 tracking-tight">
            Textile Connect BD Admin Control
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Manage factory approvals, educational institution verifications, and professional user credentials.
          </p>
        </div>
      </div>

      {/* Analytics Counter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 font-bold block">Total Users</span>
          <span className="text-lg font-extrabold text-teal-600">{users.length}</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 font-bold block">Factories in DB</span>
          <span className="text-lg font-extrabold text-indigo-600">{companies.length}</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 font-bold block">Universities</span>
          <span className="text-lg font-extrabold text-emerald-600">{universities.length}</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-slate-400 font-bold block">Verified %</span>
          <span className="text-lg font-extrabold text-amber-500">100%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex border-b border-slate-100 dark:border-slate-800 pb-2 gap-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'users' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500'
            }`}
          >
            User Credentials ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'companies' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500'
            }`}
          >
            Factories & RMG Companies ({companies.length})
          </button>
          <button
            onClick={() => setActiveTab('universities')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'universities' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-500'
            }`}
          >
            Educational Institutions ({universities.length})
          </button>
        </div>

        {/* Content list */}
        {activeTab === 'users' && (
          <div className="space-y-2 text-xs">
            {users.map((u) => (
              <div key={u.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={u.profilePhoto} alt={u.firstName} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{u.firstName} {u.lastName}</h4>
                    <p className="text-[10px] text-slate-500">{u.headline}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>Role: {u.role}</span> • <span>Email: {u.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="space-y-2 text-xs">
            {companies.map((c) => (
              <div key={c.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt={c.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{c.name}</h4>
                    <p className="text-[10px] text-teal-600 font-semibold">{c.category}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">Active</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'universities' && (
          <div className="space-y-2 text-xs">
            {universities.map((uni) => (
              <div key={uni.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img src={uni.logo} alt={uni.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{uni.name}</h4>
                    <p className="text-[10px] text-emerald-600 font-semibold">{uni.location}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">Verified</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
