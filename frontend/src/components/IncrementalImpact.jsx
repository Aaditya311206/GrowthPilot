import React from 'react';

const rawHtml = `<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex flex-col"><div class="h-16 px-space-base flex items-center justify-between bg-surface-container-lowest"><div class="flex items-center gap-space-sm"><img alt="GrowthPilot Brand Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XrMWXKxTSx-Snc2KQC4ZvkufGor-8Vno4BAooPV8E5Ut9bTKebK6kWHd7ELlG-0IEr6Kn8iaoVT4Wv4inq5dk5VGtvEkDQtEkFTP72wRw4d19KLzReKmYDFylxdPqt3STZpomcKvw2t9SDzpb9EB69pxO14qxxVQ-pKN0bbkkyQZ4Is4JsIHIuXFUlSMWuccOJ3U0AWbIfuaJ0rHlg8__NdeR7YPRlPH3a6DrDjzVsIyzOvPZU6yu6j4s"/><span class="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">GrowthPilot</span></div></div><div class="px-space-base py-space-sm"><div class="bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"><div class="flex flex-col min-w-0"><span class="font-label-caps text-label-caps uppercase text-outline truncate">Workspace</span><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate">Acme SaaS &amp; Commerce</span><div class="flex items-center gap-space-xs mt-space-2xs"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span><span class="font-code-sm text-code-sm text-on-surface-variant truncate">Production Cluster</span></div></div><span class="material-symbols-outlined text-outline">unfold_more</span></div></div><div class="px-space-base py-space-xs"><span class="font-label-caps text-label-caps uppercase text-outline px-space-xs tracking-wider">Causal Intelligence</span></div><nav class="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="overview" href="#"><span class="material-symbols-outlined text-metric-md">insights</span><span class="font-body-md text-body-md">Incremental Impact</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="cohorts" href="#"><span class="material-symbols-outlined text-metric-md">groups_3</span><span class="font-body-md text-body-md">Cohort Explorer</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="simulator" href="#"><span class="material-symbols-outlined text-metric-md">tune</span><span class="font-body-md text-body-md">Campaign Simulator</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="diagnostics" href="#"><span class="material-symbols-outlined text-metric-md">biotech</span><span class="font-body-md text-body-md">Causal Diagnostics</span></a></nav></div><div class="flex flex-col gap-space-sm p-space-base bg-surface-container-low"><div class="bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-tertiary text-metric-md">verified</span><div class="flex flex-col"><span class="font-label-caps text-label-caps uppercase text-outline">Inference Kernel</span><span class="font-code-sm text-code-sm text-tertiary font-semibold">Causal Engine v4.2</span></div></div><span class="font-code-sm text-code-sm text-on-surface-variant bg-surface-container px-space-xs py-space-2xs rounded">99.4%</span></div><div class="flex items-center justify-between pt-space-xs"><div class="flex items-center gap-space-sm"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSVnDkcEYZoE2ahuAzR-yW96xU87DDr8Vu-hMTVMEPQVQqU9oZPHg9VJ7vfbIKYOvC7kDeJKak3u04SJMIMqUZTNv4ZOovyEhVGD4cp4Ui0Arwrm5kvPEHsemmG53cL751Y0wVZfqRgTz8HUZIPLKra3WmqKKycV_djdbr7_OhgNQhyNgVrlhzQPHNYwj6TnOTFp3hADFaX7BMwe57S6tirIF9fDV49KAAYgoQWaoQysOeE1bQdaE2"/><div class="flex flex-col"><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate max-w-[100px]">Dr. Alex Rivera</span><span class="font-label-caps text-label-caps text-outline truncate max-w-[100px]">Chief Scientist</span></div></div><div class="flex items-center gap-space-2xs"><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="settings" href="#" title="Platform Settings"><span class="material-symbols-outlined text-headline-sm">settings</span></a><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="documentation" href="#" title="Documentation &amp; API"><span class="material-symbols-outlined text-headline-sm">menu_book</span></a></div></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter-desktop"><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs font-body-sm text-body-sm text-outline"><span class="material-symbols-outlined text-headline-sm">home</span><span>/</span><span class="text-on-surface font-semibold">GrowthPilot Core</span><span>/</span><span class="text-secondary">Lift Telemetry</span></div></div><div class="flex items-center gap-space-md"><div class="hidden xl:flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-xl"><span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span><span class="font-label-caps text-label-caps text-outline uppercase">Engine Status:</span><span class="font-code-sm text-code-sm text-on-surface font-semibold">Incremental Calibrated</span><span class="font-code-sm text-code-sm text-tertiary">(Qini: +0.78)</span></div><div class="flex items-center bg-surface-container-low px-space-md py-space-xs rounded-xl gap-space-sm cursor-pointer hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-outline text-headline-sm">calendar_today</span><div class="flex flex-col text-left"><span class="font-body-sm text-body-sm text-on-surface font-semibold">Oct 1 - Oct 31, 2024</span><span class="font-label-caps text-label-caps text-outline">Lookback: 90d Baseline</span></div><span class="material-symbols-outlined text-outline text-headline-sm">expand_more</span></div><div class="flex items-center gap-space-sm"><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs" type="button"><span class="material-symbols-outlined text-headline-sm">api</span><span>Export Cohort API</span></button><button class="bg-primary-container hover:bg-surface-variant text-on-primary-container font-body-sm text-body-sm font-semibold px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" type="button"><span class="material-symbols-outlined text-headline-sm">play_arrow</span><span>Run Simulation</span></button></div></div></header><main class="relative w-full pt-16 bg-surface px-gutter-desktop min-h-screen"><div class="flex flex-col w-full gap-space-xl pb-space-2xl">
<!-- Top Level Notification & Status Strip -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl">
<div class="flex items-center gap-space-md min-w-0">
<div class="w-10 h-10 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-headline-sm" style="font-variation-settings: 'FILL' 1;">query_stats</span>
</div>
<div class="flex flex-col min-w-0">
<div class="flex items-center gap-space-xs flex-wrap">
<span class="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Executive Uplift Intelligence</span>
<span class="bg-surface-container-highest text-on-surface-variant font-code-sm text-code-sm px-space-xs py-space-2xs rounded">Causal-v4.2 Engine</span>
<span class="bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps uppercase px-space-xs py-space-2xs rounded tracking-wider">Statistically Significant (p &lt; 0.001)</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant truncate">
          Causal forest estimation isolates genuine incremental behavior by subtracting synthetic twin holdouts across 44,615 accounts.
        </p>
</div>
</div>
<div class="flex items-center gap-space-sm shrink-0">
<div class="flex items-center gap-space-xs bg-surface-container px-space-sm py-space-xs rounded-lg">
<span class="font-label-caps text-label-caps text-outline uppercase">Naive Propensity Waste Avoided:</span>
<span class="font-code-sm text-code-sm text-tertiary font-bold">+\$314,200</span>
</div>
<button class="bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-lg transition-colors flex items-center gap-space-xs" type="button">
<span class="material-symbols-outlined text-body-md">tune</span>
<span>Hyperparameter Config</span>
</button>
</div>
</div>
<!-- 1. Executive KPI Grid (4 key cards) -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
<!-- Card 1: Net Incremental Lift -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary via-tertiary-fixed-dim to-secondary"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">Net Incremental Lift</span>
<span class="material-symbols-outlined text-tertiary text-headline-sm">trending_up</span>
</div>
<div class="flex items-baseline gap-space-xs mt-space-xs">
<span class="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">+\$842,500</span>
<span class="font-code-sm text-code-sm text-tertiary font-semibold">+24.8%</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
          True attributable margin from active interventions over control.
        </p>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-lowest/60 p-space-xs rounded-lg">
<div class="flex items-center gap-space-xs">
<!-- Mini SVG Sparkline -->
<svg class="w-20 h-5 text-tertiary" fill="none" viewbox="0 0 80 20">
<path d="M1 17L14 13L26 15L38 9L50 11L64 4L79 2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
</svg>
<span class="font-code-sm text-code-sm text-outline">95% CI: [\$795k - \$890k]</span>
</div>
<span class="font-label-caps text-label-caps text-tertiary font-semibold uppercase">Calibrated</span>
</div>
</div>
<!-- Card 2: Budget Saved from 'Sure Things' -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-secondary-fixed-dim to-primary"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">Budget Saved (Sure Things)</span>
<span class="material-symbols-outlined text-secondary text-headline-sm">savings</span>
</div>
<div class="flex items-baseline gap-space-xs mt-space-xs">
<span class="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">\$314,200</span>
<span class="font-code-sm text-code-sm text-secondary font-semibold">100% Retained</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
          Discounts intentionally suppressed on organically converting users.
        </p>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-lowest/60 p-space-xs rounded-lg">
<div class="flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span class="font-code-sm text-code-sm text-on-surface">Avoided 28.4k wasted promo codes</span>
</div>
</div>
</div>
<!-- Card 3: Persuadables Targeted -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container via-primary to-surface-tint"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">Persuadables Targeted</span>
<span class="material-symbols-outlined text-primary text-headline-sm">center_focus_strong</span>
</div>
<div class="flex items-baseline gap-space-xs mt-space-xs">
<span class="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">14,280</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">accounts</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
          38.2% of flagged at-risk pool responding with positive treatment effect.
        </p>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-lowest/60 p-space-xs rounded-lg">
<span class="font-label-caps text-label-caps bg-primary-container/40 text-on-primary-container px-space-xs py-space-2xs rounded uppercase">Optimal ROI Frontier</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Top 32% cohort</span>
</div>
</div>
<!-- Card 4: Incremental Spend ROI -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary via-secondary to-primary-container"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">Incremental Spend ROI</span>
<span class="material-symbols-outlined text-tertiary-fixed-dim text-headline-sm">monetization_on</span>
</div>
<div class="flex items-baseline gap-space-xs mt-space-xs">
<span class="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight">4.82x</span>
<span class="font-code-sm text-code-sm text-outline">vs 1.65x Naive</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
          Net incremental margin earned per intervention dollar deployed.
        </p>
</div>
<div class="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-lowest/60 p-space-xs rounded-lg">
<span class="font-code-sm text-code-sm text-tertiary flex items-center gap-space-2xs">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
          +192% Capital Efficiency
        </span>
<span class="font-label-caps text-label-caps text-outline uppercase">Causal Cutoff</span>
</div>
</div>
</div>
<!-- 2. Main Analysis Section: Uplift Curve & Interactive Visualizer -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
<!-- Main Uplift / Qini Chart (8 Cols) -->
<div class="lg:col-span-8 bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Cumulative Uplift Curve (Qini)</h2>
<span class="bg-surface-container-highest px-space-xs py-space-2xs rounded font-code-sm text-code-sm text-on-surface-variant">AUUC: 0.784</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
            Targeting top 30% via Causal Forest captures 80% of attainable incremental revenue.
          </p>
</div>
<!-- Interactive Mode Tabs -->
<div class="flex items-center bg-surface-container-lowest p-space-2xs rounded-lg">
<button class="chart-tab px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm bg-primary-container text-on-primary-container font-semibold transition-all" id="tab-uplift" onclick="switchChartMode('uplift')">
            Cumulative Lift
          </button>
<button class="chart-tab px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm text-outline hover:text-on-surface transition-all" id="tab-margin" onclick="switchChartMode('margin')">
            Net Margin Impact
          </button>
<button class="chart-tab px-space-sm py-space-xs rounded-lg font-body-sm text-body-sm text-outline hover:text-on-surface transition-all" id="tab-cannibal" onclick="switchChartMode('cannibal')">
            Cannibalization Avoidance
          </button>
</div>
</div>
<!-- Uplift Canvas SVG Visualizer -->
<div class="relative w-full h-80 bg-surface-container-lowest/80 rounded-xl p-space-md flex flex-col justify-between overflow-hidden">
<!-- SVG Grid Lines & Dynamic Curves -->
<div class="absolute inset-0 p-space-md pointer-events-none">
<svg class="w-full h-full" fill="none" preserveaspectratio="none" viewbox="0 0 600 240">
<defs>
<lineargradient id="growthpilotGlow" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stop-color="#4edea3" stop-opacity="0.28"></stop>
<stop offset="100%" stop-color="#4edea3" stop-opacity="0.00"></stop>
</lineargradient>
<lineargradient id="naiveGlow" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stop-color="#4f46e5" stop-opacity="0.12"></stop>
<stop offset="100%" stop-color="#4f46e5" stop-opacity="0.00"></stop>
</lineargradient>
</defs>
<!-- Horizontal grid guidelines -->
<line stroke="#2d3449" stroke-dasharray="3 3" stroke-width="1" x1="40" x2="590" y1="20" y2="20"></line>
<line stroke="#2d3449" stroke-dasharray="3 3" stroke-width="1" x1="40" x2="590" y1="70" y2="70"></line>
<line stroke="#2d3449" stroke-dasharray="3 3" stroke-width="1" x1="40" x2="590" y1="120" y2="120"></line>
<line stroke="#2d3449" stroke-dasharray="3 3" stroke-width="1" x1="40" x2="590" y1="170" y2="170"></line>
<line stroke="#464555" stroke-width="1" x1="40" x2="590" y1="210" y2="210"></line>
<!-- Optimal Frontier Boundary Mark (30% cutoff) -->
<line opacity="0.6" stroke="#4edea3" stroke-dasharray="4 4" stroke-width="1.5" x1="205" x2="205" y1="20" y2="210"></line>
<rect fill="#171f33" height="20" opacity="0.9" rx="4" width="100" x="155" y="24"></rect>
<text fill="#4edea3" font-family="JetBrains Mono" font-size="10" font-weight="600" text-anchor="middle" x="205" y="38">CUTOFF: TOP 30%</text>
<!-- 1. Random Selection Benchmark (Dashed Grey diagonal) -->
<line opacity="0.4" stroke="#918fa1" stroke-dasharray="4 4" stroke-width="1.5" x1="40" x2="590" y1="210" y2="50"></line>
<!-- 2. Naive Churn Propensity Model (Dips towards tail due to sleeping dogs / lost causes) -->
<path d="M40 210 Q 150 140, 260 120 T 430 115 T 590 145" fill="none" id="naive-path" stroke="#c3c0ff" stroke-dasharray="6 4" stroke-width="2.5"></path>
<!-- 3. GrowthPilot Causal Lift Engine (Steep early gain, saturates near ideal apex) -->
<path d="M40 210 C 100 80, 170 36, 220 34 C 320 30, 480 32, 590 38 L 590 210 Z" fill="url(#growthpilotGlow)" id="causal-area"></path>
<path d="M40 210 C 100 80, 170 36, 220 34 C 320 30, 480 32, 590 38" fill="none" id="causal-path" stroke="#4edea3" stroke-linecap="round" stroke-width="3"></path>
<!-- Active Data Node at Cutoff Point -->
<circle cx="205" cy="35" fill="#4edea3" r="5" stroke="#060e20" stroke-width="2"></circle>
<circle class="animate-ping" cx="205" cy="35" opacity="0.4" r="11" stroke="#4edea3" stroke-width="1"></circle>
</svg>
</div>
<!-- Axis Labels inside canvas -->
<div class="relative z-10 flex justify-between text-outline font-code-sm text-code-sm">
<span>Lift (\$)</span>
<span class="text-tertiary">Max Gain Apex: +\$842.5k</span>
</div>
<!-- Hoverable Interactive Tooltip Inspector Card -->
<div class="relative z-10 self-center lg:self-end bg-surface-container-high/95 p-space-sm rounded-lg shadow-xl max-w-xs mt-auto backdrop-blur-md">
<div class="flex items-center justify-between pb-space-xs">
<span class="font-label-caps text-label-caps uppercase text-outline">Hover Telemetry (30th Percentile)</span>
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
</div>
<div class="flex flex-col gap-space-2xs font-code-sm text-code-sm">
<div class="flex items-center justify-between">
<span class="text-on-surface-variant flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-tertiary"></span> GrowthPilot Lift:
              </span>
<span class="text-tertiary font-bold">+\$674,000 (80.1%)</span>
</div>
<div class="flex items-center justify-between">
<span class="text-on-surface-variant flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-primary"></span> Naive Churn Model:
              </span>
<span class="text-on-surface">+\$285,400 (33.8%)</span>
</div>
<div class="flex items-center justify-between">
<span class="text-on-surface-variant flex items-center gap-space-xs">
<span class="w-2 h-2 rounded-full bg-outline"></span> Random Selection:
              </span>
<span class="text-outline">+\$178,000 (21.1%)</span>
</div>
</div>
<div class="mt-space-xs pt-space-xs text-on-tertiary-container font-body-sm text-body-sm">
            Delta vs Naive: <strong class="text-tertiary font-bold">+\$388,600</strong> pure incremental margin.
          </div>
</div>
<!-- Bottom X-Axis Percentile indicators -->
<div class="relative z-10 flex justify-between text-outline font-code-sm text-code-sm pt-space-xs">
<span>0% (No Spend)</span>
<span class="text-tertiary font-semibold">30% (GrowthPilot Cutoff)</span>
<span>50%</span>
<span>75%</span>
<span>100% (Entire Base)</span>
</div>
</div>
<!-- Chart Legend & Scientific Annotations -->
<div class="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-md mt-space-sm bg-surface-container p-space-sm rounded-xl">
<div class="flex items-start gap-space-sm">
<span class="w-3 h-3 rounded-full bg-tertiary mt-1 shrink-0"></span>
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-on-surface font-semibold">GrowthPilot Causal Engine</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Sorts strictly by individual treatment effect (ITE tau_i).</span>
</div>
</div>
<div class="flex items-start gap-space-sm">
<span class="w-3 h-3 rounded-full bg-primary mt-1 shrink-0"></span>
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-on-surface font-semibold">Naive Churn Propensity</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">Mistakes high-churn lost causes for actionable targets.</span>
</div>
</div>
<div class="flex items-start gap-space-sm">
<span class="w-3 h-3 rounded-full bg-outline mt-1 shrink-0"></span>
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-on-surface font-semibold">Sleeping Dogs Hazard</span>
<span class="font-code-sm text-code-sm text-error">Uncalibrated campaigns trigger customer cancellations.</span>
</div>
</div>
</div>
</div>
<!-- Right Side Diagnostic Card / Executive Takeaways (4 Cols) -->
<div class="lg:col-span-4 flex flex-col gap-space-md">
<!-- Causal Efficiency Diagnosis -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between h-full">
<div class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline tracking-wider">Causal Diagnosis</span>
<span class="bg-tertiary-container/30 text-tertiary font-code-sm text-code-sm px-space-xs py-space-2xs rounded font-bold">Optimal Policy</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">
            The Propensity Paradox
          </h3>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Traditional machine learning predicts <em class="text-on-surface not-italic font-semibold">who is at risk</em>. Causal inference predicts <em class="text-tertiary not-italic font-semibold">who will be persuaded by the intervention</em>.
          </p>
<div class="flex flex-col gap-space-xs mt-space-sm">
<div class="p-space-sm bg-surface-container rounded-lg flex items-center justify-between">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-outline">Wasted Spend Reclaimed</span>
<span class="font-code-sm text-code-sm text-on-surface font-bold">\$314,200</span>
</div>
<span class="material-symbols-outlined text-tertiary">check_circle</span>
</div>
<div class="p-space-sm bg-surface-container rounded-lg flex items-center justify-between">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-outline">Sleeping Dogs Suppressed</span>
<span class="font-code-sm text-code-sm text-secondary font-bold">4,015 accounts</span>
</div>
<span class="material-symbols-outlined text-secondary">notifications_off</span>
</div>
<div class="p-space-sm bg-surface-container rounded-lg flex items-center justify-between">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-outline">Budget Utilization Cut</span>
<span class="font-code-sm text-code-sm text-on-primary-container font-bold">-61.8% budget</span>
</div>
<span class="material-symbols-outlined text-primary">price_check</span>
</div>
</div>
</div>
<div class="mt-space-lg pt-space-md bg-surface-container-lowest p-space-md rounded-xl flex flex-col gap-space-xs">
<span class="font-label-caps text-label-caps text-outline uppercase tracking-wider">Executive Recommendation</span>
<p class="font-body-sm text-body-sm text-on-surface">
            Maintain promotion cap at <strong>32nd percentile</strong>. Expanding spend to 40%+ triggers negative marginal returns on accounts that renew unconditionally.
          </p>
<div class="pt-space-xs">
<button class="w-full bg-primary-container hover:bg-surface-variant text-on-primary-container font-body-sm text-body-sm font-semibold py-space-xs px-space-md rounded-lg transition-colors flex items-center justify-center gap-space-xs shadow-md" type="button">
<span class="material-symbols-outlined text-body-md">lock</span>
<span>Lock Frontier Threshold</span>
</button>
</div>
</div>
</div>
</div>
</div>
<!-- 3. The Four Uplift Quadrants Breakdown Card -->
<div class="flex flex-col gap-space-md">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
<div class="flex items-center gap-space-xs">
<h2 class="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">The 4-Quadrant Lift Segmentation</h2>
<span class="bg-surface-container-high px-space-sm py-space-2xs rounded font-code-sm text-code-sm text-on-surface-variant">Total: 44,615 Analyzed Cohorts</span>
</div>
<span class="font-body-sm text-body-sm text-outline">
        Derived via Double Machine Learning (DML) with 5-fold cross-validation
      </span>
</div>
<!-- 4 Quadrants Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
<!-- Quadrant 1: Persuadables -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-tertiary"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-tertiary uppercase font-bold tracking-wider">Quadrant I • Actionable</span>
<span class="material-symbols-outlined text-tertiary">campaign</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">Persuadables</h3>
<div class="flex items-baseline gap-space-xs">
<span class="font-metric-xl text-metric-xl text-tertiary font-bold">32%</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">14,280 accounts</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
            Convert <em>only</em> when intervened upon. Zero or negative conversion without treatment.
          </p>
</div>
<div class="mt-space-md flex flex-col gap-space-xs">
<div class="bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-between font-code-sm text-code-sm">
<span class="text-outline">Causal Lift (Tau):</span>
<span class="text-tertiary font-semibold">+34.2%</span>
</div>
<div class="bg-tertiary-container/30 text-on-tertiary-container p-space-xs rounded-lg font-body-sm text-body-sm font-semibold flex items-center gap-space-xs">
<span class="material-symbols-outlined text-headline-sm">check</span>
<span>Intervene Immediately (High ROI)</span>
</div>
</div>
</div>
<!-- Quadrant 2: Sure Things -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-secondary uppercase font-bold tracking-wider">Quadrant II • Safe Holdout</span>
<span class="material-symbols-outlined text-secondary">verified_user</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">Sure Things</h3>
<div class="flex items-baseline gap-space-xs">
<span class="font-metric-xl text-metric-xl text-secondary font-bold">28%</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">12,490 accounts</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
            Will renew or upgrade organically. Promotions represent 100% cannibalized company margin.
          </p>
</div>
<div class="mt-space-md flex flex-col gap-space-xs">
<div class="bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-between font-code-sm text-code-sm">
<span class="text-outline">Causal Lift (Tau):</span>
<span class="text-outline font-semibold">~0.0% (Zero Lift)</span>
</div>
<div class="bg-surface-container-high text-on-surface p-space-xs rounded-lg font-body-sm text-body-sm font-semibold flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-headline-sm">remove_circle_outline</span>
<span>Suppress Discounts (Protect Margin)</span>
</div>
</div>
</div>
<!-- Quadrant 3: Lost Causes -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-outline-variant"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-outline uppercase font-bold tracking-wider">Quadrant III • Deficits</span>
<span class="material-symbols-outlined text-outline">block</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">Lost Causes</h3>
<div class="flex items-baseline gap-space-xs">
<span class="font-metric-xl text-metric-xl text-on-surface-variant font-bold">31%</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">13,830 accounts</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
            Will churn regardless of discounts, concierge outreach, or pricing concessions.
          </p>
</div>
<div class="mt-space-md flex flex-col gap-space-xs">
<div class="bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-between font-code-sm text-code-sm">
<span class="text-outline">Causal Lift (Tau):</span>
<span class="text-outline font-semibold">+0.4% (Flat)</span>
</div>
<div class="bg-surface-container-high text-on-surface-variant p-space-xs rounded-lg font-body-sm text-body-sm font-semibold flex items-center gap-space-xs">
<span class="material-symbols-outlined text-outline text-headline-sm">money_off</span>
<span>Suppress Spend (Eliminate Waste)</span>
</div>
</div>
</div>
<!-- Quadrant 4: Sleeping Dogs -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between relative overflow-hidden group hover:bg-surface-container transition-all">
<div class="absolute top-0 left-0 right-0 h-1 bg-error"></div>
<div class="flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-error uppercase font-bold tracking-wider">Quadrant IV • Hazard</span>
<span class="material-symbols-outlined text-error">warning</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold mt-space-2xs">Sleeping Dogs</h3>
<div class="flex items-baseline gap-space-xs">
<span class="font-metric-xl text-metric-xl text-error font-bold">9%</span>
<span class="font-code-sm text-code-sm text-on-surface-variant">4,015 accounts</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
            Contacting triggers immediate opt-outs or audit-driven cancellations.
          </p>
</div>
<div class="mt-space-md flex flex-col gap-space-xs">
<div class="bg-surface-container-lowest p-space-xs rounded-lg flex items-center justify-between font-code-sm text-code-sm">
<span class="text-outline">Causal Lift (Tau):</span>
<span class="text-error font-semibold">-18.6% (Negative)</span>
</div>
<div class="bg-error-container/30 text-error p-space-xs rounded-lg font-body-sm text-body-sm font-semibold flex items-center gap-space-xs">
<span class="material-symbols-outlined text-error text-headline-sm">do_not_disturb_on</span>
<span>Strict Suppression List</span>
</div>
</div>
</div>
</div>
</div>
<!-- 4. Active Interventions & Channel Lift Table -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Active Interventions &amp; Channel Lift Telemetry</h2>
<span class="material-symbols-outlined text-outline text-headline-sm" title="Real-time synthetic control group evaluations">info</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Live attribution using localized uplift trees across enterprise campaigns.
        </p>
</div>
<div class="flex items-center gap-space-sm">
<button class="bg-surface-container-high hover:bg-surface-variant text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-lg transition-colors flex items-center gap-space-xs" type="button">
<span class="material-symbols-outlined text-body-md">filter_list</span>
<span>Filter Channels</span>
</button>
<button class="bg-primary-container hover:bg-surface-variant text-on-primary-container font-body-sm text-body-sm font-semibold px-space-md py-space-xs rounded-lg transition-colors flex items-center gap-space-xs" type="button">
<span class="material-symbols-outlined text-body-md">add</span>
<span>New Uplift Experiment</span>
</button>
</div>
</div>
<!-- Data Table Container with Horizontal Scroll Support -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse min-w-[900px]">
<thead>
<tr class="bg-surface-container-lowest/80 text-outline font-label-caps text-label-caps uppercase tracking-wider">
<th class="py-space-sm px-space-md rounded-l-lg">Intervention Campaign</th>
<th class="py-space-sm px-space-sm">Channel</th>
<th class="py-space-sm px-space-sm">Target Quadrant</th>
<th class="py-space-sm px-space-sm">Treated Cohort</th>
<th class="py-space-sm px-space-sm">Spend Deployed</th>
<th class="py-space-sm px-space-sm">Incremental Margin</th>
<th class="py-space-sm px-space-sm">True Lift %</th>
<th class="py-space-sm px-space-sm">Efficiency Status</th>
<th class="py-space-sm px-space-md rounded-r-lg text-right">Action</th>
</tr>
</thead>
<tbody class="divide-y divide-surface-container-highest/20 font-body-sm text-body-sm">
<!-- Row 1: Q4 Enterprise Renewal -->
<tr class="hover:bg-surface-container transition-colors group">
<td class="py-space-sm px-space-md">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<div class="flex flex-col">
<span class="font-semibold text-on-surface group-hover:text-primary transition-colors">Q4 Enterprise Renewal Incentive</span>
<span class="font-code-sm text-code-sm text-outline">ID: INT-8802 • AE Tier 1</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-surface-container-high px-space-xs py-space-2xs rounded font-code-sm text-code-sm text-on-surface">Executive Rep SDR</span>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-tertiary-container/30 text-tertiary px-space-xs py-space-2xs rounded font-code-sm text-code-sm font-semibold">Persuadables</span>
</td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              4,820 accts
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              \$96,400
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-tertiary font-bold">
              +\$482,000
            </td>
<td class="py-space-sm px-space-sm">
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary font-semibold">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
                +28.4%
              </div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-tertiary-container/30 text-on-tertiary-container px-space-xs py-space-2xs rounded font-label-caps text-label-caps uppercase font-bold">Optimal Frontier</span>
</td>
<td class="py-space-sm px-space-md text-right">
<div class="flex items-center justify-end gap-space-xs">
<button class="p-space-xs rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Adjust Allocation" type="button">
<span class="material-symbols-outlined text-body-md">tune</span>
</button>
<button class="p-space-xs rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Inspect Model" type="button">
<span class="material-symbols-outlined text-body-md">biotech</span>
</button>
</div>
</td>
</tr>
<!-- Row 2: Dormant Cart Recovery Flow -->
<tr class="hover:bg-surface-container transition-colors group">
<td class="py-space-sm px-space-md">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<div class="flex flex-col">
<span class="font-semibold text-on-surface group-hover:text-primary transition-colors">Dormant Cart Recovery Flow</span>
<span class="font-code-sm text-code-sm text-outline">ID: INT-8791 • Dynamic Discounting</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-surface-container-high px-space-xs py-space-2xs rounded font-code-sm text-code-sm text-on-surface">Automated Email/SMS</span>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-tertiary-container/30 text-tertiary px-space-xs py-space-2xs rounded font-code-sm text-code-sm font-semibold">Persuadables</span>
</td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              6,110 accts
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              \$32,500
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-tertiary font-bold">
              +\$198,300
            </td>
<td class="py-space-sm px-space-sm">
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary font-semibold">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
                +21.2%
              </div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-tertiary-container/30 text-on-tertiary-container px-space-xs py-space-2xs rounded font-label-caps text-label-caps uppercase font-bold">Optimal Frontier</span>
</td>
<td class="py-space-sm px-space-md text-right">
<div class="flex items-center justify-end gap-space-xs">
<button class="p-space-xs rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Adjust Allocation" type="button">
<span class="material-symbols-outlined text-body-md">tune</span>
</button>
<button class="p-space-xs rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Inspect Model" type="button">
<span class="material-symbols-outlined text-body-md">biotech</span>
</button>
</div>
</td>
</tr>
<!-- Row 3: Tier-Upgrade Concierge Outreach -->
<tr class="hover:bg-surface-container transition-colors group">
<td class="py-space-sm px-space-md">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-primary"></span>
<div class="flex flex-col">
<span class="font-semibold text-on-surface group-hover:text-primary transition-colors">Tier-Upgrade Concierge Outreach</span>
<span class="font-code-sm text-code-sm text-outline">ID: INT-8640 • Seat Expansion</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-surface-container-high px-space-xs py-space-2xs rounded font-code-sm text-code-sm text-on-surface">In-App Product Tour</span>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-secondary-container/20 text-secondary px-space-xs py-space-2xs rounded font-code-sm text-code-sm font-semibold">Persuadables + Sure</span>
</td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              2,350 accts
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              \$28,000
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-tertiary font-bold">
              +\$112,200
            </td>
<td class="py-space-sm px-space-sm">
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary font-semibold">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
                +14.7%
              </div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-surface-container-high text-on-surface-variant px-space-xs py-space-2xs rounded font-label-caps text-label-caps uppercase font-bold">Auditing Lift</span>
</td>
<td class="py-space-sm px-space-md text-right">
<div class="flex items-center justify-end gap-space-xs">
<button class="p-space-xs rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Adjust Allocation" type="button">
<span class="material-symbols-outlined text-body-md">tune</span>
</button>
<button class="p-space-xs rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Inspect Model" type="button">
<span class="material-symbols-outlined text-body-md">biotech</span>
</button>
</div>
</td>
</tr>
<!-- Row 4: Annual Pre-Pay Discount (Highlighted Cannibalization Warning) -->
<tr class="hover:bg-surface-container transition-colors group">
<td class="py-space-sm px-space-md">
<div class="flex items-center gap-space-sm">
<span class="w-2 h-2 rounded-full bg-error"></span>
<div class="flex flex-col">
<span class="font-semibold text-on-surface group-hover:text-primary transition-colors">Annual Pre-Pay Discount</span>
<span class="font-code-sm text-code-sm text-outline">ID: INT-8519 • Blanket 20% Promo</span>
</div>
</div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-surface-container-high px-space-xs py-space-2xs rounded font-code-sm text-code-sm text-on-surface">Billing Portal Banner</span>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-surface-container-highest text-outline px-space-xs py-space-2xs rounded font-code-sm text-code-sm font-semibold">Sure Things (Cannibal)</span>
</td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              1,000 accts (Holdout Test)
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-on-surface">
              \$18,000
            </td>
<td class="py-space-sm px-space-sm font-code-sm text-code-sm text-error font-bold">
              -\$34,000 margin
            </td>
<td class="py-space-sm px-space-sm">
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-error font-semibold">
<span class="material-symbols-outlined text-body-sm">arrow_downward</span>
                -0.8% (Cannibalized)
              </div>
</td>
<td class="py-space-sm px-space-sm">
<span class="bg-error-container/30 text-error px-space-xs py-space-2xs rounded font-label-caps text-label-caps uppercase font-bold">Suppression Recommended</span>
</td>
<td class="py-space-sm px-space-md text-right">
<div class="flex items-center justify-end gap-space-xs">
<button class="p-space-xs rounded bg-error-container/20 text-error hover:bg-error-container hover:text-on-error transition-colors" title="Kill Campaign" type="button">
<span class="material-symbols-outlined text-body-md">pause_circle</span>
</button>
<button class="p-space-xs rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Inspect Model" type="button">
<span class="material-symbols-outlined text-body-md">biotech</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Summary Metrics Footer -->
<div class="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-sm bg-surface-container-lowest/60 p-space-md rounded-xl">
<div class="flex items-center gap-space-md flex-wrap">
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps text-outline uppercase">Active Cohorts Evaluated:</span>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">4 Campaigns (14,280 accounts)</span>
</div>
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps text-outline uppercase">Total Margin Generated:</span>
<span class="font-code-sm text-code-sm text-tertiary font-bold">+\$842,500</span>
</div>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-outline">
<span class="material-symbols-outlined text-body-sm text-tertiary">sync</span>
        Last Causal Tree Sync: 4 mins ago (Real-time Holdout Loop)
      </div>
</div>
</div>
</div>
</main></div>`;

export default function IncrementalImpact() {
  return (
    <div 
      className="stitch-screen w-full h-full text-slate-100 bg-slate-900"
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
}
