import React, { useContext } from 'react';
import AssessmentContext from '../../contexts/AssessmentContext';
import LanguageContext from '../../contexts/LanguageContext';

interface ConsentSectionProps {
  error?: string;
}

const ConsentSection: React.FC<ConsentSectionProps> = ({ error }) => {
  const { assessmentData, setConsent } = useContext(AssessmentContext);
  const { translations } = useContext(LanguageContext);
  
  const { consent } = translations;
  
  return (
    <div className="border border-indigo-800/50 rounded-lg p-5 bg-indigo-950/30">
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">{consent.title}</h2>
      
      <p className="text-gray-300 mb-6">
        {consent.text}
      </p>
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="consent"
            type="checkbox"
            checked={assessmentData.consented}
            onChange={(e) => setConsent(e.target.checked)}
            className="w-5 h-5 text-cyan-500 border-gray-600 rounded focus:ring-cyan-500 bg-gray-700"
          />
        </div>
        <label htmlFor="consent" className="ml-3 text-sm text-gray-200 cursor-pointer">
          {consent.agree}
        </label>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default ConsentSection;