# markyang2020.github.io

这是 Mark 的个人官网项目，线上地址：

- <https://markyang2020.github.io/>

当前项目是一个基于 **Vite + React + TypeScript + Three.js** 的静态前端应用。代码推送到 GitHub 仓库后，会通过 GitHub Actions 自动构建并部署到 GitHub Pages。

## 项目结构

```text
.
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署 workflow
├── public/                        # 静态资源目录（如果有）
├── src/                           # React/Three.js 源码
├── index.html                     # Vite 入口 HTML
├── package.json                   # npm 脚本和依赖声明
├── package-lock.json              # npm 锁定依赖版本
├── tsconfig.json                  # TypeScript 配置
├── vite.config.ts                 # Vite 构建配置
└── README.md                      # 本说明文档
```

## 部署方式概览

本项目使用 **GitHub Pages + GitHub Actions** 部署。

整体流程如下：

1. 在本地修改源码。
2. 本地运行构建命令，确认没有错误。
3. 提交代码到 `main` 分支。
4. 推送到 GitHub：`markyang2020/markyang2020.github.io`。
5. GitHub Actions 自动运行 `.github/workflows/deploy.yml`。
6. workflow 在 GitHub 服务器上执行：安装依赖 → 构建 `dist/` → 上传 Pages artifact → 发布到 GitHub Pages。
7. 部署完成后，访问 <https://markyang2020.github.io/> 查看最新网站。

## 前置准备

### 1. 本地环境

需要安装：

- Git
- Node.js 22 或兼容版本
- npm
- GitHub CLI（可选，但推荐）：`gh`

检查命令：

```bash
git --version
node --version
npm --version
gh --version
```

本项目 workflow 使用 Node.js 22，因此本地最好也使用 Node.js 22，避免本地构建和 GitHub Actions 构建结果不一致。

### 2. GitHub 权限

你需要拥有仓库 `markyang2020/markyang2020.github.io` 的写入权限。

推荐使用 GitHub CLI 登录：

```bash
gh auth login
```

登录后检查状态：

```bash
gh auth status
```

如果不用 `gh`，也可以使用 Git Credential Manager、SSH key 或 GitHub personal access token。注意：GitHub 不再支持用账户密码直接 `git push`。

### 3. GitHub Pages 设置

仓库需要启用 GitHub Pages，并使用 GitHub Actions 作为部署来源。

在 GitHub 页面中检查：

1. 打开仓库：<https://github.com/markyang2020/markyang2020.github.io>
2. 进入 **Settings → Pages**
3. Build and deployment 的 Source 应为 **GitHub Actions**
4. 部署成功后，页面会显示站点地址：<https://markyang2020.github.io/>

## 本地开发

### 1. 进入项目目录

```bash
cd /d/Project/ai_coding/room_3d
```

Windows 原生路径是：

```text
D:\Project\ai_coding\room_3d
```

### 2. 安装依赖

首次拉取项目后运行：

```bash
npm ci
```

如果没有 `package-lock.json` 或需要重新生成依赖锁，也可以使用：

```bash
npm install
```

日常协作推荐优先使用 `npm ci`，因为它会严格按照 `package-lock.json` 安装依赖，和 GitHub Actions 的行为一致。

### 3. 启动本地开发服务

```bash
npm run dev
```

Vite 会启动一个本地开发服务器，通常地址类似：

```text
http://localhost:5173/
```

本地开发服务适合调试 UI、交互、3D 模型和样式，但它不是正式部署。

### 4. 本地生产构建

修改代码后，推送前建议先运行：

```bash
npm run build
```

该命令会执行：

```bash
tsc && vite build
```

含义：

- `tsc`：执行 TypeScript 类型检查
- `vite build`：生成生产环境静态文件到 `dist/`

如果这里报错，GitHub Actions 里大概率也会失败，需要先修复再提交。

### 5. 本地预览生产构建

构建成功后可运行：

```bash
npm run preview
```

这会用 Vite 预览 `dist/` 构建产物，用来确认生产版本页面是否正常。

## 修改代码后的重新部署流程

日常更新网站时，按下面步骤操作。

### 1. 查看当前 Git 状态

```bash
git status --short --branch
```

确认当前在 `main` 分支，并了解有哪些文件被修改。

### 2. 修改代码

常见修改位置：

