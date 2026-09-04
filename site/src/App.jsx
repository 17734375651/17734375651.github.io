import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Buildings,
  CaretRight,
  Check,
  CheckCircle,
  ClipboardText,
  Clock,
  Copy,
  DownloadSimple,
  Factory,
  FilePdf,
  FileText,
  FileXls,
  FlowArrow,
  Key,
  LockKey,
  List,
  Phone,
  PlayCircle,
  Plus,
  ShieldCheck,
  Storefront,
  Wrench,
  X,
} from '@phosphor-icons/react'

import { CONTENT_CATEGORIES, CONTENT_STATUS_LABELS } from './data/public-content.js'
import { LEGAL_BY_ROUTE } from './data/legal.js'
import { PRODUCTS, PRODUCT_STATUS_DESCRIPTIONS, getProductPublicFiles } from './data/products.js'
import { NAV_ITEMS, SITE, TRUST_POINTS } from './data/site.js'
import { SOLUTIONS } from './data/public-solutions.js'
import { getProductAction } from './lib/product-actions.js'
import { getActiveNavHref } from './lib/navigation.js'
import {
  buildRequirementSummary,
  getRequirementCompletion,
  normalizePrefill,
} from './lib/requirements.js'

const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((product) => [product.id, product]))
const SOLUTIONS_BY_ID = Object.fromEntries(SOLUTIONS.map((solution) => [solution.id, solution]))

const SCENARIO_TO_SOLUTION = {
  'graphic-print-shop': 'graphic-print-shop',
  'printing-shop': 'printing-shop',
  'small-and-medium-enterprise': 'small-and-medium-enterprise',
  'other-repetitive-workflows': 'other-repetitive-workflows',
}

const CONTENT_ROUTE_CONFIG = {
  '/updates/': { title: '产品更新', eyebrow: 'PRODUCT UPDATES', categoryId: 'product-updates' },
  '/guides/': { title: '能力说明', eyebrow: 'GUIDES & NOTES', categoryId: 'tutorials' },
  '/downloads/': { title: '下载资料', eyebrow: 'DOWNLOADS', categoryId: 'downloads' },
}

const pathForProduct = (productId) => `/products/${productId}/`

