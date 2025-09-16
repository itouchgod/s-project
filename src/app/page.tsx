import { Search, Filter, BarChart3, Users, Star, BookOpen } from 'lucide-react';
import { realMentors, realStatistics, realResearchFields } from '@/data/realData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">导师选择分析平台</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">首页</a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">导师列表</a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">数据分析</a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">关于我们</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 英雄区域 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            找到你的
            <span className="text-indigo-600">理想导师</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            基于数据分析和智能匹配，为大学生提供最合适的导师选择建议，让学术之路更加清晰明确。
          </p>
          
          {/* 搜索框 */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="搜索导师姓名、研究方向或关键词..."
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                搜索
              </button>
            </div>
          </div>

          {/* 快速筛选按钮 */}
          <div className="flex flex-wrap justify-center gap-3">
            {realResearchFields.slice(0, 8).map((field, index) => (
              <button key={index} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                {field}
              </button>
            ))}
          </div>
        </div>

        {/* 功能特色 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">智能匹配</h3>
            <p className="text-gray-600">
              基于你的兴趣、学术背景和研究方向，智能推荐最适合的导师，提高匹配成功率。
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">数据分析</h3>
            <p className="text-gray-600">
              提供详细的导师数据分析和对比，包括研究方向、学术成果、学生评价等维度。
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">评价系统</h3>
            <p className="text-gray-600">
              真实的学生评价和反馈，帮助你了解导师的教学风格和指导方式。
            </p>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">平台数据概览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{realStatistics.totalMentors}+</div>
              <div className="text-gray-600">注册导师</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{realStatistics.totalStudents.toLocaleString()}+</div>
              <div className="text-gray-600">在校学生</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">95%</div>
              <div className="text-gray-600">匹配成功率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{realStatistics.averageRating}</div>
              <div className="text-gray-600">平均评分</div>
            </div>
          </div>
        </div>

        {/* 热门导师预览 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">热门导师推荐</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realMentors.slice(0, 6).map((mentor) => (
              <div key={mentor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold">{mentor.name.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.department}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {mentor.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.researchFields.slice(0, 3).map((field, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {field}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{mentor.rating}</span>
                    <span className="ml-2 text-xs text-gray-500">({mentor.reviewCount}评价)</span>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    查看详情 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

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
    </div>
  );
}