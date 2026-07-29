import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Users,
  Briefcase,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Company, UserProfile, JobCircular } from '../types';

interface CompanyDirectoryProps {
  companies: Company[];
  users: UserProfile[];
  jobs: JobCircular[];
  onOpenMessage: (user: UserProfile) => void;
  onApplyJob: (job: JobCircular) => void;
}

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({
  companies,
  users,
  jobs,
  onOpenMessage,
  onApplyJob
}) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = Array.from(new Set(companies.map(c => c.category)));

  const filteredCompanies = companies.filter(c => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = c.name.toLowerCase().includes(q);
      const categoryMatch = c.category.toLowerCase().includes(q);
      const locationMatch = c.locations.some(l => l.toLowerCase().includes(q));
      if (!nameMatch && !categoryMatch && !locationMatch) return false;
    }
    if (categoryFilter && c.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded-md border border-teal-800/50">
            Bangladesh RMG Industrial Index
          </span>
          <h2 className="text-xl font-extrabold mt-2 tracking-tight">
            Factory & Company Directory
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Discover Bangladesh leading spinning, knitting, dyeing, weaving, denim, washing, and apparel composite manufacturing groups.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search factory name, location e.g. Gazipur, CEPZ, Savar..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-transparent focus:border-teal-500 text-slate-900 dark:text-white"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company) => {
          const employees = users.filter(u => u.experiences.some(e => e.factoryName.toLowerCase() === company.name.toLowerCase()));
          const activeJobs = jobs.filter(j => j.companyName.toLowerCase() === company.name.toLowerCase());

          return (
            <div
              key={company.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-20 bg-slate-800 relative">
                  <img src={company.coverImage} alt={company.name} className="w-full h-full object-cover opacity-80" />
                </div>

                <div className="p-4 relative">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-12 h-12 rounded-xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md -mt-10"
                  />

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 flex items-center gap-1.5">
                    {company.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 fill-teal-500/20" />
                  </h3>

                  <span className="inline-block text-[10px] font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md mt-1">
                    {company.category}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {company.about}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{company.locations.join(', ')}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> {employees.length} Employees on TCBD
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Briefcase className="w-3.5 h-3.5" /> {activeJobs.length} Jobs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedCompany(company)}
                  className="w-full py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                >
                  View Directory & Employees <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detailed Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="h-28 bg-slate-800 relative">
              <img src={selectedCompany.coverImage} alt={selectedCompany.name} className="w-full h-full object-cover opacity-80" />
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-3 right-3 p-1.5 bg-slate-900/80 text-white rounded-xl hover:bg-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-end gap-3 -mt-12 relative z-10">
                <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-16 h-16 rounded-2xl ring-4 ring-white dark:ring-slate-900 object-cover shadow-md" />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{selectedCompany.name}</h2>
                  <p className="text-xs font-semibold text-teal-600">{selectedCompany.category}</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedCompany.about}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Factory Units</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedCompany.locations.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">HR Contact</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">{selectedCompany.hrContact}</span>
                </div>
              </div>

              {/* Employee Directory */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" /> Employee Directory on Platform
                </h4>
                {users.filter(u => u.experiences.some(e => e.factoryName.toLowerCase() === selectedCompany.name.toLowerCase())).map((emp) => (
                  <div key={emp.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={emp.profilePhoto} alt={emp.firstName} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{emp.firstName} {emp.lastName}</p>
                        <p className="text-[10px] text-slate-500">{emp.headline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setSelectedCompany(null); onOpenMessage(emp); }}
                      className="px-2.5 py-1 text-[11px] font-bold bg-teal-600 text-white rounded-lg"
                    >
                      Message
                    </button>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
