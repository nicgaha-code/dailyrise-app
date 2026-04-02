// DailyRise – StatsBar Component
// Design: Organic Warmth — bottom floating stats bar

import { Flame, Target, Sparkles, Heart } from "lucide-react";
import type { AppData } from "@/lib/storage";

interface StatsBarProps {
  appData: AppData;
}

export default function StatsBar({ appData }: StatsBarProps) {
  const completedGoals = appData.goals.filter(g => g.completed).length;
  const activeGoals = appData.goals.filter(g => !g.completed).length;
  const manifestations = appData.manifestations.length;
  const favorites = appData.favoriteQuotes.length;

  const stats = [
    { icon: Flame, label: 'Streak', value: `${appData.streak}d`, color: 'oklch(0.54 0.12 42)' },
    { icon: Target, label: 'Goals', value: `${completedGoals}/${activeGoals + completedGoals}`, color: 'oklch(0.64 0.06 150)' },
    { icon: Sparkles, label: 'Intentions', value: manifestations, color: 'oklch(0.6 0.1 60)' },
    { icon: Heart, label: 'Saved', value: favorites, color: 'oklch(0.65 0.1 20)' },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'oklch(0.99 0.01 75 / 0.92)',
        borderTop: '1px solid oklch(0.88 0.04 75)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-around py-2">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-0.5 py-1 px-3">
              <Icon className="w-4 h-4" style={{ color }} />
              <span className="text-sm font-bold leading-none" style={{ color: 'oklch(0.3 0.02 60)', fontFamily: 'Nunito, sans-serif' }}>
                {value}
              </span>
              <span className="text-xs leading-none" style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
