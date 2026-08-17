# Product Design QA — 方寸有序 v3

**Findings**
- [P0/P1/P2] 最终轮没有可执行的 P0、P1 或 P2 视觉/交互问题。
  Location: 首页桌面首屏、行业方案区、390×844 移动状态。
  Evidence: `site/design-qa-captures/iteration-4-final-comparison.png` 将同一 1487×949 crop 的 source 与 implementation 放在同一比较输入；`iteration-4-hero-comparison.png`、`iteration-4-industry-comparison.png` 进一步覆盖了首屏和行业方案细节。布局层级、首屏密度、资产裁切、状态与响应式结构均稳定。
  Impact: 核心浏览、产品进入、方案筛选和需求转化路径可用，未见会阻断任务、改变主要层级或造成内容遮挡的差异。
  Fix: 最终轮保持实现不变；已将剩余差异分类为已知的内容契约差异或 P3 polish，未把它们升级为 P0/P1/P2。

## Source truth

- Source visual truth: `C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\site\references\option-3-hybrid-industry.png`
- Source raster: 1487×1058 px, 96 dpi, RGB；方向为深炭黑 hero、暖金色强调、acid-lime 结果文字与暖白行业方案区。
- 同 viewport 对比使用 source 的上方 1487×949 crop；没有拉伸 source，只有按首屏 viewport 裁切。原图下方的信任条带由既有 `iteration-3-home-fullpage-crop.png` / `iteration-3-stacked-normalized.png` 全页证据覆盖，不把未出现在首屏 viewport 的像素当成首屏差异。
- Desktop default state: `/`，菜单关闭，hero 与第一个“图文店”行业 tab 激活。

## Browser-rendered implementation evidence

- Native desktop implementation: `C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\site\design-qa-captures\iteration-4-native.png`（1487×949 px）。
- Combined full-view comparison: `C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\site\design-qa-captures\iteration-4-final-comparison.png`（1487×2038 px；source crop 与 implementation screenshot 同输入、上下堆叠）。
- Focused hero comparison: `C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\site\design-qa-captures\iteration-4-hero-comparison.png`（1487×1218 px；由最终 1487×949 source crop 与实现截图分别直接裁取、上下拼接，未 resize）。
- Focused industry comparison: `C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\site\design-qa-captures\iteration-4-industry-comparison.png`（1487×996 px；由最终 1487×949 source crop 与实现截图分别直接裁取、上下拼接，未 resize）。
- Mobile closed: `C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\site\design-qa-captures\iteration-4-mobile-closed.png`（375×812 px）。
- Mobile menu open: `C:\Users\17734\Documents\ChatGPT\大舅\site-zhihuiji-v3-implementation\site\design-qa-captures\iteration-4-mobile-open.png`（375×812 px）。

## Viewport, pixel and density normalization

| Evidence | Source pixels | Implementation pixels | CSS viewport | Density / normalization |
|---|---:|---:|---:|---|
| Desktop full-view | 1487×949 crop | 1487×949 native in-app-browser screenshot | CSS viewport 1502×1177 override；最终比较内容区为 1487×949 | CDP layout probe 的有效比例约为 1.5（2230/1486），不把它当作 1× DPR。source 只做上方裁切；实现截图直接取自浏览器，不手动 resize，也不做 DPR 插值。 |
| Desktop CSS-override probe | n/a | browser measured 1502×1177 | 1502×1177 | layout-resilience probe；有效设备比例约 1.5（2230/1486），不混入 1487×949 pixel comparison。 |
| Mobile closed/open | Desktop source has no matching mobile artboard | 375×812 capture artifacts | 390×844 browser CSS viewport | 375×812 raster 来自 390×844 CSS run，仅作 responsive/state evidence；没有对应的 mobile source artboard，不对 desktop source 做 pixel-match claim。 |

## Full-view comparison evidence

The final comparison is a single combined input rather than two independent image views. At the shared 1487×949 viewport, the implementation preserves the source’s main composition: thin dark header, left-aligned value proposition, right-side workflow image, gold CTA/proof row, dark-to-warm-white section transition, centered “行业方案” heading, and four-scenario explorer. The visible solution panel keeps the same input → processing → verifiable-output rhythm and the same right-hand recommendation role.

Known, intentional content-contract deltas are recorded rather than treated as visual defects:

- Source static navigation uses “产品中心 / 服务与价格 / 定制开发”; the implementation uses the verified navigation manifest “产品 / 内容中心 / 服务与授权”.
- Source explanatory copy and recommended product copy are visual-target text; implementation copy follows the verified product and solution manifests, including the current availability/state language.
- These changes do not alter the visual hierarchy, target size, route affordance, or state behavior, so they are not actionable P0/P1/P2 findings for this handoff.

## Focused comparison evidence

- **Hero:** `iteration-4-hero-comparison.png` is a direct crop from the final 1487×949 source crop and 1487×949 implementation screenshot (no resizing). The headline line breaks, gold rule/eyebrow, CTA pair, proof row, workflow image crop, image border/radius, and gold-wave treatment remain in the same relative hierarchy. The implementation uses the real `assets/generated/hero-workflow.webp` asset rather than CSS or placeholder art.
- **Industry solution:** `iteration-4-industry-comparison.png` is a direct crop from the final 1487×949 source crop and 1487×949 implementation screenshot (no resizing). The four tabs, active gold rule, three flow columns, directional marks, recommendation column, borders, and warm-white surface remain aligned. The implementation’s dynamic content is the verified solution manifest and remains legible at the tested width.
- **Mobile states:** `iteration-4-mobile-closed.png` keeps the brand, menu trigger, wrapped hero, CTA pair, proof row, and workflow card inside the viewport. `iteration-4-mobile-open.png` shows the navigation panel, close control, six links, and full-width requirement CTA without clipping.

