import React, { useState, useEffect } from 'react';
import {
  MOCK_USERS,
  MOCK_POSTS,
  MOCK_JOBS,
  MOCK_MESSAGES,
  PRELOADED_FACTORIES,
  PRELOADED_UNIVERSITIES,
  PRELOADED_DEPARTMENTS,
  PRELOADED_DESIGNATIONS,
  MOCK_COMPANIES_FULL,
  MOCK_UNIVERSITIES_FULL
} from './data/mockData';
import { UserProfile, Post, JobCircular, Message, Company, University } from './types';
import { getStoredData, saveStoredData } from './lib/storage';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { SmartSearch } from './components/SmartSearch';
import { ProfileView } from './components/ProfileView';
import { RegistrationModal } from './components/RegistrationModal';
import { CompanyDirectory } from './components/CompanyDirectory';
import { UniversityDirectory } from './components/UniversityDirectory';
import { Messaging } from './components/Messaging';
import { JobPortal } from './components/JobPortal';
import { AIToolsModal } from './components/AIToolsModal';
import { AdminPanel } from './components/AdminPanel';

export function App() {
  // Application State initialized from localStorage or Mock Data
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const local = getStoredData<UserProfile[]>('tcbd_users');
    return local && local.length > 0 ? local : MOCK_USERS;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const local = getStoredData<Post[]>('tcbd_posts');
    return local && local.length > 0 ? local : MOCK_POSTS;
  });

  const [jobs, setJobs] = useState<JobCircular[]>(() => {
    const local = getStoredData<JobCircular[]>('tcbd_jobs');
    return local && local.length > 0 ? local : MOCK_JOBS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const local = getStoredData<Message[]>('tcbd_messages');
    return local && local.length > 0 ? local : MOCK_MESSAGES;
  });

  // Current Logged-In Persona
  const [currentUser, setCurrentUser] = useState<UserProfile>(users[0]);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  
  // Selected target profile view (when viewing another user's profile)
  const [viewingUser, setViewingUser] = useState<UserProfile | null>(null);

  // Selected chat target
  const [chatTargetUser, setChatTargetUser] = useState<UserProfile | null>(null);

  // Save to Local Storage whenever state updates
  useEffect(() => {
    saveStoredData('tcbd_users', users);
  }, [users]);

  useEffect(() => {
    saveStoredData('tcbd_posts', posts);
  }, [posts]);

  useEffect(() => {
    saveStoredData('tcbd_jobs', jobs);
  }, [jobs]);

  useEffect(() => {
    saveStoredData('tcbd_messages', messages);
  }, [messages]);

  // Persona Switch Handler
  const handleSwitchPersona = (user: UserProfile) => {
    setCurrentUser(user);
  };

  // Post Actions
  const handleCreatePost = (newPostData: Partial<Post>) => {
    const primaryEdu = currentUser.educations[0];
    const primaryExp = currentUser.experiences[0];

    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      authorName: `${currentUser.firstName} ${currentUser.lastName}`,
      authorTitle: currentUser.headline,
      authorAvatar: currentUser.profilePhoto,
      authorBatch: primaryEdu?.batch,
      authorUniversity: primaryEdu?.institutionName,
      authorFactory: primaryExp?.factoryName,
      authorDepartment: primaryExp?.department || primaryEdu?.department,
      content: newPostData.content || '',
      privacy: newPostData.privacy || 'public',
      targetFilterValue: newPostData.targetFilterValue,
      images: newPostData.images,
      documentUrl: newPostData.documentUrl,
      documentName: newPostData.documentName,
      poll: newPostData.poll,
      likes: [],
      commentsCount: 0,
      sharesCount: 0,
      createdAt: 'Just now',
      comments: [],
      savedBy: []
    };

    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId: string, reactionType: 'like' | 'celebrate' | 'love') => {
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;
      const existingLikeIdx = p.likes.findIndex(l => l.userId === currentUser.id);
      let newLikes = [...p.likes];
      if (existingLikeIdx >= 0) {
        newLikes.splice(existingLikeIdx, 1);
      } else {
        newLikes.push({ userId: currentUser.id, type: reactionType });
      }
      return { ...p, likes: newLikes };
    }));
  };

  const handleCommentPost = (postId: string, text: string) => {
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;
      const newComment = {
        id: `cmt-${Date.now()}`,
        authorName: `${currentUser.firstName} ${currentUser.lastName}`,
        authorAvatar: currentUser.profilePhoto,
        text,
        createdAt: 'Just now'
      };
      return {
        ...p,
        commentsCount: p.commentsCount + 1,
        comments: [...(p.comments || []), newComment]
      };
    }));
  };

  const handleVotePoll = (postId: string, optionId: string) => {
    setPosts(posts.map(p => {
      if (p.id !== postId || !p.poll) return p;
      const newOptions = p.poll.options.map(opt => {
        if (opt.id === optionId) {
          if (opt.votes.includes(currentUser.id)) {
            return { ...opt, votes: opt.votes.filter(id => id !== currentUser.id) };
          } else {
            return { ...opt, votes: [...opt.votes, currentUser.id] };
          }
        } else {
          return { ...opt, votes: opt.votes.filter(id => id !== currentUser.id) };
        }
      });
      return { ...p, poll: { ...p.poll, options: newOptions } };
    }));
  };

  const handleSavePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id !== postId) return p;
      const saved = p.savedBy || [];
      const newSaved = saved.includes(currentUser.id)
        ? saved.filter(id => id !== currentUser.id)
        : [...saved, currentUser.id];
      return { ...p, savedBy: newSaved };
    }));
  };

  // Connection Handler
  const handleConnect = (targetUserId: string) => {
    setUsers(users.map(u => {
      if (u.id === targetUserId) {
        const nextStatus = u.connectionStatus === 'connected' ? 'none' : 'connected';
        return {
          ...u,
          connectionStatus: nextStatus as any,
          connectionsCount: nextStatus === 'connected' ? u.connectionsCount + 1 : u.connectionsCount - 1
        };
      }
      return u;
    }));
  };

  // Open Messaging
  const handleOpenMessage = (target: UserProfile) => {
    setChatTargetUser(target);
    setActiveTab('messaging');
  };

  // View Profile
  const handleViewProfile = (target: UserProfile) => {
    setViewingUser(target);
    setActiveTab('profile');
  };

  // Send Personal Message
  const handleSendMessage = (receiverId: string, text: string, mediaUrl?: string, mediaType?: 'image' | 'video' | 'pdf' | 'audio', fileName?: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      text,
      mediaUrl,
      mediaType,
      fileName,
      createdAt: 'Just now',
      seen: false
    };
    setMessages([...messages, newMsg]);
  };

  // Delete Message
  const handleDeleteMessage = (messageId: string, deleteForEveryone: boolean) => {
    setMessages(messages.filter(m => m.id !== messageId));
  };

  // Post RMG Job
  const handlePostJob = (newJobData: Partial<JobCircular>) => {
    const newJob: JobCircular = {
      id: `job-${Date.now()}`,
      title: newJobData.title || 'Textile Engineer',
      companyName: newJobData.companyName || 'DBL Group',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      location: newJobData.location || 'Gazipur, Dhaka',
      department: newJobData.department || 'Merchandising',
      experienceRequired: newJobData.experienceRequired || '2-4 Years',
      salaryRange: newJobData.salaryRange || 'BDT 50,000 - 70,000 / month',
      jobType: 'Full-time',
      postedDate: 'Today',
      createdAt: 'Just now',
      deadline: newJobData.deadline || '2026-08-30',
      description: newJobData.description || 'Responsible for merchandising and production planning.',
      requirements: newJobData.requirements || ['B.Sc in Textile Engineering'],
      postedBy: currentUser.id,
      applicantsCount: 0,
      applicants: []
    };
    setJobs([newJob, ...jobs]);
  };

  // Apply Job
  const handleApplyJob = (jobId: string, resumeName: string) => {
    setJobs(jobs.map(j => {
      if (j.id !== jobId) return j;
      const app = {
        id: `app-${Date.now()}`,
        userId: currentUser.id,
        applicantName: `${currentUser.firstName} ${currentUser.lastName}`,
        applicantHeadline: currentUser.headline,
        applicantAvatar: currentUser.profilePhoto,
        resumeUrl: currentUser.resumeUrl || '#',
        resumeName,
        appliedAt: 'Just now',
        status: 'applied' as const
      };
      return { ...j, applicants: [...(j.applicants || []), app] };
    }));
  };

  // Save User Profile Updates
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUsers(users.map(u => u.id === updatedProfile.id ? updatedProfile : u));
    if (updatedProfile.id === currentUser.id) {
      setCurrentUser(updatedProfile);
    }
  };

  // Register New User
  const handleRegisterSuccess = (newUser: UserProfile) => {
    setUsers([newUser, ...users]);
    setCurrentUser(newUser);
    setActiveTab('feed');
  };

  const savedPostsCount = posts.filter(p => p.savedBy?.includes(currentUser.id)).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegister={() => setShowRegisterModal(true)}
        onOpenAITools={() => setShowAIModal(true)}
        allUsers={users}
        onSwitchPersona={handleSwitchPersona}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Responsive Canvas Layout */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Sidebar
                currentUser={currentUser}
                onOpenProfile={() => {
                  setViewingUser(currentUser);
                  setActiveTab('profile');
                }}
                onOpenAITools={() => setShowAIModal(true)}
                setActiveTab={setActiveTab}
                savedPostsCount={savedPostsCount}
              />
            </div>
            <div className="lg:col-span-3">
              <Feed
                currentUser={currentUser}
                posts={posts}
                onCreatePost={handleCreatePost}
                onLikePost={handleLikePost}
                onCommentPost={handleCommentPost}
                onVotePoll={handleVotePoll}
                onSavePost={handleSavePost}
                onOpenAITools={() => setShowAIModal(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <SmartSearch
            users={users}
            currentUser={currentUser}
            factories={PRELOADED_FACTORIES.map(f => f.name)}
            universities={PRELOADED_UNIVERSITIES.map(u => u.name)}
            departments={PRELOADED_DEPARTMENTS}
            designations={PRELOADED_DESIGNATIONS}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onConnect={handleConnect}
            onOpenMessage={handleOpenMessage}
            onViewProfile={handleViewProfile}
          />
        )}

        {activeTab === 'companies' && (
          <CompanyDirectory
            companies={MOCK_COMPANIES_FULL}
            users={users}
            jobs={jobs}
            onOpenMessage={handleOpenMessage}
            onApplyJob={(job) => handleApplyJob(job.id, currentUser.resumeName || 'CV.pdf')}
          />
        )}

        {activeTab === 'universities' && (
          <UniversityDirectory
            universities={MOCK_UNIVERSITIES_FULL}
            users={users}
            onOpenMessage={handleOpenMessage}
          />
        )}

        {activeTab === 'messaging' && (
          <Messaging
            currentUser={currentUser}
            allUsers={users}
            messages={messages}
            onSendMessage={handleSendMessage}
            onDeleteMessage={handleDeleteMessage}
            targetUser={chatTargetUser}
          />
        )}

        {activeTab === 'jobs' && (
          <JobPortal
            jobs={jobs}
            currentUser={currentUser}
            onPostJob={handlePostJob}
            onApplyJob={handleApplyJob}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={viewingUser || currentUser}
            isOwnProfile={(viewingUser?.id || currentUser.id) === currentUser.id}
            onSaveProfile={handleSaveProfile}
            universities={PRELOADED_UNIVERSITIES.map(u => u.name)}
            factories={PRELOADED_FACTORIES.map(f => f.name)}
            departments={PRELOADED_DEPARTMENTS}
            designations={PRELOADED_DESIGNATIONS}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            users={users}
            companies={MOCK_COMPANIES_FULL}
            universities={MOCK_UNIVERSITIES_FULL}
            onApproveUser={(id) => {}}
          />
        )}
      </main>

      {/* Modals */}
      <RegistrationModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegisterSuccess={handleRegisterSuccess}
        universities={PRELOADED_UNIVERSITIES.map(u => u.name)}
        factories={PRELOADED_FACTORIES.map(f => f.name)}
        departments={PRELOADED_DEPARTMENTS}
        designations={PRELOADED_DESIGNATIONS}
      />

      <AIToolsModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        currentUser={currentUser}
      />

    </div>
  );
}

export default App;
