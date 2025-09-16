import { 
  Star, 
  BookOpen, 
  MapPin, 
  Mail, 
  Phone,
  ArrowLeft
} from 'lucide-react';
import { realMentors, realReviews } from '@/data/realData';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import MentorDetailTabs from '@/components/MentorDetailTabs';

// 生成静态参数
export async function generateStaticParams() {
  return realMentors.map((mentor) => ({
    id: mentor.id,
  }));
}

export default function MentorDetailPage({ params }: { params: { id: string } }) {
  const mentorId = params.id;
  
  const mentor = realMentors.find(m => m.id === mentorId);
  const reviews = realReviews.filter(r => r.mentorId === mentorId);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">导师未找到</h2>
          <p className="text-gray-600 mb-4">请检查链接是否正确</p>
          <Link href="/mentors" className="text-indigo-600 hover:text-indigo-700">
            返回导师列表
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <Link 
          href="/mentors" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回导师列表
        </Link>

        {/* 导师基本信息 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold text-2xl">
                    {mentor.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-6">
                  <h1 className="text-3xl font-bold text-gray-900">{mentor.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">{mentor.title}</p>
                  <p className="text-gray-600 mb-4">{mentor.department}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{mentor.office}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>{mentor.email}</span>
                    </div>
                    {mentor.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{mentor.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-2 text-2xl font-bold text-gray-900">{mentor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">({mentor.reviewCount} 评价)</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">指导学生</span>
                      <span className="font-medium">{mentor.studentCount} 人</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        mentor.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {mentor.isAvailable ? '可接受新学生' : '暂不接受'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">个人简介</h3>
              <p className="text-gray-600 leading-relaxed">{mentor.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">研究方向</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.researchFields.map((field, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 标签页内容 */}
        <MentorDetailTabs mentor={mentor} reviews={reviews} />
      </div>
    </div>
  );
}
