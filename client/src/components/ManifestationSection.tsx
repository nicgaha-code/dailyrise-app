// DailyRise – ManifestationSection Component
// Design: Organic Warmth — golden bokeh bg, affirmation cards, vision board feel

import { useState } from "react";
import { Plus, Sparkles, Eye, Trash2, X, RefreshCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { AppData, ManifestationItem } from "@/lib/storage";
import { generateId, manifestationCategories } from "@/lib/storage";

const MANIFESTATION_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508089977/SGLxkFELAPM2gbCZRrtrh5/manifestation-bg-E75LFbpxUzxE9o3VYFtVqr.webp";

interface ManifestationSectionProps {
  appData: AppData;
  onUpdateData: (data: AppData) => void;
}

// Affirmation templates for each category
const affirmationTemplates: Record<string, string[]> = {
  Abundance: [
    "I am a magnet for wealth and opportunities.",
    "Money flows to me easily and effortlessly.",
    "I deserve and receive abundance in all forms.",
  ],
  Love: [
    "I am worthy of deep, authentic love.",
    "Love surrounds me and flows through me.",
    "I attract loving, supportive relationships.",
  ],
  Health: [
    "My body is strong, vibrant, and full of energy.",
    "I radiate health and vitality every day.",
    "Every cell in my body is healing and thriving.",
  ],
  Career: [
    "I am aligned with my highest purpose and calling.",
    "Success and recognition come naturally to me.",
    "I create meaningful impact through my work.",
  ],
  Freedom: [
    "I am free to live life on my own terms.",
    "I release all limitations and embrace possibility.",
    "My life is a beautiful expression of freedom.",
  ],
  Peace: [
    "I am at peace with myself and the world around me.",
    "Calm and clarity are my natural state.",
    "I release what I cannot control and trust the flow.",
  ],
  Confidence: [
    "I trust myself completely and walk with confidence.",
    "I am capable, worthy, and enough exactly as I am.",
    "My voice matters and I speak my truth boldly.",
  ],
  Joy: [
    "Joy is my natural birthright.",
    "I choose happiness and gratitude in every moment.",
    "My life is filled with laughter, love, and light.",
  ],
  Purpose: [
    "I am living my purpose with passion and intention.",
    "Everything I do is aligned with my deepest values.",
    "I make a meaningful difference in the world.",
  ],
  Connection: [
    "I attract soul-aligned people into my life.",
    "I am deeply connected to myself and others.",
    "My relationships nourish and inspire me.",
  ],
};

const categoryColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  Abundance: { bg: 'oklch(0.97 0.04 85)', border: 'oklch(0.85 0.06 85)', text: 'oklch(0.45 0.08 85)', badge: 'oklch(0.92 0.05 85)' },
  Love: { bg: 'oklch(0.97 0.03 20)', border: 'oklch(0.85 0.05 20)', text: 'oklch(0.5 0.08 20)', badge: 'oklch(0.92 0.04 20)' },
  Health: { bg: 'oklch(0.97 0.03 150)', border: 'oklch(0.85 0.05 150)', text: 'oklch(0.45 0.07 150)', badge: 'oklch(0.92 0.04 150)' },
  Career: { bg: 'oklch(0.97 0.03 42)', border: 'oklch(0.85 0.05 42)', text: 'oklch(0.45 0.08 42)', badge: 'oklch(0.92 0.04 42)' },
  Freedom: { bg: 'oklch(0.97 0.03 200)', border: 'oklch(0.85 0.05 200)', text: 'oklch(0.45 0.07 200)', badge: 'oklch(0.92 0.04 200)' },
  Peace: { bg: 'oklch(0.97 0.02 240)', border: 'oklch(0.85 0.04 240)', text: 'oklch(0.45 0.06 240)', badge: 'oklch(0.92 0.03 240)' },
  Confidence: { bg: 'oklch(0.97 0.03 280)', border: 'oklch(0.85 0.05 280)', text: 'oklch(0.45 0.07 280)', badge: 'oklch(0.92 0.04 280)' },
  Joy: { bg: 'oklch(0.97 0.04 60)', border: 'oklch(0.85 0.06 60)', text: 'oklch(0.45 0.08 60)', badge: 'oklch(0.92 0.05 60)' },
  Purpose: { bg: 'oklch(0.97 0.03 300)', border: 'oklch(0.85 0.05 300)', text: 'oklch(0.45 0.07 300)', badge: 'oklch(0.92 0.04 300)' },
  Connection: { bg: 'oklch(0.97 0.03 180)', border: 'oklch(0.85 0.05 180)', text: 'oklch(0.45 0.07 180)', badge: 'oklch(0.92 0.04 180)' },
};

