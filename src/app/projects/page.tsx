'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { BookOpen } from 'lucide-react';
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
    <>
      <Head>
        <title>项目列表 - 大学导师选择分析平台</title>
        <meta name="description" content="浏览和搜索研究项目，找到最适合您的项目进行学习研究" />
        <meta name="keywords" content="研究项目,导师选择,学术研究,项目列表" />
      </Head>
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

        {/* 项目表格 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                    项目信息
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    导师
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    评分
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    难度
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    状态
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    类别
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                    关键词
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    onClick={() => {
                      handleProjectClick(project.id);
                      window.location.href = `/projects/${project.id}`;
                    }}
                  >
                    {/* 项目信息 */}
                    <td className="px-3 sm:px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {project.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-2">
                          {project.description}
                        </div>
                        {/* 移动端显示导师信息 */}
                        <div className="text-xs text-gray-600 mt-1 sm:hidden">
                          导师：{project.mentorName}
                        </div>
                        {/* 移动端显示标签 */}
                        <div className="flex flex-wrap gap-1 mt-2 sm:hidden">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(project.difficulty)}`}>
                            {project.difficulty === 'beginner' ? '初级' : 
                             project.difficulty === 'intermediate' ? '中级' : '高级'}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                            {project.status === 'ongoing' ? '进行中' :
                             project.status === 'completed' ? '已完成' :
                             project.status === 'cancelled' ? '已取消' : '规划中'}
                          </span>
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 导师 */}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">{project.mentorName}</div>
                    </td>

                    {/* 评分 */}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className={`text-lg font-bold ${getScoreColor(project.score.overall)}`}>
                        {project.score.overall.toFixed(1)}
                      </div>
                    </td>

                    {/* 难度 */}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty === 'beginner' ? '初级' : 
                         project.difficulty === 'intermediate' ? '中级' : '高级'}
                      </span>
                    </td>

                    {/* 状态 */}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                        {project.status === 'ongoing' ? '进行中' :
                         project.status === 'completed' ? '已完成' :
                         project.status === 'cancelled' ? '已取消' : '规划中'}
                      </span>
                    </td>

                    {/* 类别 */}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        {project.category}
                      </span>
                    </td>

                    {/* 关键词 */}
                    <td className="px-3 sm:px-6 py-4 hidden xl:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.keywords.slice(0, 3).map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                        {project.keywords.length > 3 && (
                          <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                            +{project.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-lg font-semibold">导师选择分析平台</span>
              </div>
              <p className="text-gray-400 text-sm">
                为大学生提供最专业的导师选择建议，让学术之路更加清晰明确。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">功能特色</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>智能匹配推荐</li>
                <li>数据分析对比</li>
                <li>评价系统</li>
                <li>搜索筛选</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">帮助中心</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>使用指南</li>
                <li>常见问题</li>
                <li>联系我们</li>
                <li>意见反馈</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">联系我们</h3>
              <p className="text-sm text-gray-400 mb-2">邮箱: henry@luo.cn</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 导师选择分析平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
