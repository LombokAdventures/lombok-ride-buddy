// Utility functions to persist bike data to localStorage
// This allows admin changes to be visible across all pages

import { Bike, bikes as defaultBikes } from '@/data/bikes';

const STORAGE_KEY = 'lombok_adventures_bikes';

// Get bikes from localStorage or use defaults
export const getBikes = (): Bike[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading bikes from storage:', error);
  }
  return defaultBikes;
};

// Save bikes to localStorage
export const saveBikes = (bikes: Bike[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bikes));
  } catch (error) {
    console.error('Error saving bikes to storage:', error);
  }
};

// Reset bikes to defaults
export const resetBikes = (): Bike[] => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting bikes:', error);
  }
  return defaultBikes;
};
