import { useEffect, useState } from 'react';

const Welcome = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide welcome screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for fade-out animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#C94B1D] overflow-hidden" style={{ zIndex: 9999 }}>
      {/* Animated background circles */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -left-20 animate-[ping_3s_ease-in-out_infinite]"></div>
      <div className="absolute w-64 h-64 bg-white/10 rounded-full -bottom-10 -right-10 animate-[ping_4s_ease-in-out_infinite]"></div>
      <div className="absolute w-48 h-48 bg-white/10 rounded-full top-1/2 left-1/4 animate-[ping_5s_ease-in-out_infinite]"></div>
      
      {/* Main content */}
      <div className="relative text-center px-8 animate-[fadeIn_1s_ease-in-out]">
        {/* Main title with slide-in animation */}
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 animate-[slideInDown_1s_ease-out]">
          <span className="inline-block animate-[bounce_2s_ease-in-out_infinite]">S</span>
          <span className="inline-block animate-[bounce_2s_ease-in-out_0.1s_infinite]">l</span>
          <span className="inline-block animate-[bounce_2s_ease-in-out_0.2s_infinite]">u</span>
          <span className="inline-block animate-[bounce_2s_ease-in-out_0.3s_infinite]">r</span>
          <span className="inline-block animate-[bounce_2s_ease-in-out_0.4s_infinite]">p</span>
        </h1>
        
        {/* Subtitle with fade and slide animation */}
        <div className="relative">
          <p className="text-2xl md:text-4xl font-bold text-white/90 animate-[slideInUp_1.5s_ease-out] tracking-wide">
            Only for <span className="text-[#F5B927] animate-[pulse_2s_ease-in-out_infinite]">SRM</span>
          </p>
          
          {/* Decorative line */}
          <div className="mt-6 mx-auto w-32 h-1 bg-white/60 rounded-full animate-[expandWidth_1.5s_ease-out]"></div>
        </div>
        
        {/* Tagline */}
        <p className="mt-8 text-lg md:text-xl text-white/80 animate-[fadeIn_2s_ease-in-out] italic">
          Your Campus Food Delivery Partner
        </p>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-white rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-[bounce_1s_ease-in-out_0.2s_infinite]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-[bounce_1s_ease-in-out_0.4s_infinite]"></div>
        </div>
      </div>
      
      {/* Skip button */}
      <button
        onClick={() => {
          setIsVisible(false);
          onComplete();
        }}
        className="absolute bottom-8 right-8 text-white/70 hover:text-white text-sm font-medium transition-colors"
      >
        Skip →
      </button>
    </div>
  );
};

export default Welcome;
