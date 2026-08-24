# 申泽跨境贸易 · UI 原型（静态托管源）

本仓库为跨境贸易服务平台的 UI 原型静态站点，可直接部署到 EdgeOne Pages / GitHub Pages / 任意静态托管。

## 目录结构
- `index.html` —— 门户导航页，跳转到下面两套原型
- `bj6/` —— 扁平总览版（32 页同级目录，来源 ui-prototype）
- `bj10/` —— 嵌套 FR 编号版（seller / buyer / admin 三目录，带功能编号，来源 prototype-bridge）

## 内容
- 管理后台 Web：12 页
- 卖家端小程序：14 页
- 买家端小程序（默认英文）：6 页
共 32 页。

## 部署（EdgeOne Pages 示例）
1. 腾讯云控制台 → EdgeOne Pages → 通过 Git 部署 → 连接本仓库
2. 构建命令留空（纯静态），输出目录为仓库根
3. 部署后添加自定义域名并配置 CNAME
