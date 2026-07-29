import React from 'react';
import {
  Bookmark,
  Sparkles,
  FileText,
  Building2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  currentUser: UserProfile;
  onOpenProfile: () => void;
  onOpenAITools: () => void;
  setActiveTab: (tab: string) => void;
  savedPostsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  onOpenProfile,
  onOpenAITools,
  setActiveTab,
  savedPostsCount
}) => {
  const primaryEdu = currentUser.educations[0];
  const primaryExp = currentUser.experiences.find(e => e.currentWorkplace) || currentUser.experiences[0];

  return (
    <div className="space-y-4">
      {/* Profile Summary - Bento Card Style */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        {/* Cover Image Header */}
        <div className="h-20 bg-emerald-700 relative">
          {currentUser.coverPhoto && (
            <img
              src={currentUser.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-slate-300 dark:bg-slate-800 rounded-2xl border-4 border-white dark:border-slate-900 shadow-md overflow-hidden">
            <img
              src={currentUser.profilePhoto}
              alt={currentUser.firstName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-12 text-center px-4 pb-4">
          <button
            onClick={onOpenProfile}
            className="group focus:outline-hidden inline-block"
          >
            <h2 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors flex items-center justify-center gap-1.5">
              {currentUser.firstName} {currentUser.lastName}
              {currentUser.emailVerified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
              )}
            </h2>
          </button>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-0.5 line-clamp-1">
            {currentUser.headline}
          </p>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
            {primaryEdu && <span>{primaryEdu.institutionName.split('(')[0]}</span>}
            {primaryEdu?.batch && <span>• Batch {primaryEdu.batch}</span>}
            {primaryExp && <span>• {primaryExp.department || primaryExp.factoryName}</span>}
          </p>

          {/* Bento Grid Stats */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {currentUser.connectionsCount > 1000 ? `${(currentUser.connectionsCount/1000).toFixed(1)}k` : currentUser.connectionsCount}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Connections</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {currentUser.followersCount || 482}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Profile Views</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto border-t border-slate-100 dark:border-slate-800 p-4">
          <button
            onClick={onOpenProfile}
            className="w-full py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-lg border border-emerald-100 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
          >
            View Full Profile
          </button>
        </div>
      </div>

      {/* Quick Action Shortcuts Bento Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1 text-xs shadow-sm">
        <button
          onClick={onOpenAITools}
          className="w-full flex items-center justify-between p-2 rounded-xl text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 font-semibold transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI Resume & Career Suite
          </span>
          <span className="text-[10px] bg-amber-200 dark:bg-amber-800 px-1.5 py-0.5 rounded-full uppercase font-bold">
            PRO
          </span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className="w-full flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
        >
          <span className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Explore RMG Jobs
          </span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className="w-full flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
        >
          <span className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-slate-500" />
            Saved Posts
          </span>
          <span className="text-slate-400 font-bold">{savedPostsCount}</span>
        </button>
      </div>

      {/* Industry Analytics Bento Spotlight */}
      <div className="bg-emerald-900 text-white rounded-2xl border border-emerald-800 shadow-md p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-emerald-300">
            <TrendingUp className="w-3.5 h-3.5" /> BD Textile Network
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="p-2 bg-white/10 rounded-xl border border-white/10">
            <span className="text-sm font-extrabold text-white block">3,200+</span>
            <span className="text-[10px] text-emerald-200">RMG Factories</span>
          </div>
          <div className="p-2 bg-white/10 rounded-xl border border-white/10">
            <span className="text-sm font-extrabold text-emerald-300 block">45+</span>
            <span className="text-[10px] text-emerald-200">Institutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
