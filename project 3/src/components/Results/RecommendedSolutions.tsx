import React, { useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

interface Solution {
  id: number;
  title: string;
  description: string;
  benefits: string[];
}

interface RecommendedSolutionsProps {
  solutions: Solution[];
}

const RecommendedSolutions: React.FC<RecommendedSolutionsProps> = ({ solutions }) => {
  const { translations } = useContext(LanguageContext);
  const { results } = translations;
  
  if (!solutions?.length) return null;
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl mb-6">
      <h2 className="text-lg font-semibold mb-6 text-cyan-300">
        为您量身定制的AI解决方案
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((solution) => (
          <div 
            key={solution.id}
            className="border border-indigo-900/30 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800/80 to-indigo-950/50"
          >
            <div className="relative h-16 bg-gradient-to-r from-indigo-800/50 to-cyan-800/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-lg font-medium text-white px-4 text-center">
                  {solution.title}
                </h3>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {solution.description}
              </p>
              
              <h4 className="text-sm font-medium text-cyan-400 mb-3">
                核心价值
              </h4>
              
              <ul className="space-y-2">
                {solution.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSolutions;