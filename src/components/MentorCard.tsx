import Link from 'next/link';
import { Star, Users, MapPin } from 'lucide-react';
import { Mentor } from '@/types';

interface MentorCardProps {
  mentor: Mentor;
  className?: string;
}

export default function MentorCard({ mentor, className = '' }: MentorCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-lg">
                {mentor.name.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
              <p className="text-sm text-gray-600">{mentor.title}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">{mentor.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{mentor.description}</p>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">研究方向</p>
          <div className="flex flex-wrap gap-1">
            {mentor.researchFields.slice(0, 3).map((field, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {field}
              </span>
            ))}
            {mentor.researchFields.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{mentor.researchFields.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{mentor.studentCount} 学生</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{mentor.department}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{mentor.reviewCount} 评价</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              mentor.isAvailable 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {mentor.isAvailable ? '可接受新学生' : '暂不接受'}
            </span>
          </div>
          <Link
            href={`/mentors/${mentor.id}`}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
          >
            查看详情 →
          </Link>
        </div>
      </div>
    </div>
  );
}
