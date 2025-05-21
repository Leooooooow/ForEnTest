import React, { useContext, useState } from 'react';
import AssessmentContext from '../contexts/AssessmentContext';
import LanguageContext from '../contexts/LanguageContext';
import { Check, Circle } from 'lucide-react';

const QuestionPage: React.FC = () => {
  const { assessmentData, updateCompanyProfile, updateAnswer, updateTransformationBarriers, updateExpectedOutcomes, updateSupplementaryInfo, submitAssessment } = useContext(AssessmentContext);
  const { translations, language } = useContext(LanguageContext);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const industries = [
    '时尚服饰',
    '美妆护肤',
    '家居百货',
    '3C数码',
    '食品生鲜',
    '母婴用品',
    '图书文娱',
    '综合电商',
    '其他'
  ];

  const businessModels = [
    '线上电商',
    '线下门店',
    '工厂',
    '批发贸易',
    '品牌商',
    '服务商',
    '其他'
  ];

  const platforms = [
    '亚马逊 (Amazon)',
    'TikTok',
    'DTC Web (独立站)',
    'Temu',
    'Taobao (淘宝)',
    'Lazada',
    'Shopee',
    'Shopify',
    '私域',
    '线下渠道',
    '其他'
  ];

  const regions = [
    '美国',
    '欧洲',
    '东南亚',
    '中东',
    '中国',
    '日本',
    '韩国',
    '拉美',
    '非洲',
    '澳洲',
    '其他'
  ];

  const scales = [
    '初创型 (1-10人)',
    '成长型 (10-100人)',
    '规模型 (100-1000人)',
    '大型企业 (1000人以上)'
  ];

  const transformationBarriers = [
    '数据质量不高',
    '缺乏专业人才',
    '试错成本顾虑',
    '技术选型困难',
    '业务部门推动阻力',
    '缺乏清晰的战略规划',
    '现有系统集成难度大',
    '担心数据安全与隐私'
  ];

  const aiQuestions = [
    {
      id: 6,
      title: '数据基础与洞察力',
      question: '贵企业在数据管理和分析方面的现状是？',
      type: 'radio',
      options: [
        'A. 数据分散，决策靠经验',
        'B. 已收集数据，但分析有限',
        'C. 有基础BI系统，可生成报表',
        'D. 数据中台完善，分析能力强'
      ]
    },
    {
      id: 7,
      title: '智能营销与获客',
      question: '贵企业在数字营销中的AI应用情况？',
      type: 'radio',
      options: [
        'A. 人工投放，效率低',
        'B. 使用基础优化功能',
        'C. AI辅助内容和定向',
        'D. 全渠道智能营销'
      ]
    },
    {
      id: 8,
      title: '客户服务自动化',
      question: '贵企业的客服自动化程度如何？',
      type: 'radio',
      options: [
        'A. 全人工服务',
        'B. 简单机器人和IVR',
        'C. 智能客服部署中',
        'D. 多渠道智能客服'
      ]
    },
    {
      id: 9,
      title: '供应链与库存预测',
      question: '贵企业在供应链管理中的AI应用？',
      type: 'radio',
      options: [
        'A. 经验管理库存',
        'B. 简单数据分析',
        'C. 机器学习预测',
        'D. 全链路AI优化'
      ]
    },
    {
      id: 10,
      title: '决策支持系统',
      question: '贵企业如何应用数据分析辅助决策？',
      type: 'radio',
      options: [
        'A. 依靠经验决策',
        'B. 基础报表分析',
        'C. 预测分析起步',
        'D. 数据驱动决策'
      ]
    },
    {
      id: 11,
      title: '个性化推荐能力',
      question: '贵企业的个性化推荐水平如何？',
      type: 'radio',
      options: [
        'A. 无个性化',
        'B. 基础分类推荐',
        'C. 算法推荐起步',
        'D. 全场景智能推荐'
      ]
    },
    {
      id: 12,
      title: '战略规划与创新',
      question: '贵企业的AI战略布局情况？',
      type: 'radio',
      options: [
        'A. 未纳入规划',
        'B. 初步探索',
        'C. 战略布局中',
        'D. 创新驱动型'
      ]
    }
  ];

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!assessmentData.companyProfile.industry) {
      errors.industry = '请选择行业';
    }
    if (assessmentData.companyProfile.businessModels.length === 0) {
      errors.businessModels = '请选择至少一个生意模式';
    }
    if (assessmentData.companyProfile.platforms.length === 0) {
      errors.platforms = '请选择至少一个业务平台';
    }
    if (assessmentData.companyProfile.regions.length === 0) {
      errors.regions = '请选择至少一个业务地区';
    }
    if (!assessmentData.companyProfile.scale) {
      errors.scale = '请选择企业规模';
    }

    // Validate AI maturity questions
    aiQuestions.forEach(q => {
      if (!assessmentData.answers.find(a => a.questionId === q.id)) {
        errors[`question${q.id}`] = '请回答此问题';
      }
    });

    if (assessmentData.transformationBarriers.length === 0) {
      errors.barriers = '请选择至少一个转型障碍';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      submitAssessment(language);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-indigo-400 inline-block text-transparent bg-clip-text">
          AI成熟度评估问卷
        </h1>
        <p className="text-gray-300 mx-auto max-w-2xl">
          请根据贵公司实际情况填写以下问题，我们将为您生成专业的AI成熟度评估报告
        </p>
      </div>

      <div className="space-y-8">
        {/* Company Profile Section */}
        <section className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-cyan-300">企业概况</h2>

          {/* Industry Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              1. 核心业务/行业类别 <span className="text-red-500">*</span>
            </label>
            <select
              value={assessmentData.companyProfile.industry}
              onChange={(e) => updateCompanyProfile({ industry: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
            >
              <option value="">请选择您的行业</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            {formErrors.industry && (
              <p className="mt-1 text-sm text-red-400">{formErrors.industry}</p>
            )}
          </div>

          {/* Business Models */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              2. 生意模式 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {businessModels.map((model) => (
                <label
                  key={model}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={assessmentData.companyProfile.businessModels.includes(model)}
                    onChange={(e) => {
                      const newModels = e.target.checked
                        ? [...assessmentData.companyProfile.businessModels, model]
                        : assessmentData.companyProfile.businessModels.filter(m => m !== model);
                      updateCompanyProfile({ businessModels: newModels });
                    }}
                    className="form-checkbox h-5 w-5 text-cyan-500 rounded border-gray-600 bg-gray-700"
                  />
                  <span className="text-gray-200">{model}</span>
                </label>
              ))}
            </div>
            {formErrors.businessModels && (
              <p className="mt-1 text-sm text-red-400">{formErrors.businessModels}</p>
            )}
          </div>

          {/* Platforms */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              3. 业务平台 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <label
                  key={platform}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={assessmentData.companyProfile.platforms.includes(platform)}
                    onChange={(e) => {
                      const newPlatforms = e.target.checked
                        ? [...assessmentData.companyProfile.platforms, platform]
                        : assessmentData.companyProfile.platforms.filter(p => p !== platform);
                      updateCompanyProfile({ platforms: newPlatforms });
                    }}
                    className="form-checkbox h-5 w-5 text-cyan-500 rounded border-gray-600 bg-gray-700"
                  />
                  <span className="text-gray-200">{platform}</span>
                </label>
              ))}
            </div>
            {formErrors.platforms && (
              <p className="mt-1 text-sm text-red-400">{formErrors.platforms}</p>
            )}
          </div>

          {/* Regions */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              4. 业务地区 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {regions.map((region) => (
                <label
                  key={region}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={assessmentData.companyProfile.regions.includes(region)}
                    onChange={(e) => {
                      const newRegions = e.target.checked
                        ? [...assessmentData.companyProfile.regions, region]
                        : assessmentData.companyProfile.regions.filter(r => r !== region);
                      updateCompanyProfile({ regions: newRegions });
                    }}
                    className="form-checkbox h-5 w-5 text-cyan-500 rounded border-gray-600 bg-gray-700"
                  />
                  <span className="text-gray-200">{region}</span>
                </label>
              ))}
            </div>
            {formErrors.regions && (
              <p className="mt-1 text-sm text-red-400">{formErrors.regions}</p>
            )}
          </div>

          {/* Company Scale */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              5. 企业规模 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scales.map((scale) => (
                <div
                  key={scale}
                  onClick={() => updateCompanyProfile({ scale })}
                  className={`border ${
                    assessmentData.companyProfile.scale === scale
                      ? 'border-cyan-500 bg-indigo-900/50'
                      : 'border-gray-600 bg-gray-800/50'
                  } rounded-lg p-4 cursor-pointer transition-colors hover:bg-indigo-900/30`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        assessmentData.companyProfile.scale === scale
                          ? 'border-cyan-500 bg-cyan-500/30'
                          : 'border-gray-500'
                      } mr-3 flex items-center justify-center`}
                    >
                      {assessmentData.companyProfile.scale === scale && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-sm text-gray-200">{scale}</span>
                  </div>
                </div>
              ))}
            </div>
            {formErrors.scale && (
              <p className="mt-1 text-sm text-red-400">{formErrors.scale}</p>
            )}
          </div>
        </section>

        {/* AI Maturity Questions */}
        <section className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-cyan-300">AI成熟度评估</h2>

          <div className="space-y-8">
            {aiQuestions.map((question) => (
              <div key={question.id}>
                <h3 className="text-lg font-medium text-cyan-300 mb-2">
                  {question.title}
                </h3>
                <p className="text-gray-300 mb-4">{question.question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option, index) => {
                    const value = option.charAt(0);
                    const isSelected = assessmentData.answers.find(
                      (a) => a.questionId === question.id && a.answer === value
                    );

                    return (
                      <div
                        key={index}
                        onClick={() => updateAnswer(question.id, value)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-cyan-500 bg-indigo-900/50 shadow-lg shadow-cyan-500/10'
                            : 'border-gray-600 bg-gray-800/50 hover:bg-indigo-900/30'
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full ${
                              isSelected ? 'bg-cyan-500/20' : 'bg-gray-700'
                            } flex items-center justify-center mr-3`}
                          >
                            <span
                              className={`font-medium ${
                                isSelected ? 'text-cyan-400' : 'text-gray-400'
                              }`}
                            >
                              {value}
                            </span>
                          </div>
                          <span
                            className={`text-sm ${
                              isSelected ? 'text-white' : 'text-gray-300'
                            }`}
                          >
                            {option.substring(3)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {formErrors[`question${question.id}`] && (
                  <p className="mt-2 text-sm text-red-400">
                    {formErrors[`question${question.id}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Transformation Barriers */}
        <section className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-indigo-900/50 rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-cyan-300">转型障碍与期望</h2>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              13. 在尝试AI或数字化转型的过程中，贵公司目前面临的障碍是什么？{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {transformationBarriers.map((barrier) => (
                <label
                  key={barrier}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={assessmentData.transformationBarriers.includes(barrier)}
                    onChange={(e) => {
                      const newBarriers = e.target.checked
                        ? [...assessmentData.transformationBarriers, barrier]
                        : assessmentData.transformationBarriers.filter(b => b !== barrier);
                      updateTransformationBarriers(newBarriers);
                    }}
                    className="form-checkbox h-5 w-5 text-cyan-500 rounded border-gray-600 bg-gray-700"
                  />
                  <span className="text-gray-200">{barrier}</span>
                </label>
              ))}
            </div>
            {formErrors.barriers && (
              <p className="mt-1 text-sm text-red-400">{formErrors.barriers}</p>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              14. 如果AI能够在您最关注的领域发挥作用，您最期望看到的具体成果或业务指标提升是什么？
            </label>
            <textarea
              value={assessmentData.expectedOutcomes}
              onChange={(e) => updateExpectedOutcomes(e.target.value)}
              placeholder="例如：客服响应时间缩短50%、营销获客成本降低30%、库存周转率提升20%等"
              className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              15. 请分享其余想了解的内容：
            </label>
            <textarea
              value={assessmentData.supplementaryInfo}
              onChange={(e) => updateSupplementaryInfo(e.target.value)}
              placeholder="例如：如何选择合适的AI解决方案？如何评估AI项目的投资回报？如何管理AI转型过程中的风险？"
              className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white resize-none"
            />
          </div>
        </section>

        {/* Submit Button - Centered */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium rounded-md shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            生成AI成熟度评估报告
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;