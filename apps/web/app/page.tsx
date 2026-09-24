import Link from 'next/link';
import { EventBuilderForm } from '@/components/ui/EventBuilderForm';
import { VendorCard } from '@/components/ui/VendorCard';

async function getFeaturedVendors() {
  try {
    const res = await fetch('http://localhost:4000/api/vendors?city=Anantapur&limit=4', {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      return data.items || [];
    }
  } catch (e) {}

  return [
    {
      id: 'v1',
      businessName: 'Royal Grand Convention Hall',
      slug: 'royal-grand-convention-hall-anantapur',
      categoryName: 'Venues',
      city: 'Anantapur',
      address: 'Subash Road, Anantapur',
      startingPrice: 120000,
      rating: 4.8,
      reviewCount: 42,
      verified: true,
      featured: true,
      shortDescription: 'Premium AC Convention Center with 1000+ guest capacity on Subash Road, Anantapur.',
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'v2',
      businessName: 'Rayalaseema Elite Catering',
      slug: 'rayalaseema-elite-catering-anantapur',
      categoryName: 'Caterers',
      city: 'Anantapur',
      address: 'Kamala Nagar, Anantapur',
      startingPrice: 350,
      rating: 4.9,
      reviewCount: 56,
      verified: true,
      featured: true,
      shortDescription: 'Authentic Rayalaseema banana leaf feasts & multi-cuisine buffets in Anantapur.',
      coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'v3',
      businessName: 'Sri Krishna Floral & Mandap Decorators',
      slug: 'sri-krishna-decorators-anantapur',
      categoryName: 'Decorators',
      city: 'Anantapur',
      address: 'RTC Bus Stand Road, Anantapur',
      startingPrice: 45000,
      rating: 4.7,
      reviewCount: 38,
      verified: true,
      featured: true,
      shortDescription: 'Bespoke Telugu mandap setups, floral arches & grand stage backdrops.',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'v4',
      businessName: 'Sri Valli Candid Wedding Photography',
      slug: 'sri-valli-photography-anantapur',
      categoryName: 'Photographers',
      city: 'Anantapur',
      address: 'Bellary Road, Anantapur',
      startingPrice: 65000,
      rating: 4.9,
      reviewCount: 64,
      verified: true,
      featured: true,
      shortDescription: 'Candid wedding stories, 4K cinematic films & drone coverage across Rayalaseema.',
      coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800',
    },
  ];
}

export default async function HomePage() {
  const vendors = await getFeaturedVendors();

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold tracking-wide">
              Anantapur&apos;s Premium Event Marketplace
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              Plan your perfect event.
            </h1>

            <p className="text-base sm:text-xl text-zinc-600 font-normal max-w-2xl mx-auto leading-relaxed">
              Everything you need to celebrate, in one place. Discover, compare, shortlist, and book verified local vendors in Anantapur.
            </p>

            <div className="flex items-center justify-center gap-4 pt-2">
              <Link
                href="/my-event"
                className="px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all"
              >
                Start Planning
              </Link>
              <Link
                href="/vendors"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 font-bold text-xs transition-colors"
              >
                Explore Vendors
              </Link>
            </div>
          </div>

          {/* Interactive Event Builder Workspace Form */}
          <div className="max-w-4xl mx-auto">
            <EventBuilderForm />
          </div>

        </div>
      </section>

      {/* EVENT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
              Celebrations in Anantapur
            </h2>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-950">
              What are you celebrating?
            </h3>
          </div>
          <Link
            href="/vendors"
            className="text-xs font-bold text-zinc-800 hover:text-rose-600 transition-colors"
          >
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Wedding', count: '120+ Vendors', slug: 'wedding' },
            { name: 'Engagement', count: '80+ Vendors', slug: 'engagement' },
            { name: 'Reception', count: '90+ Vendors', slug: 'reception' },
            { name: 'Birthday', count: '65+ Vendors', slug: 'birthday' },
            { name: 'Baby Shower', count: '40+ Vendors', slug: 'baby-shower' },
            { name: 'Housewarming', count: '55+ Vendors', slug: 'housewarming' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/vendors?category=${cat.slug}`}
              className="group p-5 rounded-2xl bg-white border border-zinc-200 hover:border-rose-600 hover:shadow-hover transition-all text-center space-y-2"
            >
              <h4 className="font-serif font-bold text-sm text-zinc-950 group-hover:text-rose-600 transition-colors">
                {cat.name}
              </h4>
              <p className="text-[11px] text-zinc-400 font-medium">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3 SIMPLE STEPS */}
      <section className="bg-zinc-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">
              Simple & Seamless
            </h2>
            <h3 className="font-serif font-bold text-3xl text-white">
              Plan your event in 3 simple steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-serif font-bold text-lg text-white">Choose Your Event</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Select event type in Anantapur, date, estimated guest count, and budget parameters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-serif font-bold text-lg text-white">Get Custom Budget Split</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our Event Builder workspace generates recommended cost allocation across venue, food, decor & photos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-serif font-bold text-lg text-white">Discover & Book Verified Vendors</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Browse hand-picked top vendors in Anantapur, request direct quotes, and lock in your bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED VENDORS IN ANANTAPUR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
              100% Verified Local Businesses
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-950">
              Featured Vendors in Anantapur
            </h3>
          </div>
          <Link
            href="/vendors"
            className="text-xs font-bold text-zinc-800 hover:text-rose-600 transition-colors"
          >
            Explore All Vendors &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor: any) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* INSPIRATION HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              Event Inspiration
            </span>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
              Minimal Telugu Wedding Setup in Anantapur
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Looking for traditional Telugu mandaps, marigold entries, and banana leaf dining setups? Explore curated inspiration boards built for Rayalaseema weddings.
            </p>
            <div className="text-xs font-bold text-rose-400 pt-1">
              Estimated: ₹2.5L – ₹4L &bull; Anantapur Venues
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/my-event?eventType=Wedding&budget=350000"
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs text-center transition-colors shadow-md"
            >
              Build This Event
            </Link>
            <Link
              href="/inspiration"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs text-center border border-zinc-800 transition-colors"
            >
              Browse Inspiration
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-zinc-950 mb-2">
            Why people in Anantapur trust PlanMyEvent
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500">
            We operate as a managed marketplace. Every business is personally verified in Anantapur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-2">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">Personally Verified</div>
            <h4 className="font-serif font-bold text-base text-zinc-950">Local Verification</h4>
            <p className="text-xs text-zinc-500">
              Our team inspects convention halls, meets caterers, and verifies physical addresses in Anantapur.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-2">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">Direct Quotes</div>
            <h4 className="font-serif font-bold text-base text-zinc-950">Managed Quotes</h4>
            <p className="text-xs text-zinc-500">
              Submit requirements once, receive transparent quote options directly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-2">
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">Event System</div>
            <h4 className="font-serif font-bold text-base text-zinc-950">Complete Workspace</h4>
            <p className="text-xs text-zinc-500">
              Track tasks and manage budget allocations inside your `/my-event` command center.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
