import React, { useState, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Image,
  Mic,
  MoreVertical,
  Trash2,
  ShieldAlert,
  UserX,
  Search,
  CheckCheck,
  Check,
  FileText,
  Smile,
  X,
  Square
} from 'lucide-react';
import { Message, UserProfile } from '../types';

interface MessagingProps {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  messages: Message[];
  onSendMessage: (receiverId: string, text: string, mediaUrl?: string, mediaType?: 'image' | 'video' | 'pdf' | 'audio', fileName?: string) => void;
  onDeleteMessage: (messageId: string, deleteForEveryone: boolean) => void;
  targetUser?: UserProfile | null;
}

export const Messaging: React.FC<MessagingProps> = ({
  currentUser,
  allUsers,
  messages,
  onSendMessage,
  onDeleteMessage,
  targetUser
}) => {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(
    targetUser || allUsers.find(u => u.id !== currentUser.id) || null
  );
  
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Voice Recording Simulator
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);

  // Simulated Media Attachments
  const [attachedImage, setAttachedImage] = useState('');
  const [attachedPdf, setAttachedPdf] = useState('');

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTimer(t => t + 1);
      }, 1000);
    } else {
      setRecordTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedUser) return;
    if (!inputText.trim() && !attachedImage && !attachedPdf && !isRecording) return;

    if (isRecording) {
      onSendMessage(selectedUser.id, `🎤 Voice Note (${recordTimer}s)`, 'sample_audio.mp3', 'audio', `Voice_Note_${recordTimer}s.mp3`);
      setIsRecording(false);
    } else if (attachedImage) {
      onSendMessage(selectedUser.id, inputText || 'Sent an image', attachedImage, 'image', 'Fabric_Sample.png');
      setAttachedImage('');
    } else if (attachedPdf) {
      onSendMessage(selectedUser.id, inputText || 'Sent a PDF document', attachedPdf, 'pdf', 'Textile_Report.pdf');
      setAttachedPdf('');
    } else {
      onSendMessage(selectedUser.id, inputText);
    }

    setInputText('');
  };

  const activeThreadMessages = messages.filter(
    m =>
      (m.senderId === currentUser.id && m.receiverId === selectedUser?.id) ||
      (m.senderId === selectedUser?.id && m.receiverId === currentUser.id)
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[calc(100vh-140px)] flex">
      
      {/* Left Chat Threads List */}
      <div className="w-full sm:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Messages</h2>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-xl border border-transparent focus:border-teal-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {allUsers
            .filter(u => u.id !== currentUser.id)
            .filter(u => `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((u) => {
              const isSelected = selectedUser?.id === u.id;
              const lastMsg = messages
                .filter(m => (m.senderId === currentUser.id && m.receiverId === u.id) || (m.senderId === u.id && m.receiverId === currentUser.id))
                .slice(-1)[0];

              return (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center gap-3 transition-colors ${
                    isSelected ? 'bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={u.profilePhoto} alt={u.firstName} className="w-10 h-10 rounded-xl object-cover" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{u.firstName} {u.lastName}</h4>
                      {lastMsg && <span className="text-[10px] text-slate-400">{lastMsg.createdAt.split(' ')[0]}</span>}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : u.headline}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      {/* Right Chat View */}
      {selectedUser ? (
        <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
          
          {/* Header */}
          <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={selectedUser.profilePhoto} alt={selectedUser.firstName} className="w-9 h-9 rounded-xl object-cover" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{selectedUser.firstName} {selectedUser.lastName}</h3>
                <span className="text-[10px] text-emerald-600 font-medium">Online • {selectedUser.headline}</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Reported or blocked ${selectedUser.firstName}`)}
              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Block / Report User"
            >
              <UserX className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {activeThreadMessages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3 rounded-2xl text-xs space-y-1 relative group shadow-2xs ${
                      isMe
                        ? 'bg-teal-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                    {msg.mediaType === 'image' && msg.mediaUrl && (
                      <img src={msg.mediaUrl} alt="Media" className="w-full rounded-xl mt-1 object-cover max-h-48" />
                    )}

                    {msg.mediaType === 'pdf' && (
                      <div className="p-2 bg-slate-900/10 dark:bg-slate-900/40 rounded-lg flex items-center gap-2 mt-1">
                        <FileText className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="font-semibold text-[11px] truncate">{msg.fileName || 'Document.pdf'}</span>
                      </div>
                    )}

                    {msg.mediaType === 'audio' && (
                      <div className="flex items-center gap-2 p-2 bg-slate-900/20 rounded-lg mt-1">
                        <Mic className="w-4 h-4 text-amber-300 animate-pulse" />
                        <span className="text-[11px] font-mono">Audio Note (0:12)</span>
                      </div>
                    )}

                    <div className={`flex items-center justify-end gap-1 text-[9px] pt-1 ${isMe ? 'text-teal-200' : 'text-slate-400'}`}>
                      <span>{msg.createdAt}</span>
                      {isMe && (
                        msg.seen ? <CheckCheck className="w-3 h-3 text-teal-200" /> : <Check className="w-3 h-3" />
                      )}
                    </div>

                    {/* Delete Message Option */}
                    <button
                      onClick={() => onDeleteMessage(msg.id, true)}
                      className="opacity-0 group-hover:opacity-100 absolute -top-2 -right-2 p-1 bg-rose-600 text-white rounded-full transition-opacity shadow-sm"
                      title="Delete message"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Controls */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
            
            {/* Attached previews */}
            {attachedImage && (
              <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                <span>Attached Image</span>
                <button type="button" onClick={() => setAttachedImage('')}><X className="w-3.5 h-3.5" /></button>
              </div>
            )}

            {isRecording && (
              <div className="flex items-center justify-between p-2 bg-rose-50 text-rose-700 dark:bg-rose-950/40 rounded-lg text-xs font-bold animate-pulse">
                <span>🔴 Recording Voice Note... ({recordTimer}s)</span>
                <button type="button" onClick={() => setIsRecording(false)}><Square className="w-3.5 h-3.5 fill-rose-600" /></button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAttachedImage('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=500&fit=crop')}
                className="p-2 text-slate-500 hover:text-teal-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Attach Image"
              >
                <Image className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setAttachedPdf('sample.pdf')}
                className="p-2 text-slate-500 hover:text-teal-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Attach PDF"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording ? 'text-rose-600 bg-rose-100' : 'text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title="Record Voice Note"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 p-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-transparent focus:border-teal-500 text-slate-900 dark:text-white"
              />

              <button
                type="submit"
                className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 text-slate-400 text-xs">
          Select a conversation from the left thread
        </div>
      )}

    </div>
  );
};
