import React, { useContext, useEffect, useRef } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

interface MaturityOverviewProps {
  score: number;
  level: number;
  summaryStatement: string;
}

const MaturityOverview: React.FC<MaturityOverviewProps> = ({ score, level, summaryStatement }) => {
  const { translations } = useContext(LanguageContext);
  const { results } = translations;
  const gaugeRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gaugeRef.current) {
        gaugeRef.current.style.transform = `rotate(${(score / 100) * 180}deg)`;
      }
      if (scoreRef.current) {
        scoreRef.current.textContent = score.toString();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 text-cyan-300">
        {results.maturityTitle}
      </h2>
      
      <div className="flex flex-col items-center">
        {/* Score Display */}
        <div className="relative w-48 h-32 mb-6">
          {/* Score circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${score * 2.83} 283`}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Score text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div ref={scoreRef} className="text-4xl font-bold text-white">
                  {score}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {results.maturityLevels[level]}
            </h3>
          </div>
          
          <div className="bg-indigo-950/30 border border-indigo-800/30 rounded-lg p-4">
            <p className="text-gray-200 text-sm leading-relaxed">
              {summaryStatement}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaturityOverview;