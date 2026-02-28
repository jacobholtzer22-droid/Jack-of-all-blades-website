export interface ServiceArea {
  slug: string;
  name: string;
  displayName: string; // e.g. "Wyoming (MI)"
  description: string;
  metaTitle: string;
  metaDescription: string;
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "east-grand-rapids",
    name: "East Grand Rapids",
    displayName: "East Grand Rapids",
    description:
      "East Grand Rapids is home to some of West Michigan's most beautiful neighborhoods and well-maintained properties. We're proud to serve homeowners and businesses throughout East Grand Rapids with professional landscaping that matches the high standards of this community. From manicured lawns along Reeds Lake to custom hardscaping in Gaslight Village, we bring the same attention to detail that defines this area.",
    metaTitle: "Landscaping & Lawn Care East Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Professional landscaping, lawn care, hardscaping & tree services in East Grand Rapids, MI. Fully bonded. Free estimates. Call 616-250-8044.",
  },
  {
    slug: "grand-rapids",
    name: "Grand Rapids",
    displayName: "Grand Rapids",
    description:
      "As West Michigan's largest city, Grand Rapids has diverse neighborhoods and property types that deserve top-quality landscaping care. We serve residential and commercial clients throughout Grand Rapids with comprehensive lawn care, hardscaping, snow removal, and tree services. Whether you're in Heritage Hill, East Hills, or anywhere in between, our team delivers reliable, professional service you can count on.",
    metaTitle: "Landscaping & Lawn Care Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Professional landscaping, lawn care, hardscaping & tree services in Grand Rapids, MI. Serving all neighborhoods. Free estimates. Call 616-250-8044.",
  },
  {
    slug: "kentwood",
    name: "Kentwood",
    displayName: "Kentwood",
    description:
      "Kentwood's growing community deserves landscaping services that enhance curb appeal and property value. We serve homeowners and businesses throughout Kentwood with expert lawn care, seasonal cleanups, hardscape installation, and tree trimming. Our team understands the unique needs of Kentwood properties and delivers consistent, high-quality results season after season.",
    metaTitle: "Landscaping & Lawn Care Kentwood MI | Jack of All Blades",
    metaDescription:
      "Professional landscaping, lawn care, hardscaping & tree services in Kentwood, MI. Fully bonded. Free estimates. Call 616-250-8044.",
  },
  {
    slug: "wyoming-mi",
    name: "Wyoming",
    displayName: "Wyoming (MI)",
    description:
      "Wyoming is one of West Michigan's largest cities, and we're honored to serve its diverse residential and commercial properties. From routine lawn maintenance to complete landscape renovations, our team provides Wyoming residents with the same dedication and craftsmanship we're known for across the region. We handle everything from spring cleanup to snow removal, keeping your Wyoming property looking its best year-round.",
    metaTitle: "Landscaping & Lawn Care Wyoming MI | Jack of All Blades",
    metaDescription:
      "Professional landscaping, lawn care, hardscaping & tree services in Wyoming, MI. Fully bonded. Free estimates. Call 616-250-8044.",
  },
  {
    slug: "ada",
    name: "Ada",
    displayName: "Ada",
    description:
      "Ada's mix of rural charm and suburban sophistication calls for landscaping that honors both. We serve Ada homeowners with custom landscape design, premium lawn care, and hardscaping that complements the natural beauty of the Thornapple River area. Whether you have a sprawling estate or a cozy lot, we bring the expertise and attention to detail that Ada properties deserve.",
    metaTitle: "Landscaping & Lawn Care Ada MI | Jack of All Blades",
    metaDescription:
      "Professional landscaping, lawn care, hardscaping & tree services in Ada, MI. Serving the Thornapple River area. Free estimates. Call 616-250-8044.",
  },
  {
    slug: "cascade",
    name: "Cascade",
    displayName: "Cascade",
    description:
      "Cascade Township is known for its well-kept neighborhoods and scenic landscapes. We're proud to serve Cascade homeowners with professional lawn care, landscape design, hardscaping, and tree services. Our team understands the expectations of Cascade residents and delivers the polished, reliable service that keeps properties looking pristine throughout every season.",
    metaTitle: "Landscaping & Lawn Care Cascade MI | Jack of All Blades",
    metaDescription:
      "Professional landscaping, lawn care, hardscaping & tree services in Cascade, MI. Fully bonded. Free estimates. Call 616-250-8044.",
  },
];

export const ALL_SERVICE_AREAS = [
  "East Grand Rapids",
  "Grand Rapids",
  "Kentwood",
  "Wyoming (MI)",
  "Walker",
  "Byron Center",
  "Grandville",
  "Cascade",
  "Ada",
  "Rockford",
  "Comstock Park",
  "Forest Hills",
  "Caledonia",
  "Jenison",
  "Hudsonville",
  "Alto",
] as const;

// Areas that have dedicated service area pages
export const SERVICE_AREA_SLUGS = [
  "east-grand-rapids",
  "grand-rapids",
  "kentwood",
  "wyoming-mi",
  "ada",
  "cascade",
] as const;

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}

export function getContactLinkForArea(displayName: string): string {
  const encoded = encodeURIComponent(displayName.replace(/ \(MI\)$/, ""));
  return `/contact?area=${encoded}`;
}

export function getServiceAreaLink(displayName: string): string {
  const normalized = displayName.replace(/ \(MI\)$/, "");
  const area = SERVICE_AREAS.find(
    (a) => a.displayName === displayName || a.name === normalized
  );
  if (area) return `/service-areas/${area.slug}`;
  return getContactLinkForArea(displayName);
}
