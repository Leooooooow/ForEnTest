import React, { useContext } from 'react';
import AssessmentContext from '../../contexts/AssessmentContext';
import LanguageContext from '../../contexts/LanguageContext';

interface QuestionFormProps {
  questionId: number;
  error?: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ questionId, error }) => {
  const { assessmentData, updateAnswer } = useContext(AssessmentContext);
  const { translations } = useContext(LanguageContext);
  
  const { questions } = translations;
  const question = questions[questionId];
  
  // Find the current answer for this question
  const currentAnswer = assessmentData.answers.find(a => a.questionId === questionId)?.answer || '';
  
  // Option labels
  const optionLabels = ['A', 'B', 'C', 'D'];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-cyan-300">{question.title}</h2>
      
      <p className="text-gray-200 mb-6">
        {question.question}
      </p>
      
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const label = optionLabels[index];
          const isSelected = currentAnswer === label;
          
          return (
            <div 
              key={index}
              onClick={() => updateAnswer(questionId, label)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-cyan-500 bg-indigo-900/50 shadow-lg shadow-cyan-500/10' 
                  : 'border-gray-600 bg-gray-800/50 hover:bg-indigo-900/30'
              }`}
            >
              <div className="flex">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${
                  isSelected ? 'bg-cyan-500/20' : 'bg-gray-700'
                } flex items-center justify-center mr-3`}>
                  <span className={`font-medium ${
                    isSelected ? 'text-cyan-400' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {option}
                  </p>
                </div>
                
                {isSelected && (
                  <div className="flex-shrink-0 ml-2 text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default QuestionForm;