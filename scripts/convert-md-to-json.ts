// 从 250916a.md 转换为 dataset.json 的脚本
// 运行方式: npx tsx scripts/convert-md-to-json.ts

import * as fs from 'fs';
import * as path from 'path';
import { Dataset, Project, Mentor } from '../src/types/dataset';

interface MDProject {
  id: number;
  mentor: string;
  projectName: string;
  keywords: string;
  description: string;
  note: string;
}

// 解析 MD 文件
function parseMDFile(filePath: string): MDProject[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const projects: MDProject[] = [];
  
  for (const line of lines) {
    if (line.startsWith('|') && !line.includes('---') && !line.includes('序号')) {
      const parts = line.split('|').map(part => part.trim()).filter(part => part);
      
      if (parts.length >= 6) {
        const id = parseInt(parts[0]);
        const mentor = parts[1];
        const projectName = parts[2];
        const keywords = parts[3];
        const description = parts[4];
        const note = parts[5];
        
        // 跳过无项目的导师
        if (projectName !== '无' && !note.includes('无项目') && !note.includes('无空位')) {
          projects.push({
            id,
            mentor,
            projectName,
            keywords,
            description,
            note
          });
        }
      }
    }
  }
  
  return projects;
}

// 生成项目数据
function generateProjects(mdProjects: MDProject[]): Project[] {
  return mdProjects.map((mdProject, index) => {
    const keywords = mdProject.keywords.split('、').map(k => k.trim()).filter(k => k);
    
    // 根据关键词推断难度
    const difficulty = keywords.some(k => 
      ['AI', '机器学习', '深度学习', '量子', '区块链'].includes(k)
    ) ? 'advanced' : 
    keywords.some(k => 
      ['VR', 'AR', '网络安全', '数据分析'].includes(k)
    ) ? 'intermediate' : 'beginner';
    
    // 根据关键词推断类别
    const category = keywords.some(k => ['VR', 'AR'].includes(k)) ? 'VR/AR' :
                    keywords.some(k => ['AI', '机器学习', '深度学习'].includes(k)) ? '人工智能' :
                    keywords.some(k => ['网络安全', '密码学'].includes(k)) ? '网络安全' :
                    keywords.some(k => ['人机交互', 'HCI'].includes(k)) ? '人机交互' :
                    keywords.some(k => ['数据可视化', '可视化'].includes(k)) ? '数据可视化' :
                    '其他';
    
    return {
      id: `project-${index + 1}`,
      title: mdProject.projectName,
      mentorId: `mentor-${mdProject.mentor.toLowerCase().replace(/\s+/g, '-')}`,
      mentorName: mdProject.mentor,
      keywords,
      description: mdProject.description,
      status: 'ongoing' as const,
      category,
      difficulty,
      estimatedDuration: Math.floor(Math.random() * 12) + 6, // 6-18个月
      requirements: generateRequirements(keywords),
      deliverables: generateDeliverables(keywords),
      skills: generateSkills(keywords),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}

// 生成导师数据
function generateMentors(projects: Project[]): Mentor[] {
  const mentorMap = new Map<string, Project[]>();
  
  // 按导师分组项目
  projects.forEach(project => {
    if (!mentorMap.has(project.mentorName)) {
      mentorMap.set(project.mentorName, []);
    }
    mentorMap.get(project.mentorName)!.push(project);
  });
  
  return Array.from(mentorMap.entries()).map(([name, mentorProjects], index) => {
    const researchFields = Array.from(new Set(
      mentorProjects.flatMap(p => p.keywords)
    ));
    
    return {
      id: `mentor-${index + 1}`,
      name,
      title: '教授',
      department: generateDepartment(researchFields),
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@university.edu.cn`,
      office: `${generateDepartment(researchFields)}实验室${String.fromCharCode(65 + index)}${index + 1}01`,
      researchFields,
      description: generateMentorDescription(name, researchFields),
      education: [{
        id: `edu-${index + 1}`,
        degree: '博士',
        school: '知名大学',
        major: generateMajor(researchFields),
        year: 2010 + Math.floor(Math.random() * 10),
        isHighest: true
      }],
      experience: [],
      publications: [],
      awards: [],
      rating: 4.0 + Math.random() * 1.0,
      reviewCount: Math.floor(Math.random() * 20) + 5,
      studentCount: Math.floor(Math.random() * 15) + 3,
      isAvailable: Math.random() > 0.2,
      tags: generateTags(researchFields),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}

// 辅助函数
function generateRequirements(keywords: string[]): string[] {
  const baseRequirements = ['编程基础', '英语阅读能力'];
  
  if (keywords.some(k => ['AI', '机器学习'].includes(k))) {
    baseRequirements.push('数学基础', 'Python编程');
  }
  if (keywords.some(k => ['VR', 'AR'].includes(k))) {
    baseRequirements.push('3D建模', 'Unity/Unreal Engine');
  }
  if (keywords.some(k => ['网络安全'].includes(k))) {
    baseRequirements.push('网络基础', 'Linux系统');
  }
  
  return baseRequirements;
}

function generateDeliverables(keywords: string[]): string[] {
  const deliverables = ['项目报告', '演示文稿'];
  
  if (keywords.some(k => ['AI', '机器学习'].includes(k))) {
    deliverables.push('模型代码', '数据集');
  }
  if (keywords.some(k => ['VR', 'AR'].includes(k))) {
    deliverables.push('VR/AR应用', '用户测试报告');
  }
  if (keywords.some(k => ['可视化'].includes(k))) {
    deliverables.push('可视化工具', '交互演示');
  }
  
  return deliverables;
}

function generateSkills(keywords: string[]): string[] {
  const skills = ['问题解决', '团队协作'];
  
  if (keywords.some(k => ['AI', '机器学习'].includes(k))) {
    skills.push('Python', 'TensorFlow', 'PyTorch');
  }
  if (keywords.some(k => ['VR', 'AR'].includes(k))) {
    skills.push('Unity', 'C#', '3D建模');
  }
  if (keywords.some(k => ['网络安全'].includes(k))) {
    skills.push('渗透测试', '安全分析');
  }
  if (keywords.some(k => ['数据可视化'].includes(k))) {
    skills.push('D3.js', 'React', '数据可视化');
  }
  
  return skills;
}

function generateDepartment(researchFields: string[]): string {
  if (researchFields.some(f => ['AI', '机器学习', '深度学习'].includes(f))) {
    return '人工智能学院';
  }
  if (researchFields.some(f => ['VR', 'AR'].includes(f))) {
    return '计算机科学与技术学院';
  }
  if (researchFields.some(f => ['网络安全', '密码学'].includes(f))) {
    return '网络空间安全学院';
  }
  if (researchFields.some(f => ['人机交互', 'HCI'].includes(f))) {
    return '人机交互学院';
  }
  return '软件工程学院';
}

function generateMajor(researchFields: string[]): string {
  if (researchFields.some(f => ['AI', '机器学习'].includes(f))) {
    return '人工智能';
  }
  if (researchFields.some(f => ['VR', 'AR'].includes(f))) {
    return '计算机科学';
  }
  if (researchFields.some(f => ['网络安全'].includes(f))) {
    return '网络安全';
  }
  return '软件工程';
}

function generateMentorDescription(name: string, researchFields: string[]): string {
  const fieldText = researchFields.slice(0, 3).join('、');
  return `${name}教授专注于${fieldText}等领域的研究，在相关技术方面有丰富经验，致力于培养优秀的研究生。`;
}

function generateTags(researchFields: string[]): string[] {
  const tags = [];
  
  if (researchFields.some(f => ['AI', '机器学习'].includes(f))) {
    tags.push('AI专家', '前沿技术');
  }
  if (researchFields.some(f => ['VR', 'AR'].includes(f))) {
    tags.push('VR专家', '创新设计');
  }
  if (researchFields.some(f => ['网络安全'].includes(f))) {
    tags.push('安全专家', '实用技能');
  }
  
  return tags;
}

// 生成完整数据集
function generateDataset(projects: Project[], mentors: Mentor[]): Dataset {
  const researchFields = Array.from(new Set(
    projects.flatMap(p => p.keywords)
  ));
  
  const departments = Array.from(new Set(
    mentors.map(m => m.department)
  ));
  
  const projectCategories = Array.from(new Set(
    projects.map(p => p.category)
  ));
  
  const skills = Array.from(new Set(
    projects.flatMap(p => p.skills)
  ));
  
  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    mentors,
    projects,
    reviews: [],
    statistics: {
      totalMentors: mentors.length,
      totalStudents: mentors.reduce((sum, m) => sum + m.studentCount, 0),
      totalReviews: mentors.reduce((sum, m) => sum + m.reviewCount, 0),
      averageRating: mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length,
      fieldDistribution: researchFields.map(field => ({
        field,
        count: projects.filter(p => p.keywords.includes(field)).length,
        percentage: 0
      })),
      ratingDistribution: [],
      monthlyTrends: []
    },
    researchFields,
    departments,
    projectCategories,
    skills,
  };
}

// 主函数
function main() {
  try {
    console.log('开始转换 MD 文件...');
    
    const mdPath = path.join(__dirname, '../250916a.md');
    const outputPath = path.join(__dirname, '../public/dataset.json');
    
    // 解析 MD 文件
    const mdProjects = parseMDFile(mdPath);
    console.log(`解析到 ${mdProjects.length} 个项目`);
    
    // 生成项目数据
    const projects = generateProjects(mdProjects);
    console.log(`生成 ${projects.length} 个项目数据`);
    
    // 生成导师数据
    const mentors = generateMentors(projects);
    console.log(`生成 ${mentors.length} 个导师数据`);
    
    // 生成完整数据集
    const dataset = generateDataset(projects, mentors);
    
    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 写入 JSON 文件
    fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2), 'utf-8');
    
    console.log(`✅ 转换完成！`);
    console.log(`📁 输出文件: ${outputPath}`);
    console.log(`📊 统计信息:`);
    console.log(`   - 导师数量: ${dataset.mentors.length}`);
    console.log(`   - 项目数量: ${dataset.projects.length}`);
    console.log(`   - 研究方向: ${dataset.researchFields.length}`);
    console.log(`   - 院系数量: ${dataset.departments.length}`);
    
  } catch (error) {
    console.error('❌ 转换失败:', error);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}
