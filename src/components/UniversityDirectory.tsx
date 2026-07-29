import React, { useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Users,
  Search,
  CheckCircle2,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { University, UserProfile } from '../types';

interface UniversityDirectoryProps {
  universities: University[];
  users: UserProfile[];
  onOpenMessage: (user: UserProfile) => void;
}

export const UniversityDirectory: React.FC<UniversityDirectoryProps> = ({
  universities,
  users,
  onOpenMessage
}) => {
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredUnis = universities.filter(u => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = u.name.toLowerCase().includes(q);
      const shortMatch = u.shortName.toLowerCase().includes(q);
      const locMatch = u.location.toLowerCase().includes(q);
      if (!nameMatch && !shortMatch && !locMatch) return false;
    }
    if (typeFilter && u.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/50">
            Textile Education Index
          </span>
          <h2 className="text-xl font-extrabold mt-2 tracking-tight">
            University & Govt Institute Directory
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Connect with students, faculty, and alumni across BUTEX, BUFT, Primeasia, AUST, KUET, RUET, CUET, and Govt Textile Institutes.
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
            placeholder="Search university e.g. BUTEX, BUFT, Dinajpur, Tangail..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-transparent focus:border-emerald-500 text-slate-900 dark:text-white"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        >
          <option value="">All Institution Types</option>
          <option value="public_university">Public Universities</option>
          <option value="private_university">Private Universities</option>
          <option value="govt_textile_institute">Govt Engineering Colleges & Institutes</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUnis.map((uni) => {
          const alumni = users.filter(u => u.educations.some(e => e.institutionName.toLowerCase().includes(uni.shortName.toLowerCase()) || e.institutionName.toLowerCase().includes(uni.name.toLowerCase())));

          return (
            <div
              key={uni.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-20 bg-slate-800 relative">
                  <img src={uni.coverImage} alt={uni.name} className="w-full h-full object-cover opacity-80" />
                </div>

                <div className="p-4 relative">
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="w-12 h-12 rounded-xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-md -mt-10"
                  />

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 flex items-center gap-1.5">
                    {uni.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                  </h3>

                  <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md mt-1">
                    {uni.type.replace('_', ' ').toUpperCase()}
                  </span>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {uni.about}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{uni.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                        <Users className="w-3.5 h-3.5 text-slate-400" /> {alumni.length} Registered Alumni & Students
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedUni(uni)}
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                >
                  View Alumni & Batches <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedUni && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="h-28 bg-slate-800 relative">
              <img src={selectedUni.coverImage} alt={selectedUni.name} className="w-full h-full object-cover opacity-80" />
              <button
                onClick={() => setSelectedUni(null)}
                className="absolute top-3 right-3 p-1.5 bg-slate-900/80 text-white rounded-xl hover:bg-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-end gap-3 -mt-12 relative z-10">
                <img src={selectedUni.logo} alt={selectedUni.name} className="w-16 h-16 rounded-2xl ring-4 ring-white dark:ring-slate-900 object-cover shadow-md" />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{selectedUni.name}</h2>
                  <p className="text-xs font-semibold text-emerald-600">{selectedUni.location}</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedUni.about}
              </p>

              {/* Alumni List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" /> Alumni & Student Network
                </h4>
                {users.filter(u => u.educations.some(e => e.institutionName.toLowerCase().includes(selectedUni.shortName.toLowerCase()) || e.institutionName.toLowerCase().includes(selectedUni.name.toLowerCase()))).map((alum) => (
                  <div key={alum.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={alum.profilePhoto} alt={alum.firstName} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{alum.firstName} {alum.lastName}</p>
                        <p className="text-[10px] text-slate-500">{alum.headline}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setSelectedUni(null); onOpenMessage(alum); }}
                      className="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded-lg"
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
