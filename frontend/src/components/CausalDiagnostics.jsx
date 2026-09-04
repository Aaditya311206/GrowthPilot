import React from 'react';

const rawHtml = `<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex flex-col"><div class="h-16 px-space-base flex items-center justify-between bg-surface-container-lowest"><div class="flex items-center gap-space-sm"><img alt="GrowthPilot Brand Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XrMWXKxTSx-Snc2KQC4ZvkufGor-8Vno4BAooPV8E5Ut9bTKebK6kWHd7ELlG-0IEr6Kn8iaoVT4Wv4inq5dk5VGtvEkDQtEkFTP72wRw4d19KLzReKmYDFylxdPqt3STZpomcKvw2t9SDzpb9EB69pxO14qxxVQ-pKN0bbkkyQZ4Is4JsIHIuXFUlSMWuccOJ3U0AWbIfuaJ0rHlg8__NdeR7YPRlPH3a6DrDjzVsIyzOvPZU6yu6j4s"/><span class="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">GrowthPilot</span></div></div><div class="px-space-base py-space-sm"><div class="bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"><div class="flex flex-col min-w-0"><span class="font-label-caps text-label-caps uppercase text-outline truncate">Workspace</span><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate">Acme SaaS &amp; Commerce</span><div class="flex items-center gap-space-xs mt-space-2xs"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span><span class="font-code-sm text-code-sm text-on-surface-variant truncate">Production Cluster</span></div></div><span class="material-symbols-outlined text-outline">unfold_more</span></div></div><div class="px-space-base py-space-xs"><span class="font-label-caps text-label-caps uppercase text-outline px-space-xs tracking-wider">Causal Intelligence</span></div><nav class="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="overview" href="#"><span class="material-symbols-outlined text-metric-md">insights</span><span class="font-body-md text-body-md">Incremental Impact</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="cohorts" href="#"><span class="material-symbols-outlined text-metric-md">groups_3</span><span class="font-body-md text-body-md">Cohort Explorer</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="simulator" href="#"><span class="material-symbols-outlined text-metric-md">tune</span><span class="font-body-md text-body-md">Campaign Simulator</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="diagnostics" href="#"><span class="material-symbols-outlined text-metric-md">biotech</span><span class="font-body-md text-body-md">Causal Diagnostics</span></a></nav></div><div class="flex flex-col gap-space-sm p-space-base bg-surface-container-low"><div class="bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-tertiary text-metric-md">verified</span><div class="flex flex-col"><span class="font-label-caps text-label-caps uppercase text-outline">Inference Kernel</span><span class="font-code-sm text-code-sm text-tertiary font-semibold">Causal Engine v4.2</span></div></div><span class="font-code-sm text-code-sm text-on-surface-variant bg-surface-container px-space-xs py-space-2xs rounded">99.4%</span></div><div class="flex items-center justify-between pt-space-xs"><div class="flex items-center gap-space-sm"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSVnDkcEYZoE2ahuAzR-yW96xU87DDr8Vu-hMTVMEPQVQqU9oZPHg9VJ7vfbIKYOvC7kDeJKak3u04SJMIMqUZTNv4ZOovyEhVGD4cp4Ui0Arwrm5kvPEHsemmG53cL751Y0wVZfqRgTz8HUZIPLKra3WmqKKycV_djdbr7_OhgNQhyNgVrlhzQPHNYwj6TnOTFp3hADFaX7BMwe57S6tirIF9fDV49KAAYgoQWaoQysOeE1bQdaE2"/><div class="flex flex-col"><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate max-w-[100px]">Dr. Alex Rivera</span><span class="font-label-caps text-label-caps text-outline truncate max-w-[100px]">Chief Scientist</span></div></div><div class="flex items-center gap-space-2xs"><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="settings" href="#" title="Platform Settings"><span class="material-symbols-outlined text-headline-sm">settings</span></a><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="documentation" href="#" title="Documentation &amp; API"><span class="material-symbols-outlined text-headline-sm">menu_book</span></a></div></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter-desktop"><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs font-body-sm text-body-sm text-outline"><span class="material-symbols-outlined text-headline-sm">home</span><span>/</span><span class="text-on-surface font-semibold">GrowthPilot Core</span><span>/</span><span class="text-secondary">Lift Telemetry</span></div></div><div class="flex items-center gap-space-md"><div class="hidden xl:flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-xl"><span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span><span class="font-label-caps text-label-caps text-outline uppercase">Engine Status:</span><span class="font-code-sm text-code-sm text-on-surface font-semibold">Incremental Calibrated</span><span class="font-code-sm text-code-sm text-tertiary">(Qini: +0.78)</span></div><div class="flex items-center bg-surface-container-low px-space-md py-space-xs rounded-xl gap-space-sm cursor-pointer hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-outline text-headline-sm">calendar_today</span><div class="flex flex-col text-left"><span class="font-body-sm text-body-sm text-on-surface font-semibold">Oct 1 - Oct 31, 2024</span><span class="font-label-caps text-label-caps text-outline">Lookback: 90d Baseline</span></div><span class="material-symbols-outlined text-outline text-headline-sm">expand_more</span></div><div class="flex items-center gap-space-sm"><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs" type="button"><span class="material-symbols-outlined text-headline-sm">api</span><span>Export Cohort API</span></button><button class="bg-primary-container hover:bg-surface-variant text-on-primary-container font-body-sm text-body-sm font-semibold px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" type="button"><span class="material-symbols-outlined text-headline-sm">play_arrow</span><span>Run Simulation</span></button></div></div></header><main class="relative w-full pt-16 bg-surface px-gutter-desktop min-h-screen"><div class="flex flex-col w-full pb-space-2xl gap-space-lg">
<div class="flex flex-col gap-space-sm pt-space-md">
<div class="flex flex-wrap items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<div class="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shadow-sm">
<span class="material-symbols-outlined text-metric-xl">biotech</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps uppercase text-secondary tracking-wider">Telemetry • Inference Governance</span>
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span class="font-code-sm text-code-sm text-tertiary">Engine Healthy</span>
</div>
<h1 class="font-display-lg text-display-lg text-on-surface tracking-tight">Causal Diagnostics &amp; Calibration</h1>
</div>
</div>
<div class="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl">
<div class="flex flex-col text-right">
<span class="font-label-caps text-label-caps uppercase text-outline">Calibration Window</span>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">Trained 6h ago • Next in 18h</span>
</div>
<button class="bg-primary-container hover:bg-surface-variant text-on-primary-container px-space-md py-space-xs rounded-lg font-body-sm text-body-sm font-semibold transition-all flex items-center gap-space-xs shadow-sm" id="trigger-retrain-btn" type="button">
<span class="material-symbols-outlined text-headline-sm animate-spin-hover">sync</span>
<span>Trigger Retrain</span>
</button>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
<div class="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden shadow-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">Active Architecture</span>
<span class="material-symbols-outlined text-primary text-headline-sm">account_tree</span>
</div>
<div class="my-space-xs">
<span class="font-headline-md text-headline-md text-on-surface font-semibold block truncate">DML Causal Forest</span>
<span class="font-code-sm text-code-sm text-primary">v4.2-prod (EconML)</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span>Double-Robust Certified</span>
</div>
</div>
<div class="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden shadow-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">QINI Coefficient (q)</span>
<span class="material-symbols-outlined text-tertiary text-headline-sm">trending_up</span>
</div>
<div class="my-space-xs">
<span class="font-metric-xl text-metric-xl text-on-surface font-bold">+0.784</span>
<span class="font-code-sm text-code-sm text-on-surface-variant ml-space-xs">p &lt; 0.0001</span>
</div>
<div class="flex items-center gap-space-xs font-body-sm text-body-sm text-tertiary">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
<span>+14.2% vs S-Learner baseline</span>
</div>
</div>
<div class="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden shadow-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">AUUC Metric</span>
<span class="material-symbols-outlined text-secondary text-headline-sm">area_chart</span>
</div>
<div class="my-space-xs">
<span class="font-metric-xl text-metric-xl text-on-surface font-bold">0.842</span>
<span class="font-code-sm text-code-sm text-outline ml-space-xs">Ideal: 1.0</span>
</div>
<div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-space-xs">
<div class="bg-secondary h-full rounded-full w-[84%]"></div>
</div>
</div>
<div class="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden shadow-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">Propensity Overlap &amp; Bal.</span>
<span class="material-symbols-outlined text-tertiary text-headline-sm">verified_user</span>
</div>
<div class="my-space-xs">
<span class="font-metric-xl text-metric-xl text-tertiary font-bold">99.2%</span>
<span class="font-code-sm text-code-sm text-on-surface-variant ml-space-xs">P = 0.94</span>
</div>
<div class="flex items-center gap-space-xs font-label-caps text-label-caps uppercase text-on-surface-variant">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span>Strict Support Assumption Valid</span>
</div>
</div>
</div>
</div>
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
<div class="xl:col-span-8 bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between gap-space-md shadow-sm">
<div class="flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps uppercase text-outline">Comparative Uplift Curves</span>
<span class="bg-primary/10 text-primary font-code-sm text-code-sm px-space-xs py-space-2xs rounded">95% CI Ribbon</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Cumulative Lift &amp; QINI Diagnostic</h2>
</div>
<div class="flex items-center gap-space-sm bg-surface-container-high p-space-2xs rounded-lg">
<button class="tab-curve active px-space-sm py-space-2xs font-body-sm text-body-sm rounded text-on-primary-container bg-primary-container font-semibold transition-all" data-target="all" type="button">All Models</button>
<button class="tab-curve px-space-sm py-space-2xs font-body-sm text-body-sm rounded text-on-surface-variant hover:text-on-surface transition-all" data-target="causal-forest" type="button">Causal Forest</button>
<button class="tab-curve px-space-sm py-space-2xs font-body-sm text-body-sm rounded text-on-surface-variant hover:text-on-surface transition-all" data-target="x-learner" type="button">X-Learner</button>
</div>
</div>
<div class="relative w-full h-80 bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between">
<div class="absolute inset-0 flex flex-col justify-between p-space-md pointer-events-none opacity-20">
<div class="w-full h-px bg-outline"></div>
<div class="w-full h-px bg-outline"></div>
<div class="w-full h-px bg-outline"></div>
<div class="w-full h-px bg-outline"></div>
<div class="w-full h-px bg-outline"></div>
</div>
<svg class="w-full h-full overflow-visible z-10" preserveaspectratio="none" viewbox="0 0 700 280">
<defs>
<lineargradient id="forestGlow" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#4edea3" stop-opacity="0.25"></stop>
<stop offset="100%" stop-color="#4edea3" stop-opacity="0.0"></stop>
</lineargradient>
<lineargradient id="ciRibbon" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#c3c0ff" stop-opacity="0.15"></stop>
<stop offset="100%" stop-color="#c3c0ff" stop-opacity="0.03"></stop>
</lineargradient>
</defs>
<!-- 95% Confidence Interval Ribbon for Causal Forest -->
<polygon fill="url(#ciRibbon)" points="40,240 120,180 200,125 320,80 440,55 560,40 680,30 680,60 560,75 440,95 320,130 200,175 120,215 40,240"></polygon>
<!-- Random Allocation Baseline (Diagonal) -->
<line opacity="0.6" stroke="#918fa1" stroke-dasharray="4 4" stroke-width="1.5" x1="40" x2="680" y1="240" y2="40"></line>
<!-- S-Learner -->
<path d="M 40,240 Q 220,190 350,140 T 680,40" fill="none" id="curve-s" opacity="0.75" stroke="#918fa1" stroke-width="2"></path>
<!-- T-Learner -->
<path d="M 40,240 Q 200,160 360,110 T 680,40" fill="none" id="curve-t" opacity="0.85" stroke="#4cd7f6" stroke-width="2"></path>
<!-- X-Learner -->
<path d="M 40,240 Q 180,120 340,75 T 680,40" fill="none" id="curve-x" stroke="#c3c0ff" stroke-width="2.5"></path>
<!-- Causal Forest (Best Estimator) -->
<path d="M 40,240 C 120,140 220,70 360,48 C 470,30 580,35 680,40 L 680,240 Z" fill="url(#forestGlow)" id="curve-forest-fill"></path>
<path d="M 40,240 C 120,140 220,70 360,48 C 470,30 580,35 680,40" fill="none" id="curve-forest" stroke="#4edea3" stroke-width="3.5"></path>
<!-- Active Scrubber / Inspection Point at 30% Targeted -->
<line opacity="0.8" stroke="#dae2fd" stroke-dasharray="2 2" stroke-width="1" x1="232" x2="232" y1="10" y2="250"></line>
<circle cx="232" cy="74" fill="#4edea3" r="5" stroke="#060e20" stroke-width="2"></circle>
<circle cx="232" cy="112" fill="#c3c0ff" r="4" stroke="#060e20" stroke-width="2"></circle>
<circle cx="232" cy="148" fill="#4cd7f6" r="4" stroke="#060e20" stroke-width="2"></circle>
<circle cx="232" cy="192" fill="#918fa1" r="4" stroke="#060e20" stroke-width="2"></circle>
</svg>
<div class="flex items-center justify-between text-outline font-code-sm text-code-sm pt-space-xs z-10">
<span>0% Population Targeted</span>
<span>25%</span>
<span class="text-on-surface font-semibold">30% (Scrubber Cutoff)</span>
<span>50%</span>
<span>75%</span>
<span>100% (Entire Sample)</span>
</div>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-xs">
<div class="bg-surface-container-high p-space-sm rounded-lg flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="w-3 h-3 rounded-full bg-tertiary"></span>
<span class="font-body-sm text-body-sm text-on-surface font-medium">Causal Forest</span>
</div>
<span class="font-code-sm text-code-sm text-tertiary font-bold">+78.4 Qini</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="w-3 h-3 rounded-full bg-primary"></span>
<span class="font-body-sm text-body-sm text-on-surface font-medium">X-Learner</span>
</div>
<span class="font-code-sm text-code-sm text-primary font-bold">+71.2 Qini</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="w-3 h-3 rounded-full bg-secondary"></span>
<span class="font-body-sm text-body-sm text-on-surface font-medium">T-Learner</span>
</div>
<span class="font-code-sm text-code-sm text-secondary font-bold">+59.8 Qini</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="w-3 h-3 rounded-full bg-outline"></span>
<span class="font-body-sm text-body-sm text-on-surface font-medium">S-Learner</span>
</div>
<span class="font-code-sm text-code-sm text-outline font-bold">+44.1 Qini</span>
</div>
</div>
</div>
<div class="xl:col-span-4 bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between gap-space-md shadow-sm">
<div class="flex flex-col gap-space-2xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">Shapley Value • CATE</span>
<span class="material-symbols-outlined text-headline-sm text-secondary">psychology</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Treatment Heterogeneity</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">Top behavioral covariates driving sensitivity to intervention offers.</p>
</div>
<div class="flex flex-col gap-space-sm">
<div class="bg-surface-container-high p-space-sm rounded-lg flex flex-col gap-space-2xs">
<div class="flex justify-between items-center">
<span class="font-body-sm text-body-sm text-on-surface font-medium">Inactive days in past 30d</span>
<span class="font-code-sm text-code-sm text-tertiary font-bold">+34% CATE</span>
</div>
<div class="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
<div class="bg-tertiary h-full rounded-full w-[88%]"></div>
</div>
<span class="font-label-caps text-label-caps text-outline">High sensitivity band: 14 - 22 dormant days</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg flex flex-col gap-space-2xs">
<div class="flex justify-between items-center">
<span class="font-body-sm text-body-sm text-on-surface font-medium">Seat utilization drop &gt; 25%</span>
<span class="font-code-sm text-code-sm text-tertiary font-bold">+28% CATE</span>
</div>
<div class="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
<div class="bg-tertiary h-full rounded-full w-[72%]"></div>
</div>
<span class="font-label-caps text-label-caps text-outline">Strongest response from enterprise tier accounts</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg flex flex-col gap-space-2xs">
<div class="flex justify-between items-center">
<span class="font-body-sm text-body-sm text-on-surface font-medium">Contract size &gt; \$25k ARR</span>
<span class="font-code-sm text-code-sm text-secondary font-bold">+19% CATE</span>
</div>
<div class="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full w-[54%]"></div>
</div>
<span class="font-label-caps text-label-caps text-outline">Elasticity multiplier: 1.42x on discount nudges</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg flex flex-col gap-space-2xs">
<div class="flex justify-between items-center">
<span class="font-body-sm text-body-sm text-on-surface font-medium">Support ticket velocity surge</span>
<span class="font-code-sm text-code-sm text-primary font-bold">+12% CATE</span>
</div>
<div class="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden">
<div class="bg-primary h-full rounded-full w-[38%]"></div>
</div>
<span class="font-label-caps text-label-caps text-outline">Resolution bottleneck accounts respond to white-glove</span>
</div>
</div>
<div class="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between">
<span class="font-body-sm text-body-sm text-on-surface-variant">Global CATE Variance</span>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">σ² = 0.412 (High Spread)</span>
</div>
</div>
</div>
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-sm">
<div class="flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps uppercase text-outline">Overfitting &amp; Monotonicity Verification</span>
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span class="font-code-sm text-code-sm text-tertiary">Passed (Spearman Rank: 0.98)</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Decile Uplift Calibration (Predicted vs Observed CATE)</h2>
</div>
<div class="flex items-center gap-space-md font-body-sm text-body-sm">
<div class="flex items-center gap-space-xs">
<span class="w-3 h-3 bg-tertiary rounded-sm"></span>
<span class="text-on-surface">Observed Lift (Holdout)</span>
</div>
<div class="flex items-center gap-space-xs">
<span class="w-3 h-3 bg-primary rounded-sm"></span>
<span class="text-on-surface">Predicted CATE</span>
</div>
</div>
</div>
<div class="grid grid-cols-10 gap-space-sm items-end h-56 pt-space-md px-space-xs">
<!-- Decile 10 (Highest Lift) -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+8.4%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[95%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[92%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">D10 (Top)</span>
</div>
<!-- Decile 9 -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+6.8%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[80%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[78%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D9</span>
</div>
<!-- Decile 8 -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+5.1%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[64%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[65%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D8</span>
</div>
<!-- Decile 7 -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+4.0%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[52%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[50%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D7</span>
</div>
<!-- Decile 6 -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+3.1%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[40%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[41%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D6</span>
</div>
<!-- Decile 5 -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+2.2%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[30%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[29%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D5</span>
</div>
<!-- Decile 4 -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+1.3%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[20%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[21%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D4</span>
</div>
<!-- Decile 3 -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-tertiary font-bold opacity-0 group-hover:opacity-100 transition-opacity">+0.4%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-tertiary rounded-t-sm h-[10%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-primary rounded-t-sm h-[11%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D3</span>
</div>
<!-- Decile 2 (Sleeping Dogs / Zero effect) -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-outline font-bold opacity-0 group-hover:opacity-100 transition-opacity">-0.1%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-outline-variant rounded-t-sm h-[3%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-outline-variant rounded-t-sm h-[2%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-outline font-medium">D2</span>
</div>
<!-- Decile 1 (Negative Response / Do Not Disturb) -->
<div class="flex flex-col items-center h-full justify-end gap-space-xs group cursor-pointer">
<span class="font-code-sm text-code-sm text-error font-bold opacity-0 group-hover:opacity-100 transition-opacity">-1.2%</span>
<div class="w-full flex items-end justify-center gap-1 h-44">
<div class="w-1/2 bg-error rounded-t-sm h-[8%] transition-all group-hover:brightness-110"></div>
<div class="w-1/2 bg-error rounded-t-sm h-[7%] transition-all group-hover:brightness-110"></div>
</div>
<span class="font-code-sm text-code-sm text-error font-semibold">D1 (Churn Risk)</span>
</div>
</div>
</div>
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
<div class="xl:col-span-8 bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-sm">
<div class="flex items-center justify-between">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-outline">Covariate Balance &amp; A/B Validation</span>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Treatment vs Holdout Orthogonality</h2>
</div>
<span class="bg-tertiary/10 text-tertiary font-code-sm text-code-sm px-space-md py-space-xs rounded-lg font-semibold flex items-center gap-space-xs">
<span class="material-symbols-outlined text-headline-sm">check_circle</span>
<span>Zero Confounding Bias</span>
</span>
</div>
<div class="w-full overflow-x-auto">
<table class="w-full text-left font-body-sm text-body-sm">
<thead>
<tr class="text-outline font-label-caps text-label-caps uppercase bg-surface-container-high/40">
<th class="py-space-sm px-space-md">Covariate Variable</th>
<th class="py-space-sm px-space-md">Treatment Mean (μT)</th>
<th class="py-space-sm px-space-md">Control Mean (μC)</th>
<th class="py-space-sm px-space-md">Std. Diff (Δ%)</th>
<th class="py-space-sm px-space-md">KS P-Value</th>
<th class="py-space-sm px-space-md text-right">Balance Health</th>
</tr>
</thead>
<tbody class="divide-y-0">
<tr class="hover:bg-surface-container transition-colors">
<td class="py-space-sm px-space-md font-semibold text-on-surface">Account Tenure (Months)</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">18.42 ± 4.1</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">18.39 ± 4.2</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-tertiary">0.007 (&lt;0.05)</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">0.96</td>
<td class="py-space-sm px-space-md text-right">
<span class="px-space-xs py-space-2xs bg-tertiary-container/30 text-tertiary-fixed font-code-sm text-code-sm rounded">Balanced</span>
</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-space-sm px-space-md font-semibold text-on-surface">Monthly GMV Volume</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">\$42,810</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">\$42,650</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-tertiary">0.012 (&lt;0.05)</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">0.91</td>
<td class="py-space-sm px-space-md text-right">
<span class="px-space-xs py-space-2xs bg-tertiary-container/30 text-tertiary-fixed font-code-sm text-code-sm rounded">Balanced</span>
</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-space-sm px-space-md font-semibold text-on-surface">Core Feature Adoption (0-10)</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">6.72</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">6.75</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-tertiary">-0.009 (&lt;0.05)</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">0.93</td>
<td class="py-space-sm px-space-md text-right">
<span class="px-space-xs py-space-2xs bg-tertiary-container/30 text-tertiary-fixed font-code-sm text-code-sm rounded">Balanced</span>
</td>
</tr>
<tr class="hover:bg-surface-container transition-colors">
<td class="py-space-sm px-space-md font-semibold text-on-surface">NPS Satisfaction Index</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">54.2</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">53.9</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-tertiary">0.011 (&lt;0.05)</td>
<td class="py-space-sm px-space-md font-code-sm text-code-sm text-on-surface">0.89</td>
<td class="py-space-sm px-space-md text-right">
<span class="px-space-xs py-space-2xs bg-tertiary-container/30 text-tertiary-fixed font-code-sm text-code-sm rounded">Balanced</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div class="xl:col-span-4 bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between gap-space-md shadow-sm">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">Model Configuration</span>
<span class="material-symbols-outlined text-outline text-headline-sm">tune</span>
</div>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Hyperparameters &amp; Governance</h2>
</div>
<div class="flex flex-col gap-space-sm bg-surface-container-high p-space-md rounded-lg font-code-sm text-code-sm">
<div class="flex justify-between items-center py-space-2xs">
<span class="text-outline">Estimator Framework</span>
<span class="text-on-surface font-semibold">EconML GRF</span>
</div>
<div class="flex justify-between items-center py-space-2xs">
<span class="text-outline">Min Leaf Samples</span>
<span class="text-secondary font-semibold">50 accounts</span>
</div>
<div class="flex justify-between items-center py-space-2xs">
<span class="text-outline">N_Estimators (Trees)</span>
<span class="text-on-surface font-semibold">500 trees</span>
</div>
<div class="flex justify-between items-center py-space-2xs">
<span class="text-outline">Cross-Fitting Folds</span>
<span class="text-on-surface font-semibold">5-Fold DML</span>
</div>
<div class="flex justify-between items-center py-space-2xs">
<span class="text-outline">Subsample Ratio</span>
<span class="text-on-surface font-semibold">0.70 (Honest Splitting)</span>
</div>
</div>
<div class="flex flex-col gap-space-xs pt-space-xs">
<button class="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-space-sm px-space-md rounded-lg font-body-sm text-body-sm font-semibold transition-all flex items-center justify-center gap-space-xs shadow-sm" id="export-report-btn" type="button">
<span class="material-symbols-outlined text-headline-sm">picture_as_pdf</span>
<span>Export Calibration Report (PDF / LaTeX)</span>
</button>
<button class="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-space-sm px-space-md rounded-lg font-body-sm text-body-sm font-semibold transition-all flex items-center justify-center gap-space-xs shadow-sm" id="download-cate-btn" type="button">
<span class="material-symbols-outlined text-headline-sm">download</span>
<span>Download CATE Coefficients (CSV)</span>
</button>
</div>
</div>
</div>
<div class="fixed bottom-6 right-6 bg-surface-container-highest text-on-surface px-space-md py-space-sm rounded-xl shadow-xl flex items-center gap-space-sm transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none z-50" id="toast">
<span class="material-symbols-outlined text-tertiary">check_circle</span>
<span class="font-body-sm text-body-sm" id="toast-text">Action triggered successfully.</span>
</div>
</div>
</main></div>`;

export default function CausalDiagnostics() {
  return (
    <div 
      className="stitch-screen w-full h-full text-slate-100 bg-slate-900"
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
}
