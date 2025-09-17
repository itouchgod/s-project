'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Plus, X, BarChart3, Star, Users, BookOpen, Trash2 } from 'lucide-react';
import { Project, Mentor, ProjectScore, MentorScore, Comparison, ComparisonItem } from '@/types/dataset';
import { getProjectsWithScores, getMentorsWithScores } from '@/lib/data-loader';
import { getComparisons, addComparison, updateComparison, deleteComparison } from '@/lib/storage';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface ProjectWithScore extends Project {
  score: ProjectScore;
}

interface MentorWithScore extends Mentor {
  score: MentorScore;
}

export default function ComparePage() {
  const [projects, setProjects] = useState<ProjectWithScore[]>([]);
  const [mentors, setMentors] = useState<MentorWithScore[]>([]);
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'mentors'>('projects');
  const [selectedItems, setSelectedItems] = useState<ComparisonItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newComparisonName, setNewComparisonName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, mentorsData, comparisonsData] = await Promise.all([
        getProjectsWithScores(),
        getMentorsWithScores(),
        getComparisons()
      ]);
      
      setProjects(projectsData);
      setMentors(mentorsData);
      setComparisons(comparisonsData);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToComparison = (item: ProjectWithScore | MentorWithScore, type: 'project' | 'mentor') => {
    const comparisonItem: ComparisonItem = {
      id: `${type}-${item.id}`,
      type,
      data: item,
      score: item.score
    };

    if (!selectedItems.find(i => i.id === comparisonItem.id)) {
      setSelectedItems([...selectedItems, comparisonItem]);
    }
  };

  const handleRemoveFromComparison = (itemId: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const handleSaveComparison = () => {
    if (selectedItems.length === 0 || !newComparisonName.trim()) return;

    const newComparison: Comparison = {
      id: `comparison-${Date.now()}`,
      name: newComparisonName.trim(),
      items: selectedItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addComparison(newComparison);
    setComparisons([...comparisons, newComparison]);
    setSelectedItems([]);
    setNewComparisonName('');
    setShowAddModal(false);
  };

  const handleDeleteComparison = (comparisonId: string) => {
    deleteComparison(comparisonId);
    setComparisons(comparisons.filter(c => c.id !== comparisonId));
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
          <p className="mt-4 text-gray-600">加载对比数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>智能对比分析 - 大学导师选择分析平台</title>
        <meta name="description" content="快速对比项目和导师，智能推荐最适合您的选择" />
        <meta name="keywords" content="项目对比,导师对比,智能推荐,学术研究" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">智能对比分析</h1>
          <p className="mt-2 text-gray-600">
            快速对比项目和导师，智能推荐最适合您的选择
          </p>
        </div>

        {/* 快速操作区 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">快速开始</h2>
              <p className="text-gray-600">选择您感兴趣的项目或导师进行对比分析</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => setActiveTab('projects')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                选择项目
              </button>
              <button
                onClick={() => setActiveTab('mentors')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                选择导师
              </button>
            </div>
          </div>
        </div>

        {/* 标签页 */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="h-5 w-5 inline mr-2" />
                项目对比
              </button>
              <button
                onClick={() => setActiveTab('mentors')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'mentors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="h-5 w-5 inline mr-2" />
                导师对比
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* 已选择的项目 */}
            {selectedItems.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  已选择的{activeTab === 'projects' ? '项目' : '导师'} ({selectedItems.length})
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                    >
                      <span className="text-sm font-medium text-blue-900">
                        {item.type === 'project' ? (item.data as Project).title : (item.data as Mentor).name}
                      </span>
                      <button
                        onClick={() => handleRemoveFromComparison(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    保存对比
                  </button>
                  <button
                    onClick={() => setSelectedItems([])}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                  >
                    清空选择
                  </button>
                </div>
              </div>
            )}

            {/* 项目列表 */}
            {activeTab === 'projects' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          项目信息
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          导师
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          评分
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          难度
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          类别
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects.slice(0, 20).map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="max-w-xs">
                              <div className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                                {project.title}
                              </div>
                              <div className="text-xs text-gray-500 line-clamp-2">
                                {project.description}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {project.mentorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-lg font-bold ${getScoreColor(project.score.overall)}`}>
                              {project.score.overall.toFixed(1)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(project.difficulty)}`}>
                              {project.difficulty === 'beginner' ? '初级' : 
                               project.difficulty === 'intermediate' ? '中级' : '高级'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                              {project.status === 'ongoing' ? '进行中' :
                               project.status === 'completed' ? '已完成' :
                               project.status === 'cancelled' ? '已取消' : '规划中'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                              {project.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleAddToComparison(project, 'project')}
                              disabled={selectedItems.find(i => i.id === `project-${project.id}`) !== undefined}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {selectedItems.find(i => i.id === `project-${project.id}`) ? '已选择' : '选择'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 导师列表 */}
            {activeTab === 'mentors' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          导师信息
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
                          评分
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          可用性
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mentors.slice(0, 20).map((mentor) => (
                        <tr key={mentor.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                <span className="text-sm font-bold text-blue-600">
                                  {mentor.name.charAt(0)}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {mentor.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {mentor.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {mentor.department}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
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
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{mentor.studentCount}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-lg font-bold ${getScoreColor(mentor.score.overall)}`}>
                              {mentor.score.overall.toFixed(1)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              mentor.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {mentor.isAvailable ? '可接收' : '已满员'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleAddToComparison(mentor, 'mentor')}
                              disabled={selectedItems.find(i => i.id === `mentor-${mentor.id}`) !== undefined}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {selectedItems.find(i => i.id === `mentor-${mentor.id}`) ? '已选择' : '选择'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 保存的对比列表 */}
        {comparisons.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">保存的对比</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisons.map((comparison) => (
                <div
                  key={comparison.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {comparison.name}
                    </h4>
                    <button
                      onClick={() => handleDeleteComparison(comparison.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {comparison.items.length} 个项目/导师
                  </p>
                  
                  <p className="text-xs text-gray-500 mb-4">
                    创建于 {new Date(comparison.createdAt).toLocaleDateString()}
                  </p>
                  
                  <Link
                    href={`/compare/${comparison.id}`}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 text-center block"
                  >
                    查看对比
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 添加对比模态框 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  保存对比
                </h3>
                <input
                  type="text"
                  value={newComparisonName}
                  onChange={(e) => setNewComparisonName(e.target.value)}
                  placeholder="输入对比名称"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveComparison}
                    disabled={!newComparisonName.trim() || selectedItems.length === 0}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
