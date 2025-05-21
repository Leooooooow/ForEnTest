import React, { useContext } from 'react';
import LanguageContext from '../../contexts/LanguageContext';

interface DimensionInsight {
  id: number;
  dimension: string;
  score: number;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

interface DimensionInsightsProps {
  insights: DimensionInsight[];
}

const DimensionInsights: React.FC<DimensionInsightsProps> = ({ insights }) => {
  const { translations } = useContext(LanguageContext);
  const { results } = translations;
  
  if (!insights || !Array.isArray(insights)) return null;
  
  const getToolRecommendations = (dimension: string) => {
    switch (dimension) {
      case '技术与数据基建':
        return '推荐工具：Chat With BI（数据分析）、DataBricks（数据处理）';
      case '核心业务AI应用':
        return '推荐工具：Midjourney（图像生成）、ChatGPT（文案创作）、Stable Diffusion（视觉设计）';
      case '运营流程智能化':
        return '方法论：精益管理、敏捷开发、OKR目标管理';
      case '决策与洞察智能':
        return '推荐工具：Tableau（数据可视化）、PowerBI（商业智能）';
      case 'AI战略与组织能力':
        return '方法论：PDCA循环、六西格玛、设计思维';
      default:
        return '';
    }
  };
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl mb-6">
      <h2 className="text-lg font-semibold mb-6 text-cyan-300">
        深度洞察与行动建议
      </h2>
      
      <div className="space-y-6">
        {insights.map(insight => (
          <div 
            key={insight.id}
            className="border border-indigo-900/30 rounded-lg overflow-hidden bg-gray-800/70"
          >
            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-cyan-400">{insight.score}</span>
                </div>
                
                <div>
                  <h3 className="font-medium text-white text-lg">
                    {insight.dimension}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                        style={{ width: `${insight.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    优势识别
                  </h4>
                  <div className="space-y-2">
                    {insight.strengths.map((strength, index) => (
                      <p key={index} className="text-sm text-gray-300 leading-relaxed">
                        {strength}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    潜力差距
                  </h4>
                  <div className="space-y-2">
                    {insight.gaps.map((gap, index) => (
                      <p key={index} className="text-sm text-gray-300 leading-relaxed">
                        {gap}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-cyan-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    行动建议
                  </h4>
                  <div className="space-y-2">
                    {insight.recommendations.map((rec, index) => (
                      <p key={index} className="text-sm text-gray-300 leading-relaxed">
                        {rec}
                      </p>
                    ))}
                    <p className="text-xs text-cyan-400 mt-2">
                      {getToolRecommendations(insight.dimension)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DimensionInsights;