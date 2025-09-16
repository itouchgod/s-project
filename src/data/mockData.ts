import { Mentor, Review, Statistics } from '@/types';

// 模拟导师数据
export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: '张教授',
    title: '教授',
    department: '计算机科学与技术学院',
    researchFields: ['人工智能', '机器学习', '深度学习'],
    email: 'zhang@university.edu.cn',
    phone: '138-0000-0001',
    office: '计算机楼A301',
    avatar: '/avatars/zhang.jpg',
    description: '专注于人工智能和机器学习研究，在深度学习、计算机视觉等领域有丰富经验。发表SCI论文50+篇，主持国家自然科学基金项目3项。',
    education: [
      {
        id: '1',
        degree: '博士',
        school: '清华大学',
        major: '计算机科学与技术',
        year: 2010,
        isHighest: true
      }
    ],
    experience: [
      {
        id: '1',
        position: '教授',
        organization: '某大学',
        startDate: new Date('2015-09-01'),
        description: '计算机科学与技术学院教授'
      }
    ],
    publications: [
      {
        id: '1',
        title: 'Deep Learning for Computer Vision: A Comprehensive Survey',
        authors: ['张教授', '李研究员'],
        journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
        year: 2023,
        impactFactor: 24.3,
        citationCount: 150,
        type: 'journal'
      }
    ],
    projects: [
      {
        id: '1',
        title: '基于深度学习的智能图像识别系统',
        funding: '国家自然科学基金',
        amount: 800000,
        startDate: new Date('2022-01-01'),
        endDate: new Date('2025-12-31'),
        role: 'principal',
        description: '研究基于深度学习的图像识别算法',
        status: 'ongoing'
      }
    ],
    awards: [
      {
        id: '1',
        title: '国家科技进步二等奖',
        organization: '中华人民共和国国务院',
        year: 2022,
        level: 'national',
        description: '在人工智能领域的重要贡献'
      }
    ],
    rating: 4.8,
    reviewCount: 25,
    studentCount: 12,
    isAvailable: true,
    tags: ['耐心指导', '学术严谨', '项目丰富', '国际化视野'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: '李教授',
    title: '教授',
    department: '软件工程学院',
    researchFields: ['软件工程', '系统架构', '云计算'],
    email: 'li@university.edu.cn',
    phone: '138-0000-0002',
    office: '软件楼B205',
    description: '软件工程领域专家，在大型系统架构设计和云计算平台开发方面有丰富经验。指导学生获得多项国际竞赛奖项。',
    education: [
      {
        id: '2',
        degree: '博士',
        school: '北京大学',
        major: '软件工程',
        year: 2008,
        isHighest: true
      }
    ],
    experience: [
      {
        id: '2',
        position: '教授',
        organization: '某大学',
        startDate: new Date('2013-09-01'),
        description: '软件工程学院教授'
      }
    ],
    publications: [],
    projects: [],
    awards: [],
    rating: 4.6,
    reviewCount: 18,
    studentCount: 8,
    isAvailable: true,
    tags: ['项目导向', '实践能力强', '团队合作', '创新思维'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: '王副教授',
    title: '副教授',
    department: '数据科学与大数据技术学院',
    researchFields: ['数据挖掘', '大数据分析', '数据可视化'],
    email: 'wang@university.edu.cn',
    phone: '138-0000-0003',
    office: '数据楼C108',
    description: '数据科学领域专家，专注于大数据分析和数据挖掘技术研究。在数据可视化方面有独特见解。',
    education: [
      {
        id: '3',
        degree: '博士',
        school: '中科院',
        major: '数据科学',
        year: 2015,
        isHighest: true
      }
    ],
    experience: [
      {
        id: '3',
        position: '副教授',
        organization: '某大学',
        startDate: new Date('2018-09-01'),
        description: '数据科学与大数据技术学院副教授'
      }
    ],
    publications: [],
    projects: [],
    awards: [],
    rating: 4.7,
    reviewCount: 22,
    studentCount: 10,
    isAvailable: true,
    tags: ['数据分析', '可视化', '统计学', '编程能力强'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: '陈教授',
    title: '教授',
    department: '网络空间安全学院',
    researchFields: ['网络安全', '密码学', '区块链'],
    email: 'chen@university.edu.cn',
    phone: '138-0000-0004',
    office: '网络楼D201',
    description: '网络安全领域权威专家，在密码学和区块链技术方面有深入研究。多次获得国际安全会议最佳论文奖。',
    education: [
      {
        id: '4',
        degree: '博士',
        school: '中科院',
        major: '密码学',
        year: 2012,
        isHighest: true
      }
    ],
    experience: [
      {
        id: '4',
        position: '教授',
        organization: '某大学',
        startDate: new Date('2016-09-01'),
        description: '网络空间安全学院教授'
      }
    ],
    publications: [],
    projects: [],
    awards: [],
    rating: 4.9,
    reviewCount: 30,
    studentCount: 15,
    isAvailable: false,
    tags: ['安全专家', '密码学', '区块链', '国际视野'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    name: '刘副教授',
    title: '副教授',
    department: '人工智能学院',
    researchFields: ['自然语言处理', '知识图谱', '推荐系统'],
    email: 'liu@university.edu.cn',
    phone: '138-0000-0005',
    office: 'AI楼E305',
    description: '自然语言处理专家，在知识图谱构建和推荐系统设计方面有丰富经验。与多家知名企业有合作项目。',
    education: [
      {
        id: '5',
        degree: '博士',
        school: '复旦大学',
        major: '自然语言处理',
        year: 2017,
        isHighest: true
      }
    ],
    experience: [
      {
        id: '5',
        position: '副教授',
        organization: '某大学',
        startDate: new Date('2020-09-01'),
        description: '人工智能学院副教授'
      }
    ],
    publications: [],
    projects: [],
    awards: [],
    rating: 4.5,
    reviewCount: 16,
    studentCount: 6,
    isAvailable: true,
    tags: ['NLP专家', '知识图谱', '推荐系统', '产业合作'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '6',
    name: '赵教授',
    title: '教授',
    department: '计算机科学与技术学院',
    researchFields: ['计算机图形学', '虚拟现实', '人机交互'],
    email: 'zhao@university.edu.cn',
    phone: '138-0000-0006',
    office: '计算机楼A405',
    description: '计算机图形学领域专家，在虚拟现实和人机交互技术方面有深入研究。多次获得国际图形学会议奖项。',
    education: [
      {
        id: '6',
        degree: '博士',
        school: '浙江大学',
        major: '计算机图形学',
        year: 2009,
        isHighest: true
      }
    ],
    experience: [
      {
        id: '6',
        position: '教授',
        organization: '某大学',
        startDate: new Date('2014-09-01'),
        description: '计算机科学与技术学院教授'
      }
    ],
    publications: [],
    projects: [],
    awards: [],
    rating: 4.6,
    reviewCount: 20,
    studentCount: 9,
    isAvailable: true,
    tags: ['图形学', 'VR/AR', '人机交互', '创新设计'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// 模拟评价数据
export const mockReviews: Review[] = [
  {
    id: '1',
    mentorId: '1',
    studentId: 's1',
    studentName: '学生A',
    rating: 5,
    content: '张教授非常耐心，在机器学习方面给了我很多指导，项目经验丰富，推荐！',
    aspects: {
      teaching: 5,
      research: 5,
      communication: 4,
      support: 5
    },
    createdAt: new Date('2024-01-15'),
    isVerified: true
  },
  {
    id: '2',
    mentorId: '1',
    studentId: 's2',
    studentName: '学生B',
    rating: 4,
    content: '导师学术水平很高，但有时候比较严格，适合有明确研究方向的同学。',
    aspects: {
      teaching: 4,
      research: 5,
      communication: 3,
      support: 4
    },
    createdAt: new Date('2024-01-10'),
    isVerified: true
  },
  {
    id: '3',
    mentorId: '2',
    studentId: 's3',
    studentName: '学生C',
    rating: 5,
    content: '李教授在软件工程方面经验丰富，项目指导很到位，学到了很多实用技能。',
    aspects: {
      teaching: 5,
      research: 4,
      communication: 5,
      support: 5
    },
    createdAt: new Date('2024-01-20'),
    isVerified: true
  }
];

// 模拟统计数据
export const mockStatistics: Statistics = {
  totalMentors: 156,
  totalStudents: 2340,
  totalReviews: 892,
  averageRating: 4.6,
  fieldDistribution: [
    { field: '人工智能', count: 35, percentage: 22.4 },
    { field: '软件工程', count: 28, percentage: 17.9 },
    { field: '数据科学', count: 25, percentage: 16.0 },
    { field: '网络安全', count: 22, percentage: 14.1 },
    { field: '计算机图形学', count: 18, percentage: 11.5 },
    { field: '其他', count: 28, percentage: 17.9 }
  ],
  ratingDistribution: [
    { rating: 5, count: 356, percentage: 39.9 },
    { rating: 4, count: 312, percentage: 35.0 },
    { rating: 3, count: 156, percentage: 17.5 },
    { rating: 2, count: 45, percentage: 5.0 },
    { rating: 1, count: 23, percentage: 2.6 }
  ],
  monthlyTrends: [
    { month: '2024-01', mentors: 12, students: 45, matches: 38 },
    { month: '2024-02', mentors: 8, students: 32, matches: 28 },
    { month: '2024-03', mentors: 15, students: 58, matches: 52 },
    { month: '2024-04', mentors: 18, students: 67, matches: 61 },
    { month: '2024-05', mentors: 22, students: 78, matches: 72 },
    { month: '2024-06', mentors: 25, students: 89, matches: 83 }
  ]
};

// 研究方向选项
export const researchFields = [
  '人工智能',
  '机器学习',
  '深度学习',
  '计算机视觉',
  '自然语言处理',
  '软件工程',
  '系统架构',
  '云计算',
  '数据挖掘',
  '大数据分析',
  '数据可视化',
  '网络安全',
  '密码学',
  '区块链',
  '计算机图形学',
  '虚拟现实',
  '人机交互',
  '推荐系统',
  '知识图谱',
  '移动开发',
  'Web开发',
  '数据库',
  '算法设计',
  '分布式系统'
];

// 院系列表
export const departments = [
  '计算机科学与技术学院',
  '软件工程学院',
  '数据科学与大数据技术学院',
  '网络空间安全学院',
  '人工智能学院',
  '信息工程学院',
  '电子工程学院',
  '通信工程学院'
];

// 职称列表
export const titles = [
  '教授',
  '副教授',
  '讲师',
  '助理教授',
  '研究员',
  '副研究员',
  '助理研究员'
];
