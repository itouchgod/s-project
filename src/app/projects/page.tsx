'use client';

import { useState, useEffect } from 'react';
import { Project, ProjectScore } from '@/types/dataset';
import { getProjectsWithScores, searchProjects, filterProjects } from '@/lib/data-loader';
import { sortByScore, filterByScoreRange } from '@/lib/scoring';
import { addToHistory } from '@/lib/storage';
import Link from 'next/link';

interface ProjectWithScore extends Project {
  score: ProjectScore;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithScore[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    difficulty: [] as string[],
    status: [] as string[],
    minScore: 0,
    maxScore: 5,
  });
  const [sortBy, setSortBy] = useState<'rating-desc' | 'rating-asc' | 'name-asc' | 'name-desc'>('rating-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 加载数据
  useEffect(() => {
    loadData();
  }, []);

  // 应用搜索和筛选
  useEffect(() => {
    applyFilters();
  }, [projects, searchQuery, filters, sortBy]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getProjectsWithScores();
      setProjects(data);
    } catch (error) {
      console.error('加载项目数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    let filtered = [...projects];

    // 搜索过滤
    if (searchQuery.trim()) {
      const searchResults = await searchProjects(searchQuery);
      const searchIds = new Set(searchResults.map(p => p.id));
      filtered = filtered.filter(p => searchIds.has(p.id));
    }

    // 类别过滤
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }

    // 难度过滤
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(p => filters.difficulty.includes(p.difficulty));
    }

    // 状态过滤
    if (filters.status.length > 0) {
      filtered = filtered.filter(p => filters.status.includes(p.status));
    }

    // 评分过滤
    filtered = filterByScoreRange(filtered, filters.minScore, filters.maxScore);

    // 排序
    if (sortBy.startsWith('rating')) {
      filtered = sortByScore(filtered, sortBy === 'rating-desc' ? 'desc' : 'asc');
    } else if (sortBy.startsWith('name')) {
      filtered.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return sortBy === 'name-desc' ? -comparison : comparison;
      });
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const handleProjectClick = (projectId: string) => {
    addToHistory(projectId);
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

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载项目数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">项目列表</h1>
          <p className="mt-2 text-gray-600">
            发现 {filteredProjects.length} 个研究项目，找到适合您的项目
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* 搜索框 */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                搜索项目
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索项目名称、描述、关键词或导师..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 排序 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                排序方式
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating-desc">评分：高到低</option>
                <option value="rating-asc">评分：低到高</option>
                <option value="name-asc">名称：A-Z</option>
                <option value="name-desc">名称：Z-A</option>
              </select>
            </div>

            {/* 评分范围 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                评分范围
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.minScore}
                  onChange={(e) => setFilters({...filters, minScore: parseFloat(e.target.value) || 0})}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="最低"
                />
                <span className="flex items-center text-gray-500">-</span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.maxScore}
                  onChange={(e) => setFilters({...filters, maxScore: parseFloat(e.target.value) || 5})}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="最高"
                />
              </div>
            </div>
          </div>

          {/* 筛选标签 */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilters({...filters, categories: []})}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.categories.length === 0 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              所有类别
            </button>
            {['人工智能', 'VR/AR', '网络安全', '人机交互', '数据可视化', '其他'].map(category => (
              <button
                key={category}
                onClick={() => {
                  const newCategories = filters.categories.includes(category)
                    ? filters.categories.filter(c => c !== category)
                    : [...filters.categories, category];
                  setFilters({...filters, categories: newCategories});
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.categories.includes(category)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              onClick={() => handleProjectClick(project.id)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                {/* 项目标题和评分 */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {project.title}
                  </h3>
                  <div className={`text-lg font-bold ${getScoreColor(project.score.overall)}`}>
                    {project.score.overall.toFixed(1)}
                  </div>
                </div>

                {/* 导师信息 */}
                <p className="text-sm text-gray-600 mb-3">
                  导师：{project.mentorName}
                </p>

                {/* 项目描述 */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* 标签 */}
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

                {/* 关键词 */}
                <div className="flex flex-wrap gap-1">
                  {project.keywords.slice(0, 3).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                  {project.keywords.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                      +{project.keywords.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </nav>
          </div>
        )}

        {/* 无结果提示 */}
        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的项目</h3>
            <p className="text-gray-600">尝试调整搜索条件或筛选器</p>
          </div>
        )}
      </div>
    </div>
  );
}
