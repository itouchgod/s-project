'use client';

import { useState, useEffect } from 'react';
import { Plus, X, BarChart3, Star, Users, BookOpen, Trash2 } from 'lucide-react';
import { Project, Mentor, ProjectScore, MentorScore, Comparison, ComparisonItem } from '@/types/dataset';
import { getProjectsWithScores, getMentorsWithScores } from '@/lib/data-loader';
import { getComparisons, addComparison, updateComparison, deleteComparison } from '@/lib/storage';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">项目导师对比</h1>
          <p className="mt-2 text-gray-600">
            对比不同项目和导师，找到最适合您的选择
          </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, 12).map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {project.title}
                      </h4>
                      <div className={`text-lg font-bold ${getScoreColor(project.score.overall)}`}>
                        {project.score.overall.toFixed(1)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      导师：{project.mentorName}
                    </p>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty === 'beginner' ? '初级' : 
                         project.difficulty === 'intermediate' ? '中级' : '高级'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                        {project.status === 'ongoing' ? '进行中' :
                         project.status === 'completed' ? '已完成' :
                         project.status === 'cancelled' ? '已取消' : '规划中'}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                        {project.category}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToComparison(project, 'project')}
                      disabled={selectedItems.find(i => i.id === `project-${project.id}`) !== undefined}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 inline mr-2" />
                      添加到对比
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 导师列表 */}
            {activeTab === 'mentors' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mentors.slice(0, 12).map((mentor) => (
                  <div
                    key={mentor.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-blue-600">
                          {mentor.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 truncate">
                          {mentor.name}
                        </h4>
                        <p className="text-sm text-gray-600">{mentor.title}</p>
                        <p className="text-sm text-gray-500">{mentor.department}</p>
                      </div>
                      <div className={`text-lg font-bold ${getScoreColor(mentor.score.overall)}`}>
                        {mentor.score.overall.toFixed(1)}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {mentor.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{mentor.studentCount}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{mentor.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        mentor.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {mentor.isAvailable ? '可接收' : '已满员'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleAddToComparison(mentor, 'mentor')}
                      disabled={selectedItems.find(i => i.id === `mentor-${mentor.id}`) !== undefined}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 inline mr-2" />
                      添加到对比
                    </button>
                  </div>
                ))}
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
  );
}
