// DailyRise – QuoteSection Component
// Design: Organic Warmth — hero with watercolor bg, large serif quote, category badge

import { useState, useEffect } from "react";
import { Heart, RefreshCw, Share2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getDailyQuote, quotes, type Quote, categories } from "@/lib/quotes";
import MorningWidget from "@/components/MorningWidget";
import type { AppData } from "@/lib/storage";

interface QuoteSectionProps {
  appData: AppData;
  onUpdateData: (data: AppData) => void;
}

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508089977/SGLxkFELAPM2gbCZRrtrh5/hero-bg-KDZA2M56S696irwptU59Tw.webp";
const QUOTE_ACCENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508089977/SGLxkFELAPM2gbCZRrtrh5/quote-accent-GVeuG4BmLmFiKBSCETVNd7.webp";

export default function QuoteSection({ appData, onUpdateData }: QuoteSectionProps) {
  const [currentQuote, setCurrentQuote] = useState<Quote>(getDailyQuote());
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  const isFavorited = appData.favoriteQuotes.includes(currentQuote.id);

  const handleNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const filtered = selectedCategory
        ? quotes.filter(q => q.category === selectedCategory && q.id !== currentQuote.id)
        : quotes.filter(q => q.id !== currentQuote.id);
      const next = filtered[Math.floor(Math.random() * filtered.length)];
      setCurrentQuote(next);
      setIsAnimating(false);
    }, 300);
  };

  const handleDailyQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote(getDailyQuote());
      setSelectedCategory(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleToggleFavorite = () => {
    const favs = appData.favoriteQuotes;
    const newFavs = isFavorited
      ? favs.filter(id => id !== currentQuote.id)
      : [...favs, currentQuote.id];
    onUpdateData({ ...appData, favoriteQuotes: newFavs });
    toast.success(isFavorited ? "Removed from favorites" : "Saved to favorites ♥", {
      duration: 2000,
    });
  };

  const handleShare = async () => {
    const text = `"${currentQuote.text}" — ${currentQuote.author}`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Quote copied to clipboard!", { duration: 2000 });
    }
  };

  const handleCategoryFilter = (cat: string) => {
    if (selectedCategory === cat) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(cat);
      setIsAnimating(true);
      setTimeout(() => {
        const filtered = quotes.filter(q => q.category === cat);
        setCurrentQuote(filtered[Math.floor(Math.random() * filtered.length)]);
        setIsAnimating(false);
      }, 300);
    }
  };

  const favoriteQuotesList = quotes.filter(q => appData.favoriteQuotes.includes(q.id));

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Scroll to top when quote changes
  useEffect(() => {
    if (!isAnimating) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuote.id]);

  return (
    <div>
      {/* Hero Quote Section */}
      <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.97 0.02 75 / 0.85) 0%, oklch(0.94 0.03 75 / 0.7) 100%)' }} />

        <div className="relative container py-12 md:py-20">
          <div className="max-w-3xl">
            {/* Morning widget */}
            <div className="mb-5 inline-block animate-fade-in">
              <MorningWidget />
            </div>

            {/* Date badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 animate-fade-in delay-100"
              style={{ background: 'oklch(0.99 0.01 75 / 0.8)', border: '1px solid oklch(0.88 0.04 75)', backdropFilter: 'blur(8px)' }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse-soft" style={{ background: 'oklch(0.54 0.12 42)' }} />
              <span className="text-xs font-medium" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                {today}
              </span>
            </div>

            {/* Quote card */}
            <div
              className="relative rounded-2xl p-8 md:p-10 mb-6 animate-fade-in delay-100"
              style={{
                background: 'oklch(0.99 0.01 75 / 0.88)',
                border: '1px solid oklch(0.88 0.04 75)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 40px oklch(0.54 0.12 42 / 0.12)',
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              {/* Accent image */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 rounded-tr-2xl overflow-hidden"
                style={{ backgroundImage: `url(${QUOTE_ACCENT})`, backgroundSize: 'cover' }}
              />

              {/* Category badge */}
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{
                  background: 'oklch(0.94 0.05 42)',
                  color: 'oklch(0.45 0.1 42)',
                  fontFamily: 'Nunito, sans-serif',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {currentQuote.category}
              </span>

              {/* Opening quote mark */}
              <div className="leading-none mb-2" style={{ color: 'oklch(0.72 0.09 42)', fontFamily: 'Lora, serif', fontSize: '5rem', lineHeight: 0.7 }}>
                &#8220;
              </div>

              {/* Quote text */}
              <blockquote
                className="quote-text text-xl md:text-2xl lg:text-3xl mb-6"
                style={{
                  fontFamily: 'Lora, serif',
                  fontStyle: 'italic',
                  color: 'oklch(0.25 0.01 60)',
                  lineHeight: 1.55,
                }}
              >
                {currentQuote.text}
              </blockquote>
              <div className="leading-none mt-2 text-right" style={{ color: 'oklch(0.72 0.09 42)', fontFamily: 'Lora, serif', fontSize: '5rem', lineHeight: 0.7 }}>
                &#8221;
              </div>

              {/* Brushstroke divider */}
              <div className="brushstroke-divider mb-4 w-24" />

              {/* Author */}
              <p className="font-semibold" style={{ color: 'oklch(0.45 0.08 42)', fontFamily: 'Nunito, sans-serif', fontSize: '0.95rem' }}>
                — {currentQuote.author}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 animate-fade-in delay-200">
              <Button
                onClick={handleToggleFavorite}
                variant="outline"
                size="sm"
                className="gap-2 rounded-full"
                style={{
                  background: isFavorited ? 'oklch(0.94 0.05 42)' : 'oklch(0.99 0.01 75 / 0.8)',
                  borderColor: isFavorited ? 'oklch(0.72 0.09 42)' : 'oklch(0.88 0.04 75)',
                  color: isFavorited ? 'oklch(0.45 0.1 42)' : 'oklch(0.4 0.04 60)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Saved' : 'Save'}
              </Button>

              <Button
                onClick={handleNewQuote}
                variant="outline"
                size="sm"
                className="gap-2 rounded-full"
                style={{
                  background: 'oklch(0.99 0.01 75 / 0.8)',
                  borderColor: 'oklch(0.88 0.04 75)',
                  color: 'oklch(0.4 0.04 60)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                <RefreshCw className="w-4 h-4" />
                New Quote
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="gap-2 rounded-full"
                style={{
                  background: 'oklch(0.99 0.01 75 / 0.8)',
                  borderColor: 'oklch(0.88 0.04 75)',
                  color: 'oklch(0.4 0.04 60)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>

              <Button
                onClick={handleDailyQuote}
                size="sm"
                className="gap-2 rounded-full ml-auto"
                style={{
                  background: 'oklch(0.54 0.12 42)',
                  color: 'white',
                  fontFamily: 'Nunito, sans-serif',
                  border: 'none',
                }}
              >
                Today's Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container py-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
            Browse by Theme
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                background: selectedCategory === cat ? 'oklch(0.54 0.12 42)' : 'oklch(0.92 0.03 75)',
                color: selectedCategory === cat ? 'white' : 'oklch(0.4 0.04 60)',
                border: selectedCategory === cat ? '1px solid oklch(0.54 0.12 42)' : '1px solid oklch(0.88 0.04 75)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Favorites Section */}
      {appData.favoriteQuotes.length > 0 && (
        <section className="container pb-8">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex items-center gap-2 mb-4 group"
          >
            <Heart className="w-4 h-4 fill-current" style={{ color: 'oklch(0.54 0.12 42)' }} />
            <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
              Saved Quotes ({appData.favoriteQuotes.length})
            </h2>
            <ChevronDown
               className="w-4 h-4 transition-transform duration-200"
               style={{
                 color: 'oklch(0.5 0.03 60)',
                 transform: showFavorites ? 'rotate(180deg)' : 'rotate(0deg)',
               }}
             />
          </button>

          {showFavorites && (
            <div className="grid gap-3 md:grid-cols-2 animate-fade-in">
              {favoriteQuotesList.map(q => (
                <div
                  key={q.id}
                  className="warm-card rounded-xl p-5 cursor-pointer"
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => { setCurrentQuote(q); setIsAnimating(false); }, 300);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2"
                    style={{ background: 'oklch(0.94 0.05 42)', color: 'oklch(0.45 0.1 42)', fontFamily: 'Nunito, sans-serif' }}>
                    {q.category}
                  </span>
                  <p className="text-sm italic mb-2 line-clamp-3" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.3 0.02 60)', lineHeight: 1.6 }}>
                    "{q.text}"
                  </p>
                  <p className="text-xs font-semibold" style={{ color: 'oklch(0.54 0.12 42)', fontFamily: 'Nunito, sans-serif' }}>
                    — {q.author}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
