import Head from 'next/head';
import { 
  BookOpen, 
  Users, 
  Target, 
  Lightbulb, 
  Shield, 
  Heart,
  Mail,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>学生建议 - 大学导师选择分析平台</title>
        <meta name="description" content="指导学生如何选择项目和导师，提供专业的学术发展建议" />
        <meta name="keywords" content="学生建议,导师选择,项目选择,学术发展,指导" />
      </Head>
      <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">学生选择建议</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            专业的指导建议，帮助您做出明智的导师和项目选择，开启成功的学术之路。
          </p>
        </div>

        {/* 选择导师的建议 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">如何选择导师</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">研究兴趣匹配</h3>
                    <p className="text-gray-600">选择与您研究兴趣高度一致的导师，确保研究方向的专业性和持续性。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">导师经验与声誉</h3>
                    <p className="text-gray-600">关注导师的学术背景、发表论文数量、获奖情况以及学生评价。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">指导风格</h3>
                    <p className="text-gray-600">了解导师的指导方式，选择适合您学习风格的导师。</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">可用性与时间</h3>
                    <p className="text-gray-600">确认导师是否有足够时间指导您，避免选择过于忙碌的导师。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">实验室资源</h3>
                    <p className="text-gray-600">了解导师实验室的设备、资金和团队情况，确保研究条件充足。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">职业发展支持</h3>
                    <p className="text-gray-600">选择能够为您的职业发展提供指导和帮助的导师。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 选择项目的建议 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">如何选择项目</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">项目难度评估</h3>
                    <p className="text-gray-600">根据自身能力选择合适难度的项目，避免过于简单或过于困难。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">学习价值</h3>
                    <p className="text-gray-600">选择能够提升技能、扩展知识面的项目，确保学习效果。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">时间安排</h3>
                    <p className="text-gray-600">考虑项目周期与个人时间安排，确保能够按时完成。</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">创新性</h3>
                    <p className="text-gray-600">选择具有创新性和前瞻性的项目，提升学术价值。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">实用性</h3>
                    <p className="text-gray-600">选择能够解决实际问题、具有应用价值的项目。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Star className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">团队合作</h3>
                    <p className="text-gray-600">考虑项目的团队协作要求，选择适合的项目类型。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 常见误区 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">常见误区</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">只看名气</h3>
                    <p className="text-gray-600">不要只看导师的名气，要关注研究方向和指导风格是否适合您。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">忽视沟通</h3>
                    <p className="text-gray-600">选择导师前一定要与导师沟通，了解彼此的期望和要求。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">盲目跟风</h3>
                    <p className="text-gray-600">不要因为某个研究方向热门就盲目选择，要考虑自己的兴趣和能力。</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">忽视资源</h3>
                    <p className="text-gray-600">不要忽视实验室资源和资金支持，这些对项目成功很重要。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">急于决定</h3>
                    <p className="text-gray-600">不要急于做决定，要充分了解导师和项目后再做选择。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">忽视长期规划</h3>
                    <p className="text-gray-600">要考虑导师和项目对您长期职业发展的影响。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 成功案例 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <Award className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">成功案例</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">张同学</h3>
                <p className="text-gray-600 text-sm">
                  通过平台找到合适的AI导师，成功完成机器学习项目，获得优秀毕业论文奖。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">李同学</h3>
                <p className="text-gray-600 text-sm">
                  选择VR技术项目，在导师指导下发表SCI论文，获得保研资格。
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">王同学</h3>
                <p className="text-gray-600 text-sm">
                  通过对比分析选择网络安全导师，成功进入知名互联网公司工作。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 联系我们 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <Mail className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">需要更多帮助？</h2>
            <p className="text-lg text-gray-600 mb-6">
              如果您在选择导师或项目时遇到困难，我们随时为您提供帮助。
            </p>
            <div className="flex justify-center">
              <a
                href="mailto:henry@luo.cn"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                联系我们
              </a>
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
      </div>
    </>
  );
}