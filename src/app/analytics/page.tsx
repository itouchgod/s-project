'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Star, 
  BookOpen, 
  PieChart,
  Activity,
  Award,
  Calendar
} from 'lucide-react';
import { realStatistics, realMentors } from '@/data/realData';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

// 简单的图表组件（实际项目中可以使用 Recharts）
const BarChart = ({ data, title, color = 'indigo' }: { data: any[], title: string, color?: string }) => {
  const maxValue = Math.max(...data.map(d => d.count));
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-gray-600 truncate">{item.field}</div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(item.count / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-12 text-sm text-gray-900 text-right">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = ({ data, title }: { data: any[], title: string }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.mentors, d.students, d.matches)));
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center space-y-1">
              <div 
                className="w-full bg-indigo-500 rounded-t"
                style={{ height: `${(item.mentors / maxValue) * 200}px` }}
                title={`导师: ${item.mentors}`}
              />
              <div 
                className="w-full bg-green-500"
                style={{ height: `${(item.students / maxValue) * 200}px` }}
                title={`学生: ${item.students}`}
              />
              <div 
                className="w-full bg-yellow-500 rounded-b"
                style={{ height: `${(item.matches / maxValue) * 200}px` }}
                title={`匹配: ${item.matches}`}
              />
            </div>
            <div className="text-xs text-gray-600 mt-2">{item.month}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-500 rounded mr-2"></div>
          <span>导师</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
          <span>学生</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
          <span>匹配</span>
        </div>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'6months' | '1year' | 'all'>('6months');

  // 计算统计数据
  const totalProjects = realMentors.reduce((sum, mentor) => sum + (mentor.projects?.length || 0), 0);
  const totalPublications = realMentors.reduce((sum, mentor) => sum + (mentor.publications?.length || 0), 0);
  const totalAwards = realMentors.reduce((sum, mentor) => sum + (mentor.awards?.length || 0), 0);
  
  const avgStudentsPerMentor = realMentors.length > 0 ? 
    (realMentors.reduce((sum, mentor) => sum + mentor.studentCount, 0) / realMentors.length).toFixed(1) : 0;
  
  const avgRating = realMentors.length > 0 ? 
    (realMentors.reduce((sum, mentor) => sum + mentor.rating, 0) / realMentors.length).toFixed(1) : 0;

  // 按院系统计
  const departmentStats = realMentors.reduce((acc, mentor) => {
    acc[mentor.department] = (acc[mentor.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentData = Object.entries(departmentStats).map(([department, count]) => ({
    field: department,
    count
  })).sort((a, b) => b.count - a.count);

  // 按职称统计
  const titleStats = realMentors.reduce((acc, mentor) => {
    acc[mentor.title] = (acc[mentor.title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const titleData = Object.entries(titleStats).map(([title, count]) => ({
    field: title,
    count
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">数据分析</h1>
          <p className="text-gray-600 mt-2">深入了解导师分布、研究趋势和平台使用情况</p>
        </div>

        {/* 时间筛选 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">数据时间范围</h2>
            <div className="flex space-x-2">
              {[
                { value: '6months', label: '近6个月' },
                { value: '1year', label: '近1年' },
                { value: 'all', label: '全部' }
              ].map((period) => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总导师数</p>
                <p className="text-2xl font-bold text-gray-900">{realStatistics.totalMentors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总学生数</p>
                <p className="text-2xl font-bold text-gray-900">{realStatistics.totalStudents.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">平均评分</p>
                <p className="text-2xl font-bold text-gray-900">{realStatistics.averageRating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总评价数</p>
                <p className="text-2xl font-bold text-gray-900">{realStatistics.totalReviews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 详细统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">研究项目统计</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">总项目数</span>
                <span className="text-xl font-bold text-indigo-600">{totalProjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">平均每导师</span>
                <span className="text-lg font-semibold text-gray-900">
                  {(totalProjects / realMentors.length).toFixed(1)} 个
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">学术成果</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">发表论文</span>
                <span className="text-xl font-bold text-green-600">{totalPublications}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">获奖情况</span>
                <span className="text-xl font-bold text-yellow-600">{totalAwards}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">指导情况</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">平均指导学生</span>
                <span className="text-xl font-bold text-purple-600">{avgStudentsPerMentor} 人</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">平台平均评分</span>
                <span className="text-xl font-bold text-indigo-600">{avgRating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 研究方向分布 */}
          <BarChart 
            data={realStatistics.fieldDistribution} 
            title="研究方向分布" 
            color="indigo"
          />

          {/* 院系分布 */}
          <BarChart 
            data={departmentData} 
            title="院系分布" 
            color="green"
          />
        </div>

        {/* 职称分布 */}
        <div className="mb-8">
          <BarChart 
            data={titleData} 
            title="职称分布" 
            color="purple"
          />
        </div>

        {/* 趋势分析 */}
        <div className="mb-8">
          <LineChart 
            data={realStatistics.monthlyTrends} 
            title="月度趋势分析"
          />
        </div>

        {/* 评分分布 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">评分分布</h3>
            <div className="space-y-3">
              {realStatistics.ratingDistribution.map((rating, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-8 text-sm text-gray-600">{rating.rating} 星</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-sm text-gray-900 text-right">
                    {rating.count} ({rating.percentage}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">平台活跃度</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">可用导师比例</span>
                <span className="text-lg font-semibold text-green-600">
                  {((realMentors.filter(m => m.isAvailable).length / realMentors.length) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">高评分导师 (4.5+)</span>
                <span className="text-lg font-semibold text-indigo-600">
                  {realMentors.filter(m => m.rating >= 4.5).length} 人
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">经验丰富导师 (10+学生)</span>
                <span className="text-lg font-semibold text-purple-600">
                  {realMentors.filter(m => m.studentCount >= 10).length} 人
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
