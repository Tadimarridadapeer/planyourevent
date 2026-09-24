import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function InspirationPage() {
  const items = [
    {
      id: 'i1',
      title: 'Minimal Telugu Mandap Setup',
      category: 'Wedding',
      estimatedBudget: '₹2.5L – ₹4.0L',
      location: 'Subash Road, Anantapur',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      description: 'Marigold entrance arches, banana leaf traditional mandap setup with warm ambient lighting.',
      budgetVal: 350000,
    },
    {
      id: 'i2',
      title: 'Rayalaseema Grand Wedding Banquet Feast',
      category: 'Catering',
      estimatedBudget: '₹350 / Plate',
      location: 'Kamala Nagar, Anantapur',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
      description: 'Traditional 14-item Andhra banana leaf meal featuring Gongura chutney, Pachi Pulusu, and sweet bobbatlu.',
      budgetVal: 500000,
    },
    {
      id: 'i3',
      title: 'Golden Sunset Pre-Wedding Shoot',
      category: 'Photography',
      estimatedBudget: '₹65,000 – ₹1.2L',
      location: 'Gooty Fort / Penukonda, Anantapur',
      imageUrl: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800',
      description: 'Cinematic golden hour portraits captured at historical heritage spots near Anantapur district.',
      budgetVal: 80000,
    },
    {
      id: 'i4',
      title: 'Traditional Seemantham Baby Shower Floral Arch',
      category: 'Baby Shower',
      estimatedBudget: '₹35,000 – ₹60,000',
      location: 'Bellary Road, Anantapur',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
      description: 'Jasmine and marigold floral backdrops designed for cradle ceremonies and Srimantham functions.',
      budgetVal: 45000,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-rose-600 uppercase tracking-widest">
          Visual Inspiration Gallery
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-zinc-950">
          Celebration Ideas in Anantapur
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl">
          Discover Telugu wedding decor, mandap themes, and catering setups. Click &quot;Build This Event&quot; to launch your plan.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-card hover:shadow-hover transition-all flex flex-col justify-between"
          >
            <div className="relative h-64 w-full bg-zinc-100 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl text-zinc-950 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
                <div className="flex items-center gap-3 text-xs font-semibold text-zinc-700 pt-1">
                  <span className="text-rose-600 font-bold">{item.estimatedBudget}</span>
                  <span>&bull;</span>
                  <span className="text-zinc-500">{item.location}</span>
                </div>
              </div>

              {/* Build This Event CTA */}
              <div className="pt-4 border-t border-zinc-100">
                <Link
                  href={`/my-event?eventType=${item.category}&budget=${item.budgetVal}`}
                  className="w-full py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs text-center shadow-md transition-all block"
                >
                  Build This Event
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
