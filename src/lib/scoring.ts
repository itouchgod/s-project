// 评分模型和核心纯函数
// 基于5维评分系统的加权平均算法

import { Project, Mentor, ProjectScore, MentorScore, UserSettings } from '@/types/dataset';

// 默认权重配置
export const DEFAULT_WEIGHTS = {
  project: {
    technical: 0.25,    // 技术难度
    innovation: 0.20,   // 创新性
    feasibility: 0.20,  // 可行性
    impact: 0.20,       // 影响力
    learning: 0.15,     // 学习价值
  },
  mentor: {
    expertise: 0.30,      // 专业能力
    teaching: 0.25,       // 教学能力
    support: 0.20,        // 支持程度
    communication: 0.15,  // 沟通能力
    availability: 0.10,   // 可用性
  }
};

// 项目评分计算
export function calculateProjectScore(
  project: Project,
  weights = DEFAULT_WEIGHTS.project
): ProjectScore {
  const dimensions = {
    technical: calculateTechnicalScore(project),
    innovation: calculateInnovationScore(project),
    feasibility: calculateFeasibilityScore(project),
    impact: calculateImpactScore(project),
    learning: calculateLearningScore(project),
  };

  const overall = Object.entries(dimensions).reduce(
    (sum, [key, value]) => sum + (value * weights[key as keyof typeof weights]),
    0
  );

  return {
    projectId: project.id,
    overall: Math.round(overall * 100) / 100,
    dimensions,
    weights,
    calculatedAt: new Date().toISOString(),
  };
}

// 导师评分计算
export function calculateMentorScore(
  mentor: Mentor,
  weights = DEFAULT_WEIGHTS.mentor
): MentorScore {
  const dimensions = {
    expertise: calculateExpertiseScore(mentor),
    teaching: calculateTeachingScore(mentor),
    support: calculateSupportScore(mentor),
    communication: calculateCommunicationScore(mentor),
    availability: calculateAvailabilityScore(mentor),
  };

  const overall = Object.entries(dimensions).reduce(
    (sum, [key, value]) => sum + (value * weights[key as keyof typeof weights]),
    0
  );

  return {
    mentorId: mentor.id,
    overall: Math.round(overall * 100) / 100,
    dimensions,
    weights,
    calculatedAt: new Date().toISOString(),
  };
}

// 项目维度评分函数
function calculateTechnicalScore(project: Project): number {
  const difficultyMap = { beginner: 2, intermediate: 4, advanced: 5 };
  const baseScore = difficultyMap[project.difficulty];
  
  // 根据技能要求数量调整
  const skillBonus = Math.min(project.skills.length * 0.2, 1);
  
  return Math.min(baseScore + skillBonus, 5);
}

function calculateInnovationScore(project: Project): number {
  const innovationKeywords = [
    'AI', '机器学习', '深度学习', 'VR', 'AR', '区块链', '量子',
    '创新', '前沿', '新兴', '突破', '革命性'
  ];
  
  const keywordCount = project.keywords.filter(keyword =>
    innovationKeywords.some(innov => keyword.includes(innov))
  ).length;
  
  return Math.min(2 + keywordCount * 0.5, 5);
}

function calculateFeasibilityScore(project: Project): number {
  // 基于项目时长和需求复杂度
  const durationScore = project.estimatedDuration <= 6 ? 4 : 
                       project.estimatedDuration <= 12 ? 3 : 2;
  
  const requirementScore = project.requirements.length <= 3 ? 4 :
                          project.requirements.length <= 6 ? 3 : 2;
  
  return (durationScore + requirementScore) / 2;
}

function calculateImpactScore(project: Project): number {
  const impactKeywords = [
    '社会', '医疗', '教育', '环境', '安全', '健康', '可持续发展',
    '公益', '改善', '解决', '优化', '提升'
  ];
  
  const keywordCount = project.keywords.filter(keyword =>
    impactKeywords.some(impact => keyword.includes(impact))
  ).length;
  
  return Math.min(2 + keywordCount * 0.6, 5);
}

