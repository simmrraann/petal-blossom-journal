import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StickyNote } from "./StickyNote";
import { MoodSticker } from "./MoodSticker";
import { JournalStorage } from "../utils/storage";

interface MoodEntry {
  id: string;
  content: string;
  mood: string;
  timestamp: number;
}

export const MoodJournal = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");

  useEffect(() => {
    // Load existing entries from storage
    const savedEntries = JournalStorage.getMoodEntries();
    setEntries(savedEntries);
  }, []);

  const handleSaveEntry = (content: string, noteId: string) => {
    if (!content.trim() || !selectedMood) return;

    const newEntry: MoodEntry = {
      id: noteId,
      content: content.trim(),
      mood: selectedMood,
      timestamp: Date.now()
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    JournalStorage.saveMoodEntry(newEntry);
    
    // Reset for next entry
    setSelectedMood("");
  };

  const moodStickers = [
    { emoji: "😊", mood: "happy", color: "#FFE55C" },
    { emoji: "😢", mood: "sad", color: "#87CEEB" },
    { emoji: "😴", mood: "tired", color: "#DDA0DD" },
    { emoji: "😡", mood: "angry", color: "#FFB6C1" },
    { emoji: "😍", mood: "excited", color: "#98FB98" },
    { emoji: "😰", mood: "anxious", color: "#F0E68C" },
    { emoji: "🤔", mood: "thoughtful", color: "#D3D3D3" },
    { emoji: "😌", mood: "peaceful", color: "#E6E6FA" }
  ];

  return (
    <div className="min-h-screen p-4 relative" style={{ background: 'var(--gradient-mood)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/')}
          className="btn-dreamy px-4 py-2 text-sm"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-foreground font-dancing">
          Mood Journal
        </h1>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Mood Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-center handwritten">
          How are you feeling today?
        </h2>
        
        <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
          {moodStickers.map((sticker) => (
            <MoodSticker
              key={sticker.mood}
              emoji={sticker.emoji}
              mood={sticker.mood}
              color={sticker.color}
              isSelected={selectedMood === sticker.mood}
              onClick={() => setSelectedMood(sticker.mood)}
            />
          ))}
        </div>
        
        {selectedMood && (
          <p className="text-center text-sm text-muted-foreground mt-3 font-inter">
            Selected: {selectedMood}
          </p>
        )}
      </div>

      {/* Sticky Notes */}
      <div className="space-y-6 max-w-lg mx-auto">
        <StickyNote 
          title="Morning Thoughts"
          placeholder="What's on your mind this morning?"
          onSave={(content) => handleSaveEntry(content, "morning")}
          disabled={!selectedMood}
        />
        
        <StickyNote 
          title="Afternoon Reflections"
          placeholder="How has your day been so far?"
          onSave={(content) => handleSaveEntry(content, "afternoon")}
          disabled={!selectedMood}
        />
        
        <StickyNote 
          title="Evening Gratitude"
          placeholder="What are you grateful for today?"
          onSave={(content) => handleSaveEntry(content, "evening")}
          disabled={!selectedMood}
        />
      </div>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="mt-12 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center section-header">
            Recent Entries
          </h3>
          <div className="space-y-3">
            {entries.slice(-3).reverse().map((entry) => (
              <div key={`${entry.id}-${entry.timestamp}`} className="bg-card p-4 rounded-lg shadow-sm border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground capitalize">
                    {entry.id}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-foreground text-sm mb-2">{entry.content}</p>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2">Mood:</span>
                  <span className="text-xs font-medium capitalize text-foreground">{entry.mood}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="btn-dreamy w-14 h-14 rounded-full shadow-lg text-xl">
          ✨
        </button>
      </div>

      {/* Floating Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="star" style={{ top: '15%', left: '15%', animationDelay: '0s' }}></div>
        <div className="star" style={{ top: '35%', left: '85%', animationDelay: '1s' }}></div>
        <div className="star" style={{ top: '75%', left: '25%', animationDelay: '2s' }}></div>
        <div className="star" style={{ top: '45%', left: '70%', animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
};