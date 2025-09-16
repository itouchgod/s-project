'use client';

import { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { realMentors } from '@/data/realData';
import { SearchFilters as SearchFiltersType } from '@/types';
import Navigation from '@/components/Navigation';
import MentorCard from '@/components/MentorCard';
import SearchFilters from '@/components/SearchFilters';

export default function MentorsPage() {
  const [searchFilters, setSearchFilters] = useState<SearchFiltersType>({
    keyword: '',
    researchFields: [],
    departments: [],
    titles: [],
    rating: { min: 0, max: 5 },
    isAvailable: true,
    sortBy: 'rating',
    sortOrder: 'desc'
  });


  // 筛选和搜索逻辑
  const filteredMentors = useMemo(() => {
    const filtered = realMentors.filter(mentor => {
      // 关键词搜索
      if (searchFilters.keyword) {
        const keyword = searchFilters.keyword.toLowerCase();
        const matchesKeyword = 
          mentor.name.toLowerCase().includes(keyword) ||
          mentor.department.toLowerCase().includes(keyword) ||
          mentor.researchFields.some(field => field.toLowerCase().includes(keyword)) ||
          mentor.description.toLowerCase().includes(keyword);
        if (!matchesKeyword) return false;
      }

      // 研究方向筛选
      if (searchFilters.researchFields && searchFilters.researchFields.length > 0) {
        const hasMatchingField = searchFilters.researchFields.some(field =>
          mentor.researchFields.includes(field)
        );
        if (!hasMatchingField) return false;
      }

      // 院系筛选
      if (searchFilters.departments && searchFilters.departments.length > 0) {
        if (!searchFilters.departments.includes(mentor.department)) return false;
      }

      // 职称筛选
      if (searchFilters.titles && searchFilters.titles.length > 0) {
        if (!searchFilters.titles.includes(mentor.title)) return false;
      }

      // 评分筛选
      if (searchFilters.rating) {
        if (mentor.rating < searchFilters.rating.min || mentor.rating > searchFilters.rating.max) return false;
      }

      // 可用性筛选
      if (searchFilters.isAvailable !== undefined) {
        if (mentor.isAvailable !== searchFilters.isAvailable) return false;
      }

      return true;
    });

    // 排序
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (searchFilters.sortBy) {
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'reviewCount':
          aValue = a.reviewCount;
          bValue = b.reviewCount;
          break;
        case 'studentCount':
          aValue = a.studentCount;
          bValue = b.studentCount;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          aValue = a.rating;
          bValue = b.rating;
      }

      if (searchFilters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchFilters]);

  const handleFilterChange = (key: keyof SearchFiltersType, value: unknown) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      keyword: '',
      researchFields: [],
      departments: [],
      titles: [],
      rating: { min: 0, max: 5 },
      isAvailable: true,
      sortBy: 'rating',
      sortOrder: 'desc'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索和筛选区域 */}
        <SearchFilters
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          onClearFilters={clearFilters}
        />

        {/* 排序和结果统计 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            找到 {filteredMentors.length} 位导师
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={`${searchFilters.sortBy}-${searchFilters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                handleFilterChange('sortBy', sortBy);
                handleFilterChange('sortOrder', sortOrder);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="rating-desc">评分 (高到低)</option>
              <option value="rating-asc">评分 (低到高)</option>
              <option value="reviewCount-desc">评价数 (多到少)</option>
              <option value="reviewCount-asc">评价数 (少到多)</option>
              <option value="studentCount-desc">学生数 (多到少)</option>
              <option value="studentCount-asc">学生数 (少到多)</option>
              <option value="name-asc">姓名 (A-Z)</option>
              <option value="name-desc">姓名 (Z-A)</option>
            </select>
          </div>
        </div>

        {/* 导师列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的导师</h3>
            <p className="text-gray-600">请尝试调整搜索条件或筛选器</p>
          </div>
        )}
      </div>
    </div>
  );
}
