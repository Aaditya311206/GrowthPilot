import React from 'react';

const rawHtml = `<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex flex-col"><div class="h-16 px-space-base flex items-center justify-between bg-surface-container-lowest"><div class="flex items-center gap-space-sm"><img alt="GrowthPilot Brand Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XrMWXKxTSx-Snc2KQC4ZvkufGor-8Vno4BAooPV8E5Ut9bTKebK6kWHd7ELlG-0IEr6Kn8iaoVT4Wv4inq5dk5VGtvEkDQtEkFTP72wRw4d19KLzReKmYDFylxdPqt3STZpomcKvw2t9SDzpb9EB69pxO14qxxVQ-pKN0bbkkyQZ4Is4JsIHIuXFUlSMWuccOJ3U0AWbIfuaJ0rHlg8__NdeR7YPRlPH3a6DrDjzVsIyzOvPZU6yu6j4s"/><span class="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">GrowthPilot</span></div></div><div class="px-space-base py-space-sm"><div class="bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"><div class="flex flex-col min-w-0"><span class="font-label-caps text-label-caps uppercase text-outline truncate">Workspace</span><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate">Acme SaaS &amp; Commerce</span><div class="flex items-center gap-space-xs mt-space-2xs"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span><span class="font-code-sm text-code-sm text-on-surface-variant truncate">Production Cluster</span></div></div><span class="material-symbols-outlined text-outline">unfold_more</span></div></div><div class="px-space-base py-space-xs"><span class="font-label-caps text-label-caps uppercase text-outline px-space-xs tracking-wider">Causal Intelligence</span></div><nav class="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="overview" href="#"><span class="material-symbols-outlined text-metric-md">insights</span><span class="font-body-md text-body-md">Incremental Impact</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="cohorts" href="#"><span class="material-symbols-outlined text-metric-md">groups_3</span><span class="font-body-md text-body-md">Cohort Explorer</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="simulator" href="#"><span class="material-symbols-outlined text-metric-md">tune</span><span class="font-body-md text-body-md">Campaign Simulator</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="diagnostics" href="#"><span class="material-symbols-outlined text-metric-md">biotech</span><span class="font-body-md text-body-md">Causal Diagnostics</span></a></nav></div><div class="flex flex-col gap-space-sm p-space-base bg-surface-container-low"><div class="bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-tertiary text-metric-md">verified</span><div class="flex flex-col"><span class="font-label-caps text-label-caps uppercase text-outline">Inference Kernel</span><span class="font-code-sm text-code-sm text-tertiary font-semibold">Causal Engine v4.2</span></div></div><span class="font-code-sm text-code-sm text-on-surface-variant bg-surface-container px-space-xs py-space-2xs rounded">99.4%</span></div><div class="flex items-center justify-between pt-space-xs"><div class="flex items-center gap-space-sm"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSVnDkcEYZoE2ahuAzR-yW96xU87DDr8Vu-hMTVMEPQVQqU9oZPHg9VJ7vfbIKYOvC7kDeJKak3u04SJMIMqUZTNv4ZOovyEhVGD4cp4Ui0Arwrm5kvPEHsemmG53cL751Y0wVZfqRgTz8HUZIPLKra3WmqKKycV_djdbr7_OhgNQhyNgVrlhzQPHNYwj6TnOTFp3hADFaX7BMwe57S6tirIF9fDV49KAAYgoQWaoQysOeE1bQdaE2"/><div class="flex flex-col"><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate max-w-[100px]">Dr. Alex Rivera</span><span class="font-label-caps text-label-caps text-outline truncate max-w-[100px]">Chief Scientist</span></div></div><div class="flex items-center gap-space-2xs"><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="settings" href="#" title="Platform Settings"><span class="material-symbols-outlined text-headline-sm">settings</span></a><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="documentation" href="#" title="Documentation &amp; API"><span class="material-symbols-outlined text-headline-sm">menu_book</span></a></div></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter-desktop"><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs font-body-sm text-body-sm text-outline"><span class="material-symbols-outlined text-headline-sm">home</span><span>/</span><span class="text-on-surface font-semibold">GrowthPilot Core</span><span>/</span><span class="text-secondary">Lift Telemetry</span></div></div><div class="flex items-center gap-space-md"><div class="hidden xl:flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-xl"><span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span><span class="font-label-caps text-label-caps text-outline uppercase">Engine Status:</span><span class="font-code-sm text-code-sm text-on-surface font-semibold">Incremental Calibrated</span><span class="font-code-sm text-code-sm text-tertiary">(Qini: +0.78)</span></div><div class="flex items-center bg-surface-container-low px-space-md py-space-xs rounded-xl gap-space-sm cursor-pointer hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-outline text-headline-sm">calendar_today</span><div class="flex flex-col text-left"><span class="font-body-sm text-body-sm text-on-surface font-semibold">Oct 1 - Oct 31, 2024</span><span class="font-label-caps text-label-caps text-outline">Lookback: 90d Baseline</span></div><span class="material-symbols-outlined text-outline text-headline-sm">expand_more</span></div><div class="flex items-center gap-space-sm"><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs" type="button"><span class="material-symbols-outlined text-headline-sm">api</span><span>Export Cohort API</span></button><button class="bg-primary-container hover:bg-surface-variant text-on-primary-container font-body-sm text-body-sm font-semibold px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" type="button"><span class="material-symbols-outlined text-headline-sm">play_arrow</span><span>Run Simulation</span></button></div></div></header><main class="relative w-full pt-16 bg-surface px-gutter-desktop min-h-screen"><div class="flex flex-col w-full pb-space-2xl gap-space-lg">
<!-- Top Utility Ribbon: Execution Mode & Meta Context -->
<div class="flex flex-col xl:flex-row xl:items-center justify-between gap-space-base bg-surface-container-low p-space-base rounded-xl">
<div class="flex flex-wrap items-center gap-space-md">
<div class="flex items-center gap-space-xs bg-surface-container-highest px-space-sm py-space-2xs rounded-lg">
<span class="material-symbols-outlined text-secondary text-headline-sm">precision_manufacturing</span>
<span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Engine: Double Machine Learning (DML)</span>
</div>
<div class="flex items-center gap-space-xs text-outline font-body-sm text-body-sm">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span>Covariate Balance: Balanced (p = 0.94)</span>
</div>
<div class="text-outline font-body-sm text-body-sm">/</div>
<div class="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
<span class="material-symbols-outlined text-headline-sm text-primary">hub</span>
<span>Heterogeneous Treatment Effects (HTE) Active</span>
</div>
</div>
<div class="flex items-center gap-space-sm">
<span class="font-label-caps text-label-caps text-outline uppercase">Prescriptive Solver</span>
<span class="bg-surface-container px-space-sm py-space-2xs rounded text-tertiary font-code-sm text-code-sm font-semibold">Simplex Optimal</span>
<button class="bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm px-space-md py-space-2xs rounded-lg transition-colors flex items-center gap-space-xs" id="reset-sim-btn" type="button">
<span class="material-symbols-outlined text-headline-sm">restart_alt</span>
<span>Reset Baseline</span>
</button>
</div>
</div>
<!-- 1. Simulator Header with Interactive Configuration Bar -->
<section class="relative overflow-hidden bg-surface-container p-space-xl rounded-xl shadow-md">
<div class="absolute -right-16 -top-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute -left-20 bottom-0 w-64 h-64 bg-tertiary/5 rounded-full blur-2xl pointer-events-none"></div>
<div class="relative z-10 flex flex-col gap-space-lg">
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-base">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps text-secondary uppercase tracking-widest">Prescriptive Decision Matrix</span>
<span class="px-space-xs py-0.5 bg-secondary/10 text-secondary font-code-sm text-code-sm rounded">MIP Formulation v2.4</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">Intervention Simulator &amp; Campaign Optimizer</h1>
<p class="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Simulate policy counterfactuals across multi-treatment spaces. GrowthPilot separates pure treatment elasticity from organic baseline retention to guarantee incremental spend efficiency.
          </p>
</div>
<div class="flex items-center gap-space-sm bg-surface-container-high p-space-xs rounded-xl self-start lg:self-auto">
<div class="px-space-md py-space-xs bg-surface-container-lowest rounded-lg">
<span class="font-label-caps text-label-caps text-outline block uppercase">Simulation Run</span>
<span class="font-code-sm text-code-sm text-tertiary font-semibold">#SIM-8492-CAS</span>
</div>
<div class="px-space-md py-space-xs">
<span class="font-label-caps text-label-caps text-outline block uppercase">Convergence</span>
<span class="font-code-sm text-code-sm text-on-surface">14ms (Exact)</span>
</div>
</div>
</div>
<!-- Parameter Control Strip -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-space-md pt-space-md bg-surface-container-low p-space-lg rounded-xl">
<!-- Objective Function -->
<div class="md:col-span-4 flex flex-col gap-space-xs">
<label class="font-label-caps text-label-caps uppercase text-outline flex items-center justify-between">
<span>Optimization Objective</span>
<span class="material-symbols-outlined text-body-sm text-outline cursor-help" title="Loss function for the mathematical solver">info</span>
</label>
<div class="relative">
<select class="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-md py-space-sm rounded-lg appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-high transition-colors" id="objective-selector">
<option selected="" value="profit">Maximize Net Incremental Profit (\$)</option>
<option value="conversion">Maximize Incremental Conversions (Volume)</option>
<option value="cpa">Minimize Cost per Lifted Account (\$)</option>
<option value="margin">Maximize ARR Retention Margin</option>
</select>
<span class="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline">unfold_more</span>
</div>
<span class="font-code-sm text-code-sm text-on-surface-variant flex items-center gap-space-2xs">
<span class="material-symbols-outlined text-tertiary text-body-sm">check_circle</span>
            Penalty: Sleeping Dog Aversion (\$\lambda = 4.2\$)
          </span>
</div>
<!-- Target Population -->
<div class="md:col-span-4 flex flex-col gap-space-xs">
<label class="font-label-caps text-label-caps uppercase text-outline flex items-center justify-between">
<span>Candidate Cohort Segment</span>
<span class="text-tertiary font-code-sm text-code-sm">18,400 units</span>
</label>
<div class="bg-surface-container-lowest px-space-md py-space-sm rounded-lg flex items-center justify-between">
<div class="flex items-center gap-space-sm min-w-0">
<span class="material-symbols-outlined text-secondary text-metric-md">pie_chart</span>
<div class="flex flex-col min-w-0">
<span class="font-body-sm text-body-sm font-semibold text-on-surface truncate">Mid-Market At-Risk Churn Pool</span>
<span class="font-code-sm text-code-sm text-outline truncate">Avg MRR: \$1,420 • Churn Hazard: 22-68%</span>
</div>
</div>
<span class="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">filter_alt</span>
</div>
<div class="flex items-center gap-space-xs text-outline font-code-sm text-code-sm">
<span>Treatment Eligibility: 100% (Non-contract locked)</span>
</div>
</div>
<!-- Interactive Budget Slider -->
<div class="md:col-span-4 flex flex-col gap-space-xs">
<div class="flex items-center justify-between">
<label class="font-label-caps text-label-caps uppercase text-outline">Total Available Budget</label>
<span class="font-metric-md text-metric-md text-primary font-bold tracking-tight" id="budget-display">\$150,000</span>
</div>
<div class="py-space-xs flex flex-col gap-space-2xs">
<input class="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container focus:outline-none" id="budget-slider" max="500000" min="25000" step="5000" type="range" value="150000"/>
<div class="flex justify-between font-code-sm text-code-sm text-outline">
<span>\$25k</span>
<span>\$250k</span>
<span>\$500k Max</span>
</div>
</div>
<span class="font-code-sm text-code-sm text-secondary truncate">
            Current Spend: <span id="budget-alloc-text">\$125,000</span> committed across interventions
          </span>
</div>
</div>
</div>
</section>
<!-- 2. Dual Comparison Preview: Naive Propensity vs Causal Uplift -->
<section class="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
<!-- Card 1: Traditional Propensity Targeting -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between shadow-sm relative overflow-hidden">
<div class="flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-3 h-3 rounded-full bg-outline"></span>
<span class="font-label-caps text-label-caps uppercase tracking-wider text-outline">Naive Heuristic Standard</span>
</div>
<span class="bg-surface-container-highest px-space-sm py-space-2xs rounded font-code-sm text-code-sm text-on-surface-variant">Uncalibrated Baseline</span>
</div>
<div>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Traditional Propensity Targeting</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
            Ranks accounts by risk score alone and blasts highest-risk tiers. Blind to organic recovery and treatment-induced irritation.
          </p>
</div>
<!-- Visual representation of wasted spend & sleeping dogs -->
<div class="bg-surface-container-lowest p-space-md rounded-lg flex flex-col gap-space-sm">
<div class="flex justify-between items-center text-body-sm font-body-sm text-on-surface">
<span class="text-on-surface-variant">Spend Partitioning (\$150,000)</span>
<span class="text-error font-code-sm text-code-sm">32% Ineffective Allocation</span>
</div>
<!-- Bar visual -->
<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
<div class="h-full bg-secondary-container" style="width: 52%;" title="True Lift Spend"></div>
<div class="h-full bg-error" style="width: 32%;" title="Wasted on Sure Things"></div>
<div class="h-full bg-error-container" style="width: 16%;" title="Triggered Sleeping Dogs"></div>
</div>
<div class="flex flex-wrap items-center gap-space-md font-code-sm text-code-sm text-outline pt-space-2xs">
<span class="flex items-center gap-space-2xs"><span class="w-2 h-2 rounded-full bg-secondary-container"></span>Persuadables (\$78k)</span>
<span class="flex items-center gap-space-2xs"><span class="w-2 h-2 rounded-full bg-error"></span>Sure Things (\$48k)</span>
<span class="flex items-center gap-space-2xs"><span class="w-2 h-2 rounded-full bg-error-container"></span>Lost Causes (\$24k)</span>
</div>
</div>
<!-- Metrics Grid -->
<div class="grid grid-cols-2 gap-space-sm">
<div class="bg-surface-container p-space-sm rounded-lg">
<span class="font-label-caps text-label-caps text-outline uppercase block">Net Incremental Lift</span>
<span class="font-metric-xl text-metric-xl text-on-surface font-semibold tracking-tight" id="naive-lift-val">\$284,000</span>
<span class="font-code-sm text-code-sm text-outline block mt-space-2xs">True added ARR</span>
</div>
<div class="bg-surface-container p-space-sm rounded-lg">
<span class="font-label-caps text-label-caps text-outline uppercase block">Incremental ROI</span>
<span class="font-metric-xl text-metric-xl text-on-surface font-semibold tracking-tight" id="naive-roi-val">1.89x</span>
<span class="font-code-sm text-code-sm text-outline block mt-space-2xs">Net multiple</span>
</div>
<div class="bg-surface-container p-space-sm rounded-lg">
<span class="font-label-caps text-label-caps text-error uppercase block">Wasted on "Sure Things"</span>
<span class="font-metric-md text-metric-md text-error font-semibold" id="naive-waste-val">\$48,000</span>
<span class="font-code-sm text-code-sm text-outline block">Would retain anyway</span>
</div>
<div class="bg-surface-container p-space-sm rounded-lg">
<span class="font-label-caps text-label-caps text-error uppercase block">Sleeping Dogs Churned</span>
<span class="font-metric-md text-metric-md text-error font-semibold" id="naive-dogs-val">112 accts</span>
<span class="font-code-sm text-code-sm text-outline block">Spurred unsubscriptions</span>
</div>
</div>
</div>
<div class="pt-space-md mt-space-md text-center text-outline font-code-sm text-code-sm bg-surface-container-lowest p-space-xs rounded">
<span>Attribution Trap: Crediting organic renewal to outreach campaigns</span>
</div>
</div>
<!-- Card 2: GrowthPilot Causal Targeting -->
<div class="bg-surface-container p-space-lg rounded-xl flex flex-col justify-between shadow-xl relative overflow-hidden">
<!-- Glow Accent -->
<div class="absolute top-0 right-0 left-0 h-1 bg-tertiary"></div>
<div class="flex flex-col gap-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="w-3 h-3 rounded-full bg-tertiary animate-ping"></span>
<span class="font-label-caps text-label-caps uppercase tracking-wider text-tertiary">GrowthPilot Counterfactual Engine</span>
</div>
<span class="bg-tertiary-container px-space-sm py-space-2xs rounded font-code-sm text-code-sm text-on-tertiary-container font-semibold">Causal Uplift Active</span>
</div>
<div>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-space-xs">
<span>GrowthPilot Causal Targeting</span>
<span class="material-symbols-outlined text-tertiary text-headline-sm">verified</span>
</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
            Optimizes across individual Treatment Uplift Estimators (CATE). Completely avoids baseline survivors and treats strictly where intervention moves the needle.
          </p>
</div>
<!-- Visual representation: Pure Value Capture -->
<div class="bg-surface-container-lowest p-space-md rounded-lg flex flex-col gap-space-sm">
<div class="flex justify-between items-center text-body-sm font-body-sm text-on-surface">
<span class="text-on-surface font-semibold">Spend Partitioning (\$150,000)</span>
<span class="text-tertiary font-code-sm text-code-sm font-semibold">100% Causal Purity</span>
</div>
<!-- Bar visual -->
<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
<div class="h-full bg-tertiary" style="width: 100%;" title="100% Targeted to High-Elasticity Persuadables"></div>
</div>
<div class="flex flex-wrap items-center justify-between font-code-sm text-code-sm text-on-surface-variant pt-space-2xs">
<span class="flex items-center gap-space-2xs text-tertiary font-semibold"><span class="w-2 h-2 rounded-full bg-tertiary"></span>100% Pure Persuadables</span>
<span class="flex items-center gap-space-2xs text-secondary font-semibold"><span class="w-2 h-2 rounded-full bg-secondary"></span>Zero Negative Treatment Lift</span>
</div>
</div>
<!-- Metrics Grid -->
<div class="grid grid-cols-2 gap-space-sm">
<div class="bg-surface-container-high p-space-sm rounded-lg">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-outline uppercase">Net Incremental Lift</span>
<span class="text-tertiary font-code-sm text-code-sm font-bold">+155.6%</span>
</div>
<span class="font-metric-xl text-metric-xl text-tertiary font-bold tracking-tight" id="causal-lift-val">\$726,000</span>
<span class="font-code-sm text-code-sm text-on-surface-variant block mt-space-2xs">+\$442k vs Naive approach</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps text-outline uppercase">Incremental ROI</span>
<span class="text-tertiary font-code-sm text-code-sm font-bold">+2.95x</span>
</div>
<span class="font-metric-xl text-metric-xl text-on-surface font-bold tracking-tight" id="causal-roi-val">4.84x</span>
<span class="font-code-sm text-code-sm text-on-surface-variant block mt-space-2xs">True capital efficiency</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg">
<span class="font-label-caps text-label-caps text-outline uppercase block">Wasted Budget Avoided</span>
<span class="font-metric-md text-metric-md text-tertiary font-semibold" id="causal-waste-val">\$0</span>
<span class="font-code-sm text-code-sm text-on-surface-variant block">Zero leakage to Sure Things</span>
</div>
<div class="bg-surface-container-high p-space-sm rounded-lg">
<span class="font-label-caps text-label-caps text-outline uppercase block">Sleeping Dogs Protected</span>
<span class="font-metric-md text-metric-md text-secondary font-semibold">100% (0 Lost)</span>
<span class="font-code-sm text-code-sm text-on-surface-variant block">Intervention suppressed</span>
</div>
</div>
</div>
<div class="pt-space-md mt-space-md flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm bg-surface-container-lowest p-space-xs rounded">
<span class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-tertiary text-body-sm">insights</span>
          Confidence Score (P &gt; 0.999)
        </span>
<span class="text-tertiary font-semibold">Lift Multiplier: 2.56x Advantage</span>
</div>
</div>
</section>
<!-- 3. Treatment Assignment & Allocation Matrix -->
<section class="bg-surface-container-low p-space-xl rounded-xl shadow-sm flex flex-col gap-space-lg">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="flex flex-col gap-space-2xs">
<div class="flex items-center gap-space-xs">
<span class="font-label-caps text-label-caps text-primary uppercase">Multi-Arm Treatment Solver</span>
<span class="text-outline">•</span>
<span class="font-code-sm text-code-sm text-outline">Simulated over 18,400 accounts</span>
</div>
<h2 class="font-headline-lg text-headline-lg text-on-surface font-semibold">Dynamic Treatment Policy Allocation</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant">
          Assign each individual account to the exact treatment tier that maximizes its personal Expected Incremental Value (EIV), respecting resource capacity constraints.
        </p>
</div>
<div class="flex items-center gap-space-sm self-start lg:self-auto">
<div class="flex items-center bg-surface-container-lowest px-space-md py-space-xs rounded-xl gap-space-xs font-code-sm text-code-sm">
<span class="text-outline">Pool Coverage:</span>
<span class="text-on-surface font-semibold">11,990 / 18,400 (65.1%)</span>
</div>
<button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs" id="rebalance-btn" type="button">
<span class="material-symbols-outlined text-headline-sm">auto_fix_high</span>
<span>Recompute Frontier</span>
</button>
</div>
</div>
<!-- Allocation Matrix Table -->
<div class="overflow-x-auto rounded-lg bg-surface-container-lowest">
<table class="w-full text-left border-collapse min-w-[840px]">
<thead>
<tr class="bg-surface-container-high text-outline font-label-caps text-label-caps uppercase tracking-wider h-11">
<th class="px-space-base">Treatment Arm</th>
<th class="px-space-base">Cost / Unit</th>
<th class="px-space-base">Recommended Allocation</th>
<th class="px-space-base">Committed Spend</th>
<th class="px-space-base">Expected Lift (\$\Delta \tau\$)</th>
<th class="px-space-base">Efficiency (ARR / \$)</th>
<th class="px-space-base text-right">Policy Action</th>
</tr>
</thead>
<tbody class="divide-y-0 font-body-md text-body-md">
<!-- Treatment A -->
<tr class="hover:bg-surface-container transition-colors group">
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
<span class="material-symbols-outlined text-metric-md">support_agent</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-semibold text-on-surface">VIP Concierge Outreach</span>
<span class="font-code-sm text-code-sm text-outline">Dedicated CSM deep intervention</span>
</div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm text-on-surface-variant">\$120 / acct</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<span class="font-metric-md text-metric-md font-semibold text-on-surface" id="t1-units">450</span>
<span class="font-code-sm text-code-sm text-outline">accounts</span>
</div>
<div class="w-32 h-1.5 bg-surface-container rounded-full mt-space-2xs overflow-hidden">
<div class="h-full bg-primary" style="width: 24%;"></div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm font-semibold text-on-surface" id="t1-cost">\$54,000</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-2xs">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="font-code-sm text-code-sm font-bold text-tertiary">+38.2%</span>
<span class="font-code-sm text-code-sm text-outline">(p &lt; 0.001)</span>
</div>
<span class="font-code-sm text-code-sm text-outline block">Max CATE segment</span>
</td>
<td class="px-space-base py-space-md">
<span class="font-code-sm text-code-sm text-on-surface bg-surface-container px-space-sm py-space-2xs rounded">4.62x</span>
</td>
<td class="px-space-base py-space-md text-right">
<button class="px-space-sm py-space-2xs text-secondary hover:text-on-surface font-code-sm text-code-sm rounded hover:bg-surface-container transition-colors" type="button">
                Edit Elasticity
              </button>
</td>
</tr>
<!-- Treatment B -->
<tr class="hover:bg-surface-container transition-colors group">
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined text-metric-md">percent</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-semibold text-on-surface">15% Renewal Margin Credit</span>
<span class="font-code-sm text-code-sm text-outline">Contract extension concession incentive</span>
</div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm text-on-surface-variant">\$45 / acct</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<span class="font-metric-md text-metric-md font-semibold text-on-surface" id="t2-units">1,200</span>
<span class="font-code-sm text-code-sm text-outline">accounts</span>
</div>
<div class="w-32 h-1.5 bg-surface-container rounded-full mt-space-2xs overflow-hidden">
<div class="h-full bg-secondary" style="width: 58%;"></div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm font-semibold text-on-surface" id="t2-cost">\$54,000</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-2xs">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="font-code-sm text-code-sm font-bold text-tertiary">+21.4%</span>
<span class="font-code-sm text-code-sm text-outline">(p = 0.002)</span>
</div>
<span class="font-code-sm text-code-sm text-outline block">Price-sensitive tier</span>
</td>
<td class="px-space-base py-space-md">
<span class="font-code-sm text-code-sm text-on-surface bg-surface-container px-space-sm py-space-2xs rounded">5.12x</span>
</td>
<td class="px-space-base py-space-md text-right">
<button class="px-space-sm py-space-2xs text-secondary hover:text-on-surface font-code-sm text-code-sm rounded hover:bg-surface-container transition-colors" type="button">
                Edit Elasticity
              </button>
</td>
</tr>
<!-- Treatment C -->
<tr class="hover:bg-surface-container transition-colors group">
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-metric-md">mail</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-semibold text-on-surface">Interactive Value Realization Email</span>
<span class="font-code-sm text-code-sm text-outline">Automated feature ROI benchmark audit</span>
</div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm text-on-surface-variant">\$2 / acct</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<span class="font-metric-md text-metric-md font-semibold text-on-surface" id="t3-units">8,500</span>
<span class="font-code-sm text-code-sm text-outline">accounts</span>
</div>
<div class="w-32 h-1.5 bg-surface-container rounded-full mt-space-2xs overflow-hidden">
<div class="h-full bg-tertiary" style="width: 82%;"></div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm font-semibold text-on-surface" id="t3-cost">\$17,000</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-2xs">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
<span class="font-code-sm text-code-sm font-bold text-tertiary">+9.1%</span>
<span class="font-code-sm text-code-sm text-outline">(p = 0.008)</span>
</div>
<span class="font-code-sm text-code-sm text-outline block">Broad digital nurture</span>
</td>
<td class="px-space-base py-space-md">
<span class="font-code-sm text-code-sm text-on-surface bg-surface-container px-space-sm py-space-2xs rounded">6.40x</span>
</td>
<td class="px-space-base py-space-md text-right">
<button class="px-space-sm py-space-2xs text-secondary hover:text-on-surface font-code-sm text-code-sm rounded hover:bg-surface-container transition-colors" type="button">
                Edit Elasticity
              </button>
</td>
</tr>
<!-- Control / Holdout Baseline -->
<tr class="hover:bg-surface-container transition-colors group bg-surface-container-high/40">
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<div class="w-8 h-8 rounded-lg bg-surface-variant flex items-center justify-center text-outline">
<span class="material-symbols-outlined text-metric-md">science</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-semibold text-on-surface">Pure Randomized Holdout (Control)</span>
<span class="font-code-sm text-code-sm text-outline">Golden counterfactual anchor group</span>
</div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm text-outline">\$0 / acct</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-sm">
<span class="font-metric-md text-metric-md font-semibold text-on-surface">1,840</span>
<span class="font-code-sm text-code-sm text-outline">(10.0% fixed)</span>
</div>
<div class="w-32 h-1.5 bg-surface-container rounded-full mt-space-2xs overflow-hidden">
<div class="h-full bg-outline" style="width: 10%;"></div>
</div>
</td>
<td class="px-space-base py-space-md font-code-sm text-code-sm font-semibold text-outline">\$0</td>
<td class="px-space-base py-space-md">
<div class="flex items-center gap-space-2xs">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span class="font-code-sm text-code-sm text-outline">0.0% (Benchmark)</span>
</div>
<span class="font-code-sm text-code-sm text-outline block">Unbiased estimator</span>
</td>
<td class="px-space-base py-space-md">
<span class="font-code-sm text-code-sm text-outline bg-surface-container px-space-sm py-space-2xs rounded">N/A</span>
</td>
<td class="px-space-base py-space-md text-right">
<span class="font-label-caps text-label-caps uppercase text-outline px-space-xs py-space-2xs bg-surface-container rounded">Locked</span>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Frontier Curve inline visual -->
<div class="bg-surface-container p-space-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
<div class="flex items-center gap-space-md">
<!-- SVG Sparkline of Pareto Frontier -->
<svg class="w-28 h-12 text-tertiary overflow-visible shrink-0" fill="none" viewbox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
<path d="M 0 38 Q 20 32, 40 18 T 75 7 T 100 4" stroke="currentColor" stroke-linecap="round" stroke-width="2.5"></path>
<path d="M 0 38 L 0 40 L 100 40 L 100 4 Z" fill="currentColor" fill-opacity="0.08"></path>
<circle class="fill-primary" cx="75" cy="7" r="4" stroke="white" stroke-width="1.5"></circle>
</svg>
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-semibold text-on-surface">Optimal Frontier Operating Point: K-9 Knee</span>
<span class="font-code-sm text-code-sm text-outline">Marginal return saturates after \$175,000 spend. Diminishing returns penalty applies.</span>
</div>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary bg-surface-container-high px-space-md py-space-xs rounded-lg">
<span class="material-symbols-outlined text-headline-sm">check</span>
<span>No Cannibalization Detected</span>
</div>
</div>
</section>
<!-- 4. Real-Time Projected Outcome Summary & Push Execution -->
<section class="bg-surface-container p-space-xl rounded-xl shadow-lg flex flex-col gap-space-lg">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-tertiary tracking-wider font-semibold">Simulated Enterprise Impact</span>
<h2 class="font-headline-md text-headline-md text-on-surface font-semibold">Pre-Execution Outcome Verification</h2>
</div>
<div class="flex items-center gap-space-xs text-outline font-code-sm text-code-sm">
<span class="material-symbols-outlined text-body-md">lock_clock</span>
<span>Deterministic Seed: 0x93FA1C</span>
</div>
</div>
<!-- Live Impact KPI Banner -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<!-- KPI 1 -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">Net Saved ARR</span>
<span class="material-symbols-outlined text-tertiary text-metric-md">trending_up</span>
</div>
<div class="my-space-xs">
<span class="font-metric-xl text-metric-xl text-tertiary font-bold tracking-tight" id="net-saved-arr">+\$912,000</span>
<span class="font-body-sm text-body-sm text-outline block mt-space-2xs">After subtracting \$125k campaign costs</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-on-surface-variant pt-space-xs">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
<span>True incremental margin</span>
</div>
</div>
<!-- KPI 2 -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">Cannibalization Hazard</span>
<span class="material-symbols-outlined text-secondary text-metric-md">shield_with_heart</span>
</div>
<div class="my-space-xs">
<span class="font-metric-xl text-metric-xl text-secondary font-bold tracking-tight">&lt; 0.4%</span>
<span class="font-body-sm text-body-sm text-outline block mt-space-2xs">Cross-treatment friction boundary</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-on-surface-variant pt-space-xs">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span>Zero overlapping discount coupons</span>
</div>
</div>
<!-- KPI 3 -->
<div class="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between">
<div class="flex items-center justify-between">
<span class="font-label-caps text-label-caps uppercase text-outline">Causal Confidence Bounds</span>
<span class="material-symbols-outlined text-primary text-metric-md">analytics</span>
</div>
<div class="my-space-xs">
<span class="font-metric-md text-metric-md text-on-surface font-bold tracking-tight block" id="ci-bounds">95% CI: \$840k – \$985k</span>
<span class="font-body-sm text-body-sm text-outline block mt-space-2xs">Bootstrapped via 1,000 resamples</span>
</div>
<div class="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary pt-space-xs">
<span class="material-symbols-outlined text-headline-sm">check_circle</span>
<span>Statistical significance confirmed</span>
</div>
</div>
</div>
<!-- Execution CTA bar -->
<div class="bg-surface-container-high p-space-lg rounded-xl flex flex-col lg:flex-row items-center justify-between gap-space-base">
<div class="flex items-center gap-space-md">
<div class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-headline-md">rocket_launch</span>
</div>
<div class="flex flex-col">
<span class="font-body-md text-body-md font-semibold text-on-surface">Ready for Automated Orchestration?</span>
<span class="font-body-sm text-body-sm text-outline">Sync optimal cohort membership IDs directly with downstream activation channels.</span>
</div>
</div>
<div class="flex flex-wrap items-center gap-space-sm w-full lg:w-auto">
<button class="flex-1 lg:flex-initial bg-surface-container hover:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-space-sm rounded-xl transition-all flex items-center justify-center gap-space-xs" id="export-rules-btn" type="button">
<span class="material-symbols-outlined text-headline-sm">data_object</span>
<span>Export Decision Rules</span>
</button>
<button class="flex-1 lg:flex-initial bg-surface-container hover:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-space-sm rounded-xl transition-all flex items-center justify-center gap-space-xs" id="save-scenario-btn" type="button">
<span class="material-symbols-outlined text-headline-sm">bookmark_add</span>
<span>Save Scenario Snapshot</span>
</button>
<button class="w-full lg:w-auto bg-primary-container hover:bg-surface-variant text-on-primary-container font-body-sm text-body-sm font-semibold px-space-lg py-space-sm rounded-xl transition-all flex items-center justify-center gap-space-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" id="deploy-alloc-btn" type="button">
<span class="material-symbols-outlined text-headline-sm">send</span>
<span>Deploy Allocations to Braze / Segment</span>
</button>
</div>
</div>
</section>
<!-- Live Feedback Toast Notification Container -->
<div class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 pointer-events-none transition-all duration-300 flex items-center gap-space-sm bg-surface-container-highest text-on-surface px-space-lg py-space-md rounded-xl shadow-xl" id="sim-toast">
<span class="material-symbols-outlined text-tertiary" id="toast-icon">check_circle</span>
<div class="flex flex-col">
<span class="font-body-sm text-body-sm font-semibold" id="toast-title">Allocation Recomputed</span>
<span class="font-code-sm text-code-sm text-outline" id="toast-desc">DML parameters applied successfully</span>
</div>
</div>
</div>
</main></div>`;

export default function InterventionSimulator() {
  return (
    <div 
      className="stitch-screen w-full h-full text-slate-100 bg-slate-900"
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
}
