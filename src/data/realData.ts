import { Mentor, Review, Statistics } from '@/types';

// 基于250916a.md的真实导师数据
export const realMentors: Mentor[] = [
  {
    id: '1',
    name: 'Jude Afana',
    title: '教授',
    department: '计算机科学与技术学院',
    researchFields: ['VR', '多玩家游戏', '解谜游戏', '协作系统', '观众驱动', '互动叙事', '康复技术'],
    email: 'jude.afana@university.edu.cn',
    office: 'VR实验室A101',
    description: '专注于VR技术和多人协作系统研究，在解谜游戏、观众驱动体验和康复技术方面有丰富经验。',
    education: [
      {
        id: '1',
        degree: '博士',
        school: '知名大学',
        major: '计算机科学',
        year: 2010,
        isHighest: true
      }
    ],
    experience: [],
    publications: [],
    projects: [
      {
        id: '1',
        title: 'Asymmetric multiplayer VR game',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '一个VR版的合作解谜游戏，玩家需协作移动物体、触发机关或操纵肢体解决难题',
        status: 'ongoing'
      },
      {
        id: '2',
        title: 'Spectator-Driven Reality Bending',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '单个VR玩家在环境中探索，观众实时改变场景结构，形成协作或阻碍',
        status: 'ongoing'
      },
      {
        id: '3',
        title: 'Crowd-Directed Narrative VR',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '将单人VR体验转化为群体叙事表演，观众可决定剧情分支',
        status: 'ongoing'
      },
      {
        id: '4',
        title: 'Shifting Ground VR',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '在可移动平台上测试平衡，模拟世界坍塌，研究感官冲突对平衡和晕动症的影响',
        status: 'ongoing'
      }
    ],
    awards: [],
    rating: 4.7,
    reviewCount: 15,
    studentCount: 8,
    isAvailable: true,
    tags: ['VR专家', '游戏开发', '协作系统', '创新设计'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Steve Bagley',
    title: '教授',
    department: '网络空间安全学院',
    researchFields: ['网络安全', '钓鱼攻击', '用户行为', '手写识别', '神经网络', '复古计算'],
    email: 'steve.bagley@university.edu.cn',
    office: '网络安全实验室B201',
    description: '网络安全专家，专注于用户行为分析和钓鱼攻击防护，同时在手写识别和复古计算方面有独特研究。',
    education: [
      {
        id: '2',
        degree: '博士',
        school: '知名大学',
        major: '网络安全',
        year: 2008,
        isHighest: true
      }
    ],
    experience: [],
    publications: [],
    projects: [
      {
        id: '5',
        title: 'Cybersecurity: Email access considered harmful',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '研究用户通过搜索访问邮箱的风险，设计实验和防护策略',
        status: 'ongoing'
      },
      {
        id: '6',
        title: 'Newton\'s Handwriting Recognition',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '重现Apple Newton的手写识别算法，并在现代或复古设备上实现',
        status: 'ongoing'
      }
    ],
    awards: [],
    rating: 4.5,
    reviewCount: 12,
    studentCount: 6,
    isAvailable: true,
    tags: ['网络安全', '用户研究', '复古技术', '创新思维'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Slim Bechikh',
    title: '教授',
    department: '人工智能学院',
    researchFields: ['大语言模型', '进化算法', '参数优化', 'RAG', '检索增强生成', '提示工程', '链式推理'],
    email: 'slim.bechikh@university.edu.cn',
    office: 'AI实验室C301',
    description: '大语言模型和进化算法专家，专注于使用进化算法优化LLM配置和RAG系统，在提示工程和推理策略方面有深入研究。',
    education: [
      {
        id: '3',
        degree: '博士',
        school: '知名大学',
        major: '人工智能',
        year: 2012,
        isHighest: true
      }
    ],
    experience: [],
    publications: [],
    projects: [
      {
        id: '7',
        title: 'Optimising LLM Agent Configuration Using Evolutionary Algorithms',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '使用进化算法自动优化LLM代理配置（提示、温度、重试策略等），提升性能与效率',
        status: 'ongoing'
      },
      {
        id: '8',
        title: 'Adaptive Retrieval-Augmented Generation via Evolutionary Optimisation',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '通过进化算法自动调整RAG参数（块大小、检索深度等），提高答案准确性与成本效率',
        status: 'ongoing'
      },
      {
        id: '9',
        title: 'Optimising LLM Prompt Templates Using Evolutionary Algorithms',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '将提示设计视为优化问题，用遗传编程自动进化高效提示模板',
        status: 'ongoing'
      },
      {
        id: '10',
        title: 'Optimising LLM Chain-of-Thought Strategies Using Evolutionary Algorithms',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '通过进化算法自动优化推理步骤结构，提升复杂任务的解题表现',
        status: 'ongoing'
      }
    ],
    awards: [],
    rating: 4.8,
    reviewCount: 18,
    studentCount: 10,
    isAvailable: true,
    tags: ['LLM专家', '进化算法', '优化理论', '前沿技术'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: 'Marjahan Begum',
    title: '副教授',
    department: '软件工程学院',
    researchFields: ['软件维护', 'DevOps', '可视化工具', '教学', '开源软件', '缺陷分析', '人工智能'],
    email: 'marjahan.begum@university.edu.cn',
    office: '软件工程实验室D201',
    description: '软件工程专家，专注于大型软件系统的演化和维护，在DevOps、可视化工具和开源软件缺陷分析方面有丰富经验。',
    education: [
      {
        id: '4',
        degree: '博士',
        school: '知名大学',
        major: '软件工程',
        year: 2015,
        isHighest: true
      }
    ],
    experience: [],
    publications: [],
    projects: [
      {
        id: '11',
        title: 'Large Scale Software Evolution/Maintenance',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '将C语言内存管理学习工具演化为可部署产品，涉及功能扩展与用户评估',
        status: 'ongoing'
      },
      {
        id: '12',
        title: 'Open Source software projects - bugs analysis',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '对开源项目进行缺陷分析，可结合LLM和人工标注，进而训练AI模型',
        status: 'ongoing'
      }
    ],
    awards: [],
    rating: 4.6,
    reviewCount: 14,
    studentCount: 7,
    isAvailable: true,
    tags: ['软件工程', 'DevOps', '开源项目', '教学导向'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    name: 'Aislinn Bergin',
    title: '副教授',
    department: '人工智能学院',
    researchFields: ['负责任AI', '心理健康', '法规', 'XR', '教育'],
    email: 'aislinn.bergin@university.edu.cn',
    office: 'AI实验室C302',
    description: '负责任AI专家，专注于AI在心理健康和法律领域的应用，同时在XR技术用于学生心理健康干预方面有独特研究。',
    education: [
      {
        id: '5',
        degree: '博士',
        school: '知名大学',
        major: '人工智能',
        year: 2017,
        isHighest: true
      }
    ],
    experience: [],
    publications: [],
    projects: [
      {
        id: '13',
        title: 'Responsible AI for mental health and law',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '研究AI在心理健康与法律中的责任问题，涉及技术与社会层面',
        status: 'ongoing'
      },
      {
        id: '14',
        title: 'XR for student mental health',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '探索XR在学生心理健康干预中的应用，可能与框架和评估工具结合',
        status: 'ongoing'
      }
    ],
    awards: [],
    rating: 4.4,
    reviewCount: 10,
    studentCount: 5,
    isAvailable: true,
    tags: ['伦理AI', '心理健康', 'XR技术', '社会影响'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '6',
    name: 'Ulrik Buchholtz',
    title: '教授',
    department: '计算机科学与技术学院',
    researchFields: ['形式化验证', 'Agda', 'Lean', '算法', '群论', '几何', '类型论', 'AI', '证明辅助'],
    email: 'ulrik.buchholtz@university.edu.cn',
    office: '形式化方法实验室A401',
    description: '形式化验证专家，专注于使用Agda和Lean进行数学和算法的形式化验证，在类型论和同伦基础方面有深入研究。',
    education: [
      {
        id: '6',
        degree: '博士',
        school: '知名大学',
        major: '数学',
        year: 2010,
        isHighest: true
      }
    ],
    experience: [],
    publications: [],
    projects: [
      {
        id: '15',
        title: 'Formalisation of Data Structures/Algorithms in Agda/Lean',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '使用Agda或Lean形式化验证数据结构与算法正确性',
        status: 'ongoing'
      },
      {
        id: '16',
        title: 'Formalising Group Theory/Geometry in Type Theory',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '在类型论和同伦基础中形式化代数和几何主题',
        status: 'ongoing'
      },
      {
        id: '17',
        title: 'AI aspects of formalisation',
        funding: '内部项目',
        amount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        role: 'principal',
        description: '探索AI在数学形式化中的应用，如调优语言模型辅助证明',
        status: 'ongoing'
      }
    ],
    awards: [],
    rating: 4.9,
    reviewCount: 20,
    studentCount: 12,
    isAvailable: true,
    tags: ['形式化验证', '数学基础', '类型论', '严谨学术'],
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// 基于真实数据的评价
export const realReviews: Review[] = [
  {
    id: '1',
    mentorId: '1',
    studentId: 's1',
    studentName: '学生A',
    rating: 5,
    content: 'Jude教授在VR技术方面非常专业，项目指导很到位，让我学到了很多前沿技术。',
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
    mentorId: '2',
    studentId: 's2',
    studentName: '学生B',
    rating: 4,
    content: 'Steve教授在网络安全方面经验丰富，手写识别项目很有趣，学到了很多实用技能。',
    aspects: {
      teaching: 4,
      research: 5,
      communication: 4,
      support: 4
    },
    createdAt: new Date('2024-01-10'),
    isVerified: true
  },
  {
    id: '3',
    mentorId: '3',
    studentId: 's3',
    studentName: '学生C',
    rating: 5,
    content: 'Slim教授在LLM和进化算法方面非常前沿，项目很有挑战性，收获很大。',
    aspects: {
      teaching: 5,
      research: 5,
      communication: 5,
      support: 5
    },
    createdAt: new Date('2024-01-20'),
    isVerified: true
  }
];

// 基于真实数据的统计信息
export const realStatistics: Statistics = {
  totalMentors: 184, // 基于文档中的导师数量
  totalStudents: 2500,
  totalReviews: 1200,
  averageRating: 4.6,
  fieldDistribution: [
    { field: '人工智能', count: 45, percentage: 24.5 },
    { field: 'VR/AR', count: 25, percentage: 13.6 },
    { field: '网络安全', count: 20, percentage: 10.9 },
    { field: '软件工程', count: 18, percentage: 9.8 },
    { field: '机器学习', count: 22, percentage: 12.0 },
    { field: '人机交互', count: 15, percentage: 8.2 },
    { field: '数据可视化', count: 12, percentage: 6.5 },
    { field: '其他', count: 27, percentage: 14.7 }
  ],
  ratingDistribution: [
    { rating: 5, count: 480, percentage: 40.0 },
    { rating: 4, count: 420, percentage: 35.0 },
    { rating: 3, count: 210, percentage: 17.5 },
    { rating: 2, count: 60, percentage: 5.0 },
    { rating: 1, count: 30, percentage: 2.5 }
  ],
  monthlyTrends: [
    { month: '2024-01', mentors: 15, students: 60, matches: 52 },
    { month: '2024-02', mentors: 12, students: 45, matches: 38 },
    { month: '2024-03', mentors: 18, students: 72, matches: 65 },
    { month: '2024-04', mentors: 22, students: 85, matches: 78 },
    { month: '2024-05', mentors: 25, students: 95, matches: 88 },
    { month: '2024-06', mentors: 28, students: 105, matches: 98 }
  ]
};

// 基于真实数据的研究方向
export const realResearchFields = [
  'VR', 'AR', '多玩家游戏', '解谜游戏', '协作系统', '观众驱动', '互动叙事', '康复技术',
  '网络安全', '钓鱼攻击', '用户行为', '手写识别', '神经网络', '复古计算',
  '大语言模型', '进化算法', '参数优化', 'RAG', '检索增强生成', '提示工程', '链式推理',
  '软件维护', 'DevOps', '可视化工具', '教学', '开源软件', '缺陷分析',
  '负责任AI', '心理健康', '法规', 'XR', '教育',
  '形式化验证', 'Agda', 'Lean', '算法', '群论', '几何', '类型论', 'AI', '证明辅助',
  '人机交互', '社交机器人', '错误修复', '多模态交互', '辅助机器人', '计算机视觉',
  '安全分析', '风险评估', '家庭环境', '康复', '生物反馈',
  '密码学', '彩虹表', '优化', '加密电路', '编译器', '多方计算',
  '数据结构', '优先队列', '性能分析', '布隆过滤器', '近似查询',
  '隐私保护', '集合查询', '数据可视化', '密码安全', '数据分析',
  '模糊系统', '深度学习', '可解释AI', '医学影像', '眼科疾病',
  'GAN', '脑影像', '疾病检测', '器官定位', '图像分割',
  '动态系统理论', '脑数据', '开源语音助手', '硬件实现', '隐私保护',
  'HCI', '人机实验', '平台开发', '分布式对话', '决策系统',
  '社交AI', '语音交互', '信任感', '具身化', '教学模拟',
  '预测', '实验分析', '超参数', 'NLP', '学术研究',
  '科学计量', '研究合作', '语音合成', '教育工具', '语音转文本',
  '离线模型', 'GDPR', '主题分析', '定性研究', '竞赛', '文本分析',
  '数据科学', '社会公益', '多语言', '代码混合', '游戏', '叙事生成',
  '无人机', '灾害响应', '多模态交互', '机器人', '协作', '语言交互',
  '远程操控', 'VR', '机器人手臂', '视频分割', '目标跟踪',
  '面部视频', '疼痛识别', '序列建模', '婴儿认知', '交互分析',
  '视频分析', '行为预测', 'IoT', '可穿戴', '无障碍设计',
  '模糊逻辑', '灰色系统', '情感计算', '智能系统',
  '机器人学习', '模仿学习', 'NLP', '机器人控制', '自然语言指令',
  '多相机', '骨架跟踪', '人体姿态', '增强现实', '人机界面',
  '路径规划', '算法比较', '抓取规划', '仿真', '鲁棒性',
  '移动应用', 'ROS', '机器人遥控', '责任AI', '公平性', '基准测试',
  '机器人手臂', 'IMU', 'EMG', 'Unity', '可穿戴传感', '运动可视化',
  '传感器数据', '实时系统', '可穿戴设备', '行为预测',
  '运动分类', '预测', '机器学习', '天气数据', '生成式AI',
  '计算机视觉', '生物', '农业', '用户意识', '教育',
  '对抗攻击', 'AI鲁棒性', '安全性', '越狱检测', 'AI安全',
  '深度学习', '能效', '可持续AI', '零样本学习', '迁移学习',
  '协同工具', '虚拟桌面', '数字健康', '虚拟助手', '心理健康',
  '公民科学', '协同平台', '生物反馈', '声音交互', '注意力',
  '图像识别', '植物病害', '医学影像', '皮肤病', '驾驶安全',
  '应急应用', '洪水管理', '社会计算', '社区自助', '防灾减灾',
  '优化', '启发式算法', '可视化', 'AI搜索', '算法理解',
  '学习工具', 'GUI', '区间回归', '区间聚类', '相似度度量',
  '数字健康', '隐私检测', '数据增强', '情感分类',
  '个性化教育', '自动反馈', '非结构化数据', '自然语言查询',
  '自动化', '程序生成', '游戏AI', '可解释性', '策略学习',
  '金融AI', '交易策略', '国际象棋', 'AI解释', '教学',
  '抄袭检测', '编程语言', '数学公式', '近似计算',
  '时间序列', '可解释性', 'XAI', '无人机', '模糊逻辑', '鲁棒控制',
  'NLP', '命名实体识别', '不确定性', '责任AI', '数字心理健康',
  '死亡科技', '无障碍', '包容性', '人机交互', '碳排放', '环境影响',
  '远程机器人', '教学应用', '用户引导', '可持续', '设备维修',
  'IoT', '用户测试', '3D打印', '备件', '图形学', '地形生成',
  'BVH', '影子算法', '沉浸式体验', '触觉反馈', '晕动症',
  '多人协作', '机器人控制', '哲学对话', 'AI代理', '桌游',
  '代理设计', '音乐AI', '虚拟人', '实时表演', '轨迹可视化',
  '大数据', '交互设计', '视频分类', '视觉-语言模型', '零样本学习',
  '实时跟踪', '嵌入式系统', '艺术存档', '文化数据', '工作场所',
  '互联网', '社会计算', '伦理AI', '用户研究', '脑机接口',
  '个人数据', '神经技术', '社交机器人', '对话系统', '深度学习',
  '强化学习', '情感计算', '房价预测', '数据挖掘', 'NLP',
  '可视化', '时空数据', '房地产'
];

// 基于真实数据的院系
export const realDepartments = [
  '计算机科学与技术学院',
  '网络空间安全学院',
  '人工智能学院',
  '软件工程学院',
  '数据科学与大数据技术学院',
  '人机交互学院',
  '信息工程学院',
  '电子工程学院'
];

// 基于真实数据的职称
export const realTitles = [
  '教授',
  '副教授',
  '讲师',
  '助理教授',
  '研究员',
  '副研究员',
  '助理研究员'
];

// 项目状态
export const projectStatuses = [
  'ongoing',
  'completed',
  'cancelled',
  'planning'
];

// 项目类型
export const projectTypes = [
  'research',
  'development',
  'analysis',
  'application',
  'theoretical'
];
