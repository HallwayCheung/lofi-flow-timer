<div align="center">

# Lofi Flow Timer

**一款沉浸式、极简的番茄钟计时器，专为深度工作和心流状态设计。**

基于 React 19、Vite、Tailwind CSS v4 和 Framer Motion 构建。

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br/>

</div>

---

## 功能特性

### 核心计时器

- **番茄钟循环** — 25 分钟专注 / 5 分钟休息，自动切换阶段
- **长休息** — 每完成 4 次专注后自动进入 15 分钟长休息
- **自定义时长** — 专注：15 / 25 / 30 / 45 / 60 分钟，休息：5 / 10 / 15 分钟
- **自动开始** — 可选自动开始下一阶段
- **精准倒计时** — 基于 `Date.now()` 的抗漂移计时器，切换标签页后依然准确
- **标签页标题同步** — 浏览器标签页实时显示倒计时

### 沉浸式音频

- **白噪音** — 雨声、咖啡馆、壁炉三种环境音效
- **音量控制** — 通过下拉菜单或设置面板调节音量
- **平滑渐变** — 800ms 三次缓出音量过渡，零音频爆音
- **完成提示音** — Web Audio API 合成的大三和弦通知音

### 视觉设计

- **毛玻璃 UI** — 磨砂玻璃卡片、按钮和面板，多层阴影
- **环形进度条** — SVG 渐变描边环，带发光滤镜和动画端点
- **环境粒子** — 18 个浮动散景圆点，随模式切换变色
- **动态背景** — 专注时深紫渐变，休息时青绿渐变，2 秒平滑过渡
- **胶片颗粒** — SVG 分形噪点纹理，模拟模拟质感
- **完成庆祝** — 会话结束时粒子爆发和环形脉冲动画
- **响应式** — 适配手机竖屏到超宽桌面

### 效率功能

- **会话追踪** — 4 点循环指示器，带发光动画
- **每日统计** — 已完成番茄数和总专注分钟数，持久化到 localStorage
- **励志语录** — 16 条精选中文语录，每轮切换
- **快捷键** — `空格` 播放/暂停，`R` 重置，`S` 跳过，`1-3` 选择噪音
- **设置面板** — 滑入式抽屉，集中管理所有配置

---

## 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** >= 9（或 pnpm / yarn）

### 安装

```bash
# 克隆仓库
git clone https://github.com/HallwayCheung/lofi-flow-timer.git
cd lofi-flow-timer

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

在浏览器中打开 [http://localhost:5173](http://localhost:5173)。

### 生产构建

```bash
npm run build
npm run preview  # 本地预览生产构建
```

### 添加白噪音音频

将 `.mp3` 文件放入 `public/audio/` 目录：

```
public/
  audio/
    rain.mp3      # 雨声
    cafe.mp3      # 咖啡馆
    fire.mp3      # 壁炉
```

应用会优雅地处理缺失的音频文件，UI 仍然完全可用。

---

## 快捷键

| 按键 | 功能 |
|------|------|
| `空格` | 播放 / 暂停 |
| `R` | 重置当前计时器 |
| `S` | 跳到下一阶段 |
| `1` | 切换雨声 |
| `2` | 切换咖啡馆噪音 |
| `3` | 切换壁炉噪音 |

> 输入框获得焦点时快捷键自动禁用。

---

## 项目结构

```
src/
├── App.jsx                     # 根组件 — 编排与状态连接
├── index.css                   # Tailwind v4、毛玻璃设计系统、自定义 range 输入
├── main.jsx                    # React 19 入口
│
├── components/
│   ├── Background.jsx          # 动画渐变 + 暗角 + 颗粒叠加
│   ├── CompletionEffect.jsx    # 会话结束粒子爆发
│   ├── Controls.jsx            # 播放 / 暂停 / 重置 / 跳过按钮
│   ├── KeyboardHints.jsx       # 桌面端快捷键提示
│   ├── ModeSwitcher.jsx        # 专注 / 休息切换药丸，带布局动画
│   ├── NoiseMenu.jsx           # 白噪音下拉菜单，带音量滑块
│   ├── Particles.jsx           # 18 个浮动散景环境粒子
│   ├── ProgressRing.jsx        # SVG 环形进度条，渐变描边
│   ├── QuoteDisplay.jsx        # 动画励志语录
│   ├── SessionDots.jsx         # 4 点番茄钟循环指示器
│   ├── Settings.jsx            # 滑入式设置抽屉
│   └── Timer.jsx               # 倒计时显示，带呼吸动画
│
└── hooks/
    ├── useAudio.js             # 音频播放、渐变过渡、音量状态
    ├── useKeyboardShortcuts.js # 全局键盘事件监听
    ├── useLocalStorage.js      # 通用 localStorage 持久化 hook
    └── useTimer.js             # 计时器逻辑、会话追踪、设置、长休息
