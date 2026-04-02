// DailyRise – AppHeader Component
// Design: Organic Warmth — warm sand background, Lora branding, tab navigation

import { Flame, Quote, Target, Sparkles } from "lucide-react";

interface AppHeaderProps {
  activeTab: 'quote' | 'goals' | 'manifestation';
  onTabChange: (tab: 'quote' | 'goals' | 'manifestation') => void;
  streak: number;
}

export default function AppHeader({ activeTab, onTabChange, streak }: AppHeaderProps) {
  const tabs = [
    { id: 'quote' as const, label: 'Daily Quote', icon: Quote },
    { id: 'goals' as const, label: 'My Goals', icon: Target },
    { id: 'manifestation' as const, label: 'Manifestation', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50" style={{ background: 'oklch(0.97 0.02 75)', borderBottom: '1px solid oklch(0.88 0.04 75)' }}>
      {/* Top bar */}
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 blob-shape flex items-center justify-center"
              style={{ background: 'oklch(0.54 0.12 42)' }}
            >
              <span className="text-white text-xs font-bold" style={{ fontFamily: 'Lora, serif' }}>D</span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.25 0.01 60)' }}>
                DailyRise
              </h1>
              <p className="text-xs leading-none mt-0.5" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
                Rise. Reflect. Manifest.
              </p>
            </div>
          </div>

          {/* Streak badge */}
          {streak > 0 && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full animate-fade-in"
              style={{ background: 'oklch(0.94 0.05 42)', border: '1px solid oklch(0.82 0.08 42)' }}
            >
              <Flame className="w-3.5 h-3.5" style={{ color: 'oklch(0.54 0.12 42)' }} />
              <span className="text-xs font-semibold" style={{ color: 'oklch(0.4 0.08 42)', fontFamily: 'Nunito, sans-serif' }}>
                {streak} day{streak !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Tab navigation */}
        <nav className="flex gap-1 pb-0 -mb-px">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-200 relative"
              style={{
                fontFamily: 'Nunito, sans-serif',
                color: activeTab === id ? 'oklch(0.54 0.12 42)' : 'oklch(0.5 0.03 60)',
                borderBottom: activeTab === id ? '2px solid oklch(0.54 0.12 42)' : '2px solid transparent',
                background: 'transparent',
              }}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
