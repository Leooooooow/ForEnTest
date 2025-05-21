import React, { useContext } from 'react';
import AssessmentContext from '../contexts/AssessmentContext';
import QuestionPage from './QuestionPage';
import ResultPage from './ResultPage';
import LoadingOverlay from './LoadingOverlay';

const AssessmentPage: React.FC = () => {
  const { isSubmitted, isLoading } = useContext(AssessmentContext);

  return (
    <div className="min-h-[85vh] relative">
      {isLoading && <LoadingOverlay />}
      {isSubmitted ? <ResultPage /> : <QuestionPage />}
    </div>
  );
};

export default AssessmentPage;