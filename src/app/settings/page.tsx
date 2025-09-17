'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Save, RotateCcw, Download, Upload, Settings as SettingsIcon, BookOpen } from 'lucide-react';
import { UserSettings } from '@/types/dataset';
import { getSettings, saveSettings, exportData, importData, clearAllData } from '@/lib/storage';
import { validateWeights, normalizeWeights, DEFAULT_WEIGHTS } from '@/lib/scoring';
import Navigation from '@/components/Navigation';

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
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
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'scoring' | 'display' | 'data'>('scoring');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    try {
      const savedSettings = getSettings();
      setSettings(savedSettings);
    } catch (error) {
      console.error('加载设置失败:', error);
      setMessage({ type: 'error', text: '加载设置失败' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // 验证权重
      if (!validateWeights(settings.scoringWeights)) {
        setMessage({ type: 'error', text: '评分权重总和必须为1' });
        return;
      }

      // 标准化权重
      const normalizedWeights = normalizeWeights(settings.scoringWeights);
      const updatedSettings = {
        ...settings,
        scoringWeights: normalizedWeights,
      };

      saveSettings(updatedSettings);
      setSettings(updatedSettings);
      setMessage({ type: 'success', text: '设置保存成功' });
    } catch (error) {
      console.error('保存设置失败:', error);
      setMessage({ type: 'error', text: '保存设置失败' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings({
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
    });
    setMessage({ type: 'success', text: '设置已重置为默认值' });
  };

  const handleExport = () => {
    try {
      const data = exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mentor-project-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: '数据导出成功' });
    } catch (error) {
      console.error('导出数据失败:', error);
      setMessage({ type: 'error', text: '导出数据失败' });
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const success = importData(data);
        if (success) {
          loadSettings();
          setMessage({ type: 'success', text: '数据导入成功' });
        } else {
          setMessage({ type: 'error', text: '数据格式不正确' });
        }
      } catch (error) {
        console.error('导入数据失败:', error);
        setMessage({ type: 'error', text: '导入数据失败' });
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
      clearAllData();
      loadSettings();
      setMessage({ type: 'success', text: '所有数据已清空' });
    }
  };

  const updateProjectWeight = (dimension: string, value: number) => {
    setSettings({
      ...settings,
      scoringWeights: {
        ...settings.scoringWeights,
        project: {
          ...settings.scoringWeights.project,
          [dimension]: value,
        },
      },
    });
  };

  const updateMentorWeight = (dimension: string, value: number) => {
    setSettings({
      ...settings,
      scoringWeights: {
        ...settings.scoringWeights,
        mentor: {
          ...settings.scoringWeights.mentor,
          [dimension]: value,
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载设置中...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>设置 - 大学导师选择分析平台</title>
        <meta name="description" content="配置评分权重、显示偏好和数据管理选项" />
        <meta name="keywords" content="设置,评分权重,显示偏好,数据管理" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3" />
            设置
          </h1>
          <p className="mt-2 text-gray-600">
            配置评分权重、显示偏好和数据管理选项
          </p>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* 标签页 */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('scoring')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scoring'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                评分权重
              </button>
              <button
                onClick={() => setActiveTab('display')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'display'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                显示偏好
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'data'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                数据管理
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* 评分权重设置 */}
            {activeTab === 'scoring' && (
              <div className="space-y-8">
                {/* 项目评分权重 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">项目评分权重</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(settings.scoringWeights.project).map(([dimension, weight]) => (
                      <div key={dimension} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {dimension === 'technical' ? '技术难度' :
                           dimension === 'innovation' ? '创新性' :
                           dimension === 'feasibility' ? '可行性' :
                           dimension === 'impact' ? '影响力' :
                           dimension === 'learning' ? '学习价值' : dimension}
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={weight}
                            onChange={(e) => updateProjectWeight(dimension, parseFloat(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium text-gray-900 w-12">
                            {(weight * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      项目评分权重总和: {(Object.values(settings.scoringWeights.project).reduce((sum, w) => sum + w, 0) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* 导师评分权重 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">导师评分权重</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(settings.scoringWeights.mentor).map(([dimension, weight]) => (
                      <div key={dimension} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {dimension === 'expertise' ? '专业能力' :
                           dimension === 'teaching' ? '教学能力' :
                           dimension === 'support' ? '支持程度' :
                           dimension === 'communication' ? '沟通能力' :
                           dimension === 'availability' ? '可用性' : dimension}
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={weight}
                            onChange={(e) => updateMentorWeight(dimension, parseFloat(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium text-gray-900 w-12">
                            {(weight * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      导师评分权重总和: {(Object.values(settings.scoringWeights.mentor).reduce((sum, w) => sum + w, 0) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 显示偏好设置 */}
            {activeTab === 'display' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    主题
                  </label>
                  <select
                    value={settings.displayPreferences.theme}
                    onChange={(e) => setSettings({
                      ...settings,
                      displayPreferences: {
                        ...settings.displayPreferences,
                        theme: e.target.value as 'light' | 'dark'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="light">浅色主题</option>
                    <option value="dark">深色主题</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    语言
                  </label>
                  <select
                    value={settings.displayPreferences.language}
                    onChange={(e) => setSettings({
                      ...settings,
                      displayPreferences: {
                        ...settings.displayPreferences,
                        language: e.target.value as 'zh' | 'en'
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="zh">中文</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    每页显示项目数
                  </label>
                  <select
                    value={settings.displayPreferences.itemsPerPage}
                    onChange={(e) => setSettings({
                      ...settings,
                      displayPreferences: {
                        ...settings.displayPreferences,
                        itemsPerPage: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    默认排序方式
                  </label>
                  <select
                    value={settings.displayPreferences.defaultSort}
                    onChange={(e) => setSettings({
                      ...settings,
                      displayPreferences: {
                        ...settings.displayPreferences,
                        defaultSort: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="rating-desc">评分：高到低</option>
                    <option value="rating-asc">评分：低到高</option>
                    <option value="name-asc">名称：A-Z</option>
                    <option value="name-desc">名称：Z-A</option>
                  </select>
                </div>
              </div>
            )}

            {/* 数据管理 */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">数据导出</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    导出所有本地数据，包括对比列表、设置和收藏
                  </p>
                  <button
                    onClick={handleExport}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    导出数据
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">数据导入</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    从文件导入数据，将覆盖当前所有本地数据
                  </p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">清空数据</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    清空所有本地数据，包括对比列表、设置和收藏。此操作不可恢复！
                  </p>
                  <button
                    onClick={handleClearData}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    清空所有数据
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? '保存中...' : '保存设置'}
          </button>
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