export default function ManifestationSection({ appData, onUpdateData }: ManifestationSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ text: '', category: '', affirmation: '' });
  const [visualizingId, setVisualizingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const items = appData.manifestations;

  const filteredItems = filterCategory === 'all'
    ? items
    : items.filter(item => item.category === filterCategory);

  const handleGenerateAffirmation = () => {
    if (!form.category) {
      toast.error("Select a category first");
      return;
    }
    const templates = affirmationTemplates[form.category] || [];
    const random = templates[Math.floor(Math.random() * templates.length)];
    setForm(f => ({ ...f, affirmation: random }));
  };

  const handleAddItem = () => {
    if (!form.text.trim()) {
      toast.error("Please describe what you want to manifest");
      return;
    }
    if (!form.category) {
      toast.error("Please select a category");
      return;
    }
    const newItem: ManifestationItem = {
      id: generateId(),
      text: form.text.trim(),
      category: form.category,
      affirmation: form.affirmation.trim() || affirmationTemplates[form.category]?.[0] || '',
      createdAt: new Date().toISOString(),
      visualized: false,
    };
    onUpdateData({ ...appData, manifestations: [...items, newItem] });
    setForm({ text: '', category: '', affirmation: '' });
    setShowForm(false);
    toast.success("Manifestation added! Believe it, feel it, receive it ✨", { duration: 4000 });
  };

  const handleVisualize = (id: string) => {
    setVisualizingId(id);
    const updated = items.map(item =>
      item.id === id ? { ...item, visualized: true } : item
    );
    onUpdateData({ ...appData, manifestations: updated });
    setTimeout(() => setVisualizingId(null), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    onUpdateData({ ...appData, manifestations: updated });
    toast.success("Removed from your vision board", { duration: 2000 });
  };

  const visualizedCount = items.filter(i => i.visualized).length;
  const usedCategories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: '220px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${MANIFESTATION_BG})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.97 0.02 75 / 0.82) 0%, oklch(0.94 0.04 85 / 0.7) 100%)' }} />
        <div className="relative container py-10">
          <div className="flex items-start justify-between">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" style={{ color: 'oklch(0.54 0.12 42)' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.54 0.12 42)', fontFamily: 'Nunito, sans-serif' }}>
                  Vision Board
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.25 0.01 60)' }}>
                Manifestation
              </h2>
              <p className="text-sm" style={{ color: 'oklch(0.45 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                {items.length === 0
                  ? "Write your desires into existence"
                  : `${items.length} intentions set · ${visualizedCount} visualized today`}
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2 rounded-full animate-fade-in delay-200"
              style={{ background: 'oklch(0.54 0.12 42)', color: 'white', border: 'none', fontFamily: 'Nunito, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Add Intention
            </Button>
          </div>

          {/* Intro text */}
          <div className="mt-5 max-w-xl animate-fade-in delay-300">
            <p className="text-sm italic" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.4 0.04 60)', lineHeight: 1.7 }}>
              "Whatever the mind can conceive and believe, it can achieve." — Napoleon Hill
            </p>
          </div>
        </div>
      </section>

      {/* Add Intention Form */}
      {showForm && (
        <section className="container py-6 animate-scale-in">
          <div className="warm-card rounded-2xl p-6 max-w-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.25 0.01 60)' }}>
                New Intention
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: 'oklch(0.5 0.03 60)' }} />
              </button>
            </div>

            {/* Guidance */}
            <div className="rounded-xl p-4 mb-5" style={{ background: 'oklch(0.96 0.03 85)', border: '1px solid oklch(0.88 0.05 85)' }}>
              <p className="text-xs" style={{ color: 'oklch(0.45 0.06 85)', fontFamily: 'Nunito, sans-serif', lineHeight: 1.6 }}>
                <strong>How to manifest:</strong> Write in the present tense as if it has already happened. Be specific, feel the emotion, and believe it is already yours.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                  What do you want to manifest? *
                </label>
                <Textarea
                  placeholder='e.g., "I am living in my dream home, surrounded by love and abundance."'
                  value={form.text}
                  onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  rows={3}
                  style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', borderColor: 'oklch(0.88 0.04 75)', resize: 'none', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                  Category *
                </label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)' }}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {manifestationCategories.map(cat => (
                      <SelectItem key={cat} value={cat} style={{ fontFamily: 'Nunito, sans-serif' }}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                    Daily Affirmation
                  </label>
                  <button
                    onClick={handleGenerateAffirmation}
                    className="text-xs flex items-center gap-1 px-2 py-1 rounded-full transition-all"
                    style={{ color: 'oklch(0.54 0.12 42)', background: 'oklch(0.94 0.05 42)', fontFamily: 'Nunito, sans-serif' }}
                  >
                    <RefreshCw className="w-3 h-3" />
                    Generate
                  </button>
                </div>
                <Input
                  placeholder="Your personal affirmation..."
                  value={form.affirmation}
                  onChange={e => setForm(f => ({ ...f, affirmation: e.target.value }))}
                  style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)' }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleAddItem}
                  className="flex-1 rounded-full"
                  style={{ background: 'oklch(0.54 0.12 42)', color: 'white', border: 'none', fontFamily: 'Nunito, sans-serif' }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Set This Intention
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setShowForm(false); setForm({ text: '', category: '', affirmation: '' }); }}
                  className="rounded-full"
                  style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)' }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      {items.length > 0 && (
        <section className="container py-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: filterCategory === 'all' ? 'oklch(0.54 0.12 42)' : 'oklch(0.92 0.03 75)',
                color: filterCategory === 'all' ? 'white' : 'oklch(0.4 0.04 60)',
                border: '1px solid oklch(0.88 0.04 75)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              All Intentions
            </button>
            {usedCategories.map(cat => {
              const colors = categoryColors[cat] || categoryColors['Abundance'];
              return (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: filterCategory === cat ? colors.text : colors.badge,
                    color: filterCategory === cat ? 'white' : colors.text,
                    border: `1px solid ${colors.border}`,
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Manifestation Cards */}
      <section className="container pb-8">
        {items.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 blob-shape-2 mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'oklch(0.96 0.04 85)' }}>
              <Sparkles className="w-8 h-8" style={{ color: 'oklch(0.6 0.1 60)' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.3 0.02 60)' }}>
              Your vision board awaits
            </h3>
            <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif', lineHeight: 1.6 }}>
              Write your desires as if they are already real. The universe responds to clarity and belief.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="rounded-full gap-2"
              style={{ background: 'oklch(0.54 0.12 42)', color: 'white', border: 'none', fontFamily: 'Nunito, sans-serif' }}
            >
              <Sparkles className="w-4 h-4" />
              Set Your First Intention
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, idx) => {
              const colors = categoryColors[item.category] || categoryColors['Abundance'];
              const isVisualizing = visualizingId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl p-5 relative overflow-hidden transition-all duration-300 animate-fade-in-up"
                  style={{
                    background: isVisualizing ? 'oklch(0.96 0.05 85)' : colors.bg,
                    border: `1px solid ${isVisualizing ? 'oklch(0.75 0.1 85)' : colors.border}`,
                    boxShadow: isVisualizing
                      ? '0 0 30px oklch(0.75 0.1 85 / 0.3)'
                      : '0 2px 12px oklch(0.54 0.12 42 / 0.06)',
                    animationDelay: `${idx * 0.08}s`,
                    transform: isVisualizing ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  {/* Visualizing overlay */}
                  {isVisualizing && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl animate-fade-in"
                      style={{ background: 'oklch(0.96 0.05 85 / 0.9)', zIndex: 10 }}>
                      <div className="text-center">
                        <Star className="w-8 h-8 mx-auto mb-2 animate-pulse-soft" style={{ color: 'oklch(0.6 0.12 60)' }} />
                        <p className="text-sm font-semibold" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.35 0.08 60)' }}>
                          Feel it. Believe it. Receive it.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                      style={{ background: colors.badge, color: colors.text, fontFamily: 'Nunito, sans-serif' }}
                    >
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 rounded-full transition-all opacity-50 hover:opacity-100"
                      style={{ color: colors.text }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Manifestation text */}
                  <p className="text-base mb-4 leading-relaxed" style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', color: 'oklch(0.28 0.02 60)', lineHeight: 1.65 }}>
                    "{item.text}"
                  </p>

                  {/* Affirmation */}
                  {item.affirmation && (
                    <div className="rounded-lg p-3 mb-4" style={{ background: 'oklch(1 0 0 / 0.5)' }}>
                      <p className="text-xs font-medium mb-0.5 uppercase tracking-wide" style={{ color: colors.text, fontFamily: 'Nunito, sans-serif' }}>
                        Affirmation
                      </p>
                      <p className="text-sm" style={{ fontFamily: 'Nunito, sans-serif', color: 'oklch(0.35 0.02 60)', lineHeight: 1.5 }}>
                        {item.affirmation}
                      </p>
                    </div>
                  )}

                  {/* Visualize button */}
                  <button
                    onClick={() => handleVisualize(item.id)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: item.visualized ? 'oklch(1 0 0 / 0.4)' : colors.badge,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      fontFamily: 'Nunito, sans-serif',
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    {item.visualized ? '✓ Visualized Today' : 'Visualize Now'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Daily Affirmation Practice */}
      {items.length > 0 && (
        <section className="container pb-8">
          <div className="rounded-2xl p-6 text-center"
            style={{ background: 'linear-gradient(135deg, oklch(0.96 0.04 85), oklch(0.96 0.03 42))', border: '1px solid oklch(0.88 0.05 75)' }}>
            <Sparkles className="w-6 h-6 mx-auto mb-3" style={{ color: 'oklch(0.54 0.12 42)' }} />
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.3 0.02 60)' }}>
              Morning Practice
            </h3>
            <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'oklch(0.45 0.04 60)', fontFamily: 'Nunito, sans-serif', lineHeight: 1.6 }}>
              Read each intention aloud, close your eyes, and spend 30 seconds feeling as though it has already manifested. Repeat daily for maximum effect.
            </p>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.54 0.12 42)' }}>
              {visualizedCount}/{items.length}
            </div>
            <p className="text-xs mt-1" style={{ color: 'oklch(0.5 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
              intentions visualized today
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