```

### 设计决策

**计时器精度** — 使用 `Date.now()` + `setInterval(200ms)` 而非单纯依赖间隔计时。`endTimeRef` 存储绝对结束时间戳，即使浏览器标签页被节流或切到后台，倒计时依然准确。

**状态管理** — 所有状态集中在两个自定义 hook（`useTimer` 和 `useAudio`）中，无外部状态库。设置和每日统计通过轻量的 `useLocalStorage` hook 持久化到 `localStorage`。

**音频渐变** — 音量过渡使用 30ms `setInterval` 配合 800ms 三次缓出曲线，避免突变音量导致的咔嗒声和爆音。

**完成回调** — 基于 ref 的回调（`onCompleteRef`）在计时器归零时触发。这将计时器 hook 与庆祝效果、通知音等 UI 关注点解耦，避免闭包陈旧问题。

**CSS 架构** — 可复用的毛玻璃类（`.glass-card`、`.glass-btn`、`.glass-panel`、`.pill-active`）在 `index.css` 中定义设计系统，组件通过这些类配合 Tailwind 工具类进行布局。

---

## 技术栈

| 技术 | 角色 |
|------|------|
| [React 19](https://react.dev/) | UI 框架，支持并发特性 |
| [Vite 8](https://vite.dev/) | 构建工具，支持 HMR 和优化打包 |
| [Tailwind CSS v4](https://tailwindcss.com/) | 工具优先 CSS，`@theme` 配置 |
| [Framer Motion 12](https://www.framer.com/motion/) | 声明式动画和手势处理 |
| [Lucide React](https://lucide.dev/) | 图标库（可 tree-shake 的 SVG 图标） |

---

## 自定义

### 计时时长

修改 `src/hooks/useTimer.js` 中的默认值：

```js
const DEFAULT_SETTINGS = {
  focusDuration: 25 * 60,      // 25 分钟
  breakDuration: 5 * 60,       // 5 分钟
  longBreakDuration: 15 * 60,  // 4 轮后 15 分钟长休息
  autoStart: true,
  volume: 0.6,
  soundEnabled: true,
};
```

### 配色方案

编辑 `src/components/Background.jsx` 中的渐变定义：

```js
const gradients = {
  focus: { background: '...' },   // 专注时深紫色
  break: { background: '...' },   // 休息时青绿色
};
```

进度环颜色在 `src/components/ProgressRing.jsx` 中 — 修改 `#a78bfa`（专注）和 `#5eead4`（休息）十六进制值。

### 语录

在 `src/components/QuoteDisplay.jsx` 的 `QUOTES` 数组中添加或删除语录。

---

## 部署

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# 将 `dist/` 文件夹拖到 Netlify，或连接你的仓库
```

### GitHub Pages

```bash
npm run build
# 部署 `dist/` 目录
```

---

## 许可证

本项目基于 MIT 许可证 — 详见 [LICENSE](LICENSE) 文件。

---

<div align="center">

**为重视深度工作的人而生。**

*专注。呼吸。心流。*

</div>
