//comment for review
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4 gap-2">
      <img 
        src="/src/assets/loading.gif"
        alt="Loading spinner"
        className="w-6 h-6"
      />
      <span className="text-gray-600">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;