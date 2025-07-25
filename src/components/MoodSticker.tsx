interface MoodStickerProps {
  emoji: string;
  mood: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const MoodSticker = ({ emoji, mood, color, isSelected, onClick }: MoodStickerProps) => {
  const handleClick = () => {
    onClick();
    // Add clicked class for animation
    const button = document.activeElement as HTMLElement;
    button?.classList.add('clicked');
    setTimeout(() => button?.classList.remove('clicked'), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`mood-sticker w-20 h-20 flex flex-col items-center justify-center ${
        isSelected ? 'selected' : ''
      }`}
      style={{ 
        backgroundColor: isSelected ? color : undefined,
        opacity: isSelected ? 1 : 0.8 
      }}
    >
      <span className="text-3xl mb-1">{emoji}</span>
      <span className="text-xs font-medium text-foreground capitalize leading-tight">
        {mood}
      </span>
    </button>
  );
};