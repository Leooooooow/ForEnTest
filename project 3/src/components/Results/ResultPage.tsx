import React, { useContext, useEffect, useRef } from 'react';
import AssessmentContext from '../../contexts/AssessmentContext';
import LanguageContext from '../../contexts/LanguageContext';
import CompanyProfile from '../CompanyProfile';
import MaturityOverview from './MaturityOverview';
import RadarChart from './RadarChart';
import DimensionInsights from './DimensionInsights';
import RecommendedSolutions from './RecommendedSolutions';
import CallToAction from './CallToAction';

const ResultPage: React.FC = () => {
  const { results, resetAssessment, assessmentData } = useContext(AssessmentContext);
  const { translations } = useContext(LanguageContext);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (results && contentRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [results]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString(
      translations.language === 'zh-CN' ? 'zh-CN' : 'zh-TW', 
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
          重新测评
        </button>
      </div>
    );
  }
  
  return (
    <div ref={contentRef}>
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-indigo-400 inline-block text-transparent bg-clip-text">
          {translations.results.title}
        </h1>
        <p className="text-gray-400 text-sm">
          报告生成于: {formatDate()}
        </p>
      </div>
      
      <CompanyProfile profile={assessmentData.companyProfile} />
      
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
      
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={resetAssessment}
          className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-md transition-colors"
        >
          重新测评
        </button>
        
        <button
          onClick={scrollToTop}
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white rounded-md transition-colors"
        >
          回到顶部
        </button>
      </div>
    </div>
  );
};

export default ResultPage;