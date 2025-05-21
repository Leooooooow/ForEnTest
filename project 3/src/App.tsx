import React from 'react';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import { AssessmentProvider } from './contexts/AssessmentContext';
import AssessmentPage from './components/AssessmentPage';
import StarryBackground from './components/StarryBackground';
import { FlipVertical as Analytics } from 'lucide-react';

function App() {
  return (
    <LanguageProvider>
      <AssessmentProvider>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 text-white relative">
          <StarryBackground />
          <header className="fixed w-full top-0 z-50 bg-opacity-80 bg-gray-900 backdrop-blur-md border-b border-indigo-900/30">
            <div className="container mx-auto py-3 px-4 flex justify-between items-center">
              <div className="flex items-center">
                <Analytics className="h-6 w-6 text-cyan-400 mr-2" />
                <h1 className="text-xl font-semibold text-white">
                  <span className="text-cyan-400">锐智星辰</span>·电商评估助手
                </h1>
              </div>
              <LanguageSelector />
            </div>
          </header>
          
          <main className="container mx-auto pt-20 pb-16 px-4 relative">
            <AssessmentPage />
          </main>
          
          <footer className="bg-gray-900 py-3 border-t border-indigo-900/30 text-center text-xs text-gray-400 relative">
            © 2025 锐智星辰 (Stellaris Wisdom) · All Rights Reserved
          </footer>
        </div>
      </AssessmentProvider>
    </LanguageProvider>
  );
}

const LanguageSelector = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);
  
  const languages = [
    { code: 'zh-CN', name: '简' },
    { code: 'zh-TW', name: '繁' },
    { code: 'en-US', name: 'EN' }
  ];
  
  return (
    <div className="flex space-x-2">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            language === lang.code 
              ? 'bg-indigo-800 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-indigo-800/50'
          }`}
          onClick={() => setLanguage(lang.code)}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default App;