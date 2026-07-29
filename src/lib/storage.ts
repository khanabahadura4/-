import { UserProfile, Post, JobCircular, Company, University, Message, NotificationItem, AdminPendingItem, Education, Experience } from '../types';
import { MOCK_USERS, MOCK_POSTS, MOCK_JOBS, PRELOADED_FACTORIES, PRELOADED_UNIVERSITIES, PRELOADED_DEPARTMENTS, PRELOADED_DESIGNATIONS, MOCK_MESSAGES, MOCK_NOTIFICATIONS, MOCK_ADMIN_PENDING } from '../data/mockData';

const KEYS = {
  CURRENT_USER_ID: 'tcbd_current_user_id',
  USERS: 'tcbd_users',
  POSTS: 'tcbd_posts',
  JOBS: 'tcbd_jobs',
  COMPANIES: 'tcbd_companies',
  UNIVERSITIES: 'tcbd_universities',
  DEPARTMENTS: 'tcbd_departments',
  DESIGNATIONS: 'tcbd_designations',
  MESSAGES: 'tcbd_messages',
  NOTIFICATIONS: 'tcbd_notifications',
  ADMIN_PENDING: 'tcbd_admin_pending',
  THEME: 'tcbd_theme'
};

export function getStoredData<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveStoredData<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStoredCurrentUser(): UserProfile {
  const currentId = localStorage.getItem(KEYS.CURRENT_USER_ID) || 'usr-1';
  const users = getStoredUsers();
  return users.find(u => u.id === currentId) || users[0];
}

export function setCurrentUserId(userId: string) {
  localStorage.setItem(KEYS.CURRENT_USER_ID, userId);
}

export function getStoredUsers(): UserProfile[] {
  const data = localStorage.getItem(KEYS.USERS);
  if (!data) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(MOCK_USERS));
    return MOCK_USERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_USERS;
  }
}

export function saveUsers(users: UserProfile[]) {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function updateStoredUserProfile(updatedProfile: UserProfile) {
  const users = getStoredUsers();
  const idx = users.findIndex(u => u.id === updatedProfile.id);
  if (idx !== -1) {
    users[idx] = updatedProfile;
  } else {
    users.push(updatedProfile);
  }
  saveUsers(users);
}

export function getStoredPosts(): Post[] {
  const data = localStorage.getItem(KEYS.POSTS);
  if (!data) {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(MOCK_POSTS));
    return MOCK_POSTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_POSTS;
  }
}

export function savePosts(posts: Post[]) {
  localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
}

export function getStoredJobs(): JobCircular[] {
  const data = localStorage.getItem(KEYS.JOBS);
  if (!data) {
    localStorage.setItem(KEYS.JOBS, JSON.stringify(MOCK_JOBS));
    return MOCK_JOBS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_JOBS;
  }
}

export function saveJobs(jobs: JobCircular[]) {
  localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
}

export function getStoredCompanies(): Company[] {
  const data = localStorage.getItem(KEYS.COMPANIES);
  if (!data) {
    localStorage.setItem(KEYS.COMPANIES, JSON.stringify(PRELOADED_FACTORIES));
    return PRELOADED_FACTORIES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return PRELOADED_FACTORIES;
  }
}

export function saveCompanies(companies: Company[]) {
  localStorage.setItem(KEYS.COMPANIES, JSON.stringify(companies));
}

export function getStoredUniversities(): University[] {
  const data = localStorage.getItem(KEYS.UNIVERSITIES);
  if (!data) {
    localStorage.setItem(KEYS.UNIVERSITIES, JSON.stringify(PRELOADED_UNIVERSITIES));
    return PRELOADED_UNIVERSITIES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return PRELOADED_UNIVERSITIES;
  }
}

export function saveUniversities(unis: University[]) {
  localStorage.setItem(KEYS.UNIVERSITIES, JSON.stringify(unis));
}

export function getStoredDepartments(): string[] {
  const data = localStorage.getItem(KEYS.DEPARTMENTS);
  if (!data) {
    localStorage.setItem(KEYS.DEPARTMENTS, JSON.stringify(PRELOADED_DEPARTMENTS));
    return PRELOADED_DEPARTMENTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return PRELOADED_DEPARTMENTS;
  }
}

export function addStoredDepartment(dept: string) {
  const depts = getStoredDepartments();
  if (!depts.includes(dept)) {
    depts.push(dept);
    localStorage.setItem(KEYS.DEPARTMENTS, JSON.stringify(depts));
  }
}

export function getStoredDesignations(): string[] {
  const data = localStorage.getItem(KEYS.DESIGNATIONS);
  if (!data) {
    localStorage.setItem(KEYS.DESIGNATIONS, JSON.stringify(PRELOADED_DESIGNATIONS));
    return PRELOADED_DESIGNATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return PRELOADED_DESIGNATIONS;
  }
}

export function addStoredDesignation(desig: string) {
  const desigs = getStoredDesignations();
  if (!desigs.includes(desig)) {
    desigs.push(desig);
    localStorage.setItem(KEYS.DESIGNATIONS, JSON.stringify(desigs));
  }
}

export function getStoredMessages(): Message[] {
  const data = localStorage.getItem(KEYS.MESSAGES);
  if (!data) {
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(MOCK_MESSAGES));
    return MOCK_MESSAGES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_MESSAGES;
  }
}

export function saveMessages(msgs: Message[]) {
  localStorage.setItem(KEYS.MESSAGES, JSON.stringify(msgs));
}

export function getStoredNotifications(): NotificationItem[] {
  const data = localStorage.getItem(KEYS.NOTIFICATIONS);
  if (!data) {
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(MOCK_NOTIFICATIONS));
    return MOCK_NOTIFICATIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_NOTIFICATIONS;
  }
}

export function saveNotifications(notifs: NotificationItem[]) {
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
}

export function getStoredAdminPending(): AdminPendingItem[] {
  const data = localStorage.getItem(KEYS.ADMIN_PENDING);
  if (!data) {
    localStorage.setItem(KEYS.ADMIN_PENDING, JSON.stringify(MOCK_ADMIN_PENDING));
    return MOCK_ADMIN_PENDING;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_ADMIN_PENDING;
  }
}

export function saveAdminPending(items: AdminPendingItem[]) {
  localStorage.setItem(KEYS.ADMIN_PENDING, JSON.stringify(items));
}
