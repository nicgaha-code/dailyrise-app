// DailyRise – Local storage utilities for persisting user data

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetDate: string;
  progress: number; // 0-100
  completed: boolean;
  createdAt: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  text: string;
  completed: boolean;
}

export interface ManifestationItem {
  id: string;
  text: string;
  category: string;
  affirmation: string;
  createdAt: string;
  visualized: boolean;
}

export interface AppData {
  goals: Goal[];
  manifestations: ManifestationItem[];
  favoriteQuotes: number[];
  streak: number;
  lastVisit: string;
  totalDaysVisited: number;
}

const STORAGE_KEY = 'dailyrise_data';

const defaultData: AppData = {
  goals: [],
  manifestations: [],
  favoriteQuotes: [],
  streak: 0,
  lastVisit: '',
  totalDaysVisited: 0,
};

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultData };
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return { ...defaultData };
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save data');
  }
}

export function updateStreak(data: AppData): AppData {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (data.lastVisit === today) {
    return data;
  }

  const newStreak = data.lastVisit === yesterday ? data.streak + 1 : 1;
  const updated = {
    ...data,
    streak: newStreak,
    lastVisit: today,
    totalDaysVisited: data.totalDaysVisited + 1,
  };
  saveData(updated);
  return updated;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const goalCategories = [
  'Career', 'Health', 'Relationships', 'Finance', 'Personal Growth',
  'Education', 'Travel', 'Creativity', 'Spirituality', 'Other'
];

export const manifestationCategories = [
  'Abundance', 'Love', 'Health', 'Career', 'Freedom', 
  'Peace', 'Confidence', 'Joy', 'Purpose', 'Connection'
];
