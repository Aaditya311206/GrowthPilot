import React from 'react';

const rawHtml = `<aside class="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="flex flex-col"><div class="h-16 px-space-base flex items-center justify-between bg-surface-container-lowest"><div class="flex items-center gap-space-sm"><img alt="GrowthPilot Brand Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1XrMWXKxTSx-Snc2KQC4ZvkufGor-8Vno4BAooPV8E5Ut9bTKebK6kWHd7ELlG-0IEr6Kn8iaoVT4Wv4inq5dk5VGtvEkDQtEkFTP72wRw4d19KLzReKmYDFylxdPqt3STZpomcKvw2t9SDzpb9EB69pxO14qxxVQ-pKN0bbkkyQZ4Is4JsIHIuXFUlSMWuccOJ3U0AWbIfuaJ0rHlg8__NdeR7YPRlPH3a6DrDjzVsIyzOvPZU6yu6j4s"/><span class="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">GrowthPilot</span></div></div><div class="px-space-base py-space-sm"><div class="bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"><div class="flex flex-col min-w-0"><span class="font-label-caps text-label-caps uppercase text-outline truncate">Workspace</span><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate">Acme SaaS &amp; Commerce</span><div class="flex items-center gap-space-xs mt-space-2xs"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span><span class="font-code-sm text-code-sm text-on-surface-variant truncate">Production Cluster</span></div></div><span class="material-symbols-outlined text-outline">unfold_more</span></div></div><div class="px-space-base py-space-xs"><span class="font-label-caps text-label-caps uppercase text-outline px-space-xs tracking-wider">Causal Intelligence</span></div><nav class="flex flex-col gap-space-2xs px-space-sm" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg"><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="overview" href="#"><span class="material-symbols-outlined text-metric-md">insights</span><span class="font-body-md text-body-md">Incremental Impact</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="cohorts" href="#"><span class="material-symbols-outlined text-metric-md">groups_3</span><span class="font-body-md text-body-md">Cohort Explorer</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="simulator" href="#"><span class="material-symbols-outlined text-metric-md">tune</span><span class="font-body-md text-body-md">Campaign Simulator</span></a><a class="flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all" data-path="diagnostics" href="#"><span class="material-symbols-outlined text-metric-md">biotech</span><span class="font-body-md text-body-md">Causal Diagnostics</span></a></nav></div><div class="flex flex-col gap-space-sm p-space-base bg-surface-container-low"><div class="bg-surface-container-high p-space-sm rounded-xl flex items-center justify-between"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-tertiary text-metric-md">verified</span><div class="flex flex-col"><span class="font-label-caps text-label-caps uppercase text-outline">Inference Kernel</span><span class="font-code-sm text-code-sm text-tertiary font-semibold">Causal Engine v4.2</span></div></div><span class="font-code-sm text-code-sm text-on-surface-variant bg-surface-container px-space-xs py-space-2xs rounded">99.4%</span></div><div class="flex items-center justify-between pt-space-xs"><div class="flex items-center gap-space-sm"><img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSVnDkcEYZoE2ahuAzR-yW96xU87DDr8Vu-hMTVMEPQVQqU9oZPHg9VJ7vfbIKYOvC7kDeJKak3u04SJMIMqUZTNv4ZOovyEhVGD4cp4Ui0Arwrm5kvPEHsemmG53cL751Y0wVZfqRgTz8HUZIPLKra3WmqKKycV_djdbr7_OhgNQhyNgVrlhzQPHNYwj6TnOTFp3hADFaX7BMwe57S6tirIF9fDV49KAAYgoQWaoQysOeE1bQdaE2"/><div class="flex flex-col"><span class="font-body-sm text-body-sm text-on-surface font-semibold truncate max-w-[100px]">Dr. Alex Rivera</span><span class="font-label-caps text-label-caps text-outline truncate max-w-[100px]">Chief Scientist</span></div></div><div class="flex items-center gap-space-2xs"><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="settings" href="#" title="Platform Settings"><span class="material-symbols-outlined text-headline-sm">settings</span></a><a class="p-space-xs rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors" data-path="documentation" href="#" title="Documentation &amp; API"><span class="material-symbols-outlined text-headline-sm">menu_book</span></a></div></div></div></aside><div class="pl-64"><header class="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-gutter-desktop"><div class="flex items-center gap-space-md"><div class="flex items-center gap-space-xs font-body-sm text-body-sm text-outline"><span class="material-symbols-outlined text-headline-sm">home</span><span>/</span><span class="text-on-surface font-semibold">GrowthPilot Core</span><span>/</span><span class="text-secondary">Lift Telemetry</span></div></div><div class="flex items-center gap-space-md"><div class="hidden xl:flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-xl"><span class="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span><span class="font-label-caps text-label-caps text-outline uppercase">Engine Status:</span><span class="font-code-sm text-code-sm text-on-surface font-semibold">Incremental Calibrated</span><span class="font-code-sm text-code-sm text-tertiary">(Qini: +0.78)</span></div><div class="flex items-center bg-surface-container-low px-space-md py-space-xs rounded-xl gap-space-sm cursor-pointer hover:bg-surface-container transition-colors"><span class="material-symbols-outlined text-outline text-headline-sm">calendar_today</span><div class="flex flex-col text-left"><span class="font-body-sm text-body-sm text-on-surface font-semibold">Oct 1 - Oct 31, 2024</span><span class="font-label-caps text-label-caps text-outline">Lookback: 90d Baseline</span></div><span class="material-symbols-outlined text-outline text-headline-sm">expand_more</span></div><div class="flex items-center gap-space-sm"><button class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs" type="button"><span class="material-symbols-outlined text-headline-sm">api</span><span>Export Cohort API</span></button><button class="bg-primary-container hover:bg-surface-variant text-on-primary-container font-body-sm text-body-sm font-semibold px-space-md py-space-xs rounded-xl transition-all flex items-center gap-space-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" type="button"><span class="material-symbols-outlined text-headline-sm">play_arrow</span><span>Run Simulation</span></button></div></div></header><main class="relative w-full pt-16 bg-surface px-gutter-desktop min-h-screen"><div class="flex flex-col w-full pb-space-2xl">
<!-- Top Command Bar: Title, Segmentation & Quick Global Actions -->
<div class="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md pt-space-base pb-space-lg">
<div class="flex flex-col gap-space-2xs">
<div class="flex items-center gap-space-xs font-label-caps text-label-caps uppercase text-tertiary tracking-wider">
<span class="inline-block w-2 h-2 rounded-full bg-tertiary"></span>
<span>Causal Uplift Inference Kernel • Active Model: DoubleML-XGBoost-v4.2</span>
</div>
<div class="flex items-baseline gap-space-md flex-wrap">
<h1 class="font-display-lg text-display-lg text-on-surface tracking-tight">Cohort &amp; Customer Uplift Explorer</h1>
<span class="font-code-sm text-code-sm text-outline">Cluster Hash: #x88f2-prod • 44,615 Evaluated Accounts</span>
</div>
</div>
<!-- Telemetry Strip (Key KPI Badges) -->
<div class="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
<div class="bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center gap-space-md shadow-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-outline">
<span class="material-symbols-outlined text-metric-md">analytics</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-outline">Total At-Risk Evaluated</span>
<span class="font-metric-md text-metric-md text-on-surface">44,615</span>
</div>
</div>
<div class="bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center gap-space-md shadow-sm">
<div class="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
<span class="material-symbols-outlined text-metric-md">target</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-on-tertiary-container">Persuadable Action Pool</span>
<div class="flex items-baseline gap-space-xs">
<span class="font-metric-md text-metric-md text-tertiary-fixed font-bold">14,280</span>
<span class="font-code-sm text-code-sm text-tertiary">(32.0%)</span>
</div>
</div>
</div>
<div class="bg-surface-container-low px-space-md py-space-sm rounded-xl flex items-center gap-space-md shadow-sm">
<div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
<span class="material-symbols-outlined text-metric-md">payments</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-primary-fixed">Net Incremental Revenue</span>
<div class="flex items-baseline gap-space-xs">
<span class="font-metric-md text-metric-md text-primary-fixed-dim font-bold">+\$1.24M</span>
<span class="font-code-sm text-code-sm text-on-primary-container">EAC Uplift</span>
</div>
</div>
</div>
</div>
</div>
<!-- Search & Quadrant Dynamic Filter Bar -->
<div class="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md shadow-sm mb-space-lg">
<div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
<!-- Search Input -->
<div class="relative flex-1">
<span class="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-headline-sm">search</span>
<input class="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md pl-11 pr-space-md py-space-xs rounded-lg focus:outline-none focus:bg-surface-container-highest transition-colors h-10" id="account-search-input" placeholder="Filter by account, domain, customer ID, or segment (e.g., Enterprise SaaS, EMEA)..." type="text"/>
</div>
<!-- Quick segment toggles and export controls -->
<div class="flex items-center gap-space-xs flex-wrap">
<div class="bg-surface-container px-space-sm py-space-xs rounded-lg flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
<span class="material-symbols-outlined text-body-sm text-outline">tune</span>
<span>NIV Filter:</span>
<span class="text-tertiary-fixed-dim font-semibold">&gt; \$500</span>
</div>
<button class="bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-space-xs rounded-lg font-body-sm text-body-sm flex items-center gap-space-xs transition-colors h-10" type="button">
<span class="material-symbols-outlined text-body-md">download</span>
<span>Cohort CSV</span>
</button>
<button class="bg-primary-container hover:bg-inverse-primary text-on-primary-container px-space-md py-space-xs rounded-lg font-body-sm text-body-sm font-semibold flex items-center gap-space-xs transition-colors h-10" type="button">
<span class="material-symbols-outlined text-body-md">sync_alt</span>
<span>Sync Sync-Group (14.2k)</span>
</button>
</div>
</div>
<!-- Quadrant Segmentation Chips -->
<div class="flex items-center gap-space-xs overflow-x-auto pb-space-2xs text-body-sm font-body-sm">
<span class="font-label-caps text-label-caps uppercase text-outline mr-space-xs tracking-wider">Quadrant Classification:</span>
<button class="px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant font-medium flex items-center gap-space-xs transition-all whitespace-nowrap" type="button">
<span>All Accounts</span>
<span class="bg-surface-container-lowest px-1.5 py-0.5 rounded text-code-sm">44,615</span>
</button>
<!-- Active selection: Persuadables -->
<button class="px-space-md py-space-xs rounded-full bg-tertiary-container text-on-tertiary-container font-semibold flex items-center gap-space-xs transition-all whitespace-nowrap shadow-sm" type="button">
<span class="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
<span>Persuadables (Selected)</span>
<span class="bg-on-tertiary-container/20 text-on-tertiary-container px-1.5 py-0.5 rounded text-code-sm font-bold">14,280</span>
</button>
<button class="px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant flex items-center gap-space-xs transition-all whitespace-nowrap" type="button">
<span class="w-2 h-2 rounded-full bg-outline"></span>
<span>Sure Things (Suppressed)</span>
<span class="bg-surface-container-lowest px-1.5 py-0.5 rounded text-code-sm">18,912</span>
</button>
<button class="px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant flex items-center gap-space-xs transition-all whitespace-nowrap" type="button">
<span class="w-2 h-2 rounded-full bg-error"></span>
<span>Lost Causes (Zero Lift)</span>
<span class="bg-surface-container-lowest px-1.5 py-0.5 rounded text-code-sm">8,410</span>
</button>
<button class="px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant flex items-center gap-space-xs transition-all whitespace-nowrap" type="button">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
<span>Sleeping Dogs (Protected)</span>
<span class="bg-surface-container-lowest px-1.5 py-0.5 rounded text-code-sm">3,013</span>
</button>
</div>
</div>
<!-- Primary Cockpit: Table & Slide-out Inspector Drawer Split -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- Granular Customer Table (7 Columns on Large, 12 on Mobile) -->
<div class="lg:col-span-7 flex flex-col gap-space-md">
<div class="bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
<!-- Table Header Control Substrip -->
<div class="px-space-base py-space-md bg-surface-container flex items-center justify-between">
<div class="flex items-center gap-space-sm">
<span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Account Uplift Matrix</span>
<span class="font-code-sm text-code-sm text-tertiary bg-surface-container-highest px-space-xs py-0.5 rounded">Sorted: Max CATE (τ)</span>
</div>
<span class="font-body-sm text-body-sm text-outline">Displaying top 6 of 14,280 accounts</span>
</div>
<!-- Table Viewport -->
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-lowest text-outline font-label-caps text-label-caps uppercase">
<th class="px-space-base py-space-sm tracking-wider">Account / Domain</th>
<th class="px-space-sm py-space-sm tracking-wider">Quadrant</th>
<th class="px-space-sm py-space-sm tracking-wider text-right">Churn Prob (Y₀)</th>
<th class="px-space-sm py-space-sm tracking-wider text-right">Uplift CATE (τ)</th>
<th class="px-space-sm py-space-sm tracking-wider text-right">NIV</th>
<th class="px-space-base py-space-sm tracking-wider">Optimal Intervention</th>
<th class="px-space-sm py-space-sm tracking-wider text-center">Action</th>
</tr>
</thead>
<tbody class="divide-y-0" id="cohort-table-body">
<!-- Row 1: Active Account (CloudScale Systems) -->
<tr class="bg-surface-container-high transition-colors cursor-pointer group" onclick="selectAccount('CloudScale Systems', '\$48,000', '71%', '64/100', '32%', '41%', '74%', '+26.4%', '+\$1,420', 'Persuadable', 'CSM Executive Review + 10% annual credit')">
<td class="px-space-base py-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-7 h-7 rounded-lg bg-primary-container text-on-primary-container font-code-sm text-code-sm flex items-center justify-center font-bold">
                      CS
                    </div>
<div class="flex flex-col min-w-0">
<span class="font-body-md text-body-md font-semibold text-primary truncate flex items-center gap-1">
                        CloudScale Systems
                        <span class="material-symbols-outlined text-body-sm text-tertiary">check_circle</span>
</span>
<span class="font-code-sm text-code-sm text-outline truncate">cloudscale.io • Tier 1 ARR</span>
</div>
</div>
</td>
<td class="px-space-sm py-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 bg-tertiary-container/30 text-tertiary px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Persuadable
                  </span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline">
                  68.2%
                </td>
<td class="px-space-sm py-space-sm text-right whitespace-nowrap">
<div class="font-metric-md text-metric-md text-tertiary font-semibold flex items-center justify-end gap-0.5">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
                    +26.4%
                  </div>
<span class="font-code-sm text-code-sm text-outline">p &lt; 0.001</span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-on-surface font-semibold whitespace-nowrap">
                  +\$1,420
                </td>
<td class="px-space-base py-space-sm">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-on-surface truncate">CSM Executive Review + 10% credit</span>
<span class="font-code-sm text-code-sm text-outline truncate">Cost: \$280 • ROI: 5.1x</span>
</div>
</td>
<td class="px-space-sm py-space-sm text-center">
<button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" title="Quick Options" type="button">
<span class="material-symbols-outlined text-headline-sm">more_vert</span>
</button>
</td>
</tr>
<!-- Row 2: Nordic Retail Group -->
<tr class="hover:bg-surface-container transition-colors cursor-pointer" onclick="selectAccount('Nordic Retail Group', '\$112,000', '88%', '81/100', '12%', '14%', '15%', '+1.2%', '-\$320', 'Sure Thing', 'No Action (Self-renews)')">
<td class="px-space-base py-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-7 h-7 rounded-lg bg-surface-container text-on-surface-variant font-code-sm text-code-sm flex items-center justify-center font-bold">
                      NR
                    </div>
<div class="flex flex-col min-w-0">
<span class="font-body-md text-body-md font-semibold text-on-surface truncate">Nordic Retail Group</span>
<span class="font-code-sm text-code-sm text-outline truncate">nordicretail.se • Enterprise</span>
</div>
</div>
</td>
<td class="px-space-sm py-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 bg-surface-variant text-outline px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase">
<span class="w-1.5 h-1.5 rounded-full bg-outline"></span>
                    Sure Thing
                  </span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline">
                  12.4%
                </td>
<td class="px-space-sm py-space-sm text-right whitespace-nowrap">
<div class="font-metric-md text-metric-md text-outline flex items-center justify-end gap-0.5">
                    +1.2%
                  </div>
<span class="font-code-sm text-code-sm text-outline">Suppressed</span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline whitespace-nowrap">
                  -\$320
                </td>
<td class="px-space-base py-space-sm">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-outline truncate">No Action (Self-renews)</span>
<span class="font-code-sm text-code-sm text-outline truncate">Saved promo expense</span>
</div>
</td>
<td class="px-space-sm py-space-sm text-center">
<button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-headline-sm">more_vert</span>
</button>
</td>
</tr>
<!-- Row 3: Apex Logistics -->
<tr class="hover:bg-surface-container transition-colors cursor-pointer" onclick="selectAccount('Apex Logistics', '\$84,500', '48%', '42/100', '65%', '72%', '91%', '+34.1%', '+\$4,890', 'Persuadable', 'Targeted Workflow Optimization')">
<td class="px-space-base py-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-7 h-7 rounded-lg bg-surface-container text-on-surface-variant font-code-sm text-code-sm flex items-center justify-center font-bold">
                      AL
                    </div>
<div class="flex flex-col min-w-0">
<span class="font-body-md text-body-md font-semibold text-on-surface truncate">Apex Logistics</span>
<span class="font-code-sm text-code-sm text-outline truncate">apex-freight.com • Mid-Market</span>
</div>
</div>
</td>
<td class="px-space-sm py-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 bg-tertiary-container/30 text-tertiary px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Persuadable
                  </span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline">
                  82.1%
                </td>
<td class="px-space-sm py-space-sm text-right whitespace-nowrap">
<div class="font-metric-md text-metric-md text-tertiary font-semibold flex items-center justify-end gap-0.5">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
                    +34.1%
                  </div>
<span class="font-code-sm text-code-sm text-outline">p &lt; 0.001</span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-on-surface font-semibold whitespace-nowrap">
                  +\$4,890
                </td>
<td class="px-space-base py-space-sm">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-on-surface truncate">Workflow Workshop + Renewal Incentive</span>
<span class="font-code-sm text-code-sm text-outline truncate">Cost: \$450 • ROI: 10.8x</span>
</div>
</td>
<td class="px-space-sm py-space-sm text-center">
<button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-headline-sm">more_vert</span>
</button>
</td>
</tr>
<!-- Row 4: Starlight Media -->
<tr class="hover:bg-surface-container transition-colors cursor-pointer" onclick="selectAccount('Starlight Media', '\$31,000', '22%', '28/100', '89%', '89%', '88%', '-0.8%', '-\$140', 'Lost Cause', 'Suppressed Promo')">
<td class="px-space-base py-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-7 h-7 rounded-lg bg-surface-container text-on-surface-variant font-code-sm text-code-sm flex items-center justify-center font-bold">
                      SM
                    </div>
<div class="flex flex-col min-w-0">
<span class="font-body-md text-body-md font-semibold text-on-surface truncate">Starlight Media</span>
<span class="font-code-sm text-code-sm text-outline truncate">starlight.agency • Growth</span>
</div>
</div>
</td>
<td class="px-space-sm py-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 bg-error-container/30 text-error px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase">
<span class="w-1.5 h-1.5 rounded-full bg-error"></span>
                    Lost Cause
                  </span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline">
                  89.4%
                </td>
<td class="px-space-sm py-space-sm text-right whitespace-nowrap">
<div class="font-metric-md text-metric-md text-outline flex items-center justify-end gap-0.5">
                    -0.8%
                  </div>
<span class="font-code-sm text-code-sm text-outline">Inelastic</span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline whitespace-nowrap">
                  -\$140
                </td>
<td class="px-space-base py-space-sm">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-outline truncate">Suppressed Promo</span>
<span class="font-code-sm text-code-sm text-outline truncate">Zero discount allocation</span>
</div>
</td>
<td class="px-space-sm py-space-sm text-center">
<button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-headline-sm">more_vert</span>
</button>
</td>
</tr>
<!-- Row 5: FinVibe Technologies -->
<tr class="hover:bg-surface-container transition-colors cursor-pointer" onclick="selectAccount('FinVibe Technologies', '\$96,000', '65%', '58/100', '45%', '52%', '78%', '+21.8%', '+\$2,110', 'Persuadable', 'Automated Email Nurture + Tech Review')">
<td class="px-space-base py-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-7 h-7 rounded-lg bg-surface-container text-on-surface-variant font-code-sm text-code-sm flex items-center justify-center font-bold">
                      FV
                    </div>
<div class="flex flex-col min-w-0">
<span class="font-body-md text-body-md font-semibold text-on-surface truncate">FinVibe Technologies</span>
<span class="font-code-sm text-code-sm text-outline truncate">finvibe.tech • Enterprise FinTech</span>
</div>
</div>
</td>
<td class="px-space-sm py-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 bg-tertiary-container/30 text-tertiary px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase font-bold">
<span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                    Persuadable
                  </span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline">
                  45.0%
                </td>
<td class="px-space-sm py-space-sm text-right whitespace-nowrap">
<div class="font-metric-md text-metric-md text-tertiary font-semibold flex items-center justify-end gap-0.5">
<span class="material-symbols-outlined text-body-sm">arrow_upward</span>
                    +21.8%
                  </div>
<span class="font-code-sm text-code-sm text-outline">p &lt; 0.005</span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-on-surface font-semibold whitespace-nowrap">
                  +\$2,110
                </td>
<td class="px-space-base py-space-sm">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-on-surface truncate">Automated Email Nurture + Tech Review</span>
<span class="font-code-sm text-code-sm text-outline truncate">Cost: \$120 • ROI: 17.5x</span>
</div>
</td>
<td class="px-space-sm py-space-sm text-center">
<button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-headline-sm">more_vert</span>
</button>
</td>
</tr>
<!-- Row 6: Helix BioSciences (Sleeping Dog Example) -->
<tr class="hover:bg-surface-container transition-colors cursor-pointer" onclick="selectAccount('Helix BioSciences', '\$62,000', '83%', '77/100', '19%', '34%', '42%', '-18.5%', '-\$1,980', 'Sleeping Dog', 'Strict Contact Suppression')">
<td class="px-space-base py-space-sm">
<div class="flex items-center gap-space-sm">
<div class="w-7 h-7 rounded-lg bg-surface-container text-on-surface-variant font-code-sm text-code-sm flex items-center justify-center font-bold">
                      HB
                    </div>
<div class="flex flex-col min-w-0">
<span class="font-body-md text-body-md font-semibold text-on-surface truncate">Helix BioSciences</span>
<span class="font-code-sm text-code-sm text-outline truncate">helixbio.org • Pharma</span>
</div>
</div>
</td>
<td class="px-space-sm py-space-sm whitespace-nowrap">
<span class="inline-flex items-center gap-1 bg-secondary-container/20 text-secondary-fixed-dim px-space-xs py-0.5 rounded font-label-caps text-label-caps uppercase">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Sleeping Dog
                  </span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-outline">
                  19.2%
                </td>
<td class="px-space-sm py-space-sm text-right whitespace-nowrap">
<div class="font-metric-md text-metric-md text-error font-semibold flex items-center justify-end gap-0.5">
<span class="material-symbols-outlined text-body-sm">arrow_downward</span>
                    -18.5%
                  </div>
<span class="font-code-sm text-code-sm text-outline">Negative Uplift</span>
</td>
<td class="px-space-sm py-space-sm text-right font-metric-md text-metric-md text-error whitespace-nowrap">
                  -\$1,980
                </td>
<td class="px-space-base py-space-sm">
<div class="flex flex-col">
<span class="font-body-sm text-body-sm text-error font-medium truncate">Strict Contact Suppression</span>
<span class="font-code-sm text-code-sm text-outline truncate">Intervention triggers churn</span>
</div>
</td>
<td class="px-space-sm py-space-sm text-center">
<button class="p-1 rounded hover:bg-surface-container-highest text-outline hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined text-headline-sm">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Pagination Footer -->
<div class="px-space-base py-space-xs bg-surface-container flex items-center justify-between font-body-sm text-body-sm text-outline">
<div class="flex items-center gap-space-xs">
<span>Showing rows 1 - 6 of 14,280</span>
</div>
<div class="flex items-center gap-space-xs">
<button class="px-space-sm py-1 bg-surface-container-low text-outline rounded hover:text-on-surface" disabled="" type="button">Prev</button>
<span class="font-code-sm text-code-sm text-on-surface px-space-xs font-bold">1</span>
<button class="px-space-sm py-1 bg-surface-container-low text-on-surface rounded hover:bg-surface-container-highest" type="button">2</button>
<button class="px-space-sm py-1 bg-surface-container-low text-on-surface rounded hover:bg-surface-container-highest" type="button">3</button>
<span class="px-1">...</span>
<button class="px-space-sm py-1 bg-surface-container-low text-on-surface rounded hover:bg-surface-container-highest" type="button">Next</button>
</div>
</div>
</div>
<!-- Cohort Uplift Distribution Visualizer (Bento Summary) -->
<div class="bg-surface-container-low p-space-base rounded-xl flex flex-col gap-space-md shadow-sm">
<div class="flex items-center justify-between">
<div class="flex flex-col">
<span class="font-headline-sm text-headline-sm text-on-surface font-semibold">CATE (τ) Conditional Uplift Distribution</span>
<span class="font-body-sm text-body-sm text-outline">Heterogeneous treatment effect density over 100 sample deciles</span>
</div>
<span class="font-code-sm text-code-sm text-tertiary bg-tertiary-container/30 px-space-xs py-0.5 rounded font-bold">Median Lift: +19.4%</span>
</div>
<!-- Inline Visual Distribution Histogram SVG -->
<div class="w-full h-28 bg-surface-container-lowest rounded-lg p-space-sm relative overflow-hidden flex items-end justify-between gap-1">
<!-- Spark histogram columns -->
<div class="w-full bg-error-container/60 hover:bg-error rounded-t transition-all" style="height: 12%;" title="Decile 1 (Sleeping Dogs): -18.5%"></div>
<div class="w-full bg-error-container/40 hover:bg-error rounded-t transition-all" style="height: 18%;" title="Decile 2: -7.2%"></div>
<div class="w-full bg-surface-container-highest hover:bg-outline rounded-t transition-all" style="height: 38%;" title="Decile 3 (Lost Cause): -0.4%"></div>
<div class="w-full bg-surface-container-highest hover:bg-outline rounded-t transition-all" style="height: 44%;" title="Decile 4 (Sure Thing): +1.1%"></div>
<div class="w-full bg-surface-container-highest hover:bg-outline rounded-t transition-all" style="height: 52%;" title="Decile 5: +4.8%"></div>
<div class="w-full bg-tertiary/40 hover:bg-tertiary rounded-t transition-all" style="height: 65%;" title="Decile 6: +11.2%"></div>
<div class="w-full bg-tertiary/60 hover:bg-tertiary rounded-t transition-all" style="height: 82%;" title="Decile 7: +18.9%"></div>
<div class="w-full bg-tertiary/80 hover:bg-tertiary rounded-t transition-all" style="height: 94%;" title="Decile 8 (Persuadables Peak): +26.4%"></div>
<div class="w-full bg-tertiary hover:bg-tertiary-fixed rounded-t transition-all" style="height: 88%;" title="Decile 9: +34.1%"></div>
<div class="w-full bg-tertiary/70 hover:bg-tertiary-fixed rounded-t transition-all" style="height: 48%;" title="Decile 10 (Hyper-elastic): +41.0%"></div>
</div>
<div class="flex items-center justify-between font-code-sm text-code-sm text-outline px-1">
<span>Decile 1 (-20% Negative Lift)</span>
<span class="text-tertiary font-bold">Decile 8-9 (Optimal Persuadable Sweet Spot)</span>
<span>Decile 10 (+45% High Elasticity)</span>
</div>
</div>
</div>
<!-- Active Customer Detailed Split Inspector Drawer (5 Columns) -->
<div class="lg:col-span-5 flex flex-col gap-space-md">
<!-- Sticky Card Inspector Container -->
<div class="bg-surface-container-low rounded-xl p-space-base flex flex-col gap-space-lg shadow-md sticky top-20">
<!-- Drawer Header & Identification -->
<div class="flex items-start justify-between">
<div class="flex items-center gap-space-sm">
<div class="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container font-headline-md text-headline-md flex items-center justify-center font-bold shadow-sm">
<span id="inspector-initials">CS</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-space-xs">
<span class="font-headline-md text-headline-md text-on-surface font-semibold" id="inspector-account-name">CloudScale Systems</span>
<span class="material-symbols-outlined text-body-md text-tertiary" title="Active Model Scored">verified</span>
</div>
<span class="font-code-sm text-code-sm text-outline">ID: GP-ACC-88219 • Assigned Pod: US-East-HighTouch</span>
</div>
</div>
<span class="px-space-sm py-1 rounded bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps uppercase font-bold tracking-wider" id="inspector-quadrant-badge">
            Persuadable
          </span>
</div>
<!-- Telemetry Attributes Bento Strip -->
<div class="grid grid-cols-3 gap-space-xs bg-surface-container-lowest p-space-sm rounded-xl">
<div class="flex flex-col px-space-xs">
<span class="font-label-caps text-label-caps uppercase text-outline">Contract ARR</span>
<span class="font-metric-md text-metric-md text-on-surface font-bold mt-0.5" id="inspector-arr">\$48,000</span>
<span class="font-code-sm text-code-sm text-outline">Annual Net</span>
</div>
<div class="flex flex-col px-space-xs">
<span class="font-label-caps text-label-caps uppercase text-outline">Seat Usage</span>
<span class="font-metric-md text-metric-md text-secondary font-bold mt-0.5" id="inspector-usage">71%</span>
<span class="font-code-sm text-code-sm text-outline">142 / 200 seats</span>
</div>
<div class="flex flex-col px-space-xs">
<span class="font-label-caps text-label-caps uppercase text-outline">Product Health</span>
<span class="font-metric-md text-metric-md text-tertiary font-bold mt-0.5" id="inspector-health">64/100</span>
<span class="font-code-sm text-code-sm text-tertiary">+4 pts vs 30d</span>
</div>
</div>
<!-- Treatment Response Curve Visualization -->
<div class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between">
<span class="font-headline-sm text-headline-sm text-on-surface font-semibold">Causal Retention Curves by Treatment</span>
<span class="font-code-sm text-code-sm text-outline">Confidence: 95% CI</span>
</div>
<!-- Retention Response Comparison Bars -->
<div class="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-md">
<!-- Treatment 0: Baseline Holdout -->
<div class="flex flex-col gap-1">
<div class="flex items-center justify-between font-body-sm text-body-sm">
<span class="text-outline flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-outline"></span>
                  Baseline (No Treatment / Holdout)
                </span>
<span class="font-code-sm text-code-sm text-outline font-bold" id="retention-val-0">32% retention</span>
</div>
<div class="w-full h-2.5 bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-outline rounded-full transition-all duration-500" id="retention-bar-0" style="width: 32%;"></div>
</div>
</div>
<!-- Treatment 1: Automated Nurture -->
<div class="flex flex-col gap-1">
<div class="flex items-center justify-between font-body-sm text-body-sm">
<span class="text-on-surface-variant flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-secondary"></span>
                  Intervention A: Automated Nurture Flow
                </span>
<span class="font-code-sm text-code-sm text-secondary font-bold" id="retention-val-1">41% retention</span>
</div>
<div class="w-full h-2.5 bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full transition-all duration-500" id="retention-bar-1" style="width: 41%;"></div>
</div>
</div>
<!-- Treatment 2: CSM Concierge Review -->
<div class="flex flex-col gap-1">
<div class="flex items-center justify-between font-body-sm text-body-sm">
<span class="text-tertiary-fixed flex items-center gap-1 font-semibold">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
                  Intervention B: CSM Concierge Review + Credit (Recommended)
                </span>
<span class="font-code-sm text-code-sm text-tertiary-fixed font-bold" id="retention-val-2">74% retention</span>
</div>
<div class="w-full h-2.5 bg-surface-container-lowest rounded-full overflow-hidden">
<div class="h-full bg-tertiary rounded-full transition-all duration-500" id="retention-bar-2" style="width: 74%;"></div>
</div>
</div>
</div>
</div>
<!-- Elasticity & Cost Matrix Insight Card -->
<div class="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-xs">
<div class="flex items-center gap-space-xs text-tertiary font-label-caps text-label-caps uppercase">
<span class="material-symbols-outlined text-body-sm">lightbulb</span>
<span>Why this Account is Persuadable vs Sure Thing</span>
</div>
<p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Baseline churn risk without intervention is <strong class="text-on-surface">68.2%</strong>. Standard emails produce marginal gain (+9%), but executive CSM interaction creates an inflection of <strong class="text-tertiary">+42% net uplift</strong>, converting an imminent loss into a multi-year renewed license.
          </p>
<div class="grid grid-cols-2 gap-space-sm pt-space-xs mt-space-2xs bg-surface-container-lowest p-space-sm rounded-lg">
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-outline">Intervention Cost</span>
<span class="font-code-sm text-code-sm text-on-surface font-semibold">\$280.00 (Staff + Promo)</span>
</div>
<div class="flex flex-col">
<span class="font-label-caps text-label-caps uppercase text-outline">Expected Value Add</span>
<span class="font-code-sm text-code-sm text-tertiary-fixed font-bold" id="inspector-niv">+\$1,420 Net ARR</span>
</div>
</div>
</div>
<!-- Direct Actions & Integrations -->
<div class="flex flex-col gap-space-sm">
<div class="flex items-center justify-between text-outline font-label-caps text-label-caps uppercase">
<span>Execution Dispatch</span>
<span>Webhook: Connected</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<button class="w-full bg-primary-container hover:bg-inverse-primary text-on-primary-container font-body-sm text-body-sm font-semibold py-space-sm px-space-md rounded-lg flex items-center justify-center gap-space-xs transition-colors shadow-sm" onclick="executeIntervention()" type="button">
<span class="material-symbols-outlined text-body-md">assignment_turned_in</span>
<span>Assign CSM Review</span>
</button>
<button class="w-full bg-surface-container hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm py-space-sm px-space-md rounded-lg flex items-center justify-center gap-space-xs transition-colors shadow-sm" onclick="pushToCRM()" type="button">
<span class="material-symbols-outlined text-body-md">hub</span>
<span>Push to CRM Sync</span>
</button>
</div>
<span class="font-code-sm text-code-sm text-center text-outline min-h-[16px]" id="action-status-msg">Ready to dispatch pipeline webhook</span>
</div>
</div>
</div>
</div>
</div>
</main></div>`;

export default function CohortExplorer() {
  return (
    <div 
      className="stitch-screen w-full h-full text-slate-100 bg-slate-900"
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
}
