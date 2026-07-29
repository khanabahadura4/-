export type RoleType = 'student' | 'professional' | 'hr' | 'factory_owner' | 'admin';

export type PostPrivacy =
  | 'public'
  | 'connections_only'
  | 'same_university'
  | 'same_college'
  | 'same_batch'
  | 'same_factory'
  | 'same_company_group'
  | 'same_department'
  | 'selected_universities'
  | 'selected_factories'
  | 'selected_connections'
  | 'only_me';

export interface Education {
  id: string;
  institutionName: string; // University or College
  institutionType: 'public_university' | 'private_university' | 'govt_textile_institute' | 'college' | 'other';
  degree: string;
  department: string;
  batch?: string;
  startYear: string;
  endYear?: string;
  current?: boolean;
  isApproved?: boolean;
}

export interface Experience {
  id: string;
  factoryName: string; // Company / Factory
  companyGroup?: string;
  department: string;
  designation: string;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'internship';
  location: string;
  startDate: string;
  endDate?: string;
  currentWorkplace?: boolean;
  isPreviousWorkplace?: boolean;
  description?: string;
  isApproved?: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  role: RoleType;
  profilePhoto: string;
  coverPhoto: string;
  mobile: string;
  mobileVerified: boolean;
  email: string;
  emailVerified: boolean;
  dob: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  nationality: string;
  currentAddress: string;
  permanentAddress: string;
  district: string; // e.g. Dhaka, Gazipur, Narayanganj, Chattogram
  about: string;
  educations: Education[];
  experiences: Experience[];
  skills: string[];
  certificates: { title: string; issuer: string; year: string; link?: string }[];
  awards: { title: string; year: string; description: string }[];
  resumeUrl?: string;
  resumeName?: string;
  portfolioUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  followersCount: number;
  connectionsCount: number;
  connectionStatus?: 'connected' | 'pending_sent' | 'pending_received' | 'none';
  availableForJob: boolean;
  totalExperienceYears: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: string[]; // user IDs
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  authorUniversity?: string;
  authorBatch?: string;
  authorFactory?: string;
  authorDepartment?: string;
  content: string;
  images?: string[];
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
  poll?: {
    question: string;
    options: PollOption[];
  };
  privacy: PostPrivacy;
  targetFilterValue?: string; // e.g., 'BUTEX' or 'Babylon Group'
  likes: { od: string; userId: string; userName: string; type: 'like' | 'celebrate' | 'love' }[];
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  comments?: Partial<Comment>[];
  savedBy?: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  replies?: Comment[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'pdf' | 'audio';
  fileName?: string;
  seen: boolean;
  createdAt: string;
  deletedFor?: string[]; // user IDs who deleted
}

export interface JobCircular {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  department: string;
  experienceRequired: string;
  salaryRange: string;
  jobType: 'Full-time' | 'Internship' | 'Contract';
  description: string;
  requirements: string[];
  deadline: string;
  postedBy: string;
  createdAt: string;
  postedDate?: string;
  applicantsCount: number;
  applicants?: Partial<JobApplication>[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  applicantTitle: string;
  applicantAvatar: string;
  resumeUrl?: string;
  status: 'applied' | 'shortlisted' | 'interview_scheduled' | 'hired' | 'rejected';
  appliedAt: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  category: string; // Spinning, Dyeing, Garments, Merchandising, Composite, etc.
  about: string;
  locations: string[];
  website: string;
  hrContact: string;
  employeeCount: number;
  followersCount: number;
  isApproved: boolean;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  type: 'public_university' | 'private_university' | 'govt_textile_institute';
  logo: string;
  coverImage: string;
  about: string;
  location: string;
  studentCount: number;
  alumniCount: number;
  website: string;
  isApproved: boolean;
}

export interface AdminPendingItem {
  id: string;
  type: 'factory' | 'university' | 'department' | 'designation';
  name: string;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  details?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  senderId?: string;
  senderName: string;
  senderAvatar: string;
  type: 'connection_request' | 'connection_accepted' | 'like' | 'comment' | 'job_alert' | 'message' | 'company_update';
  content: string;
  targetId?: string;
  read: boolean;
  createdAt: string;
}
