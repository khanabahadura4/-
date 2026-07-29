import React, { useState } from 'react';
import {
  Search,
  Home,
  Users,
  Briefcase,
  Building2,
  GraduationCap,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Bell,
  Sun,
  Moon,
  UserPlus,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchPersona?: (user: UserProfile) => void;
  onSwitchUser?: (userId: string) => void;
  onOpenRegister: () => void;
  onOpenAITools?: () => void;
  unreadCount?: number;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  theme?: 'light' | 'dark';
  setTheme?: (t: 'light' | 'dark') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  allUsers,
  activeTab,
  setActiveTab,
  onSwitchPersona,
  onSwitchUser,
  onOpenRegister,
  onOpenAITools,
  unreadCount = 0,
  unreadNotificationsCount = 0,
  onOpenNotifications = () => {},
  theme = 'light',
  setTheme = () => {},
  searchQuery,
  setSearchQuery
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'network', label: 'Search', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'companies', label: 'Factories', icon: Building2 },
    { id: 'universities', label: 'Universities', icon: GraduationCap },
    { id: 'messaging', label: 'Chat', icon: MessageSquare, badge: unreadCount },
    { id: 'ai-tools', label: 'AI Tools', icon: Sparkles, highlight: true },
    ...(currentUser.role === 'admin' ? [{ id: 'admin', label: 'Admin', icon: ShieldCheck }] : [])
  ];

  const handleUserSelect = (u: UserProfile) => {
    if (onSwitchPersona) {
      onSwitchPersona(u);
    } else if (onSwitchUser) {
      onSwitchUser(u.id);
    }
    setShowUserDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Name - Bento Style */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('feed')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:bg-emerald-700 transition-colors">
                T
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                  TextileConnect <span className="text-emerald-600 dark:text-emerald-400">BD</span>
                </span>
              </div>
            </button>
          </div>

          {/* Bento Pill Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'network') setActiveTab('network');
              }}
              placeholder="Search Factory, University, or Batch..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* Desktop Navigation - Bento Icon & Micro Labels */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              if (item.id === 'ai-tools' && onOpenAITools) {
                return (
                  <button
                    key={item.id}
                    onClick={onOpenAITools}
                    className="flex flex-col items-center px-3 py-1 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-all"
                  >
                    <Icon className="w-5 h-5 animate-pulse" />
                    <span className="text-[10px] mt-0.5 uppercase tracking-tighter font-bold">{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center px-3 py-1 rounded-xl transition-all ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {item.badge && item.badge > 0 ? (
                      <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[10px] mt-1 uppercase tracking-tighter font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Profile Avatar Pill with Emerald Ring */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-full border-2 border-emerald-500 p-0.5 focus:outline-hidden hover:scale-105 transition-transform"
                title="Switch persona or profile"
              >
                <img
                  src={currentUser.profilePhoto}
                  alt={currentUser.firstName}
                  className="w-full h-full rounded-full object-cover"
                />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Persona</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{currentUser.firstName} {currentUser.lastName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.headline}</p>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    <p className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Profile</p>
                    {allUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => handleUserSelect(u)}
                        className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                          u.id === currentUser.id ? 'bg-emerald-50/60 dark:bg-emerald-950/30' : ''
                        }`}
                      >
                        <img src={u.profilePhoto} alt={u.firstName} className="w-8 h-8 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900 dark:text-white truncate">
                            {u.firstName} {u.lastName}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {u.role}
                          </p>
                        </div>
                        {u.id === currentUser.id && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-center py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl"
                    >
                      View Full Profile
                    </button>
                    <button
                      onClick={() => {
                        onOpenRegister();
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Register New Account
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'network') setActiveTab('network');
              }}
              placeholder="Search factory, university, batch..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-full text-slate-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'ai-tools' && onOpenAITools) {
                      onOpenAITools();
                    } else {
                      setActiveTab(item.id);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
