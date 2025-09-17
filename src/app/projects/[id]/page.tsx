'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { Project, Mentor, ProjectScore, MentorScore } from '@/types/dataset';
import { getProjectsWithScores, getMentorsWithScores } from '@/lib/data-loader';
import { addToHistory, addToFavorites, isFavorite, removeFromFavorites } from '@/lib/storage';
import Link from 'next/link';

interface ProjectWithScore extends Project {
  score: ProjectScore;
}

interface MentorWithScore extends Mentor {
  score: MentorScore;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<ProjectWithScore | null>(null);
  const [mentor, setMentor] = useState<MentorWithScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    loadProjectData();
  }, [projectId]);

  useEffect(() => {
    if (project) {
      setFavorite(isFavorite(project.id));
      addToHistory(project.id);
    }
  }, [project]);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      const [projects, mentors] = await Promise.all([
        getProjectsWithScores(),
        getMentorsWithScores()
      ]);
      
      const foundProject = projects.find(p => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
        const foundMentor = mentors.find(m => m.id === foundProject.mentorId);
        if (foundMentor) {
          setMentor(foundMentor);
        }
      }
    } catch (error) {
      console.error('加载项目数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (project) {
      if (favorite) {
        removeFromFavorites(project.id);
      } else {
        addToFavorites(project.id);
      }
      setFavorite(!favorite);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载项目详情中...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">项目未找到</h3>
          <p className="text-gray-600 mb-4">请检查项目ID是否正确</p>
          <Link
            href="/projects"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            返回项目列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project?.title || '项目详情'} - 大学导师选择分析平台</title>
        <meta name="description" content={`${project?.title || '项目详情'}的详细信息，包括项目描述、要求、导师信息等`} />
        <meta name="keywords" content={`${project?.title || '项目'},项目详情,${project?.category || ''},${mentor?.name || ''}`} />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">首页</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-gray-700">项目列表</Link>
          <span>/</span>
          <span className="text-gray-900">{project.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2">
            {/* 项目标题和操作 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty === 'beginner' ? '初级' : 
                       project.difficulty === 'intermediate' ? '中级' : '高级'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                      {project.status === 'ongoing' ? '进行中' :
                       project.status === 'completed' ? '已完成' :
                       project.status === 'cancelled' ? '已取消' : '规划中'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-3xl font-bold ${getScoreColor(project.score.overall)}`}>
                    {project.score.overall.toFixed(1)}
                  </div>
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-2 rounded-full ${
                      favorite 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {favorite ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>

              {/* 项目描述 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">项目描述</h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* 关键词 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">关键词</h3>
                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* 项目要求 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">项目要求</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {project.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              {/* 预期成果 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">预期成果</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {project.deliverables.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                  ))}
                </ul>
              </div>

              {/* 所需技能 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">所需技能</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 评分详情 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">评分详情</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(project.score.dimensions).map(([dimension, score]) => (
                  <div key={dimension} className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {dimension === 'technical' ? '技术难度' :
                       dimension === 'innovation' ? '创新性' :
                       dimension === 'feasibility' ? '可行性' :
                       dimension === 'impact' ? '影响力' :
                       dimension === 'learning' ? '学习价值' : dimension}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`font-semibold ${getScoreColor(score)}`}>
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 导师信息 */}
            {mentor && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">导师信息</h3>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      {mentor.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{mentor.name}</h4>
                  <p className="text-gray-600">{mentor.title}</p>
                  <p className="text-sm text-gray-500">{mentor.department}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">评分</span>
                    <span className={`font-semibold ${getScoreColor(mentor.score.overall)}`}>
                      {mentor.score.overall.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">学生数</span>
                    <span className="font-semibold">{mentor.studentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">评价数</span>
                    <span className="font-semibold">{mentor.reviewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">状态</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mentor.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {mentor.isAvailable ? '可接收' : '已满员'}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/mentors/${mentor.id}`}
                  className="mt-4 w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 block"
                >
                  查看导师详情
                </Link>
              </div>
            )}

            {/* 项目统计 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">项目统计</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">预计时长</span>
                  <span className="font-semibold">{project.estimatedDuration} 个月</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">创建时间</span>
                  <span className="font-semibold">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">更新时间</span>
                  <span className="font-semibold">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">操作</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  申请项目
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200">
                  添加到对比
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200">
                  分享项目
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