- `src/`：主要应用源码
- `public/`：公开静态资源
- `index.html`：HTML 入口
- `vite.config.ts`：Vite 配置
- `.github/workflows/deploy.yml`：部署流程配置

### 3. 本地验证

```bash
npm run build
```

可选：

```bash
npm run preview
```

确认构建成功、页面正常后再提交。

### 4. 提交代码

```bash
git add .
git commit -m "Update website"
```

提交信息可以按实际内容改，例如：

```bash
git commit -m "Update 3D room configurator UI"
```

### 5. 推送到 GitHub

```bash
git push origin main
```

如果本机 Git 代理影响 GitHub 连接，可以临时绕过代理：

```bash
git -c http.proxy= -c https.proxy= push origin main
```

### 6. 等待 GitHub Actions 自动部署

推送成功后，GitHub 会自动触发部署 workflow。

查看最近 workflow：

```bash
gh run list --repo markyang2020/markyang2020.github.io --limit 5
```

等待某次运行完成：

```bash
gh run watch <RUN_ID> --repo markyang2020/markyang2020.github.io --exit-status
```

也可以在浏览器中查看：

- <https://github.com/markyang2020/markyang2020.github.io/actions>

### 7. 验证线上页面

部署成功后访问：

```text
https://markyang2020.github.io/
```

也可以用命令检查 HTTP 状态：

```bash
curl -I -L https://markyang2020.github.io/
```

返回 `200 OK` 表示网站可以访问。

## GitHub Actions workflow 说明

部署配置文件位于：

```text
.github/workflows/deploy.yml
```

当前内容的核心结构如下：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:
```

含义：

- `name`：workflow 名称，在 GitHub Actions 页面显示为 `Deploy to GitHub Pages`
- `on.push.branches: [main]`：当 `main` 分支有新 push 时自动运行
- `workflow_dispatch`：允许在 GitHub 页面手动点击运行

### 权限配置

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

含义：

- `contents: read`：允许 workflow 读取仓库源码
- `pages: write`：允许 workflow 发布到 GitHub Pages
- `id-token: write`：允许 GitHub Pages 部署动作进行 OIDC 身份验证

这些权限是 `actions/deploy-pages` 正常发布 Pages 所需的最小权限组合。

### 并发控制

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```

含义：

- 同一时间只管理一组 Pages 部署任务
- `cancel-in-progress: false` 表示不主动取消正在进行的部署

这样可以减少多个 push 连续发生时部署互相覆盖或中断的风险。

### build 任务

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

`build` 任务在 GitHub 提供的 Ubuntu 环境中运行。

主要步骤：

#### 1. Checkout

```yaml
- name: Checkout
  uses: actions/checkout@v4
```

拉取当前仓库代码到 GitHub Actions 运行环境。

#### 2. Setup Node

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm
```

安装 Node.js 22，并启用 npm 依赖缓存。

缓存的作用：

- 加快后续部署速度
- 避免每次都从零下载全部 npm 依赖

#### 3. Install dependencies

```yaml
- name: Install dependencies
  run: npm ci
```

严格按照 `package-lock.json` 安装依赖。

如果 `package-lock.json` 和 `package.json` 不一致，这一步会失败。因此修改依赖后，需要确保锁文件也提交到仓库。

#### 4. Build

```yaml
- name: Build
  run: npm run build
```

执行生产构建，生成 `dist/` 目录。

本项目的 `npm run build` 等价于：

```bash
tsc && vite build
```

#### 5. Upload artifact

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: dist
```

把 `dist/` 上传为 GitHub Pages artifact。

GitHub Pages 最终发布的是这个 artifact，而不是仓库根目录源码。

### deploy 任务

```yaml
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  needs: build
```

含义：

- `needs: build`：必须等 `build` 成功后才部署
- `environment.name: github-pages`：部署目标环境是 GitHub Pages
- `url`：部署完成后记录 Pages 地址

部署步骤：

```yaml
- name: Deploy to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v4
```

该 action 会把上一步上传的 Pages artifact 发布到 GitHub Pages。

## 如何手动触发部署

有时你可能没有新代码提交，但想重新部署一次，可以手动触发 workflow。

### 方式一：GitHub 页面操作

1. 打开：<https://github.com/markyang2020/markyang2020.github.io/actions>
2. 点击左侧 **Deploy to GitHub Pages**
3. 点击 **Run workflow**
4. 选择 `main` 分支
5. 点击运行

