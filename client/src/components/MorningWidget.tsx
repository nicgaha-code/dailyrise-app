// DailyRise – MorningWidget Component
// Design: Organic Warmth — greeting widget with time-based message

import { useState, useEffect } from "react";
import { Sun, Moon, Sunrise } from "lucide-react";

export default function MorningWidget() {
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState<'sun' | 'sunset' | 'moon'>('sun');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const hour = new Date().getHours();
      setTimeStr(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning');
        setIcon('sun');
      } else if (hour >= 12 && hour < 17) {
        setGreeting('Good afternoon');
        setIcon('sunset');
      } else if (hour >= 17 && hour < 21) {
        setGreeting('Good evening');
        setIcon('sunset');
      } else {
        setGreeting('Good night');
        setIcon('moon');
      }
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const IconComponent = icon === 'sun' ? Sun : icon === 'sunset' ? Sunrise : Moon;
  const iconColor = icon === 'sun' ? 'oklch(0.7 0.12 60)' : icon === 'sunset' ? 'oklch(0.6 0.1 42)' : 'oklch(0.55 0.06 280)';

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl animate-fade-in"
      style={{ background: 'oklch(0.99 0.01 75 / 0.8)', border: '1px solid oklch(0.88 0.04 75)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-10 h-10 blob-shape flex items-center justify-center flex-shrink-0"
        style={{ background: 'oklch(0.96 0.04 75)' }}
      >
        <IconComponent className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <div>
        <p className="font-semibold text-sm" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.3 0.02 60)' }}>
          {greeting}
        </p>
        <p className="text-xs" style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
          {timeStr} · Your daily wisdom awaits
        </p>
      </div>
    </div>
  );
}
