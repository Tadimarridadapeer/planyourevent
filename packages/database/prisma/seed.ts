import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process for PlanMyEvent (Anantapur)...');

  // 1. Seed Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@planmyevent.com' },
    update: {},
    create: {
      name: 'PlanMyEvent Admin',
      email: 'admin@planmyevent.com',
      phone: '+919876543210',
      role: 'ADMIN',
      passwordHash: 'admin123', // In production, bcrypt hash
    },
  });
  console.log(`Admin user created: ${adminUser.email}`);

  // 2. Seed Location: Anantapur
  const anantapurLocation = await prisma.location.create({
    data: {
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Anantapur',
      city: 'Anantapur',
      citySlug: 'anantapur',
      area: 'Kamala Nagar',
      pincode: '515001',
      isPopular: true,
    },
  });

  const areas = ['Tower Clock Area', 'RTC Bus Stand Road', 'Subash Road', 'Bellary Road', 'Gulzarpet', 'Syndicate Nagar'];
  for (const area of areas) {
    await prisma.location.create({
      data: {
        country: 'India',
        state: 'Andhra Pradesh',
        district: 'Anantapur',
        city: 'Anantapur',
        citySlug: 'anantapur',
        area,
        pincode: '515001',
        isPopular: false,
      },
    });
  }
  console.log('Anantapur location hierarchy created.');

  // 3. Event Categories
  const eventCats = [
    { name: 'Wedding', slug: 'wedding', icon: 'HeartHandshake', description: 'Complete grand wedding setup & coordination' },
    { name: 'Engagement', slug: 'engagement', icon: 'Sparkles', description: 'Rings, decor, catering & photography' },
    { name: 'Reception', slug: 'reception', icon: 'GlassWater', description: 'Grand stage setups, food courts & entertainment' },
    { name: 'Birthday', slug: 'birthday', icon: 'Cake', description: 'Theme decorations, kids activities & return gifts' },
    { name: 'Anniversary', slug: 'anniversary', icon: 'Wine', description: 'Intimate to grand romantic celebrations' },
    { name: 'Baby Shower', slug: 'baby-shower', icon: 'Baby', description: 'Seemantham / Srimantham traditional decor' },
    { name: 'Naming Ceremony', slug: 'naming-ceremony', icon: 'Smile', description: 'Cradle ceremony setups & traditional purohit services' },
    { name: 'Housewarming', slug: 'housewarming', icon: 'Home', description: 'Gruhapravesam rituals, catering & floral entry' },
    { name: 'Religious Event', slug: 'religious-event', icon: 'Flame', description: 'Pooja mandates, purohits & traditional meals' },
    { name: 'Private Party', slug: 'private-party', icon: 'PartyPopper', description: 'DJs, sound equipment & lounge styling' },
    { name: 'College Event', slug: 'college-event', icon: 'GraduationCap', description: 'Fest stages, LED walls & anchor management' },
    { name: 'Corporate Event', slug: 'corporate-event', icon: 'Briefcase', description: 'Seminars, product launches & corporate dining' },
    { name: 'Other Celebration', slug: 'other-celebration', icon: 'Smile', description: 'Custom event requirements' },
  ];

  for (let i = 0; i < eventCats.length; i++) {
    await prisma.eventCategory.upsert({
      where: { slug: eventCats[i].slug },
      update: {},
      create: { ...eventCats[i], sortOrder: i },
    });
  }
  console.log('Event categories seeded.');

  // 4. Vendor Categories
  const vendorCats = [
    { name: 'Venues', slug: 'venues', icon: 'Building2', description: 'Function halls, AC convention centers & open lawns' },
    { name: 'Photographers', slug: 'photographers', icon: 'Camera', description: 'Candid wedding photography & traditional shoots' },
    { name: 'Videographers', slug: 'videographers', icon: 'Video', description: 'Cinematic teasers, 4K video & live broadcasting' },
    { name: 'Decorators', slug: 'decorators', icon: 'Flower2', description: 'Mandap decor, stage backdrops, LED & entry arches' },
    { name: 'Caterers', slug: 'caterers', icon: 'Utensils', description: 'Traditional South Indian thali & multi-cuisine buffets' },
    { name: 'Makeup Artists', slug: 'makeup-artists', icon: 'Palette', description: 'Bridal HD makeup, hair styling & saree draping' },
    { name: 'Mehendi Artists', slug: 'mehendi-artists', icon: 'Brush', description: 'Traditional Telugu bridal mehendi designs' },
    { name: 'DJs', slug: 'djs', icon: 'Music', description: 'High bass sound systems, lighting & DJ sets' },
    { name: 'Musicians', slug: 'musicians', icon: 'Music2', description: 'Nadaswaram teams, live bands & classical instrumental' },
    { name: 'Anchors', slug: 'anchors', icon: 'Mic', description: 'Professional emcees & event hosts' },
    { name: 'Event Planners', slug: 'event-planners', icon: 'ClipboardList', description: 'End-to-end event management & coordination' },
    { name: 'Wedding Cars', slug: 'wedding-cars', icon: 'Car', description: 'Luxury decorated cars for bride & groom' },
    { name: 'Invitation Designers', slug: 'invitation-designers', icon: 'Mail', description: 'Digital e-invites & premium printed cards' },
    { name: 'Return Gifts', slug: 'return-gifts', icon: 'Gift', description: 'Customized hampers & traditional return gifts' },
    { name: 'Purohits', slug: 'purohits', icon: 'Flame', description: 'Experienced Vedic purohits for all Hindu rituals' },
  ];

  const categoryMap: Record<string, string> = {};
  for (let i = 0; i < vendorCats.length; i++) {
    const created = await prisma.vendorCategory.upsert({
      where: { slug: vendorCats[i].slug },
      update: {},
      create: { ...vendorCats[i], sortOrder: i },
    });
    categoryMap[vendorCats[i].slug] = created.id;
  }
  console.log('Vendor categories seeded.');

  // 5. Verified Anantapur Demo Vendors
  const demoVendors = [
    {
      businessName: 'Royal Grand Convention Hall',
      slug: 'royal-grand-convention-hall-anantapur',
      categorySlug: 'venues',
      shortDescription: 'Premium AC Convention Center with 1000+ guest capacity on Subash Road, Anantapur.',
      description: 'Royal Grand Convention Hall is Anantapur\'s premier venue for grand weddings, receptions, and corporate conferences. Features central air conditioning, dining capacity for 600 people simultaneously, 10 luxury green rooms, and ample parking space.',
      address: 'Subash Road, Near Clock Tower, Anantapur',
      startingPrice: 120000,
      rating: 4.8,
      reviewCount: 42,
      phone: '+919440112233',
      email: 'royalgrandatp@gmail.com',
      verified: true,
      verifiedLevel: 'PREMIUM' as const,
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
    },
    {
      businessName: 'Rayalaseema Elite Catering',
      slug: 'rayalaseema-elite-catering-anantapur',
      categorySlug: 'caterers',
      shortDescription: 'Authentic Andhra wedding feasts & multi-cuisine catering in Anantapur.',
      description: 'Specializing in traditional Rayalaseema banana leaf feasts, North Indian buffets, and live chat counters. Serving delicious hygienic food with custom menu selections for 100 to 5000 guests.',
      address: 'Kamala Nagar, Anantapur',
      startingPrice: 350, // Per plate
      rating: 4.9,
      reviewCount: 56,
      phone: '+919440889900',
      email: 'rayalaseemaelite@gmail.com',
      verified: true,
      verifiedLevel: 'FEATURED' as const,
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200',
    },
    {
      businessName: 'Sri Krishna Floral & Mandap Decorators',
      slug: 'sri-krishna-decorators-anantapur',
      categorySlug: 'decorators',
      shortDescription: 'Bespoke Telugu mandap setups, royal entrance arches & LED lighting.',
      description: 'Transforming wedding spaces with fresh flower mandaps, thematic entrance arches, hydraulic stages, and ambient lighting. Serving all major function halls in Anantapur district.',
      address: 'RTC Bus Stand Road, Anantapur',
      startingPrice: 45000,
      rating: 4.7,
      reviewCount: 38,
      phone: '+919849223344',
      email: 'srikrishnadecoratp@gmail.com',
      verified: true,
      verifiedLevel: 'VERIFIED' as const,
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    },
    {
      businessName: 'Sri Valli Candid Wedding Photography',
      slug: 'sri-valli-photography-anantapur',
      categorySlug: 'photographers',
      shortDescription: 'Award-winning candid photography, pre-wedding shoots & 4K cinematic films.',
      description: 'Capturing pure emotions across wedding stories in Anantapur & Rayalaseema. Equipment includes Sony FX3 cinematic cameras, DJI Mavic drones, and professional studio lighting setups.',
      address: 'Bellary Road, Anantapur',
      startingPrice: 65000,
      rating: 4.9,
      reviewCount: 64,
      phone: '+919989001122',
      email: 'srivalliphotos@gmail.com',
      verified: true,
      verifiedLevel: 'PREMIUM' as const,
      featured: true,
      coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1200',
    },
    {
      businessName: 'Ananya Bridal Studio & Makeup',
      slug: 'ananya-bridal-studio-anantapur',
      categorySlug: 'makeup-artists',
      shortDescription: 'HD & Airbrush bridal makeup specialist with traditional saree draping.',
      description: 'Certified Mac & Kryolan bridal specialist. Customized makeup trials, muhurtham looks, reception glam, and bridesmaid packages in Anantapur.',
      address: 'Gulzarpet, Anantapur',
      startingPrice: 18000,
      rating: 4.8,
      reviewCount: 29,
      phone: '+919701556677',
      email: 'ananyamakeupatp@gmail.com',
      verified: true,
      verifiedLevel: 'VERIFIED' as const,
      featured: false,
      coverImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1200',
    }
  ];

  for (const v of demoVendors) {
    const categoryId = categoryMap[v.categorySlug];
    if (!categoryId) continue;

    const vendor = await prisma.vendor.upsert({
      where: { slug: v.slug },
      update: {},
      create: {
        businessName: v.businessName,
        slug: v.slug,
        categoryId,
        shortDescription: v.shortDescription,
        description: v.description,
        address: v.address,
        startingPrice: v.startingPrice,
        rating: v.rating,
        reviewCount: v.reviewCount,
        phone: v.phone,
        email: v.email,
        verified: v.verified,
        verifiedLevel: v.verifiedLevel,
        featured: v.featured,
        coverImage: v.coverImage,
        city: 'Anantapur',
        state: 'Andhra Pradesh',
        locationId: anantapurLocation.id,
      },
    });

    // Packages for vendor
    await prisma.vendorPackage.createMany({
      data: [
        {
          vendorId: vendor.id,
          name: 'Basic Package',
          description: 'Essential service package suitable for intimate celebrations',
          price: v.startingPrice,
          duration: '1 Day',
          sortOrder: 1,
        },
        {
          vendorId: vendor.id,
          name: 'Premium Package',
          description: 'Complete end-to-end service package with added deliverables',
          price: Math.round(v.startingPrice * 1.8),
          duration: '2 Days',
          sortOrder: 2,
        }
      ]
    });

    // Reviews for vendor
    await prisma.vendorReview.create({
      data: {
        vendorId: vendor.id,
        reviewerName: 'Ramesh Reddy',
        rating: 5.0,
        reviewText: 'Outstanding service for my sister\'s wedding in Anantapur. Very professional and prompt timing!',
        verifiedPurchase: true,
        status: 'APPROVED',
      }
    });
  }

  console.log('Demo vendors with packages and reviews seeded successfully.');
  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
