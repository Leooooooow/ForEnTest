import React, { useContext, useEffect, useRef } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

interface RadarChartProps {
  scores: number[];
}

const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const { translations } = useContext(LanguageContext);
  const { results } = translations;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !scores || scores.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    
    const dimensions = [
      '技术与数据基建',
      '核心业务AI应用',
      '运营流程智能化',
      '决策与洞察智能',
      'AI战略与组织能力'
    ];
    
    const centerX = canvas.width / (2 * dpr);
    const centerY = canvas.height / (2 * dpr);
    const radius = Math.min(centerX, centerY) * 0.7;
    
    const getCoordinates = (angle: number, value: number) => ({
      x: centerX + radius * (value / 100) * Math.cos(angle - Math.PI / 2),
      y: centerY + radius * (value / 100) * Math.sin(angle - Math.PI / 2)
    });
    
    // Animation setup
    let progress = 0;
    const animate = () => {
      if (progress >= 1) return;
      
      progress += 0.03;
      const currentProgress = Math.min(progress, 1);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Draw background grid
      const levels = [20, 40, 60, 80, 100];
      levels.forEach(level => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= dimensions.length; i++) {
          const angle = (i * 2 * Math.PI) / dimensions.length;
          const point = getCoordinates(angle, level);
          
          if (i === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        
        ctx.closePath();
        ctx.stroke();
      });
      
      // Draw axes
      dimensions.forEach((_, i) => {
        const angle = (i * 2 * Math.PI) / dimensions.length;
        const end = getCoordinates(angle, 100);
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });
      
      // Draw data area
      ctx.beginPath();
      const gradient = ctx.createLinearGradient(0, 0, canvas.width / dpr, canvas.height / dpr);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)');
      ctx.fillStyle = gradient;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 2;
      
      scores.forEach((score, i) => {
        const angle = (i * 2 * Math.PI) / dimensions.length;
        const point = getCoordinates(angle, score * currentProgress);
        
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Draw data points and labels
      scores.forEach((score, i) => {
        const angle = (i * 2 * Math.PI) / dimensions.length;
        const point = getCoordinates(angle, score * currentProgress);
        
        // Draw point
        ctx.beginPath();
        ctx.fillStyle = '#06b6d4';
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw label
        const labelPoint = getCoordinates(angle, 110);
        ctx.font = '12px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(dimensions[i], labelPoint.x, labelPoint.y);
        
        // Draw score
        const scorePoint = getCoordinates(angle, score * currentProgress + 15);
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#06b6d4';
        ctx.fillText(Math.round(score).toString(), scorePoint.x, scorePoint.y);
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [scores]);
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-cyan-300">
        AI能力矩阵透视
      </h2>
      
      <div className="relative aspect-square w-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      <p className="text-xs text-gray-400 text-center mt-4">
        面积越大，AI综合能力越强；形状越均衡，各方面发展越协调
      </p>
    </div>
  );
};

export default RadarChart;