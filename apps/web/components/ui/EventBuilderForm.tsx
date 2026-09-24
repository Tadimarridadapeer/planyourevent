'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'Wedding', name: 'Wedding' },
  { id: 'Engagement', name: 'Engagement' },
  { id: 'Reception', name: 'Reception' },
  { id: 'Birthday', name: 'Birthday' },
  { id: 'Baby Shower', name: 'Baby Shower' },
  { id: 'Housewarming', name: 'Housewarming' },
  { id: 'Religious Event', name: 'Religious Event' },
  { id: 'Corporate', name: 'Corporate' },
];

const BUDGET_OPTIONS = [
  { label: 'Under ₹1L', value: 90000 },
  { label: '₹1L – ₹3L', value: 250000 },
  { label: '₹3L – ₹5L', value: 400000 },
  { label: '₹5L – ₹10L', value: 800000 },
  { label: '₹10L – ₹20L', value: 1500000 },
  { label: '₹20L+', value: 2500000 },
];

const GUEST_OPTIONS = [100, 250, 500, 800, 1200, 2000];

export const EventBuilderForm = () => {
  const router = useRouter();
  const [eventType, setEventType] = useState('Wedding');
  const [city, setCity] = useState('Anantapur');
  const [eventDate, setEventDate] = useState('2026-12-15');
  const [guestCount, setGuestCount] = useState(500);
  const [budget, setBudget] = useState(800000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      eventType,
      city,
      eventDate,
      guestCount: guestCount.toString(),
      budget: budget.toString(),
    });
    router.push(`/my-event?${queryParams.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-zinc-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Celebration Category */}
        <div>
          <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
            What are you celebrating?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = eventType === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setEventType(cat.id)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold text-center transition-all ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border border-zinc-200/80'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          
          {/* Step 2: Location & Date */}
          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Where & When?
            </label>
            <div className="space-y-2">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-900 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="Anantapur">Anantapur (Default)</option>
                <option value="Kurnool">Kurnool</option>
                <option value="Tirupati">Tirupati</option>
              </select>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-900 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Step 3: Guest Count */}
          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              How many guests?
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {GUEST_OPTIONS.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGuestCount(g)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    guestCount === g
                      ? 'border-rose-600 bg-rose-50 text-rose-700'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Budget Range */}
          <div>
            <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              Approximate Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full px-3.5 py-3 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-900 bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              {BUDGET_OPTIONS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-bold shadow-md transition-all"
          >
            Build My Event
          </button>
        </div>

      </form>
    </div>
  );
};
