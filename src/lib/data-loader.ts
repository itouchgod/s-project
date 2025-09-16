// 数据加载工具
// 从 dataset.json 加载数据，支持评分计算和缓存

import { Dataset, Project, Mentor, ProjectScore, MentorScore } from '@/types/dataset';
import { 
  calculateAllProjectScores, 
  calculateAllMentorScores,
  DEFAULT_WEIGHTS 
} from './scoring';
import { 
  getProjectScores, 
  saveProjectScores, 
  getMentorScores, 
  saveMentorScores,
  getSettings 
} from './storage';

let cachedDataset: Dataset | null = null;
let cachedProjectScores: ProjectScore[] | null = null;
let cachedMentorScores: MentorScore[] | null = null;

// 加载数据集
export async function loadDataset(): Promise<Dataset> {
  if (cachedDataset) {
    return cachedDataset;
  }

  try {
    const response = await fetch('/dataset.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const dataset: Dataset = await response.json();
    cachedDataset = dataset;
    
    console.log(`✅ 数据集加载成功: ${dataset.mentors.length} 个导师, ${dataset.projects.length} 个项目`);
    return dataset;
  } catch (error) {
    console.error('❌ 数据集加载失败:', error);
    throw error;
  }
}

// 获取项目数据
export async function getProjects(): Promise<Project[]> {
  const dataset = await loadDataset();
  return dataset.projects;
}

// 获取导师数据
export async function getMentors(): Promise<Mentor[]> {
  const dataset = await loadDataset();
  return dataset.mentors;
}

// 获取项目评分
export async function getProjectScoresWithCache(): Promise<ProjectScore[]> {
  if (cachedProjectScores) {
    return cachedProjectScores;
  }

  // 尝试从本地存储加载
  const storedScores = getProjectScores();
  if (storedScores.length > 0) {
    cachedProjectScores = storedScores;
    return storedScores;
  }

  // 计算新评分
  const projects = await getProjects();
  const settings = getSettings();
  const scores = calculateAllProjectScores(projects, settings.scoringWeights.project);
  
  // 缓存评分
  cachedProjectScores = scores;
  saveProjectScores(scores);
  
  return scores;
}

// 获取导师评分
export async function getMentorScoresWithCache(): Promise<MentorScore[]> {
  if (cachedMentorScores) {
    return cachedMentorScores;
  }

  // 尝试从本地存储加载
  const storedScores = getMentorScores();
  if (storedScores.length > 0) {
    cachedMentorScores = storedScores;
    return storedScores;
  }

  // 计算新评分
  const mentors = await getMentors();
  const settings = getSettings();
  const scores = calculateAllMentorScores(mentors, settings.scoringWeights.mentor);
  
  // 缓存评分
  cachedMentorScores = scores;
  saveMentorScores(scores);
  
  return scores;
}

// 重新计算评分（当权重改变时）
export async function recalculateScores(): Promise<{
  projectScores: ProjectScore[];
  mentorScores: MentorScore[];
}> {
  const projects = await getProjects();
  const mentors = await getMentors();
  const settings = getSettings();
  
  const projectScores = calculateAllProjectScores(projects, settings.scoringWeights.project);
  const mentorScores = calculateAllMentorScores(mentors, settings.scoringWeights.mentor);
  
  // 更新缓存
  cachedProjectScores = projectScores;
  cachedMentorScores = mentorScores;
  
  // 保存到本地存储
  saveProjectScores(projectScores);
  saveMentorScores(mentorScores);
  
  return { projectScores, mentorScores };
}

// 获取带评分的项目数据
export async function getProjectsWithScores(): Promise<(Project & { score: ProjectScore })[]> {
  const [projects, scores] = await Promise.all([
    getProjects(),
    getProjectScoresWithCache()
  ]);
  
  return projects.map(project => {
    const score = scores.find(s => s.projectId === project.id);
    return {
      ...project,
      score: score || {
        projectId: project.id,
        overall: 0,
        dimensions: {
          technical: 0,
          innovation: 0,
          feasibility: 0,
          impact: 0,
          learning: 0,
        },
        weights: DEFAULT_WEIGHTS.project,
        calculatedAt: new Date().toISOString(),
      }
    };
  });
}

// 获取带评分的导师数据
export async function getMentorsWithScores(): Promise<(Mentor & { score: MentorScore })[]> {
  const [mentors, scores] = await Promise.all([
    getMentors(),
    getMentorScoresWithCache()
  ]);
  
  return mentors.map(mentor => {
    const score = scores.find(s => s.mentorId === mentor.id);
    return {
      ...mentor,
      score: score || {
        mentorId: mentor.id,
        overall: 0,
        dimensions: {
          expertise: 0,
          teaching: 0,
          support: 0,
          communication: 0,
          availability: 0,
        },
        weights: DEFAULT_WEIGHTS.mentor,
        calculatedAt: new Date().toISOString(),
      }
    };
  });
}

// 搜索功能
export async function searchProjects(query: string): Promise<Project[]> {
  const projects = await getProjects();
  const lowerQuery = query.toLowerCase();
  
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
    project.mentorName.toLowerCase().includes(lowerQuery)
  );
}

