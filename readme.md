## 项目概述

User-Agent生成器是一个轻量级的Web工具，用于快速生成符合各种浏览器、操作系统和设备类型的User-Agent字符串。这个工具通过简单直观的界面，允许用户自定义配置不同参数，实时预览生成结果，并提供复制和导出功能。

## 功能特性

- **多样化的浏览器支持**：支持Chrome、Firefox、Safari、Edge和Opera等主流浏览器
- **灵活的系统选择**：可选择Windows、macOS、Linux、Android和iOS操作系统
- **设备类型切换**：支持桌面设备和移动设备模式
- **自定义参数**：允许添加额外的自定义参数到生成的User-Agent中
- **实时预览**：配置更改时实时更新User-Agent预览
- **便捷的输出方式**：提供一键复制到剪贴板和导出为文本文件功能
- **响应式设计**：适配不同屏幕尺寸的设备
- **随机生成功能**：支持随机生成符合规则的User-Agent字符串
- **显示访问者真实UA**：初始加载时显示访问者的真实User-Agent
- **配置选项同步**：根据输入的User-Agent自动同步配置选项
- **优雅的Toast消息**：替换传统弹窗为非侵入式的Toast消息
- **拟态玻璃风格**：采用现代的Glassmorphism设计风格，提升视觉效果

## 安装步骤

该项目使用Vue 3 + TypeScript + Tailwind CSS技术栈，需要以下安装步骤：

1. 克隆或下载项目文件到本地
2. 确保您的计算机上已安装Node.js (v14.18+ 或 v16+)
3. 在项目根目录运行以下命令安装依赖：
   ```bash
   npm install
   ```
4. 启动开发服务器：
   ```bash
   npm run dev
   ```
5. 在浏览器中打开显示的本地地址即可使用

## 构建项目

如果需要构建生产版本，请运行：

```bash
npm run build
```

构建后的文件将位于 `dist` 目录中，可以部署到任何静态文件服务器。

## 使用方法

1. **浏览器类型选择**：从下拉菜单中选择所需的浏览器类型
2. **设置浏览器版本**：在输入框中输入或修改浏览器版本号
3. **选择操作系统**：从下拉菜单中选择目标操作系统
4. **选择设备类型**：选择桌面设备或移动设备选项
5. **添加自定义参数**：输入自定义参数并点击"添加"按钮（可选）
6. **随机生成**：点击"随机生成"按钮自动生成符合规则的User-Agent
7. **查看结果**：生成的User-Agent字符串将实时显示在预览区域
8. **复制或导出**：点击相应按钮将结果复制到剪贴板或导出为文本文件

## 技术实现

- **前端技术栈**：Vue 3 + TypeScript + Tailwind CSS
- **构建工具**：Vite
- **响应式设计**：使用Tailwind CSS的响应式前缀和网格系统
- **组件化结构**：使用Vue 3的Composition API和`<script setup>`语法
- **拟态玻璃风格**：使用Tailwind CSS的backdrop-blur和半透明背景实现
- **模块化结构**：分离的组件、样式和逻辑文件
- **本地存储**：无需后端存储，所有操作均在客户端完成

## 项目结构

```
├── src/
│   ├── App.vue         # 主应用组件
│   ├── main.ts         # 应用入口文件
│   └── style.css       # 全局样式和Tailwind配置
├── index.html          # HTML入口文件
├── package.json        # 项目配置和依赖
├── tsconfig.json       # TypeScript配置
├── vite.config.ts      # Vite配置
├── tailwind.config.js  # Tailwind CSS配置
└── .gitignore          # Git忽略文件配置
```

该项目采用现代前端工程化结构，使用Vue 3的Composition API和TypeScript提供类型安全，Tailwind CSS提供高效的样式开发体验。

## 常见问题解答（FAQ）

**Q: 生成的User-Agent字符串是否与真实浏览器完全一致？**

A: 本工具生成的User-Agent字符串基于标准模板，但可能与特定浏览器版本的确切字符串存在细微差异。对于大多数开发和测试场景，这些字符串已经足够使用。

**Q: 我可以添加多个自定义参数吗？**

A: 是的，您可以添加任意多个自定义参数。每个参数将以分号分隔添加到User-Agent字符串中。

**Q: 这个工具是否需要互联网连接？**

A: 不需要，该工具完全在本地运行，所有操作均在客户端完成，无需互联网连接。

**Q: 如何删除已添加的自定义参数？**

A: 点击参数标签右侧的关闭按钮即可删除对应的自定义参数。

**Q: 随机生成的User-Agent有什么规则？**

A: 随机生成功能会根据以下规则生成User-Agent：
- 随机选择浏览器类型（Chrome、Firefox、Safari、Edge、Opera）
- 根据浏览器类型生成符合规则的版本号
- 随机选择操作系统
- 根据操作系统自动选择合适的设备类型

**Q: 为什么初始加载时显示的是我的真实User-Agent？**

A: 为了提供更好的用户体验，工具会在初始加载时检测并显示访问者的真实User-Agent，并自动同步到配置选项中，方便用户基于真实UA进行修改。

## 开发说明

如需修改或扩展该项目，您可以编辑以下关键文件：

- **src/App.vue**：主应用组件，包含所有UI结构和业务逻辑
- **src/style.css**：全局样式和Tailwind CSS配置
- **src/main.ts**：应用入口文件

主要的功能模块包括：

- **模板定义**：在App.vue中的`templates`和`platformTemplates`对象中定义了不同浏览器和平台的User-Agent模板
- **生成逻辑**：`generateUA()`函数负责根据用户选择的参数生成最终的User-Agent字符串
- **随机生成**：`randomGenerate()`函数实现了随机生成符合规则的User-Agent功能
- **UA解析**：`parseUA()`函数实现了根据输入的User-Agent自动同步配置选项的功能
- **响应式设计**：使用Tailwind CSS的响应式前缀（sm:, md:, lg:）实现适配不同屏幕尺寸的布局
- **拟态玻璃风格**：在style.css中定义了`.glass-card`、`.glass-button`和`.glass-input`等类，实现了现代的Glassmorphism设计风格

## 联系方式

如果您有任何问题、建议或需要支持，请通过以下方式联系：

- 邮箱：[qxbk@qq.com](mailto:qxbk@qq.com)
- GitHub：[https://github.com/scfcn/ua-g](https://github.com/scfcn/ua-g)

## 许可证

该项目采用MIT许可证开源，您可以自由使用、修改和分发。

---

感谢您使用User-Agent生成器工具！如有任何反馈或贡献，我们将不胜感激。