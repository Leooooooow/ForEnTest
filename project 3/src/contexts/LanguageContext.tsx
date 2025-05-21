import React, { createContext, useState, useEffect } from 'react';

// Define types for the language context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
}

// Translations for all UI elements
const translations = {
  'zh-CN': {
    title: '锐智星辰·电商评估助手',
    subtitle: '仅需几分钟，洞悉贵企业在AI时代的无限潜能',
    privacyNotice: '您的数据将用于生成个性化报告，并可能由第三方AI（Grok AI）进行分析和安全存储。我们承诺对您的数据保密。',
    progress: '进度',
    next: '下一步',
    prev: '上一步',
    submit: '生成报告',
    generating: 'AI正在分析您的数据，请稍候...',
    steps: {
      0: '企业概况',
      1: '数据基础与洞察力',
      2: '智能营销与获客',
      3: '客户服务自动化',
      4: '供应链与库存预测',
      5: '决策支持系统',
      6: '个性化推荐能力',
      7: '战略规划与创新'
    },
    companyProfile: {
      title: '第一步：企业概况',
      name: '企业名称',
      namePlaceholder: '请输入贵公司法定全称',
      nameHint: '选填。填写后，报告将更具针对性',
      industry: '核心业务/行业类别',
      industryPlaceholder: '请选择您的行业',
      scale: '企业规模',
      email: '您的联系邮箱',
      emailPlaceholder: '选填，用于接收详细报告副本及后续服务提醒',
      emailHint: '我们承诺保护您的邮箱地址隐私'
    },
    industries: [
      '时尚服饰',
      '美妆护肤',
      '家居百货',
      '3C数码',
      '食品生鲜',
      '母婴用品',
      '图书文娱',
      '跨境电商',
      '综合电商',
      '其他'
    ],
    scales: [
      '初创型 (1-50人)',
      '成长型 (51-200人)',
      '规模型 (201-1000人)',
      '大型企业 (1000人以上)'
    ],
    questions: {
      1: {
        title: '数据基础与洞察力',
        question: '贵企业在数据管理和分析方面的现状是？',
        options: [
          '数据分散，决策靠经验',
          '已收集数据，但分析有限',
          '有基础BI系统，可生成报表',
          '数据中台完善，分析能力强'
        ]
      },
      2: {
        title: '智能营销与获客',
        question: '贵企业在数字营销中的AI应用情况？',
        options: [
          '人工投放，效率低',
          '使用基础优化功能',
          'AI辅助内容和定向',
          '全渠道智能营销'
        ]
      },
      3: {
        title: '客户服务自动化',
        question: '贵企业的客服自动化程度如何？',
        options: [
          '全人工服务',
          '简单机器人和IVR',
          '智能客服部署中',
          '多渠道智能客服'
        ]
      },
      4: {
        title: '供应链与库存预测',
        question: '贵企业在供应链管理中的AI应用？',
        options: [
          '经验管理库存',
          '简单数据分析',
          '机器学习预测',
          '全链路AI优化'
        ]
      },
      5: {
        title: '决策支持系统',
        question: '贵企业如何应用数据分析辅助决策？',
        options: [
          '依靠经验决策',
          '基础报表分析',
          '预测分析起步',
          '数据驱动决策'
        ]
      },
      6: {
        title: '个性化推荐能力',
        question: '贵企业的个性化推荐水平如何？',
        options: [
          '无个性化',
          '基础分类推荐',
          '算法推荐起步',
          '全场景智能推荐'
        ]
      },
      7: {
        title: '战略规划与创新',
        question: '贵企业的AI战略布局情况？',
        options: [
          '未纳入规划',
          '初步探索',
          '战略布局中',
          '创新驱动型'
        ]
      }
    },
    results: {
      title: '您的专属电商AI成熟度评估报告',
      generatedOn: '报告生成于',
      maturityTitle: 'AI成熟度总览',
      radarTitle: 'AI能力矩阵透视',
      insightsTitle: '深度洞察与行动建议',
      solutionsTitle: '为您量身定制的AI解决方案',
      journeyTitle: '开启您的AI进阶之旅',
      consultButton: '预约1对1专家免费咨询',
      downloadButton: '下载《2025电商AI转型权威指南》',
      customButton: '获取专属AI升级方案',
      maturityLevels: {
        1: '初始探索者',
        2: '积极发展者',
        3: '成熟实践者',
        4: '行业引领者'
      },
      maturityDescriptions: {
        1: 'AI旅程刚刚开始，有较大的发展空间。',
        2: 'AI应用已取得初步成效，但仍需系统化投入。',
        3: 'AI已融入多个核心业务环节，具备较强AI应用能力。',
        4: 'AI已成为核心竞争力，引领行业数字化转型方向。'
      },
      dimensions: [
        '数据基础',
        '智能营销',
        '客户服务',
        '供应链',
        '决策支持',
        '个性化推荐',
        '战略创新'
      ],
      recommendations: {
        data: [
          '构建统一的数据湖架构，打破数据孤岛',
          '投资数据质量管理工具，提高数据可用性',
          '构建实时数据处理能力，实现即时业务洞察'
        ],
        marketing: [
          '导入智能投放平台，实现跨渠道预算优化',
          '应用AI内容生成工具，提升营销素材效率',
          '部署客户旅程分析工具，优化全链路转化'
        ],
        service: [
          '部署NLP驱动的智能客服系统',
          '构建全面的知识库管理系统',
          '实施客户情感分析，捕捉服务改进机会'
        ],
        supply: [
          '实施机器学习驱动的需求预测系统',
          '部署智能库存优化算法，降低库存成本',
          '构建供应商评估AI模型，优化供应商管理'
        ],
        decision: [
          '部署可视化BI平台，提升数据理解效率',
          '实施预测分析模型，支持前瞻性决策',
          '开发AI情景模拟工具，评估战略可行性'
        ],
        personalization: [
          '部署协同过滤推荐引擎，提升交叉销售',
          '实施实时个性化展示系统，提高转化率',
          '开发多因素推荐模型，平衡推荐多样性'
        ],
        strategy: [
          '成立AI创新专项小组，系统规划AI战略',
          '建立技术探索与业务落地双轨制',
          '开发AI应用评估框架，确保投入产出比'
        ]
      },
      solutions: [
        {
          title: 'AI驱动的全渠道个性化引擎',
          description: '基于用户行为和偏好的智能推荐系统，为每位用户提供量身定制的购物体验。',
          benefits: [
            '提升转化率15-30%',
            '增加客单价10-25%',
            '提高用户留存率达20%'
          ]
        },
        {
          title: '智能客服与工单自动化系统',
          description: '结合NLP和知识图谱的智能客服系统，能自动解决80%以上的常见问题。',
          benefits: [
            '客服成本降低40%',
            '响应时间缩短60%',
            '客户满意度提升25%'
          ]
        },
        {
          title: '数据驱动的库存优化平台',
          description: '融合多源数据的智能预测系统，实现精准的需求预测和库存管理。',
          benefits: [
            '库存周转率提升30%',
            '减少库存积压达25%',
            '缺货率降低40%'
          ]
        }
      ]
    },
    consent: {
      title: '数据使用声明',
      text: '我同意锐智星辰收集我的评估数据，用于生成个性化AI成熟度报告。我了解这些数据可能由Grok AI进行处理，并会被安全存储用于服务优化。',
      agree: '我同意以上条款'
    },
    validation: {
      required: '此字段为必填项',
      email: '请输入有效的电子邮箱地址',
      consent: '请同意数据使用条款以继续'
    }
  },
  'zh-TW': {
    title: '銳智星辰·電商評估助手',
    subtitle: '僅需幾分鐘，洞悉貴企業在AI時代的無限潛能',
    privacyNotice: '您的資料將用於生成個性化報告，並可能由第三方AI（Grok AI）進行分析和安全存儲。我們承諾對您的資料保密。',
    progress: '進度',
    next: '下一步',
    prev: '上一步',
    submit: '生成報告',
    generating: 'AI正在分析您的資料，請稍候...',
    steps: {
      0: '企業概況',
      1: '資料基礎與洞察力',
      2: '智能營銷與獲客',
      3: '客戶服務自動化',
      4: '供應鏈與庫存預測',
      5: '決策支持系統',
      6: '個性化推薦能力',
      7: '戰略規劃與創新'
    },
    companyProfile: {
      title: '第一步：企業概況',
      name: '企業名稱',
      namePlaceholder: '請輸入貴公司法定全稱',
      nameHint: '選填。填寫後，報告將更具針對性',
      industry: '核心業務/行業類別',
      industryPlaceholder: '請選擇您的行業',
      scale: '企業規模',
      email: '您的聯絡郵箱',
      emailPlaceholder: '選填，用於接收詳細報告副本及後續服務提醒',
      emailHint: '我們承諾保護您的郵箱地址隱私'
    },
    industries: [
      '時尚服飾',
      '美妝護膚',
      '家居百貨',
      '3C數碼',
      '食品生鮮',
      '母嬰用品',
      '圖書文娛',
      '跨境電商',
      '綜合電商',
      '其他'
    ],
    scales: [
      '初創型 (1-50人)',
      '成長型 (51-200人)',
      '規模型 (201-1000人)',
      '大型企業 (1000人以上)'
    ],
    questions: {
      1: {
        title: '資料基礎與洞察力',
        question: '貴企業在資料管理和分析方面的現狀是？',
        options: [
          '資料分散，決策靠經驗',
          '已收集資料，但分析有限',
          '有基礎BI系統，可生成報表',
          '資料中台完善，分析能力強'
        ]
      },
      2: {
        title: '智能營銷與獲客',
        question: '貴企業在數字營銷中的AI應用情況？',
        options: [
          '人工投放，效率低',
          '使用基礎優化功能',
          'AI輔助內容和定向',
          '全渠道智能營銷'
        ]
      },
      3: {
        title: '客戶服務自動化',
        question: '貴企業的客服自動化程度如何？',
        options: [
          '全人工服務',
          '簡單機器人和IVR',
          '智能客服部署中',
          '多渠道智能客服'
        ]
      },
      4: {
        title: '供應鏈與庫存預測',
        question: '貴企業在供應鏈管理中的AI應用？',
        options: [
          '經驗管理庫存',
          '簡單資料分析',
          '機器學習預測',
          '全鏈路AI優化'
        ]
      },
      5: {
        title: '決策支持系統',
        question: '貴企業如何應用資料分析輔助決策？',
        options: [
          '依靠經驗決策',
          '基礎報表分析',
          '預測分析起步',
          '資料驅動決策'
        ]
      },
      6: {
        title: '個性化推薦能力',
        question: '貴企業的個性化推薦水平如何？',
        options: [
          '無個性化',
          '基礎分類推薦',
          '算法推薦起步',
          '全場景智能推薦'
        ]
      },
      7: {
        title: '戰略規劃與創新',
        question: '貴企業的AI戰略布局情況？',
        options: [
          '未納入規劃',
          '初步探索',
          '戰略布局中',
          '創新驅動型'
        ]
      }
    },
    results: {
      title: '您的專屬電商AI成熟度評估報告',
      generatedOn: '報告生成於',
      maturityTitle: 'AI成熟度總覽',
      radarTitle: 'AI能力矩陣透視',
      insightsTitle: '深度洞察與行動建議',
      solutionsTitle: '為您量身定制的AI解決方案',
      journeyTitle: '開啟您的AI進階之旅',
      consultButton: '預約1對1專家免費諮詢',
      downloadButton: '下載《2025電商AI轉型權威指南》',
      customButton: '獲取專屬AI升級方案',
      maturityLevels: {
        1: '初始探索者',
        2: '積極發展者',
        3: '成熟實踐者',
        4: '行業引領者'
      },
      maturityDescriptions: {
        1: 'AI旅程剛剛開始，有較大的發展空間。',
        2: 'AI應用已取得初步成效，但仍需系統化投入。',
        3: 'AI已融入多個核心業務環節，具備較強AI應用能力。',
        4: 'AI已成為核心競爭力，引領行業數字化轉型方向。'
      },
      dimensions: [
        '資料基礎',
        '智能營銷',
        '客戶服務',
        '供應鏈',
        '決策支持',
        '個性化推薦',
        '戰略創新'
      ],
      recommendations: {
        data: [
          '構建統一的資料湖架構，打破資料孤島',
          '投資資料質量管理工具，提高資料可用性',
          '構建實時資料處理能力，實現即時業務洞察'
        ],
        marketing: [
          '導入智能投放平台，實現跨渠道預算優化',
          '應用AI內容生成工具，提升營銷素材效率',
          '部署客戶旅程分析工具，優化全鏈路轉化'
        ],
        service: [
          '部署NLP驅動的智能客服系統',
          '構建全面的知識庫管理系統',
          '實施客戶情感分析，捕捉服務改進機會'
        ],
        supply: [
          '實施機器學習驅動的需求預測系統',
          '部署智能庫存優化算法，降低庫存成本',
          '構建供應商評估AI模型，優化供應商管理'
        ],
        decision: [
          '部署可視化BI平台，提升資料理解效率',
          '實施預測分析模型，支持前瞻性決策',
          '開發AI情景模擬工具，評估戰略可行性'
        ],
        personalization: [
          '部署協同過濾推薦引擎，提升交叉銷售',
          '實施實時個性化展示系統，提高轉化率',
          '開發多因素推薦模型，平衡推薦多樣性'
        ],
        strategy: [
          '成立AI創新專項小組，系統規劃AI戰略',
          '建立技術探索與業務落地雙軌制',
          '開發AI應用評估框架，確保投入產出比'
        ]
      },
      solutions: [
        {
          title: 'AI驅動的全渠道個性化引擎',
          description: '基於用戶行為和偏好的智能推薦系統，為每位用戶提供量身定制的購物體驗。',
          benefits: [
            '提升轉化率15-30%',
            '增加客單價10-25%',
            '提高用戶留存率達20%'
          ]
        },
        {
          title: '智能客服與工單自動化系統',
          description: '結合NLP和知識圖譜的智能客服系統，能自動解決80%以上的常見問題。',
          benefits: [
            '客服成本降低40%',
            '響應時間縮短60%',
            '客戶滿意度提升25%'
          ]
        },
        {
          title: '資料驅動的庫存優化平台',
          description: '融合多源資料的智能預測系統，實現精準的需求預測和庫存管理。',
          benefits: [
            '庫存周轉率提升30%',
            '減少庫存積壓達25%',
            '缺貨率降低40%'
          ]
        }
      ]
    },
    consent: {
      title: '資料使用聲明',
      text: '我同意銳智星辰收集我的評估資料，用於生成個性化AI成熟度報告。我了解這些資料可能由Grok AI進行處理，並會被安全存儲用於服務優化。',
      agree: '我同意以上條款'
    },
    validation: {
      required: '此欄位為必填項',
      email: '請輸入有效的電子郵箱地址',
      consent: '請同意資料使用條款以繼續'
    }
  },
  'en-US': {
    title: 'Stellaris Wisdom · E-commerce Evaluation Assistant',
    subtitle: 'Discover your company\'s AI potential in the digital era in just minutes',
    privacyNotice: 'Your data will be used to generate a personalized report and may be analyzed and securely stored by a third-party AI (Grok AI). We are committed to keeping your data confidential.',
    progress: 'Progress',
    next: 'Next',
    prev: 'Previous',
    submit: 'Generate Report',
    generating: 'AI is analyzing your data, please wait...',
    steps: {
      0: 'Company Profile',
      1: 'Data Infrastructure & Insights',
      2: 'Intelligent Marketing',
      3: 'Customer Service Automation',
      4: 'Supply Chain & Inventory',
      5: 'Decision Support Systems',
      6: 'Personalization Capabilities',
      7: 'Strategic Planning & Innovation'
    },
    companyProfile: {
      title: 'Step 1: Company Profile',
      name: 'Company Name',
      namePlaceholder: 'Enter your company\'s legal name',
      nameHint: 'Optional. Providing this will make the report more personalized',
      industry: 'Core Business/Industry',
      industryPlaceholder: 'Please select your industry',
      scale: 'Company Scale',
      email: 'Your Contact Email',
      emailPlaceholder: 'Optional, for receiving detailed report and service reminders',
      emailHint: 'We are committed to protecting your email privacy'
    },
    industries: [
      'Fashion & Apparel',
      'Beauty & Cosmetics',
      'Home & Lifestyle',
      'Electronics & Digital',
      'Food & Fresh Produce',
      'Mother & Baby Products',
      'Books & Entertainment',
      'Cross-border E-commerce',
      'General E-commerce',
      'Other'
    ],
    scales: [
      'Startup (1-50 employees)',
      'Growth (51-200 employees)',
      'Mid-sized (201-1000 employees)',
      'Enterprise (1000+ employees)'
    ],
    questions: {
      1: {
        title: 'Data Infrastructure & Insights',
        question: 'How does your company manage and analyze data?',
        options: [
          'Scattered data, experience-based decisions',
          'Data collected but limited analysis',
          'Basic BI system with reports',
          'Advanced data platform with strong analytics'
        ]
      },
      2: {
        title: 'Intelligent Marketing',
        question: 'How does your company apply AI in digital marketing?',
        options: [
          'Manual operations, low efficiency',
          'Basic optimization features',
          'AI-assisted content and targeting',
          'Omni-channel smart marketing'
        ]
      },
      3: {
        title: 'Customer Service Automation',
        question: 'What is your level of customer service automation?',
        options: [
          'Fully manual service',
          'Basic chatbots and IVR',
          'Smart service deployment',
          'Multi-channel AI service'
        ]
      },
      4: {
        title: 'Supply Chain & Inventory',
        question: 'How do you apply AI in supply chain management?',
        options: [
          'Experience-based inventory',
          'Basic data analysis',
          'ML-based prediction',
          'Full AI optimization'
        ]
      },
      5: {
        title: 'Decision Support Systems',
        question: 'How do you use data analysis for decisions?',
        options: [
          'Experience-based decisions',
          'Basic reporting analysis',
          'Predictive analytics pilot',
          'Data-driven decisions'
        ]
      },
      6: {
        title: 'Personalization Capabilities',
        question: 'What is your level of personalization?',
        options: [
          'No personalization',
          'Basic category recommendations',
          'Algorithm-based recommendations',
          'Full-scenario smart recommendations'
        ]
      },
      7: {
        title: 'Strategic Planning & Innovation',
        question: 'What is your AI strategy status?',
        options: [
          'Not in planning',
          'Initial exploration',
          'Strategic deployment',
          'Innovation-driven'
        ]
      }
    },
    results: {
      title: 'Your Personalized E-commerce AI Maturity Assessment Report',
      generatedOn: 'Report generated on',
      maturityTitle: 'AI Maturity Overview',
      radarTitle: 'AI Capability Matrix Analysis',
      insightsTitle: 'In-depth Insights & Actionable Recommendations',
      solutionsTitle: 'AI Solutions Tailored For You',
      journeyTitle: 'Embark on Your AI Advancement Journey',
      consultButton: 'Schedule a Free 1:1 Expert Consultation',
      downloadButton: 'Download "2025 E-commerce AI Transformation Guide"',
      customButton: 'Get Your Custom AI Upgrade Plan',
      maturityLevels: {
        1: 'Initial Explorer',
        2: 'Active Developer',
        3: 'Mature Practitioner',
        4: 'Industry Leader'
      },
      maturityDescriptions: {
        1: 'Your AI journey has just begun with significant room for growth.',
        2: 'AI applications have achieved initial results but require systematic investment.',
        3: 'AI is integrated into multiple core business processes with strong application capabilities.',
        4: 'AI has become a core competitiveness, leading the industry\'s digital transformation direction.'
      },
      dimensions: [
        'Data',
        'Marketing',
        'Service',
        'Supply Chain',
        'Decision',
        'Personalization',
        'Strategy'
      ],
      recommendations: {
        data: [
          'Build a unified data lake architecture to break down data silos',
          'Invest in data quality management tools to improve data usability',
          'Develop real-time data processing capabilities for immediate business insights'
        ],
        marketing: [
          'Implement intelligent media buying platforms for cross-channel budget optimization',
          'Apply AI content generation tools to improve marketing content efficiency',
          'Deploy customer journey analysis tools to optimize full-funnel conversion'
        ],
        service: [
          'Deploy NLP-driven intelligent customer service systems',
          'Build comprehensive knowledge base management systems',
          'Implement customer sentiment analysis to capture service improvement opportunities'
        ],
        supply: [
          'Implement machine learning-driven demand forecasting systems',
          'Deploy intelligent inventory optimization algorithms to reduce inventory costs',
          'Build AI supplier evaluation models to optimize supplier management'
        ],
        decision: [
          'Deploy visualization BI platforms to improve data understanding efficiency',
          'Implement predictive analytics models to support forward-looking decisions',
          'Develop AI scenario simulation tools to evaluate strategic feasibility'
        ],
        personalization: [
          'Deploy collaborative filtering recommendation engines to enhance cross-selling',
          'Implement real-time personalized display systems to increase conversion rates',
          'Develop multi-factor recommendation models to balance recommendation diversity'
        ],
        strategy: [
          'Establish AI innovation special teams for systematic AI strategy planning',
          'Build dual-track systems for technology exploration and business implementation',
          'Develop AI application evaluation frameworks to ensure ROI'
        ]
      },
      solutions: [
        {
          title: 'AI-Driven Omnichannel Personalization Engine',
          description: 'Intelligent recommendation system based on user behavior and preferences, providing a tailored shopping experience for each user.',
          benefits: [
            'Increase conversion rates by 15-30%',
            'Increase average order value by 10-25%',
            'Improve user retention rates by up to 20%'
          ]
        },
        {
          title: 'Intelligent Customer Service & Ticket Automation System',
          description: 'Intelligent customer service system combining NLP and knowledge graphs, capable of automatically resolving over 80% of common issues.',
          benefits: [
            'Reduce customer service costs by 40%',
            'Shorten response time by 60%',
            'Improve customer satisfaction by 25%'
          ]
        },
        {
          title: 'Data-Driven Inventory Optimization Platform',
          description: 'Intelligent prediction system integrating multi-source data for precise demand forecasting and inventory management.',
          benefits: [
            'Improve inventory turnover rate by 30%',
            'Reduce inventory buildup by 25%',
            'Lower stockout rates by 40%'
          ]
        }
      ]
    },
    consent: {
      title: 'Data Usage Statement',
      text: 'I agree that Stellaris Wisdom may collect my assessment data to generate a personalized AI maturity report. I understand that this data may be processed by Grok AI and securely stored for service optimization.',
      agree: 'I agree to the terms above'
    },
    validation: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      consent: 'Please agree to the data usage terms to continue'
    }
  }
};

// Create the language context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'zh-CN',
  setLanguage: () => {},
  translations: {}
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language preference from localStorage, default to 'zh-CN'
    const savedLanguage = localStorage.getItem('preferred-language');
    return savedLanguage || 'zh-CN';
  });
  
  // When language changes, save to localStorage
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);
  
  // Get translations for the current language
  const currentTranslations = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;