export async function searchMentors(query: string): Promise<Mentor[]> {
  const mentors = await getMentors();
  const lowerQuery = query.toLowerCase();
  
  return mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(lowerQuery) ||
    mentor.department.toLowerCase().includes(lowerQuery) ||
    mentor.researchFields.some(field => field.toLowerCase().includes(lowerQuery)) ||
    mentor.description.toLowerCase().includes(lowerQuery)
  );
}

// 过滤功能
export async function filterProjects(filters: {
  categories?: string[];
  difficulty?: string[];
  status?: string[];
  mentors?: string[];
}): Promise<Project[]> {
  const projects = await getProjects();
  
  return projects.filter(project => {
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(project.category)) return false;
    }
    
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(project.difficulty)) return false;
    }
    
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(project.status)) return false;
    }
    
    if (filters.mentors && filters.mentors.length > 0) {
      if (!filters.mentors.includes(project.mentorId)) return false;
    }
    
    return true;
  });
}

export async function filterMentors(filters: {
  departments?: string[];
  researchFields?: string[];
  isAvailable?: boolean;
  minRating?: number;
}): Promise<Mentor[]> {
  const mentors = await getMentors();
  
  return mentors.filter(mentor => {
    if (filters.departments && filters.departments.length > 0) {
      if (!filters.departments.includes(mentor.department)) return false;
    }
    
    if (filters.researchFields && filters.researchFields.length > 0) {
      const hasMatchingField = filters.researchFields.some(field =>
        mentor.researchFields.includes(field)
      );
      if (!hasMatchingField) return false;
    }
    
    if (filters.isAvailable !== undefined) {
      if (mentor.isAvailable !== filters.isAvailable) return false;
    }
    
    if (filters.minRating !== undefined) {
      if (mentor.rating < filters.minRating) return false;
    }
    
    return true;
  });
}

// 获取统计数据
export async function getStatistics(): Promise<{
  totalProjects: number;
  totalMentors: number;
  categories: Array<{ name: string; count: number }>;
  departments: Array<{ name: string; count: number }>;
  difficulty: Array<{ name: string; count: number }>;
}> {
  const [projects, mentors] = await Promise.all([
    getProjects(),
    getMentors()
  ]);
  
  // 统计项目类别
  const categoryMap = new Map<string, number>();
  projects.forEach(project => {
    categoryMap.set(project.category, (categoryMap.get(project.category) || 0) + 1);
  });
  
  // 统计院系
  const departmentMap = new Map<string, number>();
  mentors.forEach(mentor => {
    departmentMap.set(mentor.department, (departmentMap.get(mentor.department) || 0) + 1);
  });
  
  // 统计难度
  const difficultyMap = new Map<string, number>();
  projects.forEach(project => {
    difficultyMap.set(project.difficulty, (difficultyMap.get(project.difficulty) || 0) + 1);
  });
  
  return {
    totalProjects: projects.length,
    totalMentors: mentors.length,
    categories: Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count })),
    departments: Array.from(departmentMap.entries()).map(([name, count]) => ({ name, count })),
    difficulty: Array.from(difficultyMap.entries()).map(([name, count]) => ({ name, count })),
  };
}

// 清除缓存
export function clearCache(): void {
  cachedDataset = null;
  cachedProjectScores = null;
  cachedMentorScores = null;
}

// 预加载数据（用于提升性能）
export async function preloadData(): Promise<void> {
  try {
    await Promise.all([
      loadDataset(),
      getProjectScoresWithCache(),
      getMentorScoresWithCache()
    ]);
    console.log('✅ 数据预加载完成');
  } catch (error) {
    console.error('❌ 数据预加载失败:', error);
  }
}
