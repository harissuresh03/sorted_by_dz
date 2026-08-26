export const config = { whatsapp: '60123456789', email: 'hello@sortedbydz.com', area: 'Malaysia' };

const services = (items: string[]) =>
  items.map((name) => ({
    name,
    slug: name
      .toLowerCase()
      .replace(/360°/g, '360')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
  }));

export const categories = [
  {
    slug: 'events-and-weddings',
    name: 'Events and Weddings',
    desc: 'The people and details behind a good gathering, from the first vendor to the final dance.',
    items: services([
      'Photography',
      'Videography',
      '360° Camera Booth',
      'Event and wedding decoration',
      'DJs and entertainers',
      'Live bands and singers',
      'Catering',
      'Cakes and desserts',
      'Licensed beverage supply',
      'Tables, chairs and canopy rental',
      'Bridal makeup and hairstyling',
    ]),
  },
  {
    slug: 'nightlife',
    name: 'Nightlife',
    desc: 'A smoother night out, with the table, guest list, and entertainment already sorted.',
    items: services([
      'Club table reservations',
      'Guest-list arrangements',
      'Promoters and ambassadors',
      'DJs and nightlife entertainers',
    ]),
  },
  {
    slug: 'marketing-and-digital',
    name: 'Marketing and Digital',
    desc: 'Practical creative and digital support for a brand or business that needs to move.',
    items: services([
      'Logo design',
      'Posters and flyers',
      'Social-media content creation',
      'Social-media management',
      'Product photography',
      'Video editing',
      'Influencer marketing',
      'Website development',
    ]),
  },
  {
    slug: 'home-and-moving',
    name: 'Home and Moving',
    desc: 'A more comfortable, better-kept space, and reliable hands when it is time to move.',
    items: services([
      'Movers and lorry rental',
      'Air-conditioning servicing',
      'Plumbing',
      'Electrical work',
      'Painting',
      'Interior design',
    ]),
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    desc: 'Keeping your car running well and looking its best, without the runaround.',
    items: services(['Car servicing', 'Car detailing', 'Car painting and body repair']),
  },
  {
    slug: 'personal-and-learning',
    name: 'Personal and Learning',
    desc: 'Time and attention matched to what you or your family are working on.',
    items: services(['Personal trainers', 'Tailoring and clothing alterations', 'Private tuition']),
  },
  {
    slug: 'travel',
    name: 'Travel',
    desc: 'A trip that is planned well before it begins, from flights to the last day.',
    items: services([
      'Flights and accommodation assistance',
      'Airport transportation',
      'Tour guides',
      'Itinerary planning',
      'Group tours',
    ]),
  },
];

// Manually curated for the homepage "Featured services" section.
// Reorder or swap these freely — each just references a category + service slug above.
const featuredServiceRefs: { categorySlug: string; serviceSlug: string }[] = [
  { categorySlug: 'events-and-weddings', serviceSlug: 'photography' },
  { categorySlug: 'events-and-weddings', serviceSlug: 'event-and-wedding-decoration' },
  { categorySlug: 'marketing-and-digital', serviceSlug: 'website-development' },
  { categorySlug: 'home-and-moving', serviceSlug: 'movers-and-lorry-rental' },
  { categorySlug: 'automotive', serviceSlug: 'car-detailing' },
  { categorySlug: 'personal-and-learning', serviceSlug: 'private-tuition' },
];

export function getFeaturedServices() {
  return featuredServiceRefs
    .map(({ categorySlug, serviceSlug }) => {
      const category = categories.find((c) => c.slug === categorySlug);
      const service = category?.items.find((i) => i.slug === serviceSlug);
      if (!category || !service) return null;
      return { ...service, categorySlug: category.slug, categoryName: category.name };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}
