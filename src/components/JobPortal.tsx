import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Plus,
  Search,
  FileText,
  CheckCircle2,
  X,
  UserCheck
} from 'lucide-react';
import { JobCircular, UserProfile, JobApplication } from '../types';

interface JobPortalProps {
  jobs: JobCircular[];
  currentUser: UserProfile;
  onPostJob: (newJob: Partial<JobCircular>) => void;
  onApplyJob: (jobId: string, resumeName: string) => void;
}

export const JobPortal: React.FC<JobPortalProps> = ({
  jobs,
  currentUser,
  onPostJob,
  onApplyJob
}) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobCircular | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  // New Job Form State
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('DBL Group');
  const [location, setLocation] = useState('Kashimpur, Gazipur');
  const [department, setDepartment] = useState('Merchandising');
  const [experienceRequired, setExperienceRequired] = useState('3 - 5 Years');
  const [salaryRange, setSalaryRange] = useState('BDT 60,000 - 80,000 / month');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('2026-08-30');

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onPostJob({
      title,
      companyName,
      location,
      department,
      experienceRequired,
      salaryRange,
      jobType: 'Full-time',
      description,
      requirements: ['B.Sc in Textile Engineering', 'Relevant RMG experience'],
      deadline
    });

    setShowPostModal(false);
    setTitle('');
    setDescription('');
  };

  const handleApply = (jobId: string) => {
    onApplyJob(jobId, currentUser.resumeName || 'Applicant_Textile_CV.pdf');
    setAppliedJobIds([...appliedJobIds, jobId]);
    setSelectedJob(null);
  };

  const filteredJobs = jobs.filter(job => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = job.title.toLowerCase().includes(q);
      const companyMatch = job.companyName.toLowerCase().includes(q);
      const locMatch = job.location.toLowerCase().includes(q);
      if (!titleMatch && !companyMatch && !locMatch) return false;
    }
    if (deptFilter && job.department.toLowerCase() !== deptFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-5 shadow-lg flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/50">
            RMG Career Portal
          </span>
          <h2 className="text-xl font-extrabold mt-2 tracking-tight">
            Textile & Apparel Job Circulars
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Explore active openings across Merchandising, Quality Control, Dyeing, Spinning, and Industrial Engineering in Bangladesh.
          </p>
        </div>

        {(currentUser.role === 'hr' || currentUser.role === 'admin' || currentUser.role === 'factory_owner' || currentUser.role === 'professional') && (
          <button
            onClick={() => setShowPostModal(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shrink-0 transition-colors"
          >
            <Plus className="w-4 h-4" /> Post Job Circular
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title, factory e.g. DBL, Babylon..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-transparent focus:border-teal-500 text-slate-900 dark:text-white"
          />
        </div>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="p-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        >
          <option value="">All Departments</option>
          <option value="Merchandising">Merchandising</option>
          <option value="Quality Assurance">Quality Assurance / Testing</option>
          <option value="Industrial Engineering">Industrial Engineering</option>
          <option value="Dyeing">Dyeing & Wet Processing</option>
          <option value="Garments">Garments Production</option>
        </select>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3 hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <img src={job.companyLogo} alt={job.companyName} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-100 dark:ring-slate-800 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white hover:text-teal-600 cursor-pointer">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">{job.companyName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-teal-600" /> {job.location}</span>
                  <span>•</span>
                  <span>{job.experienceRequired}</span>
                  <span>•</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{job.salaryRange}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Deadline: {job.deadline}</span>
                <button
                  onClick={() => setSelectedJob(job)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    isApplied
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  }`}
                >
                  {isApplied ? 'Applied ✓' : 'View & Apply'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-5 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Post RMG Job Circular</h3>
              <button onClick={() => setShowPostModal(false)}><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div>
                <label className="block font-medium mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Merchandiser (Knitwear)"
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium mb-1">Company / Factory</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Job Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowPostModal(false)} className="px-4 py-2 bg-slate-200 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-teal-600 text-white font-bold rounded-xl">Publish Circular</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{selectedJob.title}</h3>
              <button onClick={() => setSelectedJob(null)}><X className="w-4 h-4" /></button>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedJob.description}</p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold block text-slate-900 dark:text-white mb-1">Attached Resume PDF:</span>
              <p className="text-teal-600 font-semibold">{currentUser.resumeName || 'Tanvir_Hossain_Textile_CV.pdf'}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setSelectedJob(null)} className="px-4 py-2 bg-slate-200 rounded-xl font-bold">Cancel</button>
              <button onClick={() => handleApply(selectedJob.id)} className="px-5 py-2 bg-teal-600 text-white font-bold rounded-xl">1-Click Submit Application</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
