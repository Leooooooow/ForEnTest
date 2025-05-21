import React, { useEffect, useRef } from 'react';

const StarryBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Create stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
      star.style.setProperty('--brightness', `${0.3 + Math.random() * 0.7}`);
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${1 + Math.random() * 2}px`;
      star.style.height = star.style.width;
      container.appendChild(star);
    }
    
    // Create shooting stars
    for (let i = 0; i < 5; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.setProperty('--duration', `${4 + Math.random() * 4}s`);
      shootingStar.style.setProperty('--angle', `${-15 - Math.random() * 30}deg`);
      shootingStar.style.top = `${Math.random() * 50}%`;
      shootingStar.style.left = `${Math.random() * 100}%`;
      container.appendChild(shootingStar);
    }
    
    // Create nebulas
    const colors = ['86,232,255', '134,99,255', '255,115,178'];
    for (let i = 0; i < 5; i++) {
      const nebula = document.createElement('div');
      nebula.className = 'nebula';
      nebula.style.setProperty('--duration', `${10 + Math.random() * 10}s`);
      nebula.style.setProperty('--color-start', `rgba(${colors[i % colors.length]},0.2)`);
      nebula.style.width = `${200 + Math.random() * 300}px`;
      nebula.style.height = nebula.style.width;
      nebula.style.left = `${Math.random() * 100}%`;
      nebula.style.top = `${Math.random() * 100}%`;
      container.appendChild(nebula);
    }
    
    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="starry-bg" />;
};

export default StarryBackground;