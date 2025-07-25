interface MoodStickerProps {
  emoji: string;
  mood: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const MoodSticker = ({ emoji, mood, color, isSelected, onClick }: MoodStickerProps) => {
  return (
    <button
      onClick={onClick}
      className={`mood-sticker w-16 h-16 flex flex-col items-center justify-center ${
        isSelected ? 'selected' : ''
      }`}
      style={{ 
        backgroundColor: isSelected ? color : undefined,
        opacity: isSelected ? 1 : 0.8 
      }}
    >
      <span className="text-2xl mb-1">{emoji}</span>
      <span className="text-xs font-medium text-foreground capitalize leading-tight">
        {mood}
      </span>
    </button>
  );
};