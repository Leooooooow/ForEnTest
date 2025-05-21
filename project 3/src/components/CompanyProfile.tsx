import React from 'react';

interface CompanyProfileProps {
  profile: {
    industry: string;
    businessModels: string[];
    platforms: string[];
    regions: string[];
    scale: string;
  };
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ profile }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl mb-6">
      <h2 className="text-lg font-semibold mb-4 text-cyan-300">
        企业概况
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">行业类别</h3>
            <p className="text-white">{profile.industry}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">企业规模</h3>
            <p className="text-white">{profile.scale}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">生意模式</h3>
            <div className="flex flex-wrap gap-2">
              {profile.businessModels.map((model, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-indigo-900/50 border border-indigo-800/30 rounded-md text-sm text-cyan-300"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">业务平台</h3>
            <div className="flex flex-wrap gap-2">
              {profile.platforms.map((platform, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-indigo-900/50 border border-indigo-800/30 rounded-md text-sm text-cyan-300"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">业务地区</h3>
            <div className="flex flex-wrap gap-2">
              {profile.regions.map((region, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-indigo-900/50 border border-indigo-800/30 rounded-md text-sm text-cyan-300"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;