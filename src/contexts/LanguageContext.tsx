import React, { createContext, useState, useEffect } from 'react';

// Define types for the language context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
}

// Translations for all UI elements
const translations = {
  'en-US': {
    title: 'Stellaris Wisdom · E-commerce Assessment Tool',
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
      title: 'Your AI Maturity Assessment Report',
      generatedOn: 'Report generated on',
      maturityTitle: 'AI Maturity Overview',
      radarTitle: 'AI Capability Matrix Analysis',
      insightsTitle: 'In-depth Insights & Actionable Recommendations',
      solutionsTitle: 'AI Solutions Tailored For You',
      journeyTitle: 'Start Your AI Journey',
      consultButton: 'Schedule Free Expert Consultation',
      downloadButton: 'Download AI Transformation Guide',
      customButton: 'Get Custom AI Solution',
      maturityLevels: {
        1: 'Initial Explorer',
        2: 'Active Developer',
        3: 'Mature Practitioner',
        4: 'Industry Leader'
      },
      maturityDescriptions: {
        1: 'Your AI journey has just begun with significant room for growth.',
        2: 'AI applications show initial results but need systematic investment.',
        3: 'AI is integrated into core processes with strong capabilities.',
        4: 'AI is a core competency, leading industry transformation.'
      },
      dimensions: [
        'Data Foundation',
        'Smart Marketing',
        'Service',
        'Supply Chain',
        'Decision Making',
        'Personalization',
        'Strategy'
      ],
      recommendations: {
        data: [
          'Build unified data architecture',
          'Invest in data quality tools',
          'Develop real-time processing'
        ],
        marketing: [
          'Implement AI-driven marketing',
          'Deploy content automation',
          'Optimize customer journey'
        ],
        service: [
          'Deploy AI customer service',
          'Build knowledge management',
          'Implement sentiment analysis'
        ],
        supply: [
          'Use ML for demand forecasting',
          'Optimize inventory with AI',
          'Enhance supplier management'
        ],
        decision: [
          'Deploy BI visualization',
          'Use predictive analytics',
          'Develop scenario planning'
        ],
        personalization: [
          'Implement recommendation engine',
          'Enable real-time personalization',
          'Balance recommendation diversity'
        ],
        strategy: [
          'Form AI innovation team',
          'Create implementation roadmap',
          'Measure AI effectiveness'
        ]
      },
      solutions: [
        {
          title: 'AI-Driven Personalization Engine',
          description: 'Smart recommendation system providing personalized shopping experiences.',
          benefits: [
            'Increase conversion rates',
            'Boost average order value',
            'Improve customer retention'
          ]
        },
        {
          title: 'Intelligent Service Automation',
          description: 'NLP-powered customer service system for automated issue resolution.',
          benefits: [
            'Reduce service costs',
            'Speed up response time',
            'Enhance satisfaction'
          ]
        },
        {
          title: 'Smart Inventory Management',
          description: 'AI-powered system for demand forecasting and inventory optimization.',
          benefits: [
            'Improve inventory turnover',
            'Reduce excess stock',
            'Minimize stockouts'
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
  },
  'zh-CN': translations['zh-CN'],
  'zh-TW': translations['zh-TW']
};

// Create the language context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en-US',
  setLanguage: () => {},
  translations: translations['en-US']
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language preference from localStorage, default to 'en-US'
    const savedLanguage = localStorage.getItem('preferred-language');
    return savedLanguage || 'en-US';
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