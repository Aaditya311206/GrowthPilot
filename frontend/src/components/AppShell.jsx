import React from 'react';

export default function AppShell({ activePath, onNavigate, onLogout, user, children, onRunAnalysis, isRunning }) {
  const merchantName = user?.merchantName || "UrbanTrend Outfitters";
  const merchantId = user?.merchantId ? `MID_${user.merchantId.slice(0, 6)}` : "MID_849201";
  const userName = user?.name || "Merchant Admin";

  const navItems = [
    { id: 'overview', label: 'Overview', badge: null },
    { id: 'customers', label: 'Customers', badge: null },
    { id: 'insights', label: 'Insights', badge: '3 New', badgeType: 'secondary' },
    { id: 'experiments', label: 'Experiments', badge: null },
    { id: 'optimizer', label: 'Optimizer', badge: null },
  ];

  const systemItems = [
    { id: 'settings', label: 'Settings' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'api-keys', label: 'API Keys' },
  ];

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* Fixed Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-gutter-desktop flex items-center justify-between gap-space-4">
          {/* Left branding & Merchant Switcher */}
          <div className="flex items-center gap-space-5">
            <div className="flex items-center gap-space-3 cursor-pointer" onClick={() => onNavigate('overview')}>
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm font-bold text-lg">
                G
              </div>
              <span className="font-title text-title text-on-surface tracking-tight">GrowthPilot</span>
            </div>
            
            <div className="h-5 w-[1px] bg-outline-variant/40 hidden sm:block"></div>
            
            <div className="hidden md:flex items-center gap-space-2 px-space-3 py-space-1 rounded-full bg-surface-container-low">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-md text-label-md text-on-surface font-medium">{merchantName}</span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant font-medium">({merchantId})</span>
            </div>
          </div>

          {/* Right Controls & Action Button */}
          <div className="flex items-center gap-space-4">
            <div className="hidden xl:flex items-center gap-space-2 px-space-3 py-space-1 rounded-full bg-surface-container-low text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
              <span className="font-data-mono-sm text-data-mono-sm font-medium">Model v2.4 • Validated</span>
            </div>

            <button
              onClick={onRunAnalysis}
              disabled={isRunning}
              className={`inline-flex items-center gap-space-2 px-space-4 py-space-2 rounded-xl font-label-md text-label-md transition-colors shadow-[0_1px_4px_rgba(29,78,216,0.25)] ${
                isRunning
                  ? 'bg-slate-400 text-white cursor-not-allowed'
                  : 'bg-primary-container text-on-primary hover:bg-primary'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[16px] ${isRunning ? 'animate-spin' : ''}`}>
                {isRunning ? 'sync' : 'auto_awesome'}
              </span>
              <span>{isRunning ? 'Executing ML Pipeline...' : 'Run Analysis'}</span>
              <kbd className="px-space-1 py-0.5 rounded bg-on-primary/20 text-on-primary font-data-mono-sm text-data-mono-sm hidden sm:inline-block">⌘R</kbd>
            </button>

            <button
              aria-label="Notifications"
              className="relative p-space-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
            </button>

            <div className="flex items-center gap-space-2 pl-space-2 border-l border-outline-variant/30">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-semibold text-sm">
                {userName.charAt(0)}
              </div>
              <div className="hidden lg:flex items-center gap-space-1">
                <span className="font-label-md text-label-md text-on-surface">{userName}</span>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="ml-2 text-on-surface-variant hover:text-error transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex flex-col justify-between py-space-5 px-space-4">
        <div className="space-y-space-6">
          <div>
            <div className="px-space-3 pb-space-2 font-label-sm text-label-sm uppercase tracking-wider text-outline">
              Growth Console
            </div>
            <nav className="flex flex-col gap-space-1">
              {navItems.map((item) => {
                const isActive = activePath === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center justify-between px-space-3 py-space-2 rounded-xl transition-colors font-body-sm text-body-sm w-full text-left ${
                      isActive
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`px-space-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                        item.badgeType === 'secondary'
                          ? 'bg-secondary-container text-on-secondary-fixed'
                          : 'bg-surface-container-high text-on-surface'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div>
          <div className="px-space-3 pb-space-2 font-label-sm text-label-sm uppercase tracking-wider text-outline">
            System Operations
          </div>
          <nav className="flex flex-col gap-space-1">
            {systemItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center justify-between px-space-3 py-space-2 rounded-xl transition-colors font-body-sm text-body-sm w-full text-left ${
                  activePath === item.id
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 pt-16">
        <main className="relative bg-surface min-h-[calc(100vh-4rem)] px-gutter-desktop py-space-6">
          {children}
        </main>
      </div>
    </div>
  );
}
