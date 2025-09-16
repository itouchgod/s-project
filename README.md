# 大学导师选择分析平台

一个基于 Next.js 构建的现代化导师选择分析平台，帮助大学生根据个人需求和导师特点做出最佳选择。

## 🚀 项目特性

- **现代化UI设计** - 基于 Tailwind CSS 的响应式界面
- **数据分析可视化** - 使用 Recharts 展示导师数据对比
- **智能匹配算法** - 根据学生偏好和导师特点进行智能推荐
- **实时搜索过滤** - 快速找到符合要求的导师
- **移动端适配** - 完美支持手机和平板设备
- **TypeScript支持** - 类型安全，开发体验更佳

## 🛠️ 技术栈

- **前端框架**: Next.js 15.5.3 (App Router)
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS 4.0
- **UI组件**: Headless UI + Heroicons
- **图表库**: Recharts
- **图标库**: Lucide React
- **代码规范**: ESLint
- **部署平台**: Vercel

## 📦 安装与运行

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000) 查看应用

### 构建生产版本
```bash
npm run build
npm start
```

### 代码检查
```bash
npm run lint
```

## 🏗️ 项目结构

```
s-project/
├── src/
│   ├── app/                 # Next.js App Router 页面
│   │   ├── globals.css     # 全局样式
│   │   ├── layout.tsx      # 根布局组件
│   │   └── page.tsx        # 首页
│   ├── components/         # 可复用组件
│   ├── lib/               # 工具函数和配置
│   ├── types/             # TypeScript 类型定义
│   └── data/              # 静态数据文件
├── public/                # 静态资源
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.js     # Tailwind CSS 配置
└── next.config.ts         # Next.js 配置
```

## 🎯 功能模块

### 1. 导师信息管理
- 导师基本信息展示
- 研究方向分类
- 学术成果统计
- 学生评价系统

### 2. 智能匹配系统
- 基于兴趣爱好的匹配
- 学术能力评估
- 研究方向匹配度分析
- 个性化推荐算法

### 3. 数据分析面板
- 导师热度统计
- 研究方向分布图
- 学生选择趋势分析
- 对比分析工具

### 4. 搜索与筛选
- 多维度搜索功能
- 实时筛选器
- 排序选项
- 收藏夹功能

## 🚀 部署说明

### Vercel 部署
1. 将代码推送到 GitHub 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量（如需要）
4. 自动部署完成

### 环境变量配置
在项目根目录创建 `.env.local` 文件：
```env
# 数据库连接（如使用）
DATABASE_URL=your_database_url

# API 密钥（如需要）
API_KEY=your_api_key
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 开发计划

- [ ] 用户认证系统
- [ ] 数据库集成
- [ ] 实时通知功能
- [ ] 移动端 App
- [ ] 多语言支持
- [ ] 高级分析功能

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 项目 Issues: [GitHub Issues](https://github.com/itouchgod/s-project/issues)
- 邮箱: ukluocn@gmail.com

---

**注意**: 这是一个教育项目，仅供学习和研究使用。在实际应用中，请确保遵守相关法律法规和学校政策。