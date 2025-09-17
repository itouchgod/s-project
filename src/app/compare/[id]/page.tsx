'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import { BarChart3, Star, Users, BookOpen, Trash2, Edit3 } from 'lucide-react';
import { Comparison, ComparisonItem, Project, Mentor } from '@/types/dataset';
import { getComparisons, updateComparison, deleteComparison } from '@/lib/storage';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function ComparisonDetailPage() {
  const params = useParams();
  const comparisonId = params.id as string;
  
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    loadComparison();
  }, [comparisonId]);

  const loadComparison = () => {
    try {
      const comparisons = getComparisons();
      const foundComparison = comparisons.find(c => c.id === comparisonId);
      if (foundComparison) {
        setComparison(foundComparison);
        setEditName(foundComparison.name);
      }
    } catch (error) {
      console.error('加载对比数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveName = () => {
    if (comparison && editName.trim()) {
      const updatedComparison = {
        ...comparison,
        name: editName.trim(),
        updatedAt: new Date().toISOString()
      };
      updateComparison(comparisonId, updatedComparison);
      setComparison(updatedComparison);
      setEditing(false);
    }
  };

  const handleDeleteComparison = () => {
    if (comparison) {
      deleteComparison(comparisonId);
      // 重定向到对比页面
      window.location.href = '/compare';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载对比详情中...</p>
        </div>
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">对比未找到</h3>
          <p className="text-gray-600 mb-4">请检查对比ID是否正确</p>
          <Link
            href="/compare"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            返回对比页面
          </Link>
        </div>
      </div>
    );
  }

  const projects = comparison.items.filter(item => item.type === 'project') as ComparisonItem[];
  const mentors = comparison.items.filter(item => item.type === 'mentor') as ComparisonItem[];

  return (
    <>
      <Head>
        <title>{comparison?.name || '对比详情'} - 大学导师选择分析平台</title>
        <meta name="description" content={`详细对比分析：${comparison?.name || '对比详情'}`} />
        <meta name="keywords" content="对比分析,项目对比,导师对比,详细分析" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">首页</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-gray-700">对比</Link>
          <span>/</span>
          <span className="text-gray-900">{comparison.name}</span>
        </nav>

        {/* 对比标题和操作 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              {editing ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-2xl font-bold text-gray-900 border border-gray-300 rounded-md px-3 py-1"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="text-green-600 hover:text-green-800"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">{comparison.name}</h1>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              )}
              <p className="mt-2 text-gray-600">
                创建于 {new Date(comparison.createdAt).toLocaleDateString()} • 
                更新于 {new Date(comparison.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleDeleteComparison}
                className="text-red-600 hover:text-red-800 p-2"
                title="删除对比"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 项目对比 */}
        {projects.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              项目对比 ({projects.length})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      项目名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      导师
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      类别
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      难度
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      综合评分
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      技术难度
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      创新性
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      可行性
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      影响力
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      学习价值
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((item) => {
                    const project = item.data as Project;
                    const score = item.score;
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {project.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {project.mentorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {project.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(project.difficulty)}`}>
                            {project.difficulty === 'beginner' ? '初级' : 
                             project.difficulty === 'intermediate' ? '中级' : '高级'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                            {project.status === 'ongoing' ? '进行中' :
                             project.status === 'completed' ? '已完成' :
                             project.status === 'cancelled' ? '已取消' : '规划中'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-lg font-bold ${getScoreColor(score?.overall || 0)}`}>
                            {score?.overall.toFixed(1) || '0.0'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'technical' in (score?.dimensions || {}) ? (score?.dimensions as any).technical?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'innovation' in (score?.dimensions || {}) ? (score?.dimensions as any).innovation?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'feasibility' in (score?.dimensions || {}) ? (score?.dimensions as any).feasibility?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'impact' in (score?.dimensions || {}) ? (score?.dimensions as any).impact?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'learning' in (score?.dimensions || {}) ? (score?.dimensions as any).learning?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 导师对比 */}
        {mentors.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              导师对比 ({mentors.length})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      导师姓名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      院系
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      研究方向
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      学生数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      评价数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      可用性
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      综合评分
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      专业能力
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      教学能力
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      支持程度
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      沟通能力
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      可用性
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mentors.map((item) => {
                    const mentor = item.data as Mentor;
                    const score = item.score;
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-bold text-blue-600">
                                {mentor.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {mentor.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {mentor.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {mentor.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {mentor.researchFields.slice(0, 2).map((field, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                              >
                                {field}
                              </span>
                            ))}
                            {mentor.researchFields.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                                +{mentor.researchFields.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {mentor.studentCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {mentor.reviewCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            mentor.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {mentor.isAvailable ? '可接收' : '已满员'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-lg font-bold ${getScoreColor(score?.overall || 0)}`}>
                            {score?.overall.toFixed(1) || '0.0'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'expertise' in (score?.dimensions || {}) ? (score?.dimensions as any).expertise?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'teaching' in (score?.dimensions || {}) ? (score?.dimensions as any).teaching?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'support' in (score?.dimensions || {}) ? (score?.dimensions as any).support?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'communication' in (score?.dimensions || {}) ? (score?.dimensions as any).communication?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'availability' in (score?.dimensions || {}) ? (score?.dimensions as any).availability?.toFixed(1) || '0.0' : '0.0'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {projects.length === 0 && mentors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无对比项目</h3>
            <p className="text-gray-600 mb-4">这个对比列表是空的</p>
            <Link
              href="/compare"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              添加对比项目
            </Link>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
