# 官网双板块实施计划

**Goal:** 在官网上线工作流与印刷排版板块，并完成实际视觉、交互与发布核验。
**Architecture:** 统一分类数据驱动 React、静态路由、下载分组；实业客户端规划单独建模。
**Tech Stack:** React 19、Vite 6、Node test、GitHub Pages。
**Spec:** site/docs/superpowers/specs/2026-09-13-product-domains-design.md

## 全局约束
保留七款产品、28 个公开文件、三条视频、26% 图标圆角；不修改客户端、许可和价格。打包计算器不恢复；ERP 仅出现在明确标注的未来规划中。起点 76ff389。

## 任务 1：分类与静态页面
- [x] 新增 tests/product-domains.test.mjs，验证固定的 2+5 分类、同一对象引用、19 路由、28 下载、规划分离；首次运行记录缺失静态分组导致的 2 项失败。
- [x] data/product-domains.js 导出 PRODUCT_DOMAINS、getProductsByDomain(id)、getDomainByProductId(id)、WORKFLOW_ROADMAP；products.js 仅增加 categoryId。
- [x] site.js 和 generate-route-pages.mjs 派生两个新板块及 SEO；静态卡片和下载条目按 data-domain 分组。
- [x] navigation.js 将两个新板块归入产品高亮。
- [x] 运行 `node --test tests/product-domains.test.mjs` 验证分类、页面和导航。

## 任务 2：页面与视觉
- [x] App.jsx 添加双入口、分组目录、板块详情、规划面板、面包屑及下载分组；共享数据接口与任务 1 一致。
- [x] styles.css 采用现有品牌的深浅分区，收敛标题与空间，保留功能控件和媒体；补焦点、窄屏、减少动画样式。
- [x] 截图审查：首页→工作流→印刷排版→产品→下载；分别检查桌面、390px、320px，验证无溢出/嵌套链接/失效标题引用。

## 任务 3：回归与交付
- [x] npm test、npm run publish:pages、npm run test:sites；七产品除 categoryId 外与基线逐字段相等。
- [x] 独立 Astra 审查源文件和本轮实际截图；修复影响归类、点击与可读性的问题。
- [ ] 保留原始基线 ZIP、完整更新 ZIP、Git patch、精确测试记录及回滚脚本；在隔离副本测试恢复基线。
- [ ] 只提交当前站点改动，以正常快进更新官网；核验部署成功和线上页面实际效果。网络临时失败重试已有流程，不丢失当前工作。
