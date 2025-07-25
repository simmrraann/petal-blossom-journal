import { useNavigate } from "react-router-dom";
import { PetalAnimation } from "./PetalAnimation";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-pink to-rose-pink overflow-hidden relative">
      {/* Falling Petals Effect - Exclusive to Landing Page */}
      <PetalAnimation />
      
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        
        {/* Main Heading with 3D Effect */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-3d text-foreground font-dancing leading-tight">
            Blossom Journal
          </h1>
          
          {/* 3D Heart Animation */}
          <div className="flex justify-center mt-4">
            <div className="heart-3d"></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 font-poppins max-w-md">
          Nurture your thoughts, bloom your creativity, and blossom into your best self
        </p>

        {/* 3D Journey Box */}
        <div className="box-3d p-8 max-w-sm w-full bg-card border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6 font-poppins">
            Start Your Journey
          </h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-rose-pink rounded-full"></div>
              <span className="text-foreground font-medium">Write your daily thoughts</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-lavender rounded-full"></div>
              <span className="text-foreground font-medium">Track your moods with stickers</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-soft-peach rounded-full"></div>
              <span className="text-foreground font-medium">Set personal goals</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-mint-green rounded-full"></div>
              <span className="text-foreground font-medium">Add photos to your entries</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/journal')}
            className="btn-dreamy w-full mt-8 py-3 px-6 text-lg font-semibold"
          >
            Begin Journaling ✨
          </button>
        </div>

        {/* Navigation hint */}
        <p className="text-sm text-muted-foreground mt-8 font-inter">
          Tap to enter your peaceful journaling space
        </p>
      </div>
    </div>
  );
};