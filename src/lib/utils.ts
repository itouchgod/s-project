import { type ClassValue, clsx } from "clsx";

/**
 * 合并CSS类名的工具函数
 * @param inputs - 类名数组
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 格式化日期
 * @param date - 日期对象或字符串
 * @param format - 格式类型
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'long' | 'year' | 'month-year' = 'short'
): string {
  const d = new Date(date);
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('zh-CN');
    case 'long':
      return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'year':
      return d.getFullYear().toString();
    case 'month-year':
      return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long'
      });
    default:
      return d.toLocaleDateString('zh-CN');
  }
}

/**
 * 格式化数字
 * @param num - 数字
 * @param type - 格式化类型
 * @returns 格式化后的数字字符串
 */
export function formatNumber(
  num: number,
  type: 'currency' | 'percentage' | 'decimal' | 'integer' = 'integer'
): string {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
      }).format(num);
    case 'percentage':
      return new Intl.NumberFormat('zh-CN', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(num / 100);
    case 'decimal':
      return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
      }).format(num);
    case 'integer':
    default:
      return new Intl.NumberFormat('zh-CN').format(num);
  }
}

/**
 * 生成随机ID
 * @param length - ID长度
 * @returns 随机ID字符串
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 防抖函数
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 * @param func - 要节流的函数
 * @param limit - 时间限制（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 深拷贝对象
 * @param obj - 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as Record<string, unknown>;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone((obj as Record<string, unknown>)[key]);
      }
    }
    return clonedObj as T;
  }
  return obj;
}

/**
 * 计算匹配分数
 * @param mentor - 导师信息
 * @param preferences - 学生偏好
 * @returns 匹配分数 (0-100)
 */
export function calculateMatchScore(
  mentor: { researchFields: string[]; tags?: string[]; rating: number; isAvailable: boolean },
  preferences: { researchFields?: string[]; teachingStyle?: string[]; minRating?: number }
): number {
  let score = 0;
  let totalWeight = 0;

  // 研究方向匹配 (权重: 40%)
  if (preferences.researchFields && preferences.researchFields.length > 0) {
    const fieldMatch = mentor.researchFields.some((field: string) =>
      preferences.researchFields!.includes(field)
    );
    score += fieldMatch ? 40 : 0;
    totalWeight += 40;
  }

  // 教学风格匹配 (权重: 25%)
  if (preferences.teachingStyle && preferences.teachingStyle.length > 0) {
    const styleMatch = preferences.teachingStyle.some((style: string) =>
      mentor.tags?.includes(style) || false
    );
    score += styleMatch ? 25 : 0;
    totalWeight += 25;
  }

  // 评分匹配 (权重: 20%)
  if (preferences.minRating) {
    const ratingScore = Math.min(20, (mentor.rating / 5) * 20);
    score += ratingScore;
    totalWeight += 20;
  }

  // 可用性匹配 (权重: 15%)
  if (mentor.isAvailable) {
    score += 15;
    totalWeight += 15;
  }

  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
}

/**
 * 验证邮箱格式
 * @param email - 邮箱地址
 * @returns 是否为有效邮箱
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证手机号格式
 * @param phone - 手机号
 * @returns 是否为有效手机号
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 截断文本
 * @param text - 原始文本
 * @param maxLength - 最大长度
 * @param suffix - 后缀
 * @returns 截断后的文本
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + suffix;
}

/**
 * 获取文件扩展名
 * @param filename - 文件名
 * @returns 文件扩展名
 */
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

/**
 * 格式化文件大小
 * @param bytes - 字节数
 * @returns 格式化后的文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
