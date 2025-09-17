'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Users, 
  Star, 
  BookOpen, 
  Activity,
  TrendingUp,
  Target,
  Award,
  Clock
} from 'lucide-react';
import { realStatistics, realMentors } from '@/data/realData';
import { getProjectsWithScores, getMentorsWithScores } from '@/lib/data-loader';
import Navigation from '@/components/Navigation';

// 简单的图表组件（实际项目中可以使用 Recharts）
const BarChart = ({ data, title, color = 'indigo' }: { data: { field: string; count: number }[], title: string, color?: string }) => {
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

const LineChart = ({ data, title }: { data: { month: string; mentors: number; students: number; matches: number }[], title: string }) => {
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
  const [projects, setProjects] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, mentorsData] = await Promise.all([
        getProjectsWithScores(),
        getMentorsWithScores()
      ]);
      setProjects(projectsData);
      setMentors(mentorsData);
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 计算统计数据
  const totalProjects = projects.length;
  const totalMentors = mentors.length;
  const totalPublications = mentors.reduce((sum, mentor) => sum + (mentor.publications?.length || 0), 0);
  const totalAwards = mentors.reduce((sum, mentor) => sum + (mentor.awards?.length || 0), 0);
  
  const avgStudentsPerMentor = mentors.length > 0 ? 
    (mentors.reduce((sum, mentor) => sum + mentor.studentCount, 0) / mentors.length).toFixed(1) : 0;
  
  const avgRating = mentors.length > 0 ? 
    (mentors.reduce((sum, mentor) => sum + mentor.rating, 0) / mentors.length).toFixed(1) : 0;

  // 项目统计
  const projectStats = {
    total: totalProjects,
    byDifficulty: projects.reduce((acc, project) => {
      acc[project.difficulty] = (acc[project.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byStatus: projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCategory: projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    avgScore: projects.length > 0 ? 
      (projects.reduce((sum, project) => sum + project.score.overall, 0) / projects.length).toFixed(1) : 0
  };

  // 按院系统计
  const departmentStats = mentors.reduce((acc, mentor) => {
    acc[mentor.department] = (acc[mentor.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const departmentData = Object.entries(departmentStats).map(([department, count]) => ({
    field: department,
    count
  })).sort((a, b) => b.count - a.count);

  // 按职称统计
  const titleStats = mentors.reduce((acc, mentor) => {
    acc[mentor.title] = (acc[mentor.title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const titleData = Object.entries(titleStats).map(([title, count]) => ({
    field: title,
    count
  })).sort((a, b) => b.count - a.count);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载分析数据中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>数据分析 - 大学导师选择分析平台</title>
        <meta name="description" content="全面的导师和项目数据分析，深入了解平台使用情况和研究趋势" />
        <meta name="keywords" content="数据分析,导师分析,项目分析,统计报告" />
      </Head>
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
                  onClick={() => setSelectedPeriod(period.value as '6months' | '1year' | 'all')}
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
                <p className="text-2xl font-bold text-gray-900">{totalMentors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总项目数</p>
                <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
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
                <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">项目平均分</p>
                <p className="text-2xl font-bold text-gray-900">{projectStats.avgScore}</p>
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

        {/* 项目分析 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">项目分析</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 项目难度分布 */}
            <BarChart 
              data={Object.entries(projectStats.byDifficulty).map(([difficulty, count]) => ({
                field: difficulty === 'beginner' ? '初级' : 
                       difficulty === 'intermediate' ? '中级' : '高级',
                count
              }))} 
              title="项目难度分布" 
              color="blue"
            />

            {/* 项目状态分布 */}
            <BarChart 
              data={Object.entries(projectStats.byStatus).map(([status, count]) => ({
                field: status === 'ongoing' ? '进行中' :
                       status === 'completed' ? '已完成' :
                       status === 'cancelled' ? '已取消' : '规划中',
                count
              }))} 
              title="项目状态分布" 
              color="green"
            />

            {/* 项目类别分布 */}
            <BarChart 
              data={Object.entries(projectStats.byCategory).map(([category, count]) => ({
                field: category,
                count
              }))} 
              title="项目类别分布" 
              color="purple"
            />
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
                  {((mentors.filter(m => m.isAvailable).length / mentors.length) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">高评分导师 (4.5+)</span>
                <span className="text-lg font-semibold text-indigo-600">
                  {mentors.filter(m => m.rating >= 4.5).length} 人
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">经验丰富导师 (10+学生)</span>
                <span className="text-lg font-semibold text-purple-600">
                  {mentors.filter(m => m.studentCount >= 10).length} 人
                </span>
              </div>
            </div>
          </div>
        </div>
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
