import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-gradient-to-br from-gray-800 to-indigo-900/90 rounded-xl shadow-2xl shadow-cyan-500/10 max-w-md w-full mx-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
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
        
        <div className="relative p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;