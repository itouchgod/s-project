'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Star, 
  BookOpen, 
  MapPin, 
  Mail, 
  Phone, 
  Award,
  FileText,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { realMentors, realReviews } from '@/data/realData';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function MentorDetailPage() {
  const params = useParams();
  const mentorId = params.id as string;
  
  const mentor = realMentors.find(m => m.id === mentorId);
  const reviews = realReviews.filter(r => r.mentorId === mentorId);

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'publications' | 'reviews'>('overview');

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

  const averageAspects = reviews.length > 0 ? {
    teaching: reviews.reduce((sum, r) => sum + r.aspects.teaching, 0) / reviews.length,
    research: reviews.reduce((sum, r) => sum + r.aspects.research, 0) / reviews.length,
    communication: reviews.reduce((sum, r) => sum + r.aspects.communication, 0) / reviews.length,
    support: reviews.reduce((sum, r) => sum + r.aspects.support, 0) / reviews.length,
  } : null;

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

        {/* 标签页导航 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: '概览', icon: BookOpen },
                { id: 'projects', label: '研究项目', icon: FileText },
                { id: 'publications', label: '发表论文', icon: Award },
                { id: 'reviews', label: '学生评价', icon: Star }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'projects' | 'publications' | 'reviews')}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* 概览标签页 */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* 教育背景 */}
                {mentor.education && mentor.education.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">教育背景</h3>
                    <div className="space-y-4">
                      {mentor.education.map((edu, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{edu.degree} - {edu.major}</h4>
                            <p className="text-sm text-gray-600">{edu.school}</p>
                          </div>
                          <span className="text-sm text-gray-500">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 工作经历 */}
                {mentor.experience && mentor.experience.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">工作经历</h3>
                    <div className="space-y-4">
                      {mentor.experience.map((exp, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900">{exp.position}</h4>
                          <p className="text-sm text-gray-600">{exp.organization}</p>
                          {exp.description && (
                            <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 获奖情况 */}
                {mentor.awards && mentor.awards.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">获奖情况</h3>
                    <div className="space-y-4">
                      {mentor.awards.map((award, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{award.title}</h4>
                            <p className="text-sm text-gray-600">{award.organization}</p>
                          </div>
                          <span className="text-sm text-gray-500">{award.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 评价统计 */}
                {averageAspects && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">评价统计</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: '教学能力', value: averageAspects.teaching },
                        { label: '研究指导', value: averageAspects.research },
                        { label: '沟通能力', value: averageAspects.communication },
                        { label: '支持程度', value: averageAspects.support }
                      ].map((aspect, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">{aspect.value.toFixed(1)}</div>
                          <div className="text-sm text-gray-600">{aspect.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 研究项目标签页 */}
            {activeTab === 'projects' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">研究项目</h3>
                {mentor.projects && mentor.projects.length > 0 ? (
                  <div className="space-y-6">
                    {mentor.projects.map((project, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            project.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {project.status === 'ongoing' ? '进行中' :
                             project.status === 'completed' ? '已完成' : '已取消'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">资助机构：</span>
                            {project.funding}
                          </div>
                          <div>
                            <span className="font-medium">角色：</span>
                            {project.role === 'principal' ? '负责人' :
                             project.role === 'co-principal' ? '共同负责人' : '参与者'}
                          </div>
                          <div>
                            <span className="font-medium">金额：</span>
                            {project.amount > 0 ? `¥${project.amount.toLocaleString()}` : '内部项目'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">暂无项目信息</p>
                )}
              </div>
            )}

            {/* 发表论文标签页 */}
            {activeTab === 'publications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">发表论文</h3>
                {mentor.publications && mentor.publications.length > 0 ? (
                  <div className="space-y-4">
                    {mentor.publications.map((pub, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{pub.title}</h4>
                        <p className="text-gray-600 mb-2">{pub.authors.join(', ')}</p>
                        <p className="text-sm text-gray-500 mb-2">{pub.journal} ({pub.year})</p>
                        {pub.doi && (
                          <a 
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 text-sm"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            查看原文
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">暂无发表论文</p>
                )}
              </div>
            )}

            {/* 学生评价标签页 */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">学生评价</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                {review.studentName.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-3">
                              <h4 className="font-medium text-gray-900">{review.studentName}</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{review.content}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {[
                            { label: '教学能力', value: review.aspects.teaching },
                            { label: '研究指导', value: review.aspects.research },
                            { label: '沟通能力', value: review.aspects.communication },
                            { label: '支持程度', value: review.aspects.support }
                          ].map((aspect, index) => (
                            <div key={index} className="text-center">
                              <div className="font-medium text-gray-900">{aspect.value}</div>
                              <div className="text-gray-600">{aspect.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">暂无学生评价</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
