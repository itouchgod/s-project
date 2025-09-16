import { 
  BookOpen, 
  Users, 
  Target, 
  Lightbulb, 
  Shield, 
  Heart,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">关于我们</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们致力于为大学生提供最专业、最智能的导师选择服务，让学术之路更加清晰明确。
          </p>
        </div>

        {/* 我们的使命 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">我们的使命</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              在当今快速发展的学术环境中，选择合适的导师对学生的学术成长和职业发展至关重要。
              我们相信，通过数据驱动的智能匹配和全面的导师信息展示，可以帮助学生做出更明智的选择。
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              我们的平台整合了184位优秀导师的详细信息，涵盖人工智能、VR技术、网络安全、
              软件工程等多个前沿领域，为学生提供最全面的导师选择参考。
            </p>
          </div>
        </div>

        {/* 核心价值 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">创新驱动</h3>
            <p className="text-gray-600">
              运用先进的数据分析和机器学习技术，为学生提供个性化的导师推荐服务。
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">数据透明</h3>
            <p className="text-gray-600">
              提供真实、全面的导师信息，包括研究项目、学术成果、学生评价等详细数据。
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">用户至上</h3>
            <p className="text-gray-600">
              以学生需求为中心，持续优化用户体验，提供最便捷、最有效的服务。
            </p>
          </div>
        </div>

        {/* 平台特色 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">平台特色</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">智能匹配算法</h3>
                  <p className="text-gray-600">
                    基于学生的兴趣、学术背景和研究方向，智能推荐最适合的导师。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">全面数据分析</h3>
                  <p className="text-gray-600">
                    提供详细的导师数据分析和对比，包括研究方向、学术成果、学生评价等维度。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">实时搜索筛选</h3>
                  <p className="text-gray-600">
                    支持多维度搜索和筛选功能，快速找到符合要求的导师。
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">真实评价系统</h3>
                  <p className="text-gray-600">
                    展示真实的学生评价和反馈，帮助学生了解导师的教学风格和指导方式。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-600 font-bold">5</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">移动端适配</h3>
                  <p className="text-gray-600">
                    完美支持手机和平板设备，随时随地浏览导师信息。
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-600 font-bold">6</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">持续更新</h3>
                  <p className="text-gray-600">
                    定期更新导师信息和项目数据，确保信息的准确性和时效性。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 团队介绍 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">我们的团队</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">产品团队</h3>
              <p className="text-gray-600">
                专注于用户体验设计，确保平台的易用性和美观性。
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">技术团队</h3>
              <p className="text-gray-600">
                负责平台的技术架构和功能开发，确保系统的稳定性和性能。
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">数据团队</h3>
              <p className="text-gray-600">
                负责数据收集、分析和算法优化，提供精准的匹配服务。
              </p>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">184+</div>
            <div className="text-gray-600">注册导师</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2500+</div>
            <div className="text-gray-600">在校学生</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">95%</div>
            <div className="text-gray-600">匹配成功率</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.6</div>
            <div className="text-gray-600">平均评分</div>
          </div>
        </div>

        {/* 联系我们 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">联系我们</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">联系方式</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-600">support@mentor-platform.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-600">400-123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-gray-600">北京市海淀区中关村大街1号</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">关注我们</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Github className="h-6 w-6 text-gray-600" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Linkedin className="h-6 w-6 text-gray-600" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Twitter className="h-6 w-6 text-gray-600" />
                </a>
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
              <p className="text-sm text-gray-400 mb-2">邮箱: support@mentor-platform.com</p>
              <p className="text-sm text-gray-400">电话: 400-123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 导师选择分析平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
