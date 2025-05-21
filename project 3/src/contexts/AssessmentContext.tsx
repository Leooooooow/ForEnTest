import React, { createContext, useState, useEffect } from 'react';
import { OpenAI } from 'openai';

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: 'xai-Z44faMIsM5pSX2Q8GeBAwURQtO7OjzFOZj52X8rHo53owCG2f8hGULhP1CZ16XchRPuHj1RHZ9C9Ug2G',
  baseURL: 'https://api.x.ai/v1',
  dangerouslyAllowBrowser: true
});

// Define types for the assessment data
interface CompanyProfile {
  industry: string;
  businessModels: string[];
  platforms: string[];
  regions: string[];
  scale: string;
  otherBusinessModel?: string;
  otherPlatform?: string;
  otherRegion?: string;
}

interface QuestionAnswer {
  questionId: number;
  answer: string | string[];
}

interface AssessmentData {
  companyProfile: CompanyProfile;
  answers: QuestionAnswer[];
  transformationBarriers: string[];
  expectedOutcomes: string;
  supplementaryInfo: string;
  consented: boolean;
}

interface AssessmentResults {
  overallScore: number;
  maturityLevel: number;
  dimensionScores: number[];
  summaryStatement: string;
  dimensionInsights: {
    id: number;
    dimension: string;
    score: number;
    strengths: string[];
    gaps: string[];
    recommendations: string[];
  }[];
  recommendedSolutions: {
    id: number;
    title: string;
    description: string;
    benefits: string[];
  }[];
}

interface AssessmentContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  assessmentData: AssessmentData;
  updateCompanyProfile: (profile: Partial<CompanyProfile>) => void;
  updateAnswer: (questionId: number, answer: string | string[]) => void;
  updateTransformationBarriers: (barriers: string[]) => void;
  updateExpectedOutcomes: (outcomes: string) => void;
  updateSupplementaryInfo: (info: string) => void;
  setConsent: (consented: boolean) => void;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
  isLoading: boolean;
  results: AssessmentResults | null;
  submitAssessment: (language: string) => void;
  resetAssessment: () => void;
}

const defaultAssessmentData: AssessmentData = {
  companyProfile: {
    industry: '',
    businessModels: [],
    platforms: [],
    regions: [],
    scale: ''
  },
  answers: [],
  transformationBarriers: [],
  expectedOutcomes: '',
  supplementaryInfo: '',
  consented: false
};

const AssessmentContext = createContext<AssessmentContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  assessmentData: defaultAssessmentData,
  updateCompanyProfile: () => {},
  updateAnswer: () => {},
  updateTransformationBarriers: () => {},
  updateExpectedOutcomes: () => {},
  updateSupplementaryInfo: () => {},
  setConsent: () => {},
  isSubmitted: false,
  setIsSubmitted: () => {},
  isLoading: false,
  results: null,
  submitAssessment: () => {},
  resetAssessment: () => {}
});

