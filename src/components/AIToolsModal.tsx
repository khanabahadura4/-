import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  MessageSquare,
  Compass,
  X,
  Copy,
  Check,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';

interface AIToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
}

export const AIToolsModal: React.FC<AIToolsModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [activeTool, setActiveTool] = useState<'resume' | 'profile' | 'caption' | 'career'>('resume');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiOutput, setAiOutput] = useState('');

  // Inputs
  const [targetRole, setTargetRole] = useState('Senior Merchandiser');
  const [postTopic, setPostTopic] = useState('Achieved OEKO-TEX Standard 100 certification for our dyeing unit');
  const [dreamGoal, setDreamGoal] = useState('Become Head of Operations in a LEED Certified RMG Factory');

  if (!isOpen) return null;

  const handleGenerateResume = async () => {
    setLoading(true);
    setAiOutput('');
    try {
      const res = await fetch('/api/ai/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: currentUser,
          targetRole
        })
      });
      const data = await res.json();
      setAiOutput(data.result || 'Failed to generate resume.');
    } catch (e) {
      setAiOutput('Error connecting to AI server. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCaption = async () => {
    setLoading(true);
    setAiOutput('');
    try {
      const res = await fetch('/api/ai/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: postTopic,
          tone: 'professional'
        })
      });
      const data = await res.json();
      setAiOutput(data.result || 'Failed to generate caption.');
    } catch (e) {
      setAiOutput('Error connecting to AI server.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCareer = async () => {
    setLoading(true);
    setAiOutput('');
    try {
      const res = await fetch('/api/ai/career-pathfinder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentRole: currentUser.headline,
          dreamGoal,
          experienceYears: currentUser.totalExperienceYears
        })
      });
      const data = await res.json();
      setAiOutput(data.result || 'Failed to generate path.');
    } catch (e) {
      setAiOutput('Error connecting to AI server.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="text-base font-extrabold">Textile Connect BD AI Career Assistant</h3>
              <p className="text-[11px] text-amber-100">Powered by Gemini 2.5 Server-Side Integration</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-2 gap-2 text-xs">
          <button
            onClick={() => { setActiveTool('resume'); setAiOutput(''); }}
            className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTool === 'resume'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" /> AI Resume Builder
          </button>

          <button
            onClick={() => { setActiveTool('caption'); setAiOutput(''); }}
            className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTool === 'caption'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Post Caption AI
          </button>

          <button
            onClick={() => { setActiveTool('career'); setAiOutput(''); }}
            className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
              activeTool === 'career'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" /> Career Pathfinder
          </button>
        </div>

        {/* Tool Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* Tool 1: AI Resume Builder */}
          {activeTool === 'resume' && (
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Target Textile Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Merchandiser (Woven), Dyeing Master, Factory AGM..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <button
                onClick={handleGenerateResume}
                disabled={loading}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Optimized Textile Resume
              </button>
            </div>
          )}

          {/* Tool 2: Post Caption Generator */}
          {activeTool === 'caption' && (
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  What update or lab test result do you want to post about?
                </label>
                <textarea
                  value={postTopic}
                  onChange={(e) => setPostTopic(e.target.value)}
                  rows={3}
                  placeholder="e.g. Successfully developed 100% organic cotton bio-washed yarn sample..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <button
                onClick={handleGenerateCaption}
                disabled={loading}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate LinkedIn-Style Post & Hashtags
              </button>
            </div>
          )}

          {/* Tool 3: Career Pathfinder */}
          {activeTool === 'career' && (
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Your Ultimate RMG Career Goal
                </label>
                <input
                  type="text"
                  value={dreamGoal}
                  onChange={(e) => setDreamGoal(e.target.value)}
                  placeholder="e.g. Executive Director in a LEED Platinum Garments Composite..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <button
                onClick={handleGenerateCareer}
                disabled={loading}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate 5-Year Step-by-Step Career Roadmap
              </button>
            </div>
          )}

          {/* AI Output Result Card */}
          {aiOutput && (
            <div className="mt-4 p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 relative space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-[10px] font-bold uppercase text-amber-400">AI Recommendation Result</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="whitespace-pre-line leading-relaxed font-sans text-xs text-slate-200 max-h-80 overflow-y-auto">
                {aiOutput}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
