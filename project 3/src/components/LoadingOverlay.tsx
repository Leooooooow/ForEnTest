import React, { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';

const LoadingOverlay: React.FC = () => {
  const { translations } = useContext(LanguageContext);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm">
      <div className="text-center">
        {/* Universe Animation Container */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Central Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Core Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50] to-[#34495E] rounded-full animate-pulse">
                <div className="absolute inset-1 bg-gray-900 rounded-full" />
                <div className="absolute inset-3 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
              </div>
              
              {/* Energy Rings */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
                  style={{
                    animation: `spin ${8 + i * 4}s linear infinite`,
                    transform: `rotate(${120 * i}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Orbiting Stars */}
          {[...Array(3)].map((_, ring) => (
            <div
              key={ring}
              className="absolute inset-0"
              style={{
                animation: `spin ${20 + ring * 5}s linear infinite`,
              }}
            >
              {[...Array(6)].map((_, star) => (
                <div
                  key={star}
                  className="absolute w-2 h-2"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${(360 / 6) * star}deg) translateY(-${60 + ring * 20}px)`,
                  }}
                >
                  <div
                    className="w-full h-full bg-cyan-400 rounded-full"
                    style={{
                      animation: `twinkle ${1 + Math.random()}s ease-in-out infinite ${Math.random()}s`,
                      boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
                    }}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            />
          ))}

          {/* Nebula Effects */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: '150%',
                height: '150%',
                top: '-25%',
                left: '-25%',
                background: `radial-gradient(circle, ${
                  ['rgba(52, 152, 219, 0.2)', 'rgba(155, 89, 182, 0.2)', 
                   'rgba(52, 73, 94, 0.2)', 'rgba(41, 128, 185, 0.2)'][i]
                } 0%, transparent 70%)`,
                transform: `rotate(${90 * i}deg)`,
                animation: `nebulaPulse ${6 + i}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-[#ECF0F1] mb-2">
          {translations.generating}
        </h3>
        <p className="text-[#3498DB] text-sm">AI Analysis in Progress</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }

        @keyframes nebulaPulse {
          0%, 100% { opacity: 0.1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.2; transform: scale(1.1) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;