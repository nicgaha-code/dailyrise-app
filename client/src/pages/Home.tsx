// DailyRise – Home Page
// Design: Organic Warmth / Wabi-Sabi Modernism
// Sections: Header, Daily Quote Hero, Goals, Manifestation Board, Footer

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { loadData, saveData, updateStreak, type AppData } from "@/lib/storage";
import QuoteSection from "@/components/QuoteSection";
import GoalsSection from "@/components/GoalsSection";
import ManifestationSection from "@/components/ManifestationSection";
import AppHeader from "@/components/AppHeader";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [activeTab, setActiveTab] = useState<'quote' | 'goals' | 'manifestation'>('quote');

  useEffect(() => {
    const data = loadData();
    const updated = updateStreak(data);
    setAppData(updated);

    if (updated.streak > 1) {
      setTimeout(() => {
        toast.success(`🔥 ${updated.streak}-day streak! Keep rising!`, {
          description: "Consistency is the key to transformation.",
          duration: 4000,
        });
      }, 1500);
    }
  }, []);

  const handleUpdateData = (newData: AppData) => {
    setAppData(newData);
    saveData(newData);
  };

  if (!appData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'oklch(0.97 0.02 75)' }}>
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 blob-shape mx-auto mb-4 animate-pulse-soft" style={{ background: 'oklch(0.54 0.12 42)' }} />
          <p className="font-nunito text-muted-foreground" style={{ fontFamily: 'Nunito, sans-serif' }}>Rising...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.97 0.02 75)', fontFamily: 'Nunito, sans-serif' }}>
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} streak={appData.streak} />
      
      <main className="pb-16">
        {activeTab === 'quote' && (
          <QuoteSection
            appData={appData}
            onUpdateData={handleUpdateData}
          />
        )}
        {activeTab === 'goals' && (
          <GoalsSection
            appData={appData}
            onUpdateData={handleUpdateData}
          />
        )}
        {activeTab === 'manifestation' && (
          <ManifestationSection
            appData={appData}
            onUpdateData={handleUpdateData}
          />
        )}
      </main>

      <StatsBar appData={appData} />
    </div>
  );
}
