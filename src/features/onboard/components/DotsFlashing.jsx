import React from 'react';

const DotsFlashing = () => {
  return (
    <div className="flex gap-[5px] items-center justify-center h-6">
      <div
        className="w-[14px] h-[14px] rounded-full bg-white animate-flashing"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="w-[14px] h-[14px] rounded-full bg-white animate-flashing"
        style={{ animationDelay: '0.3s' }}
      />
      <div
        className="w-[14px] h-[14px] rounded-full bg-white animate-flashing"
        style={{ animationDelay: '0.6s' }}
      />
    </div>
  );
};

export default DotsFlashing;
