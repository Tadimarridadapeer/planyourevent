import React from 'react';
import Link from 'next/link';
import { VendorCard } from '@/components/ui/VendorCard';

async function getVendors(searchParams: { [key: string]: string | undefined }) {
  const category = searchParams.category || '';
  const sortBy = searchParams.sortBy || 'recommended';
  const verifiedOnly = searchParams.verifiedOnly === 'true';

  try {
    const query = new URLSearchParams({
      city: 'Anantapur',
      ...(category && { category }),
      ...(sortBy && { sortBy }),
      ...(verifiedOnly && { verifiedOnly: 'true' }),
    });

    const res = await fetch(`http://localhost:4000/api/vendors?${query.toString()}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      return data.items || [];
    }
  } catch (e) {}

  const allVendors = [
    {
      id: 'v1',
      businessName: 'Royal Grand Convention Hall',
      slug: 'royal-grand-convention-hall-anantapur',
      categoryName: 'Venues',
      categorySlug: 'venues',
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
      categorySlug: 'caterers',
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
      categorySlug: 'decorators',
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
      categorySlug: 'photographers',
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
    {
      id: 'v5',
      businessName: 'Ananya Bridal Studio & Makeup',
      slug: 'ananya-bridal-studio-anantapur',
      categoryName: 'Makeup Artists',
      categorySlug: 'makeup-artists',
      city: 'Anantapur',
      address: 'Gulzarpet, Anantapur',
      startingPrice: 18000,
      rating: 4.8,
      reviewCount: 29,
      verified: true,
      featured: false,
      shortDescription: 'HD & Airbrush bridal makeup specialist with traditional saree draping.',
      coverImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800',
    },
  ];

  if (category) {
    return allVendors.filter((v) => v.categorySlug === category || v.categoryName?.toLowerCase() === category.toLowerCase());
  }
  return allVendors;
}

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const vendors = await getVendors(resolvedParams);
  const activeCategory = resolvedParams.category || '';

  const categories = [
    { slug: '', label: 'All Categories' },
    { slug: 'venues', label: 'Venues' },
    { slug: 'photographers', label: 'Photographers' },
    { slug: 'decorators', label: 'Decorators' },
    { slug: 'caterers', label: 'Caterers' },
    { slug: 'makeup-artists', label: 'Makeup Artists' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-rose-600 uppercase tracking-widest">
          Anantapur Vendor Marketplace
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-zinc-950">
          Discover Verified Event Vendors
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl">
          Browse verified function halls, caterers, mandap decorators, and photographers in Anantapur.
        </p>
      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-zinc-200">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((c) => {
            const isActive = activeCategory === c.slug;
            return (
              <Link
                key={c.slug}
                href={c.slug ? `/vendors?category=${c.slug}` : '/vendors'}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-950 text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 font-medium">Sort By:</span>
          <select className="px-3.5 py-2 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-900 bg-zinc-50 focus:outline-none">
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>

      </div>

      {/* Vendors Grid */}
      {vendors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor: any) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 space-y-4">
          <h3 className="font-serif font-bold text-xl text-zinc-950">No vendors found</h3>
          <Link
            href="/vendors"
            className="inline-block px-5 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-bold"
          >
            View All Vendors
          </Link>
        </div>
      )}

    </div>
  );
}
