import React from 'react';

const DotsFlashing = ({ dotColor = 'white' }) => {
  return (
    <div className="flex gap-[5px] items-center justify-center h-6">
      <div
        className="w-[14px] h-[14px] rounded-full animate-flashing"
        style={{ animationDelay: '0s', backgroundColor: dotColor }}
      />
      <div
        className="w-[14px] h-[14px] rounded-full animate-flashing"
        style={{ animationDelay: '0.3s', backgroundColor: dotColor }}
      />
      <div
        className="w-[14px] h-[14px] rounded-full animate-flashing"
        style={{ animationDelay: '0.6s', backgroundColor: dotColor }}
      />
    </div>
  );
};

export default DotsFlashing;
