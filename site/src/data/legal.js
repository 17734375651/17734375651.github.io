/** Public, bounded explanations for the website and software offering. */
export const LEGAL_PUBLICATION = Object.freeze({
  targetRoutes: ['/legal/privacy/', '/legal/service/'],
  pageMode: '公开说明',
  recommendedFooterLinks: ['数据处理与隐私说明', '软件服务与授权边界'],
})

export const LEGAL_PAGES = [
  {
    id: 'privacy',
    route: '/legal/privacy/',
    title: '数据处理与隐私说明｜方寸有序',
    status: 'public-boundary',
    scope: '说明官网页面、需求摘要、浏览器剪贴板与用户主动发起的微信或电话沟通。',
    copy: {
      topNotice: '本页说明当前官网已经公开的信息处理方式；站外沟通以你主动发送的内容和双方确认的范围为准。',
      dataProcessingHeading: '一、当前页面如何处理信息',
      dataProcessingParagraphs: [
        '定制需求页用于填写业务类型、目前最耗时的工作环节、可提供的资料、期望的交付结果和补充要求。页面只在当前浏览器中生成可复制的微信需求摘要，不自动提交、不上传、不保存这些输入。',
        '复制摘要时，页面会调用浏览器剪贴板权限。权限未开放时，页面会选中摘要，便于手动复制；复制后由你自行打开微信粘贴并发送。',
        '正式客户端采用本地优先方式运行，官网不接收业务文件；产品演示使用整理后的示例参数。',
      ],
      privacyHeading: '二、页面与站外沟通',
      privacyParagraphs: [
        '当前官网不设置账号注册、在线支付或业务文件上传流程。页面输入仅用于当前页面生成摘要。',
        '如果你主动通过微信、电话或公开下载页面发送信息，相应信息会进入你选择的站外渠道。建议只发送完成咨询或服务所必需的内容。',
      ],
      contactAndRightsHeading: '三、联系与请求',
      contactAndRightsParagraphs: [
        '如需咨询页面信息处理方式，可通过电话 17734375651 联系，微信同号。',
        '在未明确需要前，请勿发送身份证明、敏感信息或真实业务文件。',
      ],
    },
  },
  {
    id: 'service-license',
    route: '/legal/service/',
    title: '软件服务与授权边界｜方寸有序',
    status: 'public-boundary',
    scope: '说明三款正式软件、方寸有序 ERP 预约体验、个性化定制以及当前公开的下载与授权范围。',
    copy: {
      topNotice: '本页汇总当前公开的价格、体验、下载与授权范围；具体购买和定制内容以双方确认的信息为准。',
      serviceHeading: '一、产品与体验状态',
      serviceParagraphs: [
        '标签印刷排版计划、方寸有序胀色裁切、方寸 PDF 配印助手三款正式软件可分别购买、独立使用；每台电脑首次可体验 1 小时。',
        '标签印刷排版计划为 ¥199 / 年、下载验收中；方寸有序胀色裁切为 ¥799 / 年、已提供核验下载；方寸 PDF 配印助手为 ¥599 / 年、下载验收中。',
        '方寸有序 ERP 为重点新品，当前仅提供预约体验，不公开正式价格或安装包。',
      ],
      licenseHeading: '二、授权范围',
      licenseParagraphs: [
        '正式软件按年授权；客户端内可查看体验、购买和离线激活状态。当前公开年度价格对应 365 天。',
        '离线授权绑定产品与设备。设备数量、换机、续期、更新或支持等具体事项，请在购买前通过电话或微信确认。',
      ],
      downloadHeading: '三、公开下载状态',
      downloadParagraphs: [
        '方寸有序胀色裁切 1.2.11 提供 Windows x86 公开包，页面列出约 64.6 MB 文件大小与 SHA-256 校验值，下载前可逐项核对。',
        '标签印刷排版计划与方寸 PDF 配印助手仍在完成发布确认；方寸有序 ERP 当前没有公开安装包。',
      ],
      customHeading: '四、个性化定制',
      customParagraphs: [
        '定制需求页只在当前页面生成可复制摘要，不自动上传或提交资料。定制设计及首个可用版本 ¥499 起，正式版年费根据功能复杂度报价。',
        '具体范围、里程碑、交付物、验收、维护和后续费用，在开始前另行确认。',
      ],
    },
  },
]

export const LEGAL_BY_ROUTE = Object.fromEntries(LEGAL_PAGES.map((page) => [page.route, page]))
export const legalPages = LEGAL_PAGES

export function getLegalPage(route) {
  const normalized = route.endsWith('/') ? route : `${route}/`
  return LEGAL_BY_ROUTE[normalized] ?? null
}
