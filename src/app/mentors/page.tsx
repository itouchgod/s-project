'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { BookOpen, Star, Users, MessageSquare, Award } from 'lucide-react';
import { Mentor, MentorScore } from '@/types/dataset';
import { getMentorsWithScores, searchMentors, filterMentors } from '@/lib/data-loader';
import { sortByScore, filterByScoreRange } from '@/lib/scoring';
import { addToHistory } from '@/lib/storage';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface MentorWithScore extends Mentor {
  score: MentorScore;
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<MentorWithScore[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<MentorWithScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    departments: [] as string[],
    researchFields: [] as string[],
    isAvailable: undefined as boolean | undefined,
    minRating: 0,
    maxRating: 5,
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
  }, [mentors, searchQuery, filters, sortBy]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getMentorsWithScores();
      setMentors(data);
    } catch (error) {
      console.error('加载导师数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    let filtered = [...mentors];

    // 搜索过滤
    if (searchQuery.trim()) {
      const searchResults = await searchMentors(searchQuery);
      const searchIds = new Set(searchResults.map(m => m.id));
      filtered = filtered.filter(m => searchIds.has(m.id));
    }

    // 院系过滤
    if (filters.departments.length > 0) {
      filtered = filtered.filter(m => filters.departments.includes(m.department));
    }

    // 研究方向过滤
    if (filters.researchFields.length > 0) {
      filtered = filtered.filter(m => 
        filters.researchFields.some(field => m.researchFields.includes(field))
      );
    }

    // 可用性过滤
    if (filters.isAvailable !== undefined) {
      filtered = filtered.filter(m => m.isAvailable === filters.isAvailable);
    }

    // 评分过滤
    filtered = filterByScoreRange(filtered, filters.minRating, filters.maxRating);

    // 排序
    if (sortBy.startsWith('rating')) {
      filtered = sortByScore(filtered, sortBy === 'rating-desc' ? 'desc' : 'asc');
    } else if (sortBy.startsWith('name')) {
      filtered.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortBy === 'name-desc' ? -comparison : comparison;
      });
    }

    setFilteredMentors(filtered);
    setCurrentPage(1);
  };

  const handleMentorClick = (mentorId: string) => {
    addToHistory(mentorId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMentors = filteredMentors.slice(startIndex, endIndex);

  // 获取可用的筛选选项
  const availableDepartments = Array.from(new Set(mentors.map(m => m.department)));
  const availableResearchFields = Array.from(new Set(mentors.flatMap(m => m.researchFields)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载导师数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>导师列表 - 大学导师选择分析平台</title>
        <meta name="description" content="浏览和搜索优秀导师，找到最适合您的学术指导" />
        <meta name="keywords" content="导师列表,学术指导,导师选择,研究方向" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">导师列表</h1>
          <p className="mt-2 text-gray-600">
            发现 {filteredMentors.length} 位优秀导师，找到适合您的学术指导
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* 搜索框 */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                搜索导师
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索导师姓名、院系、研究方向..."
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
                <option value="name-asc">姓名：A-Z</option>
                <option value="name-desc">姓名：Z-A</option>
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
                  value={filters.minRating}
                  onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value) || 0})}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="最低"
                />
                <span className="flex items-center text-gray-500">-</span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.maxRating}
                  onChange={(e) => setFilters({...filters, maxRating: parseFloat(e.target.value) || 5})}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="最高"
                />
              </div>
            </div>
          </div>

          {/* 筛选标签 */}
          <div className="mt-4 space-y-4">
            {/* 院系筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">院系</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({...filters, departments: []})}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.departments.length === 0 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  全部院系
                </button>
                {availableDepartments.map(department => (
                  <button
                    key={department}
                    onClick={() => {
                      const newDepartments = filters.departments.includes(department)
                        ? filters.departments.filter(d => d !== department)
                        : [...filters.departments, department];
                      setFilters({...filters, departments: newDepartments});
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.departments.includes(department)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {department}
                  </button>
                ))}
              </div>
            </div>

            {/* 研究方向筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">研究方向</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({...filters, researchFields: []})}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.researchFields.length === 0 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  全部方向
                </button>
                {availableResearchFields.slice(0, 10).map(field => (
                  <button
                    key={field}
                    onClick={() => {
                      const newFields = filters.researchFields.includes(field)
                        ? filters.researchFields.filter(f => f !== field)
                        : [...filters.researchFields, field];
                      setFilters({...filters, researchFields: newFields});
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.researchFields.includes(field)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {field}
                  </button>
                ))}
                {availableResearchFields.length > 10 && (
                  <span className="px-3 py-1 text-sm text-gray-500">
                    +{availableResearchFields.length - 10} 更多
                  </span>
                )}
              </div>
            </div>

            {/* 可用性筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">可用性</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilters({...filters, isAvailable: undefined})}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.isAvailable === undefined
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  全部
                </button>
                <button
                  onClick={() => setFilters({...filters, isAvailable: true})}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.isAvailable === true
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  可接收学生
                </button>
                <button
                  onClick={() => setFilters({...filters, isAvailable: false})}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.isAvailable === false
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  已满员
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 导师列表 */}
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentMentors.map((mentor) => (
                  <tr
                    key={mentor.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                    onClick={() => {
                      handleMentorClick(mentor.id);
                      window.location.href = `/mentors/${mentor.id}`;
                    }}
                  >
                    {/* 导师信息 */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-lg font-bold text-blue-600">
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
                          <div className="text-xs text-gray-400 line-clamp-2 mt-1">
                            {mentor.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 院系 */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mentor.department}
                    </td>

                    {/* 研究方向 */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {mentor.researchFields.slice(0, 3).map((field, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {field}
                          </span>
                        ))}
                        {mentor.researchFields.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                            +{mentor.researchFields.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 学生数 */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{mentor.studentCount}</span>
                      </div>
                    </td>

                    {/* 评分 */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`text-lg font-bold ${getScoreColor(mentor.score.overall)}`}>
                          {mentor.score.overall.toFixed(1)}
                        </div>
                        <div className="ml-2 flex items-center text-yellow-500 text-sm">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="ml-1">{mentor.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </td>

                    {/* 可用性 */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(mentor.isAvailable)}`}>
                        {mentor.isAvailable ? '可接收' : '已满员'}
                      </span>
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
        {filteredMentors.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👨‍🏫</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的导师</h3>
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