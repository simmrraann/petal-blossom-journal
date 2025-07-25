/* 
 * PetalAnimation Component
 * Creates 3 realistic falling petals with CSS animations
 * Optimized for mobile performance using pure CSS transforms
 */

export const PetalAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Petal 1 - Rose Pink */}
      <div className="petal petal-1"></div>
      
      {/* Petal 2 - Lavender */}
      <div className="petal petal-2"></div>
      
      {/* Petal 3 - Soft Peach */}
      <div className="petal petal-3"></div>
    </div>
  );
};