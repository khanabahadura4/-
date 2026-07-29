import React, { useState } from 'react';
import {
  Image,
  Paperclip,
  BarChart2,
  Lock,
  Globe,
  Users,
  Building2,
  GraduationCap,
  Heart,
  ThumbsUp,
  Sparkles,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  Send,
  X,
  Check,
  FileText
} from 'lucide-react';
import { Post, UserProfile, PostPrivacy } from '../types';

interface FeedProps {
  currentUser: UserProfile;
  posts: Post[];
  onCreatePost: (newPostData: Partial<Post>) => void;
  onLikePost: (postId: string, reactionType: 'like' | 'celebrate' | 'love') => void;
  onCommentPost: (postId: string, commentText: string) => void;
  onVotePoll: (postId: string, optionId: string) => void;
  onSavePost: (postId: string) => void;
  onOpenAITools: () => void;
}

export const Feed: React.FC<FeedProps> = ({
  currentUser,
  posts,
  onCreatePost,
  onLikePost,
  onCommentPost,
  onVotePoll,
  onSavePost,
  onOpenAITools
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postPrivacy, setPostPrivacy] = useState<PostPrivacy>('public');
  const [targetFilterValue, setTargetFilterValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [docName, setDocName] = useState('');
  
  // Poll State
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

  // Active Comment Box
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  // Primary University & Factory
  const userUni = currentUser.educations[0]?.institutionName || '';
  const userBatch = currentUser.educations[0]?.batch || '';
  const userFactory = currentUser.experiences[0]?.factoryName || '';
  const userDept = currentUser.experiences[0]?.department || currentUser.educations[0]?.department || '';

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() && !imageUrl && !docUrl && !pollQuestion) return;

    let pollData = undefined;
    if (showPollCreator && pollQuestion.trim()) {
      pollData = {
        question: pollQuestion,
        options: pollOptions
          .filter(o => o.trim() !== '')
          .map((text, idx) => ({
            id: `opt-${idx}-${Date.now()}`,
            text,
            votes: []
          }))
      };
    }

    onCreatePost({
      content: postContent,
      privacy: postPrivacy,
      targetFilterValue: targetFilterValue || (
        postPrivacy === 'same_university' ? userUni :
        postPrivacy === 'same_batch' ? userBatch :
        postPrivacy === 'same_factory' ? userFactory :
        postPrivacy === 'same_department' ? userDept : undefined
      ),
      images: imageUrl ? [imageUrl] : undefined,
      documentUrl: docUrl || undefined,
      documentName: docName || undefined,
      poll: pollData
    });

    // Reset Form
    setPostContent('');
    setImageUrl('');
    setDocUrl('');
    setDocName('');
    setShowPollCreator(false);
    setPollQuestion('');
    setPollOptions(['', '']);
    setIsCreating(false);
  };

  // Filter posts based on post privacy and currentUser profile attributes
  const visiblePosts = posts.filter(post => {
    if (post.privacy === 'public') return true;
    if (post.authorId === currentUser.id) return true;
    if (post.privacy === 'connections_only') return true; // assuming demo network connection

    if (post.privacy === 'same_university') {
      return userUni && post.authorUniversity === userUni;
    }
    if (post.privacy === 'same_batch') {
      return userBatch && post.authorBatch === userBatch;
    }
    if (post.privacy === 'same_factory') {
      return userFactory && post.authorFactory === userFactory;
    }
    if (post.privacy === 'same_department') {
      return userDept && post.authorDepartment === userDept;
    }
    return true;
  });

  const getPrivacyBadge = (privacy: PostPrivacy, target?: string) => {
    switch (privacy) {
      case 'public':
        return <span className="inline-flex items-center gap-1 text-[10px] text-slate-500"><Globe className="w-3 h-3" /> Public</span>;
      case 'connections_only':
        return <span className="inline-flex items-center gap-1 text-[10px] text-teal-600 dark:text-teal-400 font-medium"><Users className="w-3 h-3" /> Connections Only</span>;
      case 'same_university':
        return <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md"><GraduationCap className="w-3 h-3" /> {target || 'Same University'}</span>;
      case 'same_factory':
        return <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-950/40 px-1.5 py-0.5 rounded-md"><Building2 className="w-3 h-3" /> {target || 'Same Factory'}</span>;
      case 'same_department':
        return <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md"><Lock className="w-3 h-3" /> {target || 'Same Dept'}</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] text-slate-500"><Lock className="w-3 h-3" /> Restricted</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Post Creator Bento Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
        <div className="flex gap-4 items-center">
          <img
            src={currentUser.profilePhoto}
            alt={currentUser.firstName}
            className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-emerald-500/30"
          />
          <button
            onClick={() => setIsCreating(true)}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 text-left px-5 py-2.5 rounded-full text-xs hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          >
            Post an industry update, factory news, or job query...
          </button>
        </div>

        {/* Quick Actions Row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => { setIsCreating(true); setImageUrl('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            <Image className="w-4 h-4 text-emerald-500" /> Image
          </button>
          <button
            onClick={() => { setIsCreating(true); setDocUrl('sample.pdf'); setDocName('Textile_Technical_Report.pdf'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            <Paperclip className="w-4 h-4 text-blue-500" /> Document
          </button>
          <button
            onClick={() => { setIsCreating(true); setShowPollCreator(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            <BarChart2 className="w-4 h-4 text-amber-500" /> Poll
          </button>
          <button
            onClick={onOpenAITools}
            className="flex items-center gap-1.5 px-3 py-1.5 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded-lg transition-colors font-semibold"
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> AI Caption
          </button>
        </div>
      </div>

      {/* Live Feed Bento Wrapper Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
            LIVE FEED: TEXTILE NEWS BD
          </span>
        </div>

        <div className="p-4 space-y-6 divide-y divide-slate-100 dark:divide-slate-800/60">
          {visiblePosts.map((post) => {
            const totalLikes = post.likes.length;
            const userReaction = post.likes.find(l => l.userId === currentUser.id)?.type;

            return (
              <div key={post.id} className="pt-6 first:pt-0 space-y-3">
                {/* Author Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-800"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">
                        {post.authorName}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {post.authorTitle}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                        <span>{post.createdAt}</span>
                        <span>•</span>
                        {getPrivacyBadge(post.privacy, post.targetFilterValue)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSavePost(post.id)}
                    className="p-1.5 text-slate-400 hover:text-amber-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Save post"
                  >
                    <Bookmark className={`w-4 h-4 ${post.savedBy?.includes(currentUser.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {post.content}
                </p>

                {/* Media Image */}
                {post.images && post.images.length > 0 && (
                  <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <img src={post.images[0]} alt="Post attachment" className="w-full max-h-96 object-cover" />
                  </div>
                )}

                {/* PDF Document */}
                {post.documentUrl && (
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-5 h-5 text-rose-500 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {post.documentName || 'Attachment_Document.pdf'}
                        </p>
                        <p className="text-[10px] text-slate-400">PDF • Technical Specification</p>
                      </div>
                    </div>
                    <a
                      href={post.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700 transition-colors shrink-0"
                    >
                      View PDF
                    </a>
                  </div>
                )}

                {/* Poll View */}
                {post.poll && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">{post.poll.question}</p>
                    {(() => {
                      const totalVotes = post.poll.options.reduce((acc, curr) => acc + curr.votes.length, 0);
                      return post.poll.options.map((opt) => {
                        const pct = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
                        const hasVoted = opt.votes.includes(currentUser.id);

                        return (
                          <button
                            key={opt.id}
                            onClick={() => onVotePoll(post.id, opt.id)}
                            className={`w-full relative overflow-hidden text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                              hasVoted
                                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <div
                              className="absolute inset-y-0 left-0 bg-emerald-500/10 dark:bg-emerald-400/20 transition-all"
                              style={{ width: `${pct}%` }}
                            />
                            <span className="relative z-10 flex items-center gap-1.5">
                              {hasVoted && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                              {opt.text}
                            </span>
                            <span className="relative z-10 text-[10px] text-slate-500 font-mono">{pct}%</span>
                          </button>
                        );
                      });
                    })()}
                  </div>
                )}

                {/* Reaction Counter Bar */}
                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="flex -space-x-1">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] text-white">👍</span>
                      <span className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[8px] text-white">❤️</span>
                    </span>
                    {totalLikes} Reactions
                  </span>
                  <div className="flex items-center gap-3">
                    <span>{post.commentsCount} Comments</span>
                    <span>{post.sharesCount} Shares</span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <button
                    onClick={() => onLikePost(post.id, 'like')}
                    className={`py-1.5 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors ${
                      userReaction ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{userReaction ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                    className="py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Comment
                  </button>

                  <button
                    onClick={() => alert('Post link copied to clipboard!')}
                    className="py-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>

                {/* Comment Drawer */}
                {activeCommentPostId === post.id && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <img src={currentUser.profilePhoto} alt={currentUser.firstName} className="w-8 h-8 rounded-lg object-cover" />
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a professional reply..."
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-full border border-transparent focus:border-emerald-500 text-slate-900 dark:text-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && commentText.trim()) {
                            onCommentPost(post.id, commentText);
                            setCommentText('');
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (commentText.trim()) {
                            onCommentPost(post.id, commentText);
                            setCommentText('');
                          }
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
