/* 
 * Local Storage utilities for Blossom Journal
 * Handles saving and retrieving journal entries and mood data
 */

interface MoodEntry {
  id: string;
  content: string;
  mood: string;
  timestamp: number;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  photos?: string[];
}

export class JournalStorage {
  private static MOOD_ENTRIES_KEY = 'blossom_mood_entries';
  private static JOURNAL_ENTRIES_KEY = 'blossom_journal_entries';

  // Mood Entries
  static getMoodEntries(): MoodEntry[] {
    try {
      const entries = localStorage.getItem(this.MOOD_ENTRIES_KEY);
      return entries ? JSON.parse(entries) : [];
    } catch (error) {
      console.error('Error loading mood entries:', error);
      return [];
    }
  }

  static saveMoodEntry(entry: MoodEntry): void {
    try {
      const existingEntries = this.getMoodEntries();
      const updatedEntries = [...existingEntries, entry];
      localStorage.setItem(this.MOOD_ENTRIES_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving mood entry:', error);
    }
  }

  static deleteMoodEntry(entryId: string, timestamp: number): void {
    try {
      const existingEntries = this.getMoodEntries();
      const filteredEntries = existingEntries.filter(
        entry => !(entry.id === entryId && entry.timestamp === timestamp)
      );
      localStorage.setItem(this.MOOD_ENTRIES_KEY, JSON.stringify(filteredEntries));
    } catch (error) {
      console.error('Error deleting mood entry:', error);
    }
  }

  // Journal Entries
  static getJournalEntries(): JournalEntry[] {
    try {
      const entries = localStorage.getItem(this.JOURNAL_ENTRIES_KEY);
      return entries ? JSON.parse(entries) : [];
    } catch (error) {
      console.error('Error loading journal entries:', error);
      return [];
    }
  }

  static saveJournalEntry(entry: JournalEntry): void {
    try {
      const existingEntries = this.getJournalEntries();
      const updatedEntries = [...existingEntries, entry];
      localStorage.setItem(this.JOURNAL_ENTRIES_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  }

  static updateJournalEntry(entryId: string, updatedEntry: Partial<JournalEntry>): void {
    try {
      const existingEntries = this.getJournalEntries();
      const updatedEntries = existingEntries.map(entry =>
        entry.id === entryId ? { ...entry, ...updatedEntry } : entry
      );
      localStorage.setItem(this.JOURNAL_ENTRIES_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error updating journal entry:', error);
    }
  }

  static deleteJournalEntry(entryId: string): void {
    try {
      const existingEntries = this.getJournalEntries();
      const filteredEntries = existingEntries.filter(entry => entry.id !== entryId);
      localStorage.setItem(this.JOURNAL_ENTRIES_KEY, JSON.stringify(filteredEntries));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  }

  // Utility methods
  static clearAllData(): void {
    try {
      localStorage.removeItem(this.MOOD_ENTRIES_KEY);
      localStorage.removeItem(this.JOURNAL_ENTRIES_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }

  static exportData(): string {
    try {
      const moodEntries = this.getMoodEntries();
      const journalEntries = this.getJournalEntries();
      
      return JSON.stringify({
        moodEntries,
        journalEntries,
        exportDate: new Date().toISOString()
      }, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return '';
    }
  }
}