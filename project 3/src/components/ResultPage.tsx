import React, { useContext } from 'react';
import AssessmentContext from '../contexts/AssessmentContext';
import LanguageContext from '../contexts/LanguageContext';
import MaturityOverview from './Results/MaturityOverview';
import RadarChart from './Results/RadarChart';
import DimensionInsights from './Results/DimensionInsights';
import RecommendedSolutions from './Results/RecommendedSolutions';
import CallToAction from './Results/CallToAction';

const ResultPage: React.FC = () => {
  const { results, resetAssessment } = useContext(AssessmentContext);
  const { translations } = useContext(LanguageContext);
  
  // Format date for the report generation time
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString(
      translations.language === 'en-US' ? 'en-US' : 'zh-CN', 
      { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );
  };
  
  if (!results) {
    return (
      <div className="text-center py-10">
        <p>No results available. Please complete the assessment.</p>
        <button 
          onClick={resetAssessment}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Start Assessment
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-indigo-400 inline-block text-transparent bg-clip-text">
          {translations.results.title}
        </h1>
        <p className="text-gray-400 text-sm">
          {translations.results.generatedOn}: {formatDate()}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MaturityOverview 
          score={results.overallScore} 
          level={results.maturityLevel}
          summaryStatement={results.summaryStatement}
        />
        
        <RadarChart scores={results.dimensionScores} />
      </div>
      
      <DimensionInsights insights={results.dimensionInsights} />
      
      <RecommendedSolutions solutions={results.recommendedSolutions} />
      
      <CallToAction />
      
      <div className="mt-8 text-center">
        <button
          onClick={resetAssessment}
          className="text-sm text-indigo-400 underline hover:text-indigo-300"
        >
          重新测评
        </button>
      </div>
    </div>
  );
};

export default ResultPage;