function calculateLearningScore(project: Project): number {
  // 基于技能数量和项目复杂度
  const skillScore = Math.min(project.skills.length * 0.3, 3);
  const complexityScore = project.difficulty === 'advanced' ? 2 : 
                         project.difficulty === 'intermediate' ? 1.5 : 1;
  
  return Math.min(skillScore + complexityScore, 5);
}

// 导师维度评分函数
function calculateExpertiseScore(mentor: Mentor): number {
  const baseScore = mentor.rating;
  const publicationBonus = Math.min(mentor.publications.length * 0.1, 1);
  const awardBonus = Math.min(mentor.awards.length * 0.2, 1);
  
  return Math.min(baseScore + publicationBonus + awardBonus, 5);
}

function calculateTeachingScore(mentor: Mentor): number {
  const baseScore = mentor.rating;
  const studentRatio = mentor.studentCount / Math.max(mentor.reviewCount, 1);
  const ratioBonus = studentRatio > 0.5 ? 0.5 : 0;
  
  return Math.min(baseScore + ratioBonus, 5);
}

function calculateSupportScore(mentor: Mentor): number {
  const baseScore = mentor.rating;
  const availabilityBonus = mentor.isAvailable ? 0.5 : 0;
  
  return Math.min(baseScore + availabilityBonus, 5);
}

function calculateCommunicationScore(mentor: Mentor): number {
  // 基于评价数量和平均评分
  const reviewScore = mentor.reviewCount > 10 ? 4 : 
                     mentor.reviewCount > 5 ? 3 : 2;
  
  return Math.min(reviewScore + (mentor.rating - 3), 5);
}

function calculateAvailabilityScore(mentor: Mentor): number {
  return mentor.isAvailable ? 5 : 1;
}

// 批量计算评分
export function calculateAllProjectScores(
  projects: Project[],
  weights = DEFAULT_WEIGHTS.project
): ProjectScore[] {
  return projects.map(project => calculateProjectScore(project, weights));
}

export function calculateAllMentorScores(
  mentors: Mentor[],
  weights = DEFAULT_WEIGHTS.mentor
): MentorScore[] {
  return mentors.map(mentor => calculateMentorScore(mentor, weights));
}

// 评分比较函数
export function compareScores(score1: number, score2: number): number {
  return score1 - score2;
}

// 评分排序函数
export function sortByScore<T extends { score?: ProjectScore | MentorScore }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    const scoreA = a.score?.overall || 0;
    const scoreB = b.score?.overall || 0;
    return order === 'desc' ? scoreB - scoreA : scoreA - scoreB;
  });
}

// 评分过滤函数
export function filterByScoreRange<T extends { score?: ProjectScore | MentorScore }>(
  items: T[],
  minScore: number,
  maxScore: number = 5
): T[] {
  return items.filter(item => {
    const score = item.score?.overall || 0;
    return score >= minScore && score <= maxScore;
  });
}

// 权重验证函数
export function validateWeights(weights: any): boolean {
  const projectWeights = Object.values(weights.project || {}) as number[];
  const mentorWeights = Object.values(weights.mentor || {}) as number[];
  
  const projectSum = projectWeights.reduce((sum, w) => sum + w, 0);
  const mentorSum = mentorWeights.reduce((sum, w) => sum + w, 0);
  
  return Math.abs(projectSum - 1) < 0.01 && Math.abs(mentorSum - 1) < 0.01;
}

// 权重标准化函数
export function normalizeWeights(weights: any): any {
  const normalize = (obj: Record<string, number>) => {
    const sum = Object.values(obj).reduce((s, w) => s + w, 0);
    const normalized: Record<string, number> = {};
    for (const [key, value] of Object.entries(obj)) {
      normalized[key] = value / sum;
    }
    return normalized;
  };

  return {
    project: normalize(weights.project || DEFAULT_WEIGHTS.project),
    mentor: normalize(weights.mentor || DEFAULT_WEIGHTS.mentor),
  };
}
