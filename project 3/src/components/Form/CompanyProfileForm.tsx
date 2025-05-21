import React, { useContext } from 'react';
import AssessmentContext from '../../contexts/AssessmentContext';
import LanguageContext from '../../contexts/LanguageContext';

interface CompanyProfileFormProps {
  errors: Record<string, string>;
}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({ errors }) => {
  const { assessmentData, updateCompanyProfile } = useContext(AssessmentContext);
  const { translations } = useContext(LanguageContext);
  
  const { companyProfile } = assessmentData;
  const { companyProfile: t, industries, scales } = translations;
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-cyan-300">{t.title}</h2>
      
      <div className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="company-name" className="block text-sm font-medium text-gray-200 mb-1">
            {t.name}
          </label>
          <input 
            type="text"
            id="company-name"
            value={companyProfile.name}
            onChange={(e) => updateCompanyProfile({ name: e.target.value })}
            placeholder={t.namePlaceholder}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
          />
          <p className="mt-1 text-xs text-gray-400">{t.nameHint}</p>
        </div>
        
        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-200 mb-1">
            {t.industry} <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            value={companyProfile.industry}
            onChange={(e) => updateCompanyProfile({ industry: e.target.value })}
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.industry ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white`}
          >
            <option value="">{t.industryPlaceholder}</option>
            {industries.map((industry, index) => (
              <option key={index} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && <p className="mt-1 text-xs text-red-400">{errors.industry}</p>}
        </div>
        
        {/* Company Scale */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">
            {t.scale} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scales.map((scale, index) => (
              <div 
                key={index}
                onClick={() => updateCompanyProfile({ scale })}
                className={`border ${companyProfile.scale === scale ? 'border-cyan-500 bg-indigo-900/50' : 'border-gray-600 bg-gray-800/50'} rounded-lg p-4 cursor-pointer transition-colors hover:bg-indigo-900/30`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 ${companyProfile.scale === scale ? 'border-cyan-500 bg-cyan-500/30' : 'border-gray-500'} mr-3 flex items-center justify-center`}>
                    {companyProfile.scale === scale && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-200">{scale}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.scale && <p className="mt-1 text-xs text-red-400">{errors.scale}</p>}
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
            {t.email}
          </label>
          <input 
            type="email"
            id="email"
            value={companyProfile.email}
            onChange={(e) => updateCompanyProfile({ email: e.target.value })}
            placeholder={t.emailPlaceholder}
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white`}
          />
          <p className="mt-1 text-xs text-gray-400">{t.emailHint}</p>
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;