import Head from 'next/head';
import { Search, Filter, BarChart3, Users, Star, BookOpen, Target, TrendingUp, Shield, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import { realMentors, realStatistics, realResearchFields } from '@/data/realData';
import Navigation from '@/components/Navigation';
import MentorCard from '@/components/MentorCard';

export default function Home() {
  return (
    <>
      <Head>
        <title>大学导师选择分析平台 - 找到你的理想导师</title>
        <meta name="description" content="基于数据分析和智能匹配，为大学生提供最合适的导师选择建议，让学术之路更加清晰明确。" />
        <meta name="keywords" content="导师选择,学术研究,智能匹配,数据分析,大学生" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 导航栏 */}
      <Navigation />

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

          {/* 快速入口按钮 */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="/mentors"
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Users className="h-5 w-5 mr-2" />
              浏览导师
            </a>
            <a
              href="/projects"
              className="flex items-center px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              查看项目
            </a>
            <a
              href="/compare"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              开始对比
            </a>
          </div>
        </div>

        {/* 平台功能 */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">平台功能</h2>
            <p className="text-lg text-gray-600">我们提供全面的导师选择和分析工具，帮助您做出最佳决策</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">智能匹配</h3>
              <p className="text-sm text-gray-600">基于兴趣和背景智能推荐最适合的导师</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">数据分析</h3>
              <p className="text-sm text-gray-600">多维度数据分析和对比，提供客观参考</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">评价系统</h3>
              <p className="text-sm text-gray-600">真实学生评价，了解导师指导风格</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">对比分析</h3>
              <p className="text-sm text-gray-600">多维度对比分析，找到最佳选择</p>
            </div>
          </div>
        </div>

        {/* 使用方法 */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">如何使用平台</h2>
            <p className="text-lg text-gray-600">简单三步，轻松找到您的理想导师</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">浏览导师</h3>
              <p className="text-gray-600 mb-4">浏览导师列表，了解基本信息、研究方向和项目情况</p>
              <div className="flex items-center justify-center text-indigo-600">
                <BookOpen className="h-4 w-4 mr-1" />
                <span className="text-sm">查看导师详情</span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">对比分析</h3>
              <p className="text-gray-600 mb-4">选择感兴趣的导师和项目，进行多维度对比分析</p>
              <div className="flex items-center justify-center text-green-600">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span className="text-sm">开始对比</span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">做出选择</h3>
              <p className="text-gray-600 mb-4">基于分析结果和您的需求，做出最适合的选择</p>
              <div className="flex items-center justify-center text-yellow-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">确认选择</span>
              </div>
            </div>
          </div>
        </div>

        {/* 快速开始指南 */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">快速开始指南</h2>
            <p className="text-lg text-gray-600">新用户？按照以下步骤快速上手</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">了解平台功能</h3>
                    <p className="text-gray-600 text-sm">浏览首页了解平台的主要功能和特色</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">浏览导师列表</h3>
                    <p className="text-gray-600 text-sm">查看所有可用导师的详细信息和研究方向</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">查看项目详情</h3>
                    <p className="text-gray-600 text-sm">了解每个导师的研究项目和项目要求</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">进行对比分析</h3>
                    <p className="text-gray-600 text-sm">选择感兴趣的导师和项目进行多维度对比</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">查看数据分析</h3>
                    <p className="text-gray-600 text-sm">浏览数据分析页面了解平台整体情况</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">做出最终选择</h3>
                    <p className="text-gray-600 text-sm">基于分析结果和您的需求做出最适合的选择</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Lightbulb className="h-5 w-5 mr-2" />
                查看详细建议
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">平台数据概览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">注册导师</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">在校学生</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">90%</div>
              <div className="text-gray-600">匹配成功率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.5</div>
              <div className="text-gray-600">平均评分</div>
            </div>
          </div>
        </div>

        {/* 热门导师预览 */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">热门导师推荐</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realMentors.slice(0, 6).map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        </div>

        {/* 完整导师列表 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">所有导师列表</h2>
          <div className="space-y-6">
            {realMentors.map((mentor, index) => (
              <div key={mentor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-indigo-600 font-semibold text-lg">
                        {mentor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.title} · {mentor.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">{mentor.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{mentor.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">研究方向</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.researchFields.slice(0, 6).map((field, fieldIndex) => (
                      <span key={fieldIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {field}
                      </span>
                    ))}
                    {mentor.researchFields.length > 6 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{mentor.researchFields.length - 6}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{mentor.studentCount} 学生</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      <span>{mentor.reviewCount} 评价</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{mentor.projects.length} 项目</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mentor.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {mentor.isAvailable ? '可接受新学生' : '暂不接受'}
                    </span>
                    <a 
                      href={`/mentors/${mentor.id}`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      查看详情 →
                    </a>
                  </div>
                </div>
                
                {/* 项目列表 */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">主要项目</p>
                  <div className="space-y-2">
                    {mentor.projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="text-sm text-gray-600">
                        <span className="font-medium">{project.title}</span>
                        <span className="text-gray-400 ml-2">- {project.description}</span>
                      </div>
                    ))}
                    {mentor.projects.length > 3 && (
                      <div className="text-sm text-gray-500">
                        还有 {mentor.projects.length - 3} 个项目...
                      </div>
                    )}
                  </div>
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
    </>
  );
}