'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Check, Trash2, Plus, AlertCircle } from 'lucide-react';

interface BudgetItem {
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  breakdownDetail?: string;
  targetNegotiatedPrice?: number;
}

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

const BUDGET_PRESETS = [
  { label: '₹90,000', value: 90000 },
  { label: '₹1.5 Lakhs', value: 150000 },
  { label: '₹3 Lakhs', value: 300000 },
  { label: '₹5 Lakhs', value: 500000 },
  { label: '₹8 Lakhs', value: 800000 },
  { label: '₹12 Lakhs', value: 1200000 },
  { label: '₹20 Lakhs+', value: 2000000 },
];

const PRESET_MILESTONES = [
  { title: 'Book DJ & Sound System for Sangeet', category: 'Music & DJ' },
  { title: 'Arrange Guest Transportation & Buses', category: 'Logistics' },
  { title: 'Finalize Mehendi & Haldi Artists', category: 'Makeup & Mehendi' },
  { title: 'Order Welcome Drink & Snack Stalls', category: 'Catering' },
  { title: 'Print & Send Digital Invitation Cards', category: 'Invitations' },
];

const MILESTONE_CATEGORIES = [
  'General',
  'Venue',
  'Catering',
  'Decoration',
  'Photography',
  'Makeup',
  'Music & DJ',
  'Logistics',
  'Invitations',
];

function EventWorkspaceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventType = searchParams.get('eventType') || 'Wedding';
  const city = searchParams.get('city') || 'Anantapur';
  const eventDate = searchParams.get('eventDate') || '2026-12-15';
  const guestCount = Number(searchParams.get('guestCount')) || 500;
  const initialBudget = Number(searchParams.get('budget')) || 90000;

  const [totalBudget, setTotalBudget] = useState(initialBudget);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState(initialBudget);

  const [negotiatingCategory, setNegotiatingCategory] = useState<string | null>(null);
  const [negotiateTarget, setNegotiateTarget] = useState<number>(0);
  const [negotiationSubmitted, setNegotiationSubmitted] = useState<string | null>(null);

  // Dynamic realistic allocation engine
  const calculateAllocations = (budgetVal: number, type: string): BudgetItem[] => {
    const rules: Record<string, { category: string; pct: number; detail: string }[]> = {
      Wedding: [
        { category: 'Venue & Hall', pct: 0.15, detail: 'Main AC hall rental, green rooms & basic lighting' },
        { category: 'Catering & Meals', pct: 0.32, detail: 'Banana leaf feast / buffet meal per guest' },
        { category: 'Decoration & Mandap', pct: 0.18, detail: 'Stage backdrop, flower mandap & entrance arch' },
        { category: 'Photography & Video', pct: 0.12, detail: 'Candid photography, traditional video & album' },
        { category: 'Bridal Makeup', pct: 0.05, detail: 'HD makeup, hair styling & saree draping' },
        { category: 'Invitations & Cards', pct: 0.03, detail: 'Printed cards & digital video e-invites' },
        {
          category: 'Miscellaneous Extra Charges',
          pct: 0.12,
          detail: 'Generator fuel backup, cleaning crew, local transport & emergency cash buffer',
        },
      ],
      Engagement: [
        { category: 'Venue', pct: 0.20, detail: 'Function hall & stage setup' },
        { category: 'Catering', pct: 0.40, detail: 'Lunch / dinner buffet per guest' },
        { category: 'Decoration', pct: 0.18, detail: 'Flower stage & ring ceremony backdrop' },
        { category: 'Photography', pct: 0.12, detail: 'Candid photo & video coverage' },
        {
          category: 'Miscellaneous Extra Charges',
          pct: 0.10,
          detail: 'Power backup, transport & incidental expenses',
        },
      ],
      Birthday: [
        { category: 'Venue & Lawn', pct: 0.25, detail: 'Party space / hall rental' },
        { category: 'Food & Snacks', pct: 0.40, detail: 'Buffet dinner & welcome snacks' },
        { category: 'Theme Decoration', pct: 0.20, detail: 'Balloon arches & cake backdrop' },
        { category: 'Cake & Return Gifts', pct: 0.15, detail: 'Customized cake & return gift hampers' },
      ],
    };

    const selRules = rules[type] || rules['Wedding'];
    const commitFactor = 0.967; 
    const effectiveSpendable = Math.round(budgetVal * commitFactor);

    return selRules.map((r) => {
      const allocated = Math.round(effectiveSpendable * r.pct);
      return {
        category: r.category,
        allocatedAmount: allocated,
        spentAmount: Math.round(allocated * 0.98),
        breakdownDetail: r.detail,
        targetNegotiatedPrice: Math.round(allocated * 0.92),
      };
    });
  };

  const [allocations, setAllocations] = useState<BudgetItem[]>([]);

  useEffect(() => {
    setAllocations(calculateAllocations(totalBudget, eventType));
  }, [totalBudget, eventType]);

  const totalCommittedSpent = allocations.reduce((sum, item) => sum + item.spentAmount, 0);
  const totalSavingsBuffer = Math.max(0, totalBudget - totalCommittedSpent);

  // Apply new budget from modal
  const handleApplyNewBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempBudgetInput <= 0) return;
    setTotalBudget(tempBudgetInput);
    setShowAdjustModal(false);

    // Update query params
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('budget', tempBudgetInput.toString());
    router.replace(`/my-event?${newParams.toString()}`);
  };

  // Milestones tasks
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 't1', title: 'Lock Anantapur venue date and confirm advance payment', completed: true, category: 'Venue' },
    { id: 't2', title: 'Finalize Rayalaseema menu items with caterer', completed: true, category: 'Catering' },
    { id: 't3', title: 'Sign photography contract for candid and wedding album', completed: false, category: 'Photography' },
    { id: 't4', title: 'Approve stage flower mandap design draft', completed: false, category: 'Decoration' },
    { id: 't5', title: 'Confirm bridal makeup slot and hair trial', completed: false, category: 'Makeup' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [inputError, setInputError] = useState(false);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(`milestones_${eventType}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (err) {
      console.error(err);
    }
  }, [eventType]);

  const saveTasksToStorage = (updatedTasks: TaskItem[]) => {
    setTasks(updatedTasks);
    try {
      localStorage.setItem(`milestones_${eventType}`, JSON.stringify(updatedTasks));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasksToStorage(updated);
  };

  const deleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = tasks.filter((t) => t.id !== id);
    saveTasksToStorage(updated);
  };

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) {
      setInputError(true);
      setTimeout(() => setInputError(false), 3000);
      return;
    }

    const updated = [
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
        category: selectedCategory,
      },
    ];
    saveTasksToStorage(updated);
    setNewTaskTitle('');
    setInputError(false);
  };

  const addPresetMilestone = (preset: { title: string; category: string }) => {
    if (tasks.some((t) => t.title.toLowerCase() === preset.title.toLowerCase())) return;
    const updated = [
      ...tasks,
      {
        id: Date.now().toString(),
        title: preset.title,
        completed: false,
        category: preset.category,
      },
    ];
    saveTasksToStorage(updated);
  };

  const completedTaskCount = tasks.filter((t) => t.completed).length;

  const handleOpenNegotiate = (category: string, currentAmount: number) => {
    setNegotiatingCategory(category);
    setNegotiateTarget(Math.round(currentAmount * 0.95));
  };

  const handleSubmitNegotiation = (e: React.FormEvent) => {
    e.preventDefault();
    setNegotiationSubmitted(
      `Negotiation request sent for ${negotiatingCategory}! We will request the vendor in Anantapur to adjust price to ₹${negotiateTarget.toLocaleString('en-IN')}.`,
    );
    setTimeout(() => {
      setNegotiatingCategory(null);
      setNegotiationSubmitted(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Event Header Banner */}
      <div className="bg-zinc-950 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">
            Event Command Center
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            My {eventType} Plan
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 font-medium pt-1">
            <span>
              {new Date(eventDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span>&bull;</span>
            <span>{city}</span>
            <span>&bull;</span>
            <span>{guestCount} Guests</span>
          </div>
        </div>

        {/* Budget Pill in Banner */}
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 w-full md:w-auto text-center md:text-right space-y-1">
          <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider block">
            Total Event Budget
          </span>
          <div className="flex items-center justify-center md:justify-end gap-2">
            <span className="font-serif font-extrabold text-2xl text-rose-500">
              ₹{totalBudget.toLocaleString('en-IN')}
            </span>
            <button
              onClick={() => {
                setTempBudgetInput(totalBudget);
                setShowAdjustModal(true);
              }}
              className="px-2.5 py-1 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Adjust
            </button>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Estimation */}
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Event Budget</span>
            <button
              onClick={() => {
                setTempBudgetInput(totalBudget);
                setShowAdjustModal(true);
              }}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Change
            </button>
          </div>
          <div className="font-serif font-extrabold text-3xl text-zinc-950">
            ₹{totalBudget.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-zinc-500">Your total planned budget cap for {eventType}</p>
        </div>

        {/* Estimated Spent */}
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-card space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Estimated Spent</span>
          <div className="font-serif font-extrabold text-3xl text-zinc-950">
            ₹{totalCommittedSpent.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-zinc-500">Allocated across vendors &amp; extra charges</p>
        </div>

        {/* Remaining Savings Buffer */}
        <div className="bg-rose-50/70 p-6 rounded-3xl border border-rose-200 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Remaining Savings Buffer</span>
          <div className="font-serif font-extrabold text-3xl text-rose-600">
            ₹{totalSavingsBuffer.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-rose-700 font-medium">
            You can save up to ₹{totalSavingsBuffer.toLocaleString('en-IN')} or keep for emergency buffer!
          </p>
        </div>

      </div>

      {/* Negotiation Notification Toast */}
      {negotiationSubmitted && (
        <div className="p-4 rounded-2xl bg-zinc-950 text-white border border-rose-500 text-xs font-medium animate-fadeIn">
          ✓ {negotiationSubmitted}
        </div>
      )}

      {/* Budget Allocation Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-2xl text-zinc-950">Budget Allocation Breakdown</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Transparent cost segmentation for ₹{totalBudget.toLocaleString('en-IN')} total budget
            </p>
          </div>

          <button
            onClick={() => {
              setTempBudgetInput(totalBudget);
              setShowAdjustModal(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            Adjust Total Budget
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Details &amp; Included Services</th>
                <th className="py-3 px-4">Allocated Amount</th>
                <th className="py-3 px-4 text-right">Actions / Vendor Negotiation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs text-zinc-900 font-medium">
              {allocations.map((item) => (
                <tr key={item.category} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-zinc-950 whitespace-nowrap">{item.category}</td>
                  <td className="py-4 px-4 text-zinc-600 max-w-md">{item.breakdownDetail}</td>
                  <td className="py-4 px-4 font-extrabold text-zinc-950 whitespace-nowrap">
                    ₹{item.spentAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenNegotiate(item.category, item.spentAmount)}
                      className="inline-block text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
                    >
                      Negotiate Price
                    </button>
                    <Link
                      href={`/vendors?category=${item.category.toLowerCase().split(' ')[0]}`}
                      className="inline-block text-xs font-bold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Browse Vendors
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADJUST TOTAL BUDGET MODAL */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-zinc-200 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowAdjustModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                Event Budget Manager
              </span>
              <h3 className="font-serif font-bold text-2xl text-zinc-950">
                Adjust Your Total Event Budget
              </h3>
              <p className="text-xs text-zinc-500">
                Enter your revised budget cap. The breakdown table will recalculate line items automatically.
              </p>
            </div>

            <form onSubmit={handleApplyNewBudget} className="space-y-5">
              {/* Presets */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-2">
                  Select Quick Preset
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {BUDGET_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.value}
                      onClick={() => setTempBudgetInput(preset.value)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold text-center border transition-all ${
                        tempBudgetInput === preset.value
                          ? 'border-rose-600 bg-rose-50 text-rose-700 shadow-sm'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">
                  Or Enter Custom Total Budget (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm font-bold text-zinc-400">₹</span>
                  <input
                    type="number"
                    min={10000}
                    step={5000}
                    value={tempBudgetInput}
                    onChange={(e) => setTempBudgetInput(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-zinc-200 text-base font-extrabold text-zinc-950 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  Apply New Budget
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="px-5 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Price Negotiation Modal */}
      {negotiatingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-zinc-200 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-zinc-950">
              Negotiate {negotiatingCategory}
            </h3>
            <p className="text-xs text-zinc-600">
              Request vendors in Anantapur to adjust pricing for your requirements. For example, if current venue allocation is ₹11,500, ask them to accept ₹11,000.
            </p>

            <form onSubmit={handleSubmitNegotiation} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">Your Proposed Target Price (₹)</label>
                <input
                  type="number"
                  value={negotiateTarget}
                  onChange={(e) => setNegotiateTarget(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-950 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-zinc-950 text-white font-bold text-xs shadow-md"
                >
                  Send Price Request to Vendor
                </button>
                <button
                  type="button"
                  onClick={() => setNegotiatingCategory(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-700 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Action Plan & Milestones */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-2xl text-zinc-950">Event Milestones</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Key action items to lock in your event in {city}
            </p>
          </div>
          <span className="text-xs font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">
            {completedTaskCount} of {tasks.length} Completed
          </span>
        </div>

        {/* Add Task Form with Category Dropdown & Validation */}
        <form onSubmit={handleAddMilestoneSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => {
                setNewTaskTitle(e.target.value);
                if (inputError) setInputError(false);
              }}
              placeholder="Add new event milestone (e.g., Book DJ & Sound System)..."
              className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all ${
                inputError ? 'border-rose-500 bg-rose-50/50' : 'border-zinc-200'
              }`}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs font-bold text-zinc-800 focus:ring-2 focus:ring-rose-500 focus:outline-none"
            >
              {MILESTONE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Add Milestone
            </button>
          </div>

          {/* Validation Alert */}
          {inputError && (
            <div className="flex items-center gap-2 text-rose-600 text-xs font-bold animate-fadeIn">
              <AlertCircle className="w-4 h-4" />
              <span>Please type a milestone description before clicking Add Milestone!</span>
            </div>
          )}

          {/* Preset Suggested Quick-Add Chips */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Suggested Quick Milestones (1-Click Add):
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_MILESTONES.map((preset) => {
                const isAdded = tasks.some((t) => t.title.toLowerCase() === preset.title.toLowerCase());
                return (
                  <button
                    type="button"
                    key={preset.title}
                    disabled={isAdded}
                    onClick={() => addPresetMilestone(preset)}
                    className={`text-[11px] font-semibold px-3 py-1 rounded-lg border transition-all ${
                      isAdded
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-400 cursor-not-allowed opacity-60'
                        : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 hover:border-rose-300'
                    }`}
                  >
                    {isAdded ? `✓ ${preset.title}` : `+ ${preset.title}`}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Tasks List */}
        <div className="space-y-2 pt-2">
          {tasks.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-zinc-200 rounded-2xl text-xs text-zinc-400 font-medium">
              No milestones created yet. Add one above or click a suggested quick milestone!
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all group ${
                  task.completed
                    ? 'bg-zinc-50 border-zinc-200 text-zinc-400'
                    : 'bg-white border-zinc-200 text-zinc-900 hover:border-rose-500 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-rose-600 text-white' : 'border-2 border-zinc-300'
                    }`}
                  >
                    {task.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <span className={`text-xs font-semibold ${task.completed ? 'line-through text-zinc-400' : ''}`}>
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2.5 py-0.5 rounded-md font-bold">
                    {task.category}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => deleteTask(task.id, e)}
                    title="Delete milestone"
                    className="p-1 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default function MyEventPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500">Loading Event Workspace...</div>}>
      <EventWorkspaceContent />
    </Suspense>
  );
}