function normalizePath(pathname = '/') {
  if (pathname === '/') return '/'
  const cleanPath = pathname.replace(/\/+/g, '/')
  return cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`
}

function mediaPath(path) {
  if (!path) return ''
  return path.replace(/^\/media\//, '/assets/media/')
}

function IconForTrust({ index }) {
  const icons = [ShieldCheck, ClipboardText, Key, Clock]
  const Icon = icons[index % icons.length]
  return <Icon size={24} weight="duotone" aria-hidden="true" />
}

function IconForSolution({ id }) {
  if (id === 'graphic-print-shop') return <Storefront size={22} weight="duotone" aria-hidden="true" />
  if (id === 'printing-shop') return <Factory size={22} weight="duotone" aria-hidden="true" />
  if (id === 'small-and-medium-enterprise') return <Buildings size={22} weight="duotone" aria-hidden="true" />
  return <FlowArrow size={22} weight="duotone" aria-hidden="true" />
}

function IconForInput(label) {
  if (/Excel|表格|数量|成本/.test(label)) return <FileXls size={19} weight="duotone" aria-hidden="true" />
  if (/PDF/.test(label)) return <FilePdf size={19} weight="duotone" aria-hidden="true" />
  if (/文字|规则/.test(label)) return <FileText size={19} weight="duotone" aria-hidden="true" />
  return <ClipboardText size={19} weight="duotone" aria-hidden="true" />
}

function LinkButton({ href, children, variant = 'primary', className = '', onClick, ...props }) {
  return (
    <a className={`button button-${variant} ${className}`.trim()} href={href} onClick={onClick} {...props}>
      <span>{children}</span>
      {variant !== 'text' && <ArrowRight size={18} weight="bold" aria-hidden="true" />}
    </a>
  )
}

function Header({ dark = false }) {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const activeNavHref = getActiveNavHref(window.location.pathname, window.location.hash)

  const closeMenu = (focusTrigger = false) => {
    setOpen(false)
    if (focusTrigger) window.setTimeout(() => menuButtonRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu(true)
    }
    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`site-header ${dark ? 'site-header-dark' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="方寸有序首页" onClick={() => closeMenu()}>
          <span className="brand-mark brand-mark-software" aria-hidden="true"><img src={SITE.softwareIcon.image} alt="" width="54" height="54" /></span>
          <span className="brand-copy"><strong>方寸有序</strong><small>效率软件 · 有序经营</small></span>
        </a>
        <nav className="desktop-nav" aria-label="主导航">
          {NAV_ITEMS.map((item) => <a key={item.href} className={item.href === activeNavHref ? 'is-current' : undefined} href={item.href} aria-current={item.href === activeNavHref ? 'page' : undefined}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <LinkButton href="/products/" variant="small">查看成品软件</LinkButton>
          <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={open ? '关闭菜单' : '打开菜单'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={24} weight="bold" aria-hidden="true" /> : <List size={24} weight="bold" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className={`mobile-navigation ${open ? 'is-open' : ''}`} id="mobile-navigation" aria-hidden={!open}>
        <div className="container mobile-navigation-inner">
          <div className="mobile-navigation-head"><span>导航</span><button ref={closeButtonRef} className="icon-button" type="button" aria-label="关闭菜单" tabIndex={open ? 0 : -1} onClick={() => closeMenu(true)}><X size={22} weight="bold" aria-hidden="true" /></button></div>
          <nav aria-label="移动端主导航">{NAV_ITEMS.map((item) => <a key={item.href} className={item.href === activeNavHref ? 'is-current' : undefined} href={item.href} aria-current={item.href === activeNavHref ? 'page' : undefined} onClick={() => closeMenu()} tabIndex={open ? 0 : -1}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</nav>
          <LinkButton href="/custom/requirements/" onClick={() => closeMenu()} tabIndex={open ? 0 : -1}>描述你的需求</LinkButton>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-brand"><a className="brand" href="/" aria-label="返回方寸有序首页"><span className="brand-mark brand-mark-software" aria-hidden="true"><img src={SITE.softwareIcon.image} alt="" width="42" height="42" /></span><span className="brand-copy"><strong>方寸有序</strong><small>FANGCUN YOUXU STUDIO</small></span></a><p>把重复核算、反复整理与逐页核对，转成可执行、可复核的软件流程。</p><a className="contact-link" href="tel:17734375651"><Phone size={18} aria-hidden="true" />电话 17734375651（微信同号）</a></div>
        <div className="footer-column"><h2>产品中心</h2>{PRODUCTS.map((product) => <a key={product.id} href={pathForProduct(product.id)}>{product.name}</a>)}</div>
        <div className="footer-column"><h2>内容中心</h2><a href="/updates/">产品更新</a><a href="/guides/">能力说明</a><a href="/downloads/">下载资料</a><a href="/solutions/">行业方案</a></div>
        <div className="footer-column"><h2>服务与边界</h2><a href="/custom/requirements/">个性化定制</a><a href="/legal/privacy/">数据处理与隐私</a><a href="/legal/service/">软件服务与授权</a><a href="/#contact">联系我们</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} 方寸有序工作室</span><span>本地优先 · 可复核输出 · 授权边界清晰</span></div>
    </footer>
  )
}

function PageShell({ children, darkHeader = false, className = '' }) {
  return <div className={`app-shell ${className}`.trim()}><Header dark={darkHeader} />{children}<Footer /></div>
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" />为图文店、印刷店与中小企业打造</p>
          <h1 id="hero-title">把重复工作，<br />整理成<span>清晰可执行</span>的流程</h1>
          <p className="hero-lede">把输入、处理与输出梳理成可复核流程，让每一步都能检查、复核和追踪。</p>
          <div className="hero-actions">
            <LinkButton href="#solutions">选择业务场景</LinkButton>
            <LinkButton href="#products" variant="outline">查看成品软件</LinkButton>
          </div>
        </div>
        <div className="hero-media">
          <img src="/assets/generated/home-workflow-light.webp" alt="输入资料经过规则处理和人工复核后导出可复核结果的示例工作流" />
        </div>
      </div>
    </section>
  )
}

const HOME_SCENARIO_BENEFITS = [
  { title: '减少重复整理', detail: '以统一输入和规则减少来回抄录', icon: ClipboardText },
  { title: '降低出错返工', detail: '关键步骤保留人工复核入口', icon: ShieldCheck },
  { title: '保留复核依据', detail: '输出与处理结果便于再次检查', icon: CheckCircle },
]

function HomeScenarioTabs() {
  const initialId = SOLUTIONS_BY_ID['small-and-medium-enterprise']?.id ?? SOLUTIONS[0]?.id
  const [activeId, setActiveId] = useState(initialId)
  const tabRefs = useRef([])
  const activeSolution = SOLUTIONS_BY_ID[activeId] ?? SOLUTIONS[0]
  if (!activeSolution) return null

  const recommended = activeSolution.relatedProducts?.[0]
  const recommendedProduct = recommended ? PRODUCTS_BY_ID[recommended.productId] : null
  const recommendedAction = recommendedProduct ? getProductAction(recommendedProduct.status.effectiveStatus, recommendedProduct.id) : null
  const recommendedHref = recommendedProduct && recommendedAction
    ? (recommendedProduct.status.effectiveStatus === 'appointment' ? recommendedAction.href : `${recommendedProduct.route}${recommendedAction.href}`)
    : '/custom/requirements/'
  const steps = [
    { label: '输入资料', detail: activeSolution.commonInputs[0] ?? '整理现有资料' },
    { label: '规则处理', detail: activeSolution.keyProcessing[0] ?? '按既定规则处理' },
    { label: '人工复核', detail: '检查关键字段与处理结果' },
    { label: '导出结果', detail: activeSolution.verifiableOutputs[0] ?? '生成可复核结果' },
  ]
  const moveTab = (event, index) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? SOLUTIONS.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + SOLUTIONS.length) % SOLUTIONS.length
    setActiveId(SOLUTIONS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="home-scenario-explorer">
      <div className="home-scenario-tabs" role="tablist" aria-label="选择业务场景">
        {SOLUTIONS.map((solution, index) => (
          <button
            key={solution.id}
            ref={(node) => { tabRefs.current[index] = node }}
            className={`home-scenario-tab ${solution.id === activeId ? 'is-active' : ''}`}
            type="button"
            role="tab"
            aria-selected={solution.id === activeId}
            aria-controls={`home-scenario-panel-${solution.id}`}
            id={`home-scenario-tab-${solution.id}`}
            tabIndex={solution.id === activeId ? 0 : -1}
            onClick={() => setActiveId(solution.id)}
            onKeyDown={(event) => moveTab(event, index)}
          >
            <span className="home-scenario-tab-icon"><IconForSolution id={solution.id} /></span>
            <span><strong>{solution.label}</strong><small>{solution.currentStaticCard}</small></span>
          </button>
        ))}
      </div>
      <div className="home-scenario-panel" role="tabpanel" id={`home-scenario-panel-${activeSolution.id}`} aria-labelledby={`home-scenario-tab-${activeSolution.id}`} tabIndex={0}>
        <div className="home-scenario-workflow">
          <div className="home-scenario-panel-head">
            <p><span className="status-dot" />{activeSolution.label}工作流</p>
            <a href={recommendedHref}>{recommendedProduct ? `查看${recommendedProduct.shortName}` : '描述你的流程'} <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <ol className="home-flow-steps">
            {steps.map((step, index) => (
              <React.Fragment key={step.label}>
                <li><span>{index + 1}</span><strong>{step.label}</strong><small>{step.detail}</small></li>
                {index < steps.length - 1 && <ArrowRight className="home-flow-arrow" size={20} weight="bold" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </ol>
        </div>
        <div className="home-scenario-benefits" aria-label="流程目标">
          <p className="mini-label">流程目标</p>
          <div>
            {HOME_SCENARIO_BENEFITS.map((benefit) => {
              const BenefitIcon = benefit.icon
              return <article key={benefit.title}><BenefitIcon size={31} weight="duotone" aria-hidden="true" /><strong>{benefit.title}</strong><small>{benefit.detail}</small></article>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function SolutionTabs({ compact = false }) {
  const [activeId, setActiveId] = useState(SOLUTIONS[0]?.id)
  const tabRefs = useRef([])
  const activeSolution = SOLUTIONS_BY_ID[activeId] ?? SOLUTIONS[0]
  const recommended = activeSolution?.relatedProducts?.[0]
  const recommendedProduct = recommended ? PRODUCTS_BY_ID[recommended.productId] : null
  const recommendedAction = recommendedProduct ? getProductAction(recommendedProduct.status.effectiveStatus, recommendedProduct.id) : null
  const recommendedHref = recommendedProduct && recommendedAction
    ? (recommendedProduct.status.effectiveStatus === 'appointment' ? recommendedAction.href : `${recommendedProduct.route}${recommendedAction.href}`)
    : '/custom/requirements/'
  const moveTab = (event, index) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? SOLUTIONS.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + SOLUTIONS.length) % SOLUTIONS.length
    setActiveId(SOLUTIONS[next].id)
    tabRefs.current[next]?.focus()
  }
  if (!activeSolution) return null
  return <div className={`solution-explorer ${compact ? 'solution-explorer-compact' : ''}`}><div className="solution-tabs" role="tablist" aria-label="行业方案场景">{SOLUTIONS.map((solution, index) => <button key={solution.id} ref={(node) => { tabRefs.current[index] = node }} className={`solution-tab ${solution.id === activeId ? 'is-active' : ''}`} type="button" role="tab" aria-selected={solution.id === activeId} aria-controls={`solution-panel-${solution.id}`} id={`solution-tab-${solution.id}`} tabIndex={solution.id === activeId ? 0 : -1} onClick={() => setActiveId(solution.id)} onKeyDown={(event) => moveTab(event, index)}><IconForSolution id={solution.id} /><span><strong>{solution.label}</strong><small>{solution.currentStaticCard}</small></span></button>)}</div><div className="solution-panel" role="tabpanel" id={`solution-panel-${activeSolution.id}`} aria-labelledby={`solution-tab-${activeSolution.id}`} tabIndex={0}><div className="solution-column"><h3>常见输入</h3><ul className="icon-list">{activeSolution.commonInputs.slice(0, compact ? 3 : 4).map((item) => <li key={item}>{IconForInput(item)}<span>{item}</span></li>)}</ul></div><div className="solution-flow-mark" aria-hidden="true"><ArrowRight size={21} weight="bold" /></div><div className="solution-column"><h3>关键处理</h3><ul className="bullet-list">{activeSolution.keyProcessing.slice(0, compact ? 3 : 5).map((item) => <li key={item}>{item}</li>)}</ul></div><div className="solution-flow-mark" aria-hidden="true"><ArrowRight size={21} weight="bold" /></div><div className="solution-column"><h3>可复核输出</h3><ul className="icon-list">{activeSolution.verifiableOutputs.slice(0, compact ? 3 : 4).map((item) => <li key={item}><CheckCircle size={19} weight="duotone" aria-hidden="true" /><span>{item}</span></li>)}</ul></div><div className="solution-recommendation"><p className="mini-label">{recommendedProduct?.status.effectiveStatus === 'appointment' ? '建议先预约确认' : '推荐查看匹配产品'}</p><h3>{recommended?.name ?? '个性化需求'}</h3><p>{recommended?.relationship ?? '先描述你的现场规则，再确认匹配路径。'}</p><div className="tag-row">{(recommended?.matchOn ?? []).slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><LinkButton href={recommendedHref} variant="text">{recommendedAction?.label ?? '描述你的需求'}<ArrowUpRight size={16} aria-hidden="true" /></LinkButton></div></div></div>
}

function HomeSolutions() {
  return <section className="section solutions-section" id="solutions" aria-labelledby="solutions-title"><div className="container"><div className="home-scenario-heading"><span aria-hidden="true" /><div><p className="section-kicker">SCENARIO FIT</p><h2 id="solutions-title">选择适合您的业务场景</h2><p>切换场景，查看输入、处理、复核与输出如何衔接。</p></div><span aria-hidden="true" /></div><HomeScenarioTabs /></div></section>
}

function ProductCard({ product, featured = false }) {
  const action = getProductAction(product.status.effectiveStatus, product.id)
  const actionHref = product.status.effectiveStatus === 'appointment' ? action.href : `${pathForProduct(product.id)}${action.href}`
  const accessNote = product.trial?.display || (product.status.effectiveStatus === 'appointment' ? '公开安装包与正式价格未开放' : '下载状态以发布记录为准')
  return <article className={`product-card ${featured ? 'product-card-featured' : ''}`}><a className="product-card-detail-link" href={pathForProduct(product.id)} aria-label={`查看${product.name}详情`} /><div className="product-card-topline"><span className="product-eyebrow">{product.eyebrow}</span><span className={`status-badge status-${product.status.effectiveStatus}`}><span className="status-dot" />{product.status.label}</span></div><div className="product-card-icon"><img src={SITE.softwareIcon.image} alt="" width="64" height="64" /></div><h3>{product.name}</h3><p className="product-statement">{product.statement}</p><div className="product-outcome"><CheckCircle size={18} weight="duotone" aria-hidden="true" />{product.outcome}</div><div className="product-card-footer"><div><strong>{product.price.display}</strong><small>{accessNote}</small></div><LinkButton href={actionHref} variant={featured ? 'primary' : 'outline'}>{action.label}</LinkButton></div></article>
}

function ProductsSection({ showHeading = true }) {
  return <section className="section products-section" id="products" aria-labelledby="products-title"><div className="container">{showHeading && <div className="section-heading split-heading"><div><p className="section-kicker">PRODUCT CENTER</p><h2 id="products-title">产品中心</h2></div><p>七款正式软件可分别购买、独立使用。每款产品都明确展示输入、处理、输出，以及可直接下载的公开文件。</p></div>}<div className="products-grid">{PRODUCTS.map((product) => <ProductCard key={product.id} product={product} featured={product.id === 'bleed' || product.id === 'multisize-bleed'} />)}</div><div className="products-footnote"><ShieldCheck size={19} weight="duotone" aria-hidden="true" /><span>七款客户端与发布校验文件均可直接下载，并按真实发布记录展示。</span><a href="/downloads/">查看全部下载 <ArrowUpRight size={15} aria-hidden="true" /></a></div></div></section>
}

function TrustSection() {
  return <section className="section trust-section" id="trust" aria-labelledby="trust-title"><div className="container"><div className="section-heading centered"><p className="section-kicker">CLEAR BOUNDARIES</p><h2 id="trust-title">每一步，都有清晰边界</h2><p>从资料进入到结果交付，页面只展示已经核验的流程与状态。</p></div><div className="trust-grid">{TRUST_POINTS.map((point, index) => <div className="trust-card" key={point.label}><div className="trust-icon"><IconForTrust index={index} /></div><div><h3>{point.label}</h3><p>{point.detail}</p></div></div>)}</div></div></section>
}

function ContentCard({ item }) {
  const product = item.relatedProduct ? PRODUCTS_BY_ID[item.relatedProduct] : null
  const cta = item.CTA ?? {}
  const isDirectDownload = item.contentMode === 'direct-download'
  const downloadHref = cta.primaryHref ?? product?.download.publicLink ?? ''
  const downloadExternal = /^https?:\/\//.test(downloadHref)
  return <article className="content-card"><div className="content-card-meta"><span className={`content-status content-status-${item.status}`}>{CONTENT_STATUS_LABELS[item.status] ?? item.status}</span><span>{product?.shortName ?? '内容中心'}</span></div><h3>{item.title}</h3><p>{item.summary}</p><div className="content-card-actions">{isDirectDownload ? <a className="text-link" href={downloadHref} target={downloadExternal ? '_blank' : undefined} rel={downloadExternal ? 'noreferrer' : undefined} download={downloadExternal ? undefined : item.downloadFilename}><DownloadSimple size={17} aria-hidden="true" />{cta.primary ?? '下载文件'}</a> : <a className="text-link" href={cta.primaryHref ?? product?.route ?? '/products/'}>{cta.primary ?? '查看详情'}<ArrowUpRight size={16} aria-hidden="true" /></a>}<a className="text-link muted" href={cta.secondaryHref ?? product?.route ?? '/products/'}>{cta.secondary ?? '查看产品'}<CaretRight size={16} aria-hidden="true" /></a></div></article>
}

function ContentSection() {
  const featuredItems = CONTENT_CATEGORIES.flatMap((category) => category.items).filter((item) => item.status === 'publishable').slice(0, 3)
  return <section className="section content-section" id="content" aria-labelledby="content-title"><div className="container"><div className="section-heading split-heading"><div><p className="section-kicker">CONTENT CENTER</p><h2 id="content-title">内容中心</h2></div><p>把产品更新、能力说明与下载资料分开呈现，先看证据，再进入下一步。</p></div><div className="content-index-links"><a href="/updates/">产品更新 <ArrowUpRight size={15} aria-hidden="true" /></a><a href="/guides/">能力说明 <ArrowUpRight size={15} aria-hidden="true" /></a><a href="/downloads/">下载资料 <ArrowUpRight size={15} aria-hidden="true" /></a></div><div className="content-grid">{featuredItems.map((item) => <ContentCard key={item.slug} item={item} />)}</div></div></section>
}

function PricingSection() {
  return <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title"><div className="container"><div className="section-heading centered"><p className="section-kicker">PRICING & ACCESS</p><h2 id="pricing-title">服务与价格</h2><p>价格、客户端与公开文件分开说明；七款 Windows 客户端均可直接下载。</p></div><div className="pricing-grid">{PRODUCTS.map((product) => { const action = getProductAction(product.status.effectiveStatus, product.id); const termLabel = product.price.sourceUnit === '元/账号/年' ? '账号年度授权 · 一个账号对应一个企业账套主体' : '365 天年度授权'; return <article key={product.id} className={`pricing-card ${product.id === 'bleed' || product.id === 'multisize-bleed' ? 'pricing-card-featured' : ''}`}><span className={`status-badge status-${product.status.effectiveStatus}`}><span className="status-dot" />{product.status.label}</span><h3>{product.shortName}</h3><strong className="price-display">{product.price.display}</strong><span className="price-term">{termLabel}</span><ul>{product.workflow.output.map((output) => <li key={output}><Check size={17} weight="bold" aria-hidden="true" />{output}</li>)}</ul><a className="text-link" href={`${pathForProduct(product.id)}${action.href}`}>{action.label}<ArrowRight size={16} weight="bold" aria-hidden="true" /></a></article> })}<article className="pricing-card pricing-card-custom"><span className="status-badge status-custom">按需求沟通</span><h3>个性化软件定制</h3><strong className="price-display">¥499 <small>起</small></strong><span className="price-term">定制设计及首个可用版本</span><ul><li><Check size={17} weight="bold" aria-hidden="true" />先梳理流程与资料</li><li><Check size={17} weight="bold" aria-hidden="true" />生成可复核需求摘要</li><li><Check size={17} weight="bold" aria-hidden="true" />正式版年费按复杂度报价</li></ul><a className="text-link" href="/custom/requirements/">描述你的需求 <ArrowRight size={16} weight="bold" aria-hidden="true" /></a></article></div><p className="pricing-note"><Clock size={18} weight="duotone" aria-hidden="true" />首次启动无需申请，按本机受保护时间自动体验 30 天；在正常系统状态下每台设备每款产品一次。正式授权后可完全离线使用；首次初始化可能出现一次 Windows UAC 系统确认。</p></div></section>
}

function HomeCTA() {
  return <section className="cta-section" aria-labelledby="cta-title"><div className="container cta-inner"><div><p className="section-kicker">NEXT STEP</p><h2 id="cta-title">先说清楚流程，再选择工具</h2><p>告诉我们当前最耗时的环节、手头资料和期望交付结果。需求摘要只在当前页面生成，复制后由你自行发送。</p></div><LinkButton href="/custom/requirements/">描述你的需求</LinkButton></div></section>
}

function HomePage() {
  return <PageShell className="home-page"><main><Hero /><HomeSolutions /><ProductsSection /><TrustSection /><ContentSection /><PricingSection /><HomeCTA /></main></PageShell>
}

function Breadcrumbs({ items = [] }) {
  return <nav className="breadcrumbs" aria-label="面包屑导航"><a href="/">首页</a>{items.map((item) => <React.Fragment key={item.label}><CaretRight size={14} aria-hidden="true" /><span>{item.label}</span></React.Fragment>)}</nav>
}

function DetailHero({ product }) {
  const action = getProductAction(product.status.effectiveStatus, product.id)
  const actualOperation = product.media.mode === 'actual-operation-redacted'
  const posterAlt = actualOperation ? `${product.name} 实际操作演示画面（已脱敏）` : `${product.name} 模拟演示画面`
  return <section className="detail-hero" aria-labelledby="detail-title"><div className="container detail-hero-grid"><div className="detail-hero-copy"><Breadcrumbs items={[{ label: product.shortName }]} /><span className="product-eyebrow">{product.eyebrow}</span><h1 id="detail-title">{product.name}</h1><p>{product.statement}</p><div className="detail-meta"><span className={`status-badge status-${product.status.effectiveStatus}`}><span className="status-dot" />{product.status.label}</span><span className="detail-price">{product.price.display}</span></div><div className="detail-actions"><LinkButton href={action.href}>{action.label}</LinkButton><LinkButton href="#workflow" variant="outline">查看工作流</LinkButton></div></div><div className="detail-hero-art">{product.media.poster ? <img src={mediaPath(product.media.poster)} alt={posterAlt} /> : <div className="detail-art-fallback"><FlowArrow size={66} weight="duotone" aria-hidden="true" /><span>输入 → 处理 → 输出</span><small>{product.media.fallback}</small></div>}</div></div></section>
}

function WorkflowSection({ product }) {
  return <section className="section workflow-section" id="workflow" aria-labelledby="workflow-title"><div className="container"><div className="section-heading split-heading"><div><p className="section-kicker">INPUT · PROCESS · OUTPUT</p><h2 id="workflow-title">一条可复核的工作流</h2></div><p>{product.capabilityBoundary}</p></div><div className="workflow-grid"><div className="workflow-card"><div className="workflow-card-head"><span className="workflow-number">01</span><h3>输入资料</h3></div><ul className="icon-list">{product.workflow.input.map((item) => <li key={item}>{IconForInput(item)}<span>{item}</span></li>)}</ul></div><div className="workflow-connector" aria-hidden="true"><ArrowRight size={27} weight="bold" /></div><div className="workflow-card"><div className="workflow-card-head"><span className="workflow-number">02</span><h3>关键处理</h3></div><ul className="bullet-list">{product.workflow.process.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="workflow-connector" aria-hidden="true"><ArrowRight size={27} weight="bold" /></div><div className="workflow-card workflow-card-output"><div className="workflow-card-head"><span className="workflow-number">03</span><h3>可复核输出</h3></div><ul className="icon-list">{product.workflow.output.map((item) => <li key={item}><CheckCircle size={19} weight="duotone" aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div></div></section>
}

function DownloadFileRow({ file }) {
  const external = file.external || /^https?:\/\//.test(file.path)
  return (
    <a
      className="download-file-row"
      href={file.path}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      download={external ? undefined : file.filename}
    >
      <span><strong>{file.title}</strong><small>{file.filename} · {file.format ?? '文件'} · {file.displaySize}</small></span>
      <DownloadSimple size={19} weight="bold" aria-hidden="true" />
    </a>
  )
}

function AvailabilityPanel({ product }) {
  const action = getProductAction(product.status.effectiveStatus, product.id)
  const available = product.status.effectiveStatus === 'available'
  const publicFiles = getProductPublicFiles(product)
  const primaryClient = publicFiles.find((file) => file.kind === 'client')
  const supportingFiles = publicFiles.filter((file) => file.kind !== 'client')

  return (
    <section className="section availability-section" id="availability" aria-labelledby="availability-title">
      <div className="container">
        <div className="availability-panel">
          <div className="availability-copy">
            <p className="section-kicker">当前状态</p>
            <h2 id="availability-title">下载与价格</h2>
            <p>{PRODUCT_STATUS_DESCRIPTIONS[product.status.effectiveStatus]}</p>
            <div className="availability-price"><strong>{product.price.display}</strong><span>{product.price.sourceUnit === '元/账号/年' ? '账号年度授权 · 一个账号对应一个企业账套主体' : `年度授权 · ${product.price.termDays} 天`}</span></div>
            {product.trial?.display && <p className="trial-note"><Clock size={18} weight="duotone" aria-hidden="true" />{product.trial.display}；首次初始化可能出现一次 Windows UAC 系统确认，这是本机初始化，不代表申请试用或联网激活。</p>}
            <LinkButton href={action.href}>{action.label}</LinkButton>
          </div>
          <div className={`download-panel ${publicFiles.length ? 'download-panel-verified' : ''}`} id="downloads">
            <div className="download-panel-head"><span className="download-state-dot" /><span>{product.cta.downloadPanel}</span></div>
            {available && primaryClient ? <>
              <div className="download-spec-grid"><div><small>产品兼容版本</small><strong>{product.download.version}</strong>{product.download.fileVersion && <small>Windows 文件版本 {product.download.fileVersion}</small>}</div><div><small>运行时</small><strong>{product.download.platform}</strong></div><div><small>文件大小</small><strong>{product.download.displaySize}</strong></div><div><small>核验</small><strong>已核验</strong></div></div>
              <div className="checksum"><small>SHA-256</small><code>{product.download.sha256}</code></div>
              <a className="download-link" href={primaryClient.path} target="_blank" rel="noreferrer"><DownloadSimple size={19} weight="bold" aria-hidden="true" />{primaryClient.buttonLabel}<ArrowUpRight size={17} aria-hidden="true" /></a>
              {product.download.digitalSignature === 'NotSigned' && <p className="download-note">当前客户端未进行数字签名；请从本页公开链接下载并核对 SHA-256，完整解压后启动。首次初始化可能出现一次 Windows UAC 系统确认，这是本机初始化，不代表申请试用或联网激活。</p>}
            </> : <div className="release-candidate"><Wrench size={28} weight="duotone" aria-hidden="true" /><div><strong>客户端发布确认中</strong><p>{product.download.panelText}</p></div></div>}
            {supportingFiles.length > 0 && <div className="download-file-list" aria-label={`${product.name} 可下载文件`}><h3>可下载文件</h3>{supportingFiles.map((file) => <DownloadFileRow key={file.path} file={file} />)}</div>}
            <p className="download-note">{available ? '客户端与校验资料均来自当前公开发布记录；下载前可逐项核对。' : '客户端完成发布确认后再补充版本与校验记录。'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductMedia({ product }) {
  if (!product.media.poster && !product.media.video) return null
  const media = product.media
  const actualOperation = media.mode === 'actual-operation-redacted' || media.mode === 'actual-operation'
  const kicker = media.operationKicker || (actualOperation ? 'ACTUAL WORKFLOW' : 'SIMULATED DEMO')
  const title = media.operationTitle || (actualOperation ? '查看实际操作演示' : '体验模拟演示')
  const sourceNote = media.sourceBuild ? `录制来源：${media.sourceBuild}。` : ''
  const redactionNote = media.redacted
    ? media.redactionMethod === 'synthetic-demo-data'
      ? '脱敏方式为替换演示数据'
      : media.redactionMethod
        ? `脱敏方式：${media.redactionMethod}`
        : '内容已脱敏'
    : ''
  const description = media.operationDescription || (actualOperation
    ? `${sourceNote}基于实际操作流程，${media.redacted ? '演示数据已替换为虚构示例' : '用于展示输入、处理、导出与复核细节'}。`
    : '演示使用筛选后的示例参数，仅用于说明输入、处理和输出的关系，不代表客户项目结果。')
  const label = media.operationLabel || (actualOperation ? '实际操作 · 脱敏演示数据' : '模拟演示')
  const accessibilityLabel = actualOperation
    ? `${product.name} 实际操作演示${media.redacted ? '（已脱敏）' : ''}`
    : `${product.name} 模拟演示`
  const caption = media.operationCaption || (actualOperation
    ? ['基于实际操作录屏', media.silent ? '已去除音轨' : '保留原音轨', redactionNote].filter(Boolean).join('；') + '。'
    : '模拟演示可用，产品短片与下载状态按页面记录为准。')
  return (
    <section className="section media-section" aria-labelledby="media-title">
      <div className="container media-layout">
        <div>
          <p className="section-kicker">{kicker}</p>
          <h2 id="media-title">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="media-column">
          <div className="media-frame">
            <div className="media-frame-top"><span>{product.shortName}</span><span><span className="status-dot" />{label}</span></div>
            {product.media.video ? <video controls preload="metadata" playsInline poster={mediaPath(product.media.poster)} src={mediaPath(product.media.video)} aria-label={accessibilityLabel} /> : <img src={mediaPath(product.media.poster)} alt={accessibilityLabel} />}
            <div className="media-frame-caption"><PlayCircle size={19} weight="duotone" aria-hidden="true" />{caption}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BleedSeriesSection({ product }) {
  const companionId = product.id === 'bleed'
    ? 'multisize-bleed'
    : product.id === 'multisize-bleed'
      ? 'bleed'
      : null
  const companion = companionId ? PRODUCTS_BY_ID[companionId] : null
  if (!companion) return null
  return <section className="section product-series-section" aria-labelledby="product-series-title"><div className="container"><div className="section-heading split-heading"><div><p className="section-kicker">INDEPENDENT PRODUCT LINE</p><h2 id="product-series-title">同系列独立产品</h2></div><p>两款产品使用独立名称、版本、下载与年度授权，互不覆盖；可按实际文件类型和排版需求选择。</p></div><div className="products-grid product-series-grid"><ProductCard product={companion} featured /></div></div></section>
}

function ProductPage({ product }) {
  return <PageShell darkHeader><main><DetailHero product={product} /><BleedSeriesSection product={product} /><WorkflowSection product={product} /><ProductMedia product={product} /><AvailabilityPanel product={product} /><section className="section boundary-section"><div className="container boundary-card"><ShieldCheck size={28} weight="duotone" aria-hidden="true" /><div><p className="section-kicker">BOUNDARY</p><h2>公开能力与边界</h2><p>{product.capabilityBoundary}</p></div><LinkButton href="/custom/requirements/" variant="text">描述定制需求 <ArrowUpRight size={16} aria-hidden="true" /></LinkButton></div></section><RelatedContent productId={product.id} /></main></PageShell>
}

function RelatedContent({ productId }) {
  const items = CONTENT_CATEGORIES.flatMap((category) => category.items).filter((item) => item.relatedProduct === productId && item.status === 'publishable').slice(0, 3)
  if (!items.length) return null
  return <section className="section related-section" aria-labelledby="related-title"><div className="container"><div className="section-heading split-heading"><div><p className="section-kicker">RELATED CONTENT</p><h2 id="related-title">相关内容</h2></div><a className="text-link" href="/guides/">查看全部 <ArrowUpRight size={16} aria-hidden="true" /></a></div><div className="content-grid">{items.map((item) => <ContentCard key={item.slug} item={item} />)}</div></div></section>
}

function ProductsIndexPage() {
  return <PageShell><main className="light-page"><section className="page-intro"><div className="container"><Breadcrumbs items={[{ label: '产品中心' }]} /><p className="section-kicker">PRODUCT CENTER</p><h1>产品中心</h1><p>七款正式软件可分别购买、独立使用；每款产品的公开文件均提供直接下载入口。</p></div></section><ProductsSection showHeading={false} /><TrustSection /><HomeCTA /></main></PageShell>
}

function SolutionsPage() {
  return <PageShell><main className="light-page"><section className="page-intro"><div className="container"><Breadcrumbs items={[{ label: '行业方案' }]} /><p className="section-kicker">SCENARIO FIT</p><h1>行业方案</h1><p>先描述现场规则，再按输入、处理、输出匹配公开产品或定制路径。</p></div></section><section className="section solutions-page-section"><div className="container"><SolutionTabs /></div></section><section className="section solutions-list"><div className="container"><div className="section-heading centered"><p className="section-kicker">FOUR SCENARIOS</p><h2>从流程开始，不从行业标签猜测</h2></div><div className="solution-list-grid">{SOLUTIONS.map((solution) => <article key={solution.id} className="solution-list-card"><div className="solution-list-head"><IconForSolution id={solution.id} /><h3>{solution.label}</h3></div><p>{solution.audience}</p><ul>{solution.currentPainPoints.slice(0, 3).map((point) => <li key={point}><CheckCircle size={17} weight="duotone" aria-hidden="true" />{point}</li>)}</ul><a className="text-link" href="/custom/requirements/">填写需求 <ArrowRight size={16} weight="bold" aria-hidden="true" /></a></article>)}</div></div></section><HomeCTA /></main></PageShell>
}

function getPrefillFields(prefill) {
  const solution = prefill.scenario ? SOLUTIONS_BY_ID[SCENARIO_TO_SOLUTION[prefill.scenario]] : null
  const product = prefill.product ? PRODUCTS_BY_ID[prefill.product] : null
  if (solution) return { ...solution.prefilledCustomizationParams.fields }
  if (product) return { scene: '其他（请说明）', slowProcess: product.statement, inputs: product.workflow.input.join('；'), expected: product.workflow.output.join('；'), constraints: '' }
  return { scene: '', slowProcess: '', inputs: '', expected: '', constraints: '' }
}

function RequirementsPage() {
  const prefill = useMemo(() => normalizePrefill(new URLSearchParams(window.location.search)), [])
  const [fields, setFields] = useState(() => getPrefillFields(prefill))
  const [copyState, setCopyState] = useState('')
  const completion = getRequirementCompletion(fields)
  const summary = buildRequirementSummary(fields)
  const summaryRef = useRef(null)
  const setField = (field, value) => setFields((current) => ({ ...current, [field]: value }))
  const copySummary = async () => {
    if (!summary) return
    try {
      await navigator.clipboard.writeText(summary)
      setCopyState('已复制到剪贴板；内容只在当前页面生成。')
    } catch {
      summaryRef.current?.focus()
      summaryRef.current?.select()
      setCopyState('浏览器未开放剪贴板权限，请手动复制已选中的摘要。')
    }
  }
  const labels = { scene: '业务类型', slowProcess: '目前最耗时的工作环节', inputs: '可提供的资料', expected: '期望的交付结果', constraints: '补充要求（选填）' }
  return <PageShell><main className="light-page"><section className="page-intro"><div className="container"><Breadcrumbs items={[{ label: '个性化定制' }]} /><p className="section-kicker">CUSTOM WORKFLOW</p><h1>描述你的需求</h1><p>把流程、资料和交付结果写清楚，我们再判断公开产品是否匹配，或进入个性化工具路径。</p></div></section><section className="section requirements-section"><div className="container requirements-layout"><form className="requirements-form" onSubmit={(event) => event.preventDefault()}><div className="form-card"><div className="form-card-head"><div><p className="section-kicker">01 · YOUR PROCESS</p><h2>先填写四项必填信息</h2></div><span className="completion-count">{completion.completed}/{completion.total}</span></div><p className="form-note">{SITE.customization.summaryBehavior}</p>{Object.entries(labels).map(([field, label]) => <label className="field" key={field}><span>{label}{field !== 'constraints' && <em>必填</em>}</span>{field === 'scene' ? <select value={fields[field]} required={field !== 'constraints'} aria-required={field !== 'constraints'} onChange={(event) => setField(field, event.target.value)}><option value="">请选择</option>{SITE.customization.scenes.map((scene) => <option key={scene} value={scene}>{scene}</option>)}</select> : <textarea value={fields[field]} required={field !== 'constraints'} aria-required={field !== 'constraints'} onChange={(event) => setField(field, event.target.value)} placeholder={field === 'constraints' ? '补充规则、预算、时间（选填）' : '请按当前实际情况填写'} rows={field === 'constraints' ? 3 : 4} />}</label>)}</div><div className="form-privacy"><LockKey size={20} weight="duotone" aria-hidden="true" /><span>内容只用于当前页面生成摘要；页面不上传、不保存，也不自动提交。</span></div></form><aside className="summary-card" aria-labelledby="summary-title"><div className="summary-card-head"><div><p className="section-kicker">02 · LOCAL SUMMARY</p><h2 id="summary-title">微信需求摘要</h2></div><span className={`summary-ready ${completion.ready ? 'is-ready' : ''}`}><span className="status-dot" />{completion.ready ? '可复制' : `还差 ${completion.total - completion.completed} 项`}</span></div><textarea ref={summaryRef} className="summary-output" value={summary || '填写四项必填信息后，这里会生成结构化摘要。'} readOnly aria-label="微信需求摘要" onFocus={(event) => event.currentTarget.select()} /><button type="button" className="button button-primary summary-copy" disabled={!completion.ready} onClick={copySummary}><Copy size={18} aria-hidden="true" />{copyState || '复制摘要'}</button>{copyState && <p className="copy-feedback" role="status">{copyState}</p>}<div className="summary-next"><h3>下一步</h3><p>{SITE.customization.pricing}</p><a href="tel:17734375651" className="contact-link"><Phone size={18} aria-hidden="true" />{SITE.contact}</a></div></aside></div></section><HomeCTA /></main></PageShell>
}

function ContentIndexPage({ config }) {
  const category = CONTENT_CATEGORIES.find((item) => item.id === config.categoryId)
  const publicItems = (category?.items ?? []).filter((item) => item.status === 'publishable')
  return <PageShell><main className="light-page"><section className="page-intro"><div className="container"><Breadcrumbs items={[{ label: config.title }]} /><p className="section-kicker">{config.eyebrow}</p><h1>{config.title}</h1><p>仅展示已经整理并可公开核对的内容。</p></div></section><section className="section content-index-section"><div className="container"><div className="content-filter-nav"><a href="/updates/" className={config.categoryId === 'product-updates' ? 'is-active' : ''}>产品更新</a><a href="/guides/" className={config.categoryId === 'tutorials' ? 'is-active' : ''}>能力说明</a><a href="/downloads/" className={config.categoryId === 'downloads' ? 'is-active' : ''}>下载资料</a></div><div className="content-list-grid">{publicItems.map((item) => <ContentCard key={item.slug} item={item} />)}</div></div></section><HomeCTA /></main></PageShell>
}

function WarningIcon() {
  return <div className="warning-icon" aria-hidden="true"><Plus size={18} weight="bold" /></div>
}

function LegalPage({ route }) {
  const page = LEGAL_BY_ROUTE[route]
  if (!page) return <NotFoundPage />
  const sections = [['dataProcessingHeading', 'dataProcessingParagraphs'], ['privacyHeading', 'privacyParagraphs'], ['serviceHeading', 'serviceParagraphs'], ['licenseHeading', 'licenseParagraphs'], ['downloadHeading', 'downloadParagraphs'], ['customHeading', 'customParagraphs'], ['contactAndRightsHeading', 'contactAndRightsParagraphs'], ['unconfirmedHeading', 'unconfirmedParagraphs']]
  return <PageShell><main className="light-page"><section className="page-intro"><div className="container"><Breadcrumbs items={[{ label: page.title.split('｜')[0] }]} /><p className="section-kicker">LEGAL & BOUNDARIES</p><h1>{page.title.split('｜')[0]}</h1><p>{page.scope}</p></div></section><section className="section legal-section"><div className="container legal-layout"><aside className="legal-notice"><WarningIcon /><strong>当前公开说明</strong><p>{page.copy.topNotice}</p></aside><article className="legal-copy">{sections.map(([heading, paragraphs]) => page.copy[heading] ? <section key={heading}><h2>{page.copy[heading]}</h2>{page.copy[paragraphs].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section> : null)}</article></div></section></main></PageShell>
}

function NotFoundPage() {
  return <PageShell><main className="light-page"><section className="not-found"><div className="container"><p className="section-kicker">404 · PAGE NOT FOUND</p><h1>这条路径还没有页面</h1><p>返回产品中心，或从行业方案开始描述你的流程。</p><div className="hero-actions"><LinkButton href="/products/">查看产品</LinkButton><LinkButton href="/custom/requirements/" variant="outline">描述需求</LinkButton></div></div></section></main></PageShell>
}

function App() {
  const path = normalizePath(window.location.pathname)
  if (path === '/') return <HomePage />
  if (path === '/products/') return <ProductsIndexPage />
  if (path === '/solutions/') return <SolutionsPage />
  if (path === '/custom/requirements/') return <RequirementsPage />
  if (CONTENT_ROUTE_CONFIG[path]) return <ContentIndexPage config={CONTENT_ROUTE_CONFIG[path]} />
  if (LEGAL_BY_ROUTE[path]) return <LegalPage route={path} />
  const productMatch = path.match(/^\/products\/([^/]+)\/$/)
  if (productMatch && PRODUCTS_BY_ID[productMatch[1]]) return <ProductPage product={PRODUCTS_BY_ID[productMatch[1]]} />
  return <NotFoundPage />
}

export { App }

