import { useState } from "react";

interface StickyNoteProps {
  title: string;
  placeholder: string;
  onSave: (content: string) => void;
  disabled?: boolean;
}

export const StickyNote = ({ title, placeholder, onSave, disabled }: StickyNoteProps) => {
  const [content, setContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleSave = () => {
    if (content.trim() && !disabled) {
      onSave(content);
      setContent("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  return (
    <div 
      className={`sticky-note p-4 w-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${disabled ? 'opacity-50' : ''}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Sticky Note Header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-foreground font-poppins">
          {title}
        </h3>
        <div className="w-8 h-1 bg-rose-pink rounded-full mt-1"></div>
      </div>

      {/* Content Area */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={disabled ? "Select a mood first..." : placeholder}
        disabled={disabled}
        className="w-full h-32 bg-transparent border-none outline-none resize-none text-foreground placeholder-muted-foreground font-inter text-sm leading-relaxed"
        style={{ fontFamily: 'inherit' }}
      />

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-rose-pink rounded-full"></div>
          <div className="w-2 h-2 bg-lavender rounded-full"></div>
          <div className="w-2 h-2 bg-soft-peach rounded-full"></div>
        </div>
        
        <button
          onClick={handleSave}
          disabled={!content.trim() || disabled}
          className="btn-dreamy px-4 py-1 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save ✨
        </button>
      </div>

      {/* Character Count */}
      <div className="text-right mt-2">
        <span className="text-xs text-muted-foreground">
          {content.length}/500
        </span>
      </div>
    </div>
  );
};