export const AssessmentProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(defaultAssessmentData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('assessment-data');
    if (savedData) {
      try {
        setAssessmentData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error parsing saved assessment data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('assessment-data', JSON.stringify(assessmentData));
  }, [assessmentData]);

  const updateCompanyProfile = (profile: Partial<CompanyProfile>) => {
    setAssessmentData(prev => ({
      ...prev,
      companyProfile: {
        ...prev.companyProfile,
        ...profile
      }
    }));
  };

  const updateAnswer = (questionId: number, answer: string | string[]) => {
    setAssessmentData(prev => {
      const existingAnswerIndex = prev.answers.findIndex(a => a.questionId === questionId);
      
      let newAnswers;
      if (existingAnswerIndex >= 0) {
        newAnswers = [...prev.answers];
        newAnswers[existingAnswerIndex] = { questionId, answer };
      } else {
        newAnswers = [...prev.answers, { questionId, answer }];
      }
      
      return {
        ...prev,
        answers: newAnswers
      };
    });
  };

  const updateTransformationBarriers = (barriers: string[]) => {
    setAssessmentData(prev => ({
      ...prev,
      transformationBarriers: barriers
    }));
  };

  const updateExpectedOutcomes = (outcomes: string) => {
    setAssessmentData(prev => ({
      ...prev,
      expectedOutcomes: outcomes
    }));
  };

  const updateSupplementaryInfo = (info: string) => {
    setAssessmentData(prev => ({
      ...prev,
      supplementaryInfo: info
    }));
  };

  const setConsent = (consented: boolean) => {
    setAssessmentData(prev => ({
      ...prev,
      consented
    }));
  };

  const submitAssessment = async (language: string) => {
    setIsLoading(true);
    try {
      const prompt = `请你扮演一位专业的商业分析顾问。你的任务是根据以下提供的问卷内容，撰写一份详细的分析报告。这份报告需要严格遵循我提供的分析报告范例的结构、深度和分析逻辑。

核心指令：

1. AI总结报告（100字以内）：
- 简明扼要地总结企业AI应用现状
- 突出关键优势和主要挑战
- 重点说明对业务目标的影响

2. AI能力矩阵透视：
- 基于五个维度的评分进行深入分析
- 每个维度的得分需要详细解读
- 分析维度间的关联性和整体平衡性

3. 深度洞察与行动建议（每个维度80-100字）：
- 优势识别：详细分析现有成果和竞争优势
- 潜力差距：深入剖析发展瓶颈和提升空间
- 行动建议：提供具体可行的改进方案

4. 建议方案（仅包含定性分析）：
- 聚焦解决方案的功能价值
- 突出业务改进方向
- 避免使用具体数值

企业概况信息：
- 行业: ${assessmentData.companyProfile.industry}
- 生意模式: ${assessmentData.companyProfile.businessModels.join(', ')}
- 业务平台: ${assessmentData.companyProfile.platforms.join(', ')}
- 业务地区: ${assessmentData.companyProfile.regions.join(', ')}
- 企业规模: ${assessmentData.companyProfile.scale}

AI化成熟度评估（问卷Q6-Q12答案）：
${assessmentData.answers.map(a => `问题 ${a.questionId}: ${Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}`).join('\n')}

转型障碍：
${assessmentData.transformationBarriers.join('\n')}

期望成果：
${assessmentData.expectedOutcomes}

补充信息：
${assessmentData.supplementaryInfo}

请生成一份符合以下JSON格式的分析报告。重要提示：仅返回JSON对象，不要包含其他文本或格式：

{
  "overallScore": <基于五个维度的平均分，0-100分>,
  "maturityLevel": <基于总分的成熟度等级：1(0-25分), 2(26-50分), 3(51-75分), 4(76-100分)>,
  "dimensionScores": [<五个维度的得分数组，每个维度0-100分>],
  "summaryStatement": "<100字以内的AI总结报告>",
  "dimensionInsights": [
    {
      "id": <维度编号>,
      "dimension": "<维度名称>",
      "score": <得分>,
      "strengths": ["<80-100字的优势分析>"],
      "gaps": ["<80-100字的差距分析>"],
      "recommendations": ["<80-100字的建议>"]
    }
  ],
  "recommendedSolutions": [
    {
      "id": <方案编号>,
      "title": "<方案名称>",
      "description": "<方案描述>",
      "benefits": ["<定性收益1>", "<定性收益2>", ...]
    }
  ]
}

评分标准：
- 技术与数据基建 (TDI)：Q6得分
- 核心业务AI应用 (CBA)：(Q7得分 + Q11得分) / 2
- 运营流程智能化 (OPI)：(Q8得分 + Q9得分) / 2
- 决策与洞察智能 (DII)：Q10得分
- AI战略与组织能力 (ASO)：Q12得分

选项得分：
A = 1分（25分）
B = 2分（50分）
C = 3分（75分）
D = 4分（100分）`;

      const completion = await client.chat.completions.create({
        model: "grok-3-fast-beta",
        messages: [
          {
            role: "system",
            content: "你是一位专业的AI商业顾问，专注于电商数字化转型评估。请基于问卷数据提供详细、可操作的洞察。重要提示：仅返回有效的JSON格式内容，不要包含其他文本或格式。"
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      let aiResponse;
      try {
        const rawResponse = completion.choices[0].message.content.trim();
        aiResponse = JSON.parse(rawResponse);
      } catch (error) {
        console.error('Error parsing AI response:', error);
        console.log('Raw AI response:', completion.choices[0].message.content);
        throw new Error('Failed to parse AI response. Please try again.');
      }

      setResults(aiResponse);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetAssessment = () => {
    setAssessmentData(defaultAssessmentData);
    setCurrentStep(0);
    setIsSubmitted(false);
    setResults(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        assessmentData,
        updateCompanyProfile,
        updateAnswer,
        updateTransformationBarriers,
        updateExpectedOutcomes,
        updateSupplementaryInfo,
        setConsent,
        isSubmitted,
        setIsSubmitted,
        isLoading,
        results,
        submitAssessment,
        resetAssessment
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export default AssessmentContext;