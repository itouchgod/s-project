// 导师项目对比网站 - 数据模型定义
// 基于 250916a.md 的完整数据结构

export interface Project {
  id: string;
  title: string;
  mentorId: string;
  mentorName: string;
  keywords: string[];
  description: string;
  status: 'ongoing' | 'completed' | 'cancelled' | 'planning';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // 月数
  requirements: string[];
  deliverables: string[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  office: string;
  researchFields: string[];
  description: string;
  education: Education[];
  experience: Experience[];
  publications: Publication[];
  awards: Award[];
  rating: number;
  reviewCount: number;
  studentCount: number;
  isAvailable: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  major: string;
  year: number;
  isHighest: boolean;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  citations: number;
  type: 'journal' | 'conference' | 'book' | 'patent';
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description: string;
}

export interface Review {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  rating: number;
  content: string;
  aspects: {
    teaching: number;
    research: number;
    communication: number;
    support: number;
  };
  createdAt: string;
  isVerified: boolean;
}

export interface Statistics {
  totalMentors: number;
  totalStudents: number;
  totalReviews: number;
  averageRating: number;
  fieldDistribution: Array<{
    field: string;
    count: number;
    percentage: number;
  }>;
  ratingDistribution: Array<{
    rating: number;
    count: number;
    percentage: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    mentors: number;
    students: number;
    matches: number;
  }>;
}

// 评分模型相关类型
export interface ProjectScore {
  projectId: string;
  overall: number;
  dimensions: {
    technical: number;      // 技术难度
    innovation: number;     // 创新性
    feasibility: number;    // 可行性
    impact: number;         // 影响力
    learning: number;       // 学习价值
  };
  weights: {
    technical: number;
    innovation: number;
    feasibility: number;
    impact: number;
    learning: number;
  };
  calculatedAt: string;
}

export interface MentorScore {
  mentorId: string;
  overall: number;
  dimensions: {
    expertise: number;      // 专业能力
    teaching: number;       // 教学能力
    support: number;        // 支持程度
    communication: number;  // 沟通能力
    availability: number;   // 可用性
  };
  weights: {
    expertise: number;
    teaching: number;
    support: number;
    communication: number;
    availability: number;
  };
  calculatedAt: string;
}

// 对比功能相关类型
export interface ComparisonItem {
  id: string;
  type: 'project' | 'mentor';
  data: Project | Mentor;
  score?: ProjectScore | MentorScore;
}

export interface Comparison {
  id: string;
  name: string;
  items: ComparisonItem[];
  createdAt: string;
  updatedAt: string;
}

// 用户设置类型
export interface UserSettings {
  scoringWeights: {
    project: {
      technical: number;
      innovation: number;
      feasibility: number;
      impact: number;
      learning: number;
    };
    mentor: {
      expertise: number;
      teaching: number;
      support: number;
      communication: number;
      availability: number;
    };
  };
  displayPreferences: {
    theme: 'light' | 'dark';
    language: 'zh' | 'en';
    itemsPerPage: number;
    defaultSort: string;
  };
  filters: {
    departments: string[];
    researchFields: string[];
    difficulty: string[];
    status: string[];
  };
}

// 数据集根类型
export interface Dataset {
  version: string;
  lastUpdated: string;
  mentors: Mentor[];
  projects: Project[];
  reviews: Review[];
  statistics: Statistics;
  researchFields: string[];
  departments: string[];
  projectCategories: string[];
  skills: string[];
}

// 本地存储相关类型
export interface LocalStorageData {
  comparisons: Comparison[];
  settings: UserSettings;
  favorites: string[];
  history: string[];
  importedData: Dataset[];
}