### 方式二：命令行触发

```bash
gh workflow run deploy.yml --repo markyang2020/markyang2020.github.io --ref main
```

查看运行状态：

```bash
gh run list --repo markyang2020/markyang2020.github.io --limit 5
```

等待完成：

```bash
gh run watch <RUN_ID> --repo markyang2020/markyang2020.github.io --exit-status
```

## 如何查看部署日志

列出最近运行：

```bash
gh run list --repo markyang2020/markyang2020.github.io --limit 10
```

查看某次运行详情：

```bash
gh run view <RUN_ID> --repo markyang2020/markyang2020.github.io
```

查看失败日志：

```bash
gh run view <RUN_ID> --repo markyang2020/markyang2020.github.io --log-failed
```

浏览器查看：

```text
https://github.com/markyang2020/markyang2020.github.io/actions
```

## 常见问题排查

### 1. `git push` 失败：认证错误

现象可能包括：

```text
Invalid username or token. Password authentication is not supported for Git operations.
```

原因：GitHub 不支持账号密码推送。

处理：

```bash
gh auth login
gh auth setup-git
git push origin main
```

### 2. `git push` 或 `git ls-remote` 网络异常

如果本机代理导致 GitHub HTTPS 连接异常，可以临时禁用 Git 代理：

```bash
git -c http.proxy= -c https.proxy= ls-remote https://github.com/markyang2020/markyang2020.github.io.git HEAD
```

推送时：

```bash
git -c http.proxy= -c https.proxy= push origin main
```

这只对当前命令生效，不会修改全局 Git 配置。

### 3. GitHub Actions 中 `npm ci` 失败

常见原因：

- `package.json` 修改了，但 `package-lock.json` 没更新
- 本地用 `npm install` 更新依赖后忘记提交 `package-lock.json`

处理：

```bash
npm install
npm run build
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin main
```

### 4. GitHub Actions 中 `npm run build` 失败

常见原因：

- TypeScript 类型错误
- 缺少依赖
- Vite 配置错误
- 代码在本地开发模式可运行，但生产构建失败

处理：先在本地运行同样命令：

```bash
npm run build
```

修复错误后再提交。

### 5. Actions 成功，但网站没有变化

可能原因：

- 浏览器缓存
- GitHub Pages 需要几十秒刷新
- 访问的不是正确地址
- GitHub Pages Source 没有设置为 GitHub Actions

处理：

1. 等待 30 秒到 2 分钟。
2. 强制刷新浏览器。
3. 检查 Actions 是否成功。
4. 检查 Pages 设置是否为 GitHub Actions。
5. 用 curl 检查线上 HTML：

```bash
curl -L https://markyang2020.github.io/ | head
```

### 6. 线上资源 404

如果页面打开但 JS/CSS 资源 404，检查：

- `vite.config.ts` 的 `base` 配置
- 构建产物中资源路径是否正确
- GitHub Pages 是否发布的是 `dist/`，而不是仓库根目录

当前仓库是用户主页仓库 `markyang2020.github.io`，站点部署在域名根路径 `/`，通常不需要设置子路径 base。

## 日常运维清单

每次更新前：

```bash
git status --short --branch
git pull --ff-only origin main
npm ci
```

修改后：

```bash
npm run build
```

确认没问题后：

```bash
git add .
git commit -m "Update website"
git push origin main
```

部署后：

```bash
gh run list --repo markyang2020/markyang2020.github.io --limit 5
curl -I -L https://markyang2020.github.io/
```

## 推荐维护原则

- 不要手动提交 `dist/`，让 GitHub Actions 自动构建并部署。
- 修改依赖时同时提交 `package.json` 和 `package-lock.json`。
- 推送前先运行 `npm run build`。
- 不要把密码、token、密钥写进源码或 README。
- 如果需要配置密钥，使用 GitHub Actions Secrets。
- 部署失败时先看 GitHub Actions 日志，不要盲目重复 push。

## 关键链接

- 线上网站：<https://markyang2020.github.io/>
- GitHub 仓库：<https://github.com/markyang2020/markyang2020.github.io>
- GitHub Actions：<https://github.com/markyang2020/markyang2020.github.io/actions>
- GitHub Pages 设置：<https://github.com/markyang2020/markyang2020.github.io/settings/pages>