## Required fidelity surfaces

- **Fonts and typography:** Display/body hierarchy is preserved: heavy white headline, lime result phrase, compact gold eyebrow, muted lede, and smaller proof/navigation labels. Desktop headline wrapping matches the target crop; mobile wrapping is intentional and remains readable. No clipped glyphs or collapsed line boxes were visible.
- **Spacing and layout rhythm:** Header height, hero two-column balance, media-card padding, CTA spacing, proof-row rhythm, solution-tab track, panel columns, and section transition remain stable. The 390×844 run reported no horizontal overflow; the 1502×1177 probe also kept the layout intact.
- **Colors and tokens:** The dark charcoal/near-black hero, warm gold controls and rules, acid-lime result text, muted cool-gray secondary copy, warm-white section, and active/status colors remain coherent with the source direction. CTA contrast and active-tab contrast are clear.
- **Image quality and asset fidelity:** The workflow graphic has the correct subject, crop, dark treatment, border and aspect ratio in desktop and mobile evidence. The implementation references the real generated workflow asset and gold-wave asset; no placeholder box, emoji, CSS drawing, or handcrafted replacement is visible.
- **Copy and content:** Product names, availability states, route labels, solution tabs, requirement summary language, and copy behavior follow the verified manifests. The static-source copy deltas listed above are intentional content-contract choices, not layout drift.
- **Icons and surfaces:** Icons use one consistent Phosphor family with stable optical sizing and stroke weight. Borders, radii, dividers, shadows and active rules are present where the source calls for them; no generic card or decorative blob is introduced.
- **Accessibility/responsiveness:** Menu controls expose expanded/hidden state; Escape closes the open menu and returns focus to its trigger. Tab controls expose selected state and the tested tab interaction updates the panel. Mobile targets remain reachable, and no persistent control is hidden by overflow.

## Interaction and console evidence

- Industry tab selection: passed; active tab and solution panel update.
- Product navigation: passed; primary product routes and product-entry controls resolve.
- Product state surfaces: passed; availability/status presentation remains separated by state.
- Requirement summary and copy action: passed; summary is generated and copy interaction completes.
- Mobile menu: passed; open state renders, Escape closes it, and focus returns to the menu trigger.
- Mobile overflow: passed; no horizontal overflow at CSS viewport 390×844.
- Browser console: `errors=[]`, `warnings=[]`.

## P0/P1/P2 comparison history

| Pass | Historical severity | Earlier evidence | Fix made | Post-fix evidence |
|---|---|---|---|---|
| Iteration 1 | P1 — above-fold composition and target-density drift | `iteration-1-side-by-side.png`, `iteration-1-home-1487x1058.png` | Reworked the page shell around the selected dark hero + warm-white solution composition; replaced early placeholder treatment with the workflow asset and structured solution explorer. | `iteration-2-home.png` |
| Iteration 2 | P2 — section rhythm/crop needed a same-viewport pass | `iteration-2-home.png` | Tightened hero/section proportions and moved review to normalized captures instead of judging browser framing. | `iteration-3-side-by-side-normalized.png`, `iteration-3-stacked-normalized.png` |
| Iteration 3 | P2 — hero/industry focused balance still needed a final same-viewport pass | `iteration-3-side-by-side-normalized.png`, `iteration-3-desktop-hero-comparison.png`, `iteration-3-stacked-normalized.png` | Tuned the final hero/media balance and section transition, then separated physical-vs-normalized capture evidence so the visual judgment used the native 1487×949 crop. | `iteration-4-hero-comparison.png`, `iteration-4-industry-comparison.png`, `iteration-4-native.png` |
| Iteration 4 | None — no actionable P0/P1/P2 remains | `iteration-4-final-comparison.png`, mobile closed/open captures | No further visual fix required; verified the responsive and interaction states in the browser. | `iteration-4-native.png`, `iteration-4-mobile-closed.png`, `iteration-4-mobile-open.png` |

## Open Questions

- None blocking this handoff. If the product team later freezes the static source copy verbatim, the manifest navigation labels can be revisited as a separate copy decision; the current implementation follows the verified product/content contract.

## Implementation Checklist

- [x] Source truth opened and compared with the browser-rendered implementation in one combined comparison input.
- [x] Desktop source/implementation crop recorded at 1487×949 from the native browser screenshot; CSS override probe recorded separately at 1502×1177 with effective layout ratio about 1.5 (2230/1486).
- [x] Hero and industry focused comparisons reviewed after the last fix.
- [x] Mobile closed/open states reviewed at the 390×844 CSS viewport; no horizontal overflow.
- [x] Industry tabs, product navigation/state, requirements summary/copy, menu open/Escape focus path exercised.
- [x] Console errors and warnings recorded as empty arrays.
- [x] No actionable P0/P1/P2 finding remains.

## Follow-up Polish

- [P3] If exact source copy becomes a hard requirement, align the manifest-driven navigation and explanatory labels with the static target text.
- [P3] Optional visual refinement: tune the small tab icon silhouettes toward the source’s bespoke line-art while retaining the current icon-library semantics and accessible labels.

final result: passed

