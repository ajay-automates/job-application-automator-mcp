import { ApplicationHistory, UserProfile } from '@/types';

const STORAGE_KEYS = {
  APPLICATIONS: 'job-app-history',
  USER_PROFILE: 'user-profile',
  LAST_RESUME: 'last-resume',
  PREFERENCES: 'app-preferences',
} as const;

// Application History
export function saveApplication(application: ApplicationHistory): void {
  const history = getApplicationHistory();
  history.unshift(application);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(history));
}

export function getApplicationHistory(): ApplicationHistory[] {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return data ? JSON.parse(data) : [];
}

export function updateApplicationStatus(
  id: string,
  status: ApplicationHistory['status']
): void {
  const history = getApplicationHistory();
  const index = history.findIndex((app) => app.id === id);
  if (index !== -1) {
    history[index].status = status;
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(history));
  }
}

export function deleteApplication(id: string): void {
  const history = getApplicationHistory();
  const filtered = history.filter((app) => app.id !== id);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(filtered));
}

// User Profile
export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export function getUserProfile(): UserProfile | null {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return data ? JSON.parse(data) : null;
}

// Resume Cache
export function saveLastResume(resumeData: {
  filename: string;
  uploadedAt: string;
}): void {
  localStorage.setItem(STORAGE_KEYS.LAST_RESUME, JSON.stringify(resumeData));
}

export function getLastResume(): { filename: string; uploadedAt: string } | null {
  const data = localStorage.getItem(STORAGE_KEYS.LAST_RESUME);
  return data ? JSON.parse(data) : null;
}

// Preferences
export function savePreferences(preferences: {
  defaultLocation?: string;
  defaultKeywords?: string;
  autoApply?: boolean;
}): void {
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
}

export function getPreferences() {
  const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return data ? JSON.parse(data) : {};
}

// Clear all data
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
