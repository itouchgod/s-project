// 导师信息类型定义
export interface Mentor {
  id: string;
  name: string;
  title: string; // 职称：教授、副教授、讲师等
  department: string; // 院系
  researchFields: string[]; // 研究方向
  email: string;
  phone?: string;
  office: string; // 办公室
  avatar?: string; // 头像URL
  description: string; // 个人简介
  education: Education[]; // 教育背景
  experience: Experience[]; // 工作经历
  publications: Publication[]; // 发表论文
  projects: Project[]; // 研究项目
  awards: Award[]; // 获奖情况
  rating: number; // 评分
  reviewCount: number; // 评价数量
  studentCount: number; // 指导学生数量
  isAvailable: boolean; // 是否可接受新学生
  tags: string[]; // 标签
  createdAt: Date;
  updatedAt: Date;
}

// 教育背景
export interface Education {
  id: string;
  degree: string; // 学位
  school: string; // 学校
  major: string; // 专业
  year: number; // 毕业年份
  isHighest: boolean; // 是否为最高学历
}

// 工作经历
export interface Experience {
  id: string;
  position: string; // 职位
  organization: string; // 机构
  startDate: Date;
  endDate?: Date; // 如果为空表示至今
  description?: string;
}

// 发表论文
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string; // 期刊名称
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  impactFactor?: number; // 影响因子
  citationCount?: number; // 引用次数
  type: 'journal' | 'conference' | 'book' | 'patent'; // 类型
}

// 研究项目
export interface Project {
  id: string;
  title: string;
  funding: string; // 资助机构
  amount: number; // 资助金额
  startDate: Date;
  endDate: Date;
  role: 'principal' | 'co-principal' | 'participant'; // 角色
  description: string;
  status: 'ongoing' | 'completed' | 'cancelled'; // 状态
}

// 获奖情况
export interface Award {
  id: string;
  title: string;
  organization: string; // 颁奖机构
  year: number;
  level: 'international' | 'national' | 'provincial' | 'university'; // 级别
  description?: string;
}

// 学生评价
export interface Review {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string; // 匿名显示
  rating: number; // 1-5星
  content: string;
  aspects: {
    teaching: number; // 教学能力
    research: number; // 研究指导
    communication: number; // 沟通能力
    support: number; // 支持程度
  };
  createdAt: Date;
  isVerified: boolean; // 是否已验证
}

// 学生偏好设置
export interface StudentPreference {
  id: string;
  studentId: string;
  researchFields: string[]; // 感兴趣的研究方向
  mentorLevel: string[]; // 期望导师级别
  teachingStyle: string[]; // 期望教学风格
  communicationStyle: string[]; // 期望沟通方式
  workIntensity: 'low' | 'medium' | 'high'; // 工作强度偏好
  location: string[]; // 地理位置偏好
  otherRequirements: string; // 其他要求
  createdAt: Date;
  updatedAt: Date;
}

// 匹配结果
export interface MatchResult {
  mentorId: string;
  mentor: Mentor;
  score: number; // 匹配分数 0-100
  reasons: string[]; // 匹配原因
  compatibility: {
    researchField: number; // 研究方向匹配度
    teachingStyle: number; // 教学风格匹配度
    communication: number; // 沟通方式匹配度
    workIntensity: number; // 工作强度匹配度
  };
}

// 搜索筛选条件
export interface SearchFilters {
  keyword?: string; // 关键词搜索
  researchFields?: string[]; // 研究方向
  departments?: string[]; // 院系
  titles?: string[]; // 职称
  rating?: {
    min: number;
    max: number;
  }; // 评分范围
  isAvailable?: boolean; // 是否可接受新学生
  hasProjects?: boolean; // 是否有在研项目
  sortBy?: 'rating' | 'reviewCount' | 'studentCount' | 'name'; // 排序方式
  sortOrder?: 'asc' | 'desc'; // 排序顺序
}

// 统计数据
export interface Statistics {
  totalMentors: number;
  totalStudents: number;
  totalReviews: number;
  averageRating: number;
  fieldDistribution: {
    field: string;
    count: number;
    percentage: number;
  }[];
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  monthlyTrends: {
    month: string;
    mentors: number;
    students: number;
    matches: number;
  }[];
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分页信息
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 分页响应
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}
