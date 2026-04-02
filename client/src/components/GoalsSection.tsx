// DailyRise – GoalsSection Component
// Design: Organic Warmth — sage green accents, progress bars, milestone tracking

import { useState } from "react";
import { Plus, Target, Check, Trash2, ChevronDown, ChevronUp, Edit2, X, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import type { AppData, Goal, Milestone } from "@/lib/storage";
import { generateId, goalCategories } from "@/lib/storage";

const GOALS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663508089977/SGLxkFELAPM2gbCZRrtrh5/goals-bg-dNqD3KDpzn7H2yvQkT3v72.webp";

interface GoalsSectionProps {
  appData: AppData;
  onUpdateData: (data: AppData) => void;
}

interface GoalFormData {
  title: string;
  description: string;
  category: string;
  targetDate: string;
}

const emptyForm: GoalFormData = { title: '', description: '', category: '', targetDate: '' };

export default function GoalsSection({ appData, onUpdateData }: GoalsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<GoalFormData>(emptyForm);
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [newMilestone, setNewMilestone] = useState<Record<string, string>>({});
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const goals = appData.goals;
  const completedCount = goals.filter(g => g.completed).length;
  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  const filteredActive = filterCategory === 'all'
    ? activeGoals
    : activeGoals.filter(g => g.category === filterCategory);

  const handleAddGoal = () => {
    if (!form.title.trim()) {
      toast.error("Please enter a goal title");
      return;
    }
    if (!form.category) {
      toast.error("Please select a category");
      return;
    }
    const newGoal: Goal = {
      id: generateId(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      targetDate: form.targetDate,
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString(),
      milestones: [],
    };
    onUpdateData({ ...appData, goals: [...goals, newGoal] });
    setForm(emptyForm);
    setShowForm(false);
    toast.success("Goal added! You've got this 🎯", { duration: 3000 });
  };

  const handleUpdateProgress = (goalId: string, progress: number) => {
    const updated = goals.map(g => g.id === goalId ? { ...g, progress } : g);
    onUpdateData({ ...appData, goals: updated });
  };

  const handleCompleteGoal = (goalId: string) => {
    const updated = goals.map(g =>
      g.id === goalId ? { ...g, completed: true, progress: 100 } : g
    );
    onUpdateData({ ...appData, goals: updated });
    toast.success("Goal completed! 🎉 Incredible achievement!", { duration: 4000 });
  };

  const handleDeleteGoal = (goalId: string) => {
    const updated = goals.filter(g => g.id !== goalId);
    onUpdateData({ ...appData, goals: updated });
    toast.success("Goal removed", { duration: 2000 });
  };

  const handleAddMilestone = (goalId: string) => {
    const text = newMilestone[goalId]?.trim();
    if (!text) return;
    const milestone: Milestone = { id: generateId(), text, completed: false };
    const updated = goals.map(g =>
      g.id === goalId ? { ...g, milestones: [...g.milestones, milestone] } : g
    );
    onUpdateData({ ...appData, goals: updated });
    setNewMilestone(prev => ({ ...prev, [goalId]: '' }));
  };

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    const updated = goals.map(g => {
      if (g.id !== goalId) return g;
      const milestones = g.milestones.map(m =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      );
      const completedMs = milestones.filter(m => m.completed).length;
      const progress = milestones.length > 0 ? Math.round((completedMs / milestones.length) * 100) : g.progress;
      return { ...g, milestones, progress };
    });
    onUpdateData({ ...appData, goals: updated });
  };

  const getDaysLeft = (targetDate: string) => {
    if (!targetDate) return null;
    const diff = new Date(targetDate).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Career': 'oklch(0.54 0.12 42)',
      'Health': 'oklch(0.64 0.06 150)',
      'Relationships': 'oklch(0.65 0.1 20)',
      'Finance': 'oklch(0.6 0.08 200)',
      'Personal Growth': 'oklch(0.55 0.1 280)',
      'Education': 'oklch(0.58 0.1 240)',
      'Travel': 'oklch(0.6 0.1 180)',
      'Creativity': 'oklch(0.6 0.12 60)',
      'Spirituality': 'oklch(0.55 0.08 300)',
      'Other': 'oklch(0.5 0.03 60)',
    };
    return colors[category] || 'oklch(0.54 0.12 42)';
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: '200px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${GOALS_BG})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.97 0.02 75 / 0.88) 0%, oklch(0.96 0.03 150 / 0.75) 100%)' }} />
        <div className="relative container py-10">
          <div className="flex items-start justify-between">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.25 0.01 60)' }}>
                My Goals
              </h2>
              <p className="text-sm" style={{ color: 'oklch(0.45 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                {goals.length === 0
                  ? "Set your first goal and start your journey"
                  : `${completedCount} of ${goals.length} goals completed`}
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2 rounded-full animate-fade-in delay-200"
              style={{ background: 'oklch(0.54 0.12 42)', color: 'white', border: 'none', fontFamily: 'Nunito, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </div>

          {/* Stats row */}
          {goals.length > 0 && (
            <div className="flex gap-4 mt-6 animate-fade-in delay-300">
              {[
                { label: 'Active', value: activeGoals.length, color: 'oklch(0.54 0.12 42)' },
                { label: 'Completed', value: completedCount, color: 'oklch(0.64 0.06 150)' },
                { label: 'Avg Progress', value: `${Math.round(activeGoals.reduce((s, g) => s + g.progress, 0) / (activeGoals.length || 1))}%`, color: 'oklch(0.6 0.08 200)' },
              ].map(stat => (
                <div key={stat.label} className="warm-card rounded-xl px-4 py-2.5 text-center" style={{ minWidth: '80px' }}>
                  <div className="text-xl font-bold" style={{ fontFamily: 'Lora, serif', color: stat.color }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Goal Form */}
      {showForm && (
        <section className="container py-6 animate-scale-in">
          <div className="warm-card rounded-2xl p-6 max-w-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.25 0.01 60)' }}>
                New Goal
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: 'oklch(0.5 0.03 60)' }} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                  Goal Title *
                </label>
                <Input
                  placeholder="e.g., Run a 5K by June"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)' }}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                  Description
                </label>
                <Textarea
                  placeholder="Why is this goal important to you?"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={2}
                  style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)', resize: 'none' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                    Category *
                  </label>
                  <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)' }}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalCategories.map(cat => (
                        <SelectItem key={cat} value={cat} style={{ fontFamily: 'Nunito, sans-serif' }}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                    Target Date
                  </label>
                  <Input
                    type="date"
                    value={form.targetDate}
                    onChange={e => setForm(f => ({ ...f, targetDate: e.target.value }))}
                    style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)' }}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleAddGoal}
                  className="flex-1 rounded-full"
                  style={{ background: 'oklch(0.54 0.12 42)', color: 'white', border: 'none', fontFamily: 'Nunito, sans-serif' }}
                >
                  Set This Goal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setShowForm(false); setForm(emptyForm); }}
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
      {goals.length > 0 && (
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
              All
            </button>
            {goalCategories.filter(cat => goals.some(g => g.category === cat)).map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  background: filterCategory === cat ? getCategoryColor(cat) : 'oklch(0.92 0.03 75)',
                  color: filterCategory === cat ? 'white' : 'oklch(0.4 0.04 60)',
                  border: '1px solid oklch(0.88 0.04 75)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Goals List */}
      <section className="container pb-8">
        {goals.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 blob-shape mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'oklch(0.92 0.03 75)' }}>
              <Target className="w-8 h-8" style={{ color: 'oklch(0.64 0.06 150)' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.3 0.02 60)' }}>
              No goals yet
            </h3>
            <p className="text-sm mb-6" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
              Every great journey begins with a single intention.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="rounded-full gap-2"
              style={{ background: 'oklch(0.54 0.12 42)', color: 'white', border: 'none', fontFamily: 'Nunito, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Set Your First Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActive.map((goal, idx) => {
              const isExpanded = expandedGoal === goal.id;
              const daysLeft = getDaysLeft(goal.targetDate);
              const completedMilestones = goal.milestones.filter(m => m.completed).length;

              return (
                <div
                  key={goal.id}
                  className="warm-card rounded-2xl overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  {/* Goal header */}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      {/* Category dot */}
                      <div
                        className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: getCategoryColor(goal.category) }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-base leading-snug" style={{ fontFamily: 'Lora, serif', color: 'oklch(0.25 0.01 60)' }}>
                              {goal.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'oklch(0.92 0.03 75)', color: 'oklch(0.45 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                                {goal.category}
                              </span>
                              {daysLeft !== null && (
                                <span className="text-xs flex items-center gap-1" style={{ color: daysLeft < 7 ? 'oklch(0.54 0.12 42)' : 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
                                  <Calendar className="w-3 h-3" />
                                  {daysLeft > 0 ? `${daysLeft}d left` : daysLeft === 0 ? 'Due today' : 'Overdue'}
                                </span>
                              )}
                              {goal.milestones.length > 0 && (
                                <span className="text-xs" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
                                  {completedMilestones}/{goal.milestones.length} steps
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleCompleteGoal(goal.id)}
                              className="p-1.5 rounded-full transition-all hover:scale-110"
                              style={{ background: 'oklch(0.96 0.03 150)', color: 'oklch(0.64 0.06 150)' }}
                              title="Mark complete"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteGoal(goal.id)}
                              className="p-1.5 rounded-full transition-all hover:scale-110"
                              style={{ background: 'oklch(0.96 0.02 30)', color: 'oklch(0.6 0.1 30)' }}
                              title="Delete goal"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setExpandedGoal(isExpanded ? null : goal.id)}
                              className="p-1.5 rounded-full transition-all"
                              style={{ background: 'oklch(0.92 0.03 75)', color: 'oklch(0.5 0.03 60)' }}
                            >
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>Progress</span>
                            <span className="text-xs font-semibold" style={{ color: 'oklch(0.54 0.12 42)', fontFamily: 'Nunito, sans-serif' }}>{goal.progress}%</span>
                          </div>
                          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'oklch(0.92 0.03 75)' }}>
                            <div
                              className="h-full rounded-full progress-warm transition-all duration-500"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t animate-fade-in" style={{ borderColor: 'oklch(0.92 0.03 75)' }}>
                      {goal.description && (
                        <p className="text-sm mt-4 mb-4 italic" style={{ color: 'oklch(0.45 0.04 60)', fontFamily: 'Lora, serif', lineHeight: 1.6 }}>
                          "{goal.description}"
                        </p>
                      )}

                      {/* Progress slider */}
                      <div className="mb-5">
                        <label className="text-xs font-medium mb-2 block" style={{ color: 'oklch(0.4 0.04 60)', fontFamily: 'Nunito, sans-serif' }}>
                          Adjust Progress
                        </label>
                        <Slider
                          value={[goal.progress]}
                          onValueChange={([v]) => handleUpdateProgress(goal.id, v)}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {/* Milestones */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
                          Steps & Milestones
                        </h4>
                        <div className="space-y-2 mb-3">
                          {goal.milestones.map(m => (
                            <div
                              key={m.id}
                              className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all"
                              style={{ background: m.completed ? 'oklch(0.96 0.03 150)' : 'oklch(0.96 0.02 75)' }}
                              onClick={() => handleToggleMilestone(goal.id, m.id)}
                            >
                              <div
                                className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                                style={{
                                  borderColor: m.completed ? 'oklch(0.64 0.06 150)' : 'oklch(0.82 0.04 75)',
                                  background: m.completed ? 'oklch(0.64 0.06 150)' : 'transparent',
                                }}
                              >
                                {m.completed && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                              <span
                                className="text-sm"
                                style={{
                                  fontFamily: 'Nunito, sans-serif',
                                  color: m.completed ? 'oklch(0.5 0.04 150)' : 'oklch(0.35 0.02 60)',
                                  textDecoration: m.completed ? 'line-through' : 'none',
                                }}
                              >
                                {m.text}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a step..."
                            value={newMilestone[goal.id] || ''}
                            onChange={e => setNewMilestone(prev => ({ ...prev, [goal.id]: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleAddMilestone(goal.id)}
                            className="text-sm"
                            style={{ fontFamily: 'Nunito, sans-serif', borderColor: 'oklch(0.88 0.04 75)' }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddMilestone(goal.id)}
                            className="rounded-full px-3"
                            style={{ background: 'oklch(0.64 0.06 150)', color: 'white', border: 'none' }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Completed goals */}
            {completedGoals.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
                  style={{ color: 'oklch(0.5 0.03 60)', fontFamily: 'Nunito, sans-serif' }}>
                  <Check className="w-4 h-4" style={{ color: 'oklch(0.64 0.06 150)' }} />
                  Achieved ({completedGoals.length})
                </h3>
                <div className="space-y-3">
                  {completedGoals.map(goal => (
                    <div
                      key={goal.id}
                      className="rounded-xl p-4 flex items-center justify-between"
                      style={{ background: 'oklch(0.96 0.03 150)', border: '1px solid oklch(0.82 0.04 150)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'oklch(0.64 0.06 150)' }}>
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium line-through" style={{ color: 'oklch(0.45 0.04 150)', fontFamily: 'Nunito, sans-serif' }}>
                            {goal.title}
                          </p>
                          <p className="text-xs" style={{ color: 'oklch(0.55 0.04 150)', fontFamily: 'Nunito, sans-serif' }}>{goal.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        style={{ color: 'oklch(0.6 0.04 150)' }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
