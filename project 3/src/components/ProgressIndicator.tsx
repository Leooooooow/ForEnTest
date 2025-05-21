import React, { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const { translations } = useContext(LanguageContext);
  
  // Calculate percentage progress
  const percentage = Math.round((currentStep / (totalSteps - 1)) * 100);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-300">
          {translations.progress}: {currentStep + 1}/{totalSteps}
        </div>
        <div className="text-sm text-gray-300">
          {translations.steps[currentStep]}
        </div>
      </div>
      
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        {/* Progress bar with glow effect */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
          style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
        >
          {/* Animated light effect */}
          <div className="absolute top-0 right-0 h-full w-5 bg-white opacity-30 animate-pulse"></div>
        </div>
        
        {/* Step markers */}
        <div className="absolute top-0 left-0 h-full w-full flex">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepPercentage = (index / (totalSteps - 1)) * 100;
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div
                key={index}
                className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full transition-colors ${
                  isCurrent ? 'bg-white shadow-glow' : 
                  isCompleted ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
                style={{ 
                  left: `calc(${stepPercentage}% - 6px)`,
                  boxShadow: isCurrent ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;