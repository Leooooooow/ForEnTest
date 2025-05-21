import React, { useState, useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import Modal from '../Modal';

const CallToAction: React.FC = () => {
  const { translations } = useContext(LanguageContext);
  const { results } = translations;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 backdrop-blur-sm border border-indigo-800/50 rounded-xl p-6 shadow-xl text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-20 bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 transform -rotate-45"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 15}s linear infinite ${Math.random() * 5}s`,
                opacity: 0.1 + Math.random() * 0.3
              }}
            ></div>
          ))}
        </div>
        
        <h2 className="text-xl font-bold mb-4 text-white relative">
          {results.journeyTitle}
        </h2>
        
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto relative">
          {translations.language === 'en-US' 
            ? 'Ready to transform your e-commerce business with cutting-edge AI solutions? Let our experts guide you through the next steps of your AI journey.'
            : '准备好用前沿AI解决方案转变您的电商业务了吗？让我们的专家指导您完成AI旅程的下一步。'
          }
        </p>
        
        <div className="flex justify-center items-center gap-4 relative">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium rounded-md shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            {results.consultButton}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">联系我们</h3>
          
          <div className="space-y-4 text-left">
            <div className="bg-indigo-900/30 border border-indigo-800/30 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                <span className="text-cyan-400">微信：</span>
                ileroyoverstep
              </p>
            </div>
            
            <div className="bg-indigo-900/30 border border-indigo-800/30 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                <span className="text-cyan-400">WhatsApp：</span>
                +86 13320845238
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors text-sm"
          >
            关闭
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CallToAction;