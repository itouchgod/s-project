// 本地存储管理工具
// 处理权重、评分、对比清单、导入导出等功能

import { 
  Dataset, 
  Comparison, 
  UserSettings, 
  LocalStorageData,
  ProjectScore,
  MentorScore 
} from '@/types/dataset';
import { DEFAULT_WEIGHTS } from './scoring';

const STORAGE_KEYS = {
  COMPARISONS: 'mentor-project-comparisons',
  SETTINGS: 'mentor-project-settings',
  FAVORITES: 'mentor-project-favorites',
  HISTORY: 'mentor-project-history',
  IMPORTED_DATA: 'mentor-project-imported-data',
  PROJECT_SCORES: 'mentor-project-scores',
  MENTOR_SCORES: 'mentor-mentor-scores',
} as const;

// 获取本地存储数据
export function getLocalStorageData(): LocalStorageData {
  return {
    comparisons: getComparisons(),
    settings: getSettings(),
    favorites: getFavorites(),
    history: getHistory(),
    importedData: getImportedData(),
  };
}

// 保存本地存储数据
export function saveLocalStorageData(data: Partial<LocalStorageData>): void {
  if (data.comparisons) saveComparisons(data.comparisons);
  if (data.settings) saveSettings(data.settings);
  if (data.favorites) saveFavorites(data.favorites);
  if (data.history) saveHistory(data.history);
  if (data.importedData) saveImportedData(data.importedData);
}

// 对比管理
export function getComparisons(): Comparison[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPARISONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveComparisons(comparisons: Comparison[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPARISONS, JSON.stringify(comparisons));
  } catch (error) {
    console.error('保存对比数据失败:', error);
  }
}

export function addComparison(comparison: Comparison): void {
  const comparisons = getComparisons();
  comparisons.push(comparison);
  saveComparisons(comparisons);
}

export function updateComparison(id: string, updates: Partial<Comparison>): void {
  const comparisons = getComparisons();
  const index = comparisons.findIndex(c => c.id === id);
  if (index !== -1) {
    comparisons[index] = { ...comparisons[index], ...updates };
    saveComparisons(comparisons);
  }
}

export function deleteComparison(id: string): void {
  const comparisons = getComparisons();
  const filtered = comparisons.filter(c => c.id !== id);
  saveComparisons(filtered);
}

// 设置管理
export function getSettings(): UserSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    console.error('读取设置失败');
  }
  
  // 返回默认设置
  return {
    scoringWeights: DEFAULT_WEIGHTS,
    displayPreferences: {
      theme: 'light',
      language: 'zh',
      itemsPerPage: 12,
      defaultSort: 'rating-desc',
    },
    filters: {
      departments: [],
      researchFields: [],
      difficulty: [],
      status: [],
    },
  };
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('保存设置失败:', error);
  }
}

// 收藏管理
export function getFavorites(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (error) {
    console.error('保存收藏失败:', error);
  }
}

export function addToFavorites(id: string): void {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    saveFavorites(favorites);
  }
}

export function removeFromFavorites(id: string): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(f => f !== id);
  saveFavorites(filtered);
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

// 历史记录管理
export function getHistory(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('保存历史记录失败:', error);
  }
}

export function addToHistory(id: string): void {
  const history = getHistory();
  const filtered = history.filter(h => h !== id);
  filtered.unshift(id);
  // 只保留最近50条记录
  const limited = filtered.slice(0, 50);
  saveHistory(limited);
}

// 导入数据管理
export function getImportedData(): Dataset[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.IMPORTED_DATA);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveImportedData(datasets: Dataset[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.IMPORTED_DATA, JSON.stringify(datasets));
  } catch (error) {
    console.error('保存导入数据失败:', error);
  }
}

export function addImportedData(dataset: Dataset): void {
  const imported = getImportedData();
  imported.push(dataset);
  saveImportedData(imported);
}

// 评分缓存管理
export function getProjectScores(): ProjectScore[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECT_SCORES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveProjectScores(scores: ProjectScore[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECT_SCORES, JSON.stringify(scores));
  } catch (error) {
    console.error('保存项目评分失败:', error);
  }
}

export function getMentorScores(): MentorScore[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MENTOR_SCORES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveMentorScores(scores: MentorScore[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MENTOR_SCORES, JSON.stringify(scores));
  } catch (error) {
    console.error('保存导师评分失败:', error);
  }
}

// 数据导入导出
export function exportData(): string {
  const data = getLocalStorageData();
  return JSON.stringify(data, null, 2);
}

export function importData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData) as LocalStorageData;
    saveLocalStorageData(data);
    return true;
  } catch (error) {
    console.error('导入数据失败:', error);
    return false;
  }
}

// 清空所有数据
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// 获取存储使用情况
export function getStorageInfo(): {
  used: number;
  available: number;
  percentage: number;
} {
  let used = 0;
  Object.values(STORAGE_KEYS).forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      used += data.length;
    }
  });
  
  // 估算可用空间（通常为5-10MB）
  const available = 5 * 1024 * 1024; // 5MB
  const percentage = (used / available) * 100;
  
  return {
    used,
    available,
    percentage: Math.min(percentage, 100),
  };
}

// 数据验证
export function validateImportedData(data: any): data is LocalStorageData {
  try {
    // 基本结构验证
    if (!data || typeof data !== 'object') return false;
    
    // 验证必要字段
    const requiredFields = ['comparisons', 'settings', 'favorites', 'history'];
    return requiredFields.every(field => field in data);
  } catch {
    return false;
  }
}

// 数据迁移（版本升级时使用）
export function migrateData(): void {
  // 检查是否需要数据迁移
  const version = localStorage.getItem('data-version');
  if (!version || version !== '1.0.0') {
    // 执行迁移逻辑
    console.log('执行数据迁移...');
    
    // 保存新版本号
    localStorage.setItem('data-version', '1.0.0');
  }
}
