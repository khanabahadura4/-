import React, { useState } from 'react';
import {
  Search,
  Filter,
  Building2,
  GraduationCap,
  Briefcase,
  MapPin,
  MessageSquare,
  UserCheck,
  UserPlus,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, Company, University } from '../types';

interface SmartSearchProps {
  users: UserProfile[];
  currentUser: UserProfile;
  factories: (string | Company)[];
  universities: (string | University)[];
  departments: string[];
  designations: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onConnect: (userId: string) => void;
  onOpenMessage: (user: UserProfile) => void;
  onViewProfile: (user: UserProfile) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  users,
  currentUser,
  factories,
  universities,
  departments,
  designations,
  searchQuery,
  setSearchQuery,
  onConnect,
  onOpenMessage,
  onViewProfile
}) => {
  // Multi-filter States
  const [selectedFactory, setSelectedFactory] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [minExpYears, setMinExpYears] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [jobAvailableOnly, setJobAvailableOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  const districts = ['Dhaka', 'Gazipur', 'Narayanganj', 'Chattogram', 'Cumilla', 'Mymensingh', 'Tangail', 'Pabna', 'Dinajpur', 'Khulna', 'Barishal', 'Rangpur', 'Rajshahi', 'Sylhet', 'Jessore'];

  const resetFilters = () => {
    setSelectedFactory('');
    setSelectedUniversity('');
    setSelectedBatch('');
    setSelectedDepartment('');
    setSelectedDesignation('');
    setMinExpYears(0);
    setSelectedDistrict('');
    setJobAvailableOnly(false);
    setSelectedGender('');
    setSearchQuery('');
  };

  // Filter Logic
  const filteredUsers = users.filter(user => {
    if (user.id === currentUser.id) return false; // exclude self from directory

    // Text query search across name, headline, skills
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(q);
      const headlineMatch = user.headline.toLowerCase().includes(q);
      const skillMatch = user.skills.some(s => s.toLowerCase().includes(q));
      if (!nameMatch && !headlineMatch && !skillMatch) return false;
    }

    // Factory Filter
    if (selectedFactory) {
      const matchExp = user.experiences.some(e => e.factoryName.toLowerCase() === selectedFactory.toLowerCase() || e.companyGroup?.toLowerCase() === selectedFactory.toLowerCase());
      if (!matchExp) return false;
    }

    // University / Institution Filter
    if (selectedUniversity) {
      const matchEdu = user.educations.some(e => e.institutionName.toLowerCase() === selectedUniversity.toLowerCase());
      if (!matchEdu) return false;
    }

    // Batch Filter
    if (selectedBatch) {
      const matchBatch = user.educations.some(e => e.batch === selectedBatch);
      if (!matchBatch) return false;
    }

    // Department Filter
    if (selectedDepartment) {
      const deptMatchExp = user.experiences.some(e => e.department.toLowerCase() === selectedDepartment.toLowerCase());
      const deptMatchEdu = user.educations.some(e => e.department.toLowerCase() === selectedDepartment.toLowerCase());
      if (!deptMatchExp && !deptMatchEdu) return false;
    }

    // Designation Filter
    if (selectedDesignation) {
      const desigMatch = user.experiences.some(e => e.designation.toLowerCase() === selectedDesignation.toLowerCase());
      if (!desigMatch) return false;
    }

    // Experience Filter
    if (minExpYears > 0) {
      if (user.totalExperienceYears < minExpYears) return false;
    }

    // District Filter
    if (selectedDistrict) {
      if (user.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
    }

    // Availability Filter
    if (jobAvailableOnly) {
      if (!user.availableForJob) return false;
    }

    // Gender Filter
    if (selectedGender) {
      if (user.gender !== selectedGender) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* Search Header Bento Banner */}
      <div className="bg-emerald-900 text-white rounded-2xl p-5 shadow-md border border-emerald-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/50">
            Smart Directory
          </span>
          <h2 className="text-xl font-extrabold mt-2 tracking-tight">
            Bangladesh Textile & RMG Network
          </h2>
          <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
            Instantly connect with textile engineers, merchandisers, apparel executives, and factory directors by Factory, University, Batch, Department & Experience.
          </p>
        </div>
      </div>

      {/* Multi-Filter Controls Bento Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest">
              Industry Filters
            </h3>
          </div>
          <button
            onClick={resetFilters}
            className="text-[11px] font-semibold text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Factory Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Factory / Group
            </label>
            <select
              value={selectedFactory}
              onChange={(e) => setSelectedFactory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="">All Factories</option>
              {factories.map((f, idx) => {
                const name = typeof f === 'string' ? f : f.name;
                const key = typeof f === 'string' ? `fac-${idx}-${f}` : f.id;
                return <option key={key} value={name}>{name}</option>;
              })}
            </select>
          </div>

          {/* University Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              University / College
            </label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="">All Institutions</option>
              {universities.map((u, idx) => {
                const name = typeof u === 'string' ? u : u.name;
                return <option key={typeof u === 'string' ? `uni-${idx}-${u}` : u.id} value={name}>{name}</option>;
              })}
            </select>
          </div>

          {/* Batch Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Batch No.
            </label>
            <input
              type="text"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              placeholder="e.g. 42 or 2018"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          {/* Designation Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Designation
            </label>
            <select
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="">All Designations</option>
              {designations.map((des) => (
                <option key={des} value={des}>{des}</option>
              ))}
            </select>
          </div>

          {/* District / Location Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              District / Location
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="">All Locations</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Min Experience */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
              Min Experience
            </label>
            <select
              value={minExpYears}
              onChange={(e) => setMinExpYears(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value={0}>Any Experience</option>
              <option value={1}>1+ Year</option>
              <option value={3}>3+ Years</option>
              <option value={5}>5+ Years</option>
              <option value={8}>8+ Years</option>
              <option value={10}>10+ Years</option>
            </select>
          </div>

          {/* Job Availability Toggle Pill */}
          <div className="flex items-end">
            <button
              onClick={() => setJobAvailableOnly(!jobAvailableOnly)}
              className={`w-full p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                jobAvailableOnly
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${jobAvailableOnly ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              {jobAvailableOnly ? 'Hiring / Job Seeking Only' : 'Filter Open for Job'}
            </button>
          </div>

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Found <strong className="text-slate-900 dark:text-white">{filteredUsers.length}</strong> matching textile professionals</span>
      </div>

      {/* Professional Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => {
          const primaryEdu = user.educations[0];
          const primaryExp = user.experiences.find(e => e.currentWorkplace) || user.experiences[0];

          return (
            <div
              key={user.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3 hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-start gap-3">
                  <img
                    src={user.profilePhoto}
                    alt={user.firstName}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        onClick={() => onViewProfile(user)}
                        className="text-sm font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer truncate"
                      >
                        {user.firstName} {user.lastName}
                      </h3>
                      {user.availableForJob && (
                        <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                          Open for Job
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-0.5">
                      {user.headline}
                    </p>
                  </div>
                </div>

                {/* Details Badges */}
                <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {primaryExp && (
                    <div className="flex items-center gap-2 truncate">
                      <Building2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {primaryExp.designation}
                      </span>
                      <span>at</span>
                      <span className="truncate">{primaryExp.factoryName}</span>
                    </div>
                  )}

                  {primaryEdu && (
                    <div className="flex items-center gap-2 truncate">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{primaryEdu.institutionName}</span>
                      {primaryEdu.batch && (
                        <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 rounded-md font-mono text-[10px]">
                          Batch {primaryEdu.batch}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{user.district}</span>
                    <span>•</span>
                    <span>{user.totalExperienceYears} yrs exp</span>
                  </div>
                </div>

                {/* Skills Chips */}
                {user.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {user.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onConnect(user.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    user.connectionStatus === 'connected'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  }`}
                >
                  {user.connectionStatus === 'connected' ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" /> Connected
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Connect
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenMessage(user)}
                  className="py-1.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Message
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
