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
    scope: '说明六款正式软件、个性化定制以及当前公开的下载与授权范围。',
    copy: {
      topNotice: '本页汇总当前公开的价格、体验、下载与授权范围；具体购买和定制内容以双方确认的信息为准。',
      serviceHeading: '一、产品与体验状态',
      serviceParagraphs: [
        '标签印刷排版计划、方寸有序胀色裁切、方寸有序多尺寸胀色裁切、方寸 PDF 配印助手四款印前工具可分别购买、独立使用；一小时体验适用于四款印前工具。',
        '方寸打包计算器为 ¥499 / 年，方寸有序记账软件为 ¥999 / 账号 / 年；打包计算器与记账软件按各自年度授权说明。一个账号对应一个企业账套主体。',
        '标签印刷排版计划 ¥199 / 年、方寸有序胀色裁切 ¥799 / 年、方寸有序多尺寸胀色裁切 ¥1499 / 年、方寸 PDF 配印助手 ¥599 / 年；六款产品均提供可核验的公开客户端与发布资料。',
      ],
      licenseHeading: '二、授权范围',
      licenseParagraphs: [
        '现有四款印前工具按产品与设备说明提供首次体验和年度授权；客户端内可查看体验、购买和离线激活状态。当前公开年度价格对应 365 天。',
        '打包计算器与记账软件按各自年度授权说明使用：打包计算器遵循产品客户端的设备授权规则；记账软件按账号授权，一个账号对应一个企业账套主体，不按设备数量重复计费。具体续期、更新或支持事项，请在购买前通过电话或微信确认。',
      ],
      downloadHeading: '三、公开下载状态',
      downloadParagraphs: [
        '标签印刷排版计划、方寸 PDF 配印助手与方寸有序记账软件提供 Windows 10/11 x64、Windows 7 x64 公开包；方寸有序胀色裁切 1.2.11 提供 Windows x86 公开包；方寸有序多尺寸胀色裁切 0.9.0 与方寸打包计算器 3.0.0 提供 Windows x64 公开包。',
        '六款正式软件的客户端、公开发布清单、发布记录与 SHA-256 校验文件均可直接下载。当前未进行数字签名的客户端请在下载后核对 SHA-256。',
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
