import type { LucideIcon } from "lucide-react";
import {
  Leaf,
  Flower2,
  Layers,
  Snowflake,
  Scissors,
  CloudRain,
  Shrub,
  TreePine,
} from "lucide-react";

export interface Service {
  slug: string;
  name: string; // exactly the homepage name
  shortName?: string; // for nav if name is long
  icon: LucideIcon;
  image: string; // existing /images/ path
  alt: string;
  cardDescription: string; // the current homepage card copy, verbatim
  intro: string; // 2 to 3 sentences, names JOAB + Grand Rapids, facts only
  included: string[]; // bullets lifted from existing copy
  faqs: { q: string; a: string }[]; // answerable from verified facts only
  metaTitle: string; // <= 60 chars
  metaDescription: string; // 140 to 160
  areas: string[]; // the existing per-card area list
}

const SERVED_AREAS_SENTENCE =
  "We serve Grand Rapids, East Grand Rapids, Kentwood, Wyoming, Ada, Cascade and communities across West Michigan.";

export const SERVICES: Service[] = [
  {
    slug: "lawn-care",
    name: "Lawn Care",
    icon: Leaf,
    image: "/images/IMG_5510.webp",
    alt: "Weekly lawn mowing and maintenance service East Grand Rapids MI",
    cardDescription:
      "Keep your property looking pristine all season long. Our comprehensive lawn care includes weekly mowing, precision edging, trimming, and thorough cleanup. We maintain consistent schedules and pay attention to every detail so your yard always makes a great impression.",
    intro:
      "Jack of All Blades keeps Grand Rapids lawns looking their best all season long. Our lawn care covers weekly mowing, precision edging, trimming, and thorough cleanup for both residential and commercial properties, with consistent schedules you can count on. We offer free, no-obligation on-site estimates across Grand Rapids and West Michigan.",
    included: [
      "Weekly mowing",
      "Precision edging",
      "Trimming",
      "Thorough cleanup",
      "Consistent, reliable schedules",
    ],
    faqs: [
      {
        q: "Do you offer free estimates for lawn care?",
        a: "Yes. Jack of All Blades provides free, no-obligation on-site estimates for lawn care across Grand Rapids and West Michigan.",
      },
      {
        q: "Do you handle both residential and commercial lawns?",
        a: "Yes. We maintain both residential and commercial properties throughout the Grand Rapids area.",
      },
      {
        q: "Which areas do you serve for lawn care?",
        a: SERVED_AREAS_SENTENCE,
      },
      {
        q: "Are you a bonded company?",
        a: "Yes. Jack of All Blades is fully bonded, with 8+ years serving West Michigan.",
      },
    ],
    metaTitle: "Lawn Care Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Weekly lawn mowing, edging, trimming and cleanup in Grand Rapids & West Michigan from Jack of All Blades. Residential & commercial. Free estimates. 616-250-8044",
    areas: ["East Grand Rapids", "Grand Rapids", "Kentwood", "Cascade"],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    icon: Flower2,
    image: "/images/IMG_0250.webp",
    alt: "Hillside landscape with mulch, new plantings, stone border, and timber retaining wall East Grand Rapids Michigan",
    cardDescription:
      "Transform your outdoor space with custom landscape design and installation. From fresh mulch and seasonal plantings to complete landscape renovations, we create beautiful, functional spaces that boost your property's curb appeal and value.",
    intro:
      "Jack of All Blades designs and installs custom landscapes across Grand Rapids and West Michigan. From fresh mulch and seasonal plantings to complete landscape renovations, we create beautiful, functional spaces that boost your property's curb appeal and value. Fully bonded, with free on-site estimates for homes and businesses.",
    included: [
      "Custom landscape design",
      "Landscape installation",
      "Fresh mulch",
      "Seasonal plantings",
      "Complete landscape renovations",
    ],
    faqs: [
      {
        q: "Do you offer free landscaping estimates?",
        a: "Yes. We provide free, no-obligation on-site estimates for landscaping throughout Grand Rapids and West Michigan.",
      },
      {
        q: "Do you work on both homes and businesses?",
        a: "Yes. Jack of All Blades handles both residential and commercial landscaping across the Grand Rapids area.",
      },
      {
        q: "Which areas do you serve for landscaping?",
        a: SERVED_AREAS_SENTENCE,
      },
    ],
    metaTitle: "Landscaping Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Custom landscape design, mulch, plantings and renovations in Grand Rapids & West Michigan by Jack of All Blades. Fully bonded. Free estimates. Call 616-250-8044",
    areas: ["East Grand Rapids", "Ada", "Forest Hills", "Cascade"],
  },
  {
    slug: "hardscaping",
    name: "Hardscaping",
    icon: Layers,
    image: "/images/front-yard-patio-hardscape.webp",
    alt: "Front yard brick patio with stone retaining wall and flowering tree Grand Rapids Michigan",
    cardDescription:
      "Add lasting beauty and structure with professional hardscape installation. We build custom patios, walkways, retaining walls, and stone features using quality materials and expert craftsmanship. Every project is built to withstand Michigan's seasons.",
    intro:
      "Jack of All Blades builds custom patios, walkways, retaining walls, and stone features throughout Grand Rapids and West Michigan. Every hardscape is built with quality materials and expert craftsmanship to withstand Michigan's seasons. We offer free on-site estimates for residential and commercial projects.",
    included: [
      "Custom patios",
      "Walkways",
      "Retaining walls",
      "Stone features",
      "Built to withstand Michigan's seasons",
    ],
    faqs: [
      {
        q: "Do you offer free estimates for hardscaping?",
        a: "Yes. Jack of All Blades provides free, no-obligation on-site estimates for patios, walkways and retaining walls across Grand Rapids and West Michigan.",
      },
      {
        q: "Do you build hardscapes for businesses as well as homes?",
        a: "Yes. We take on both residential and commercial hardscaping in the Grand Rapids area.",
      },
      {
        q: "Which areas do you serve for hardscaping?",
        a: SERVED_AREAS_SENTENCE,
      },
    ],
    metaTitle: "Hardscaping Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Custom patios, walkways, retaining walls and stone features in Grand Rapids & West Michigan by Jack of All Blades. Free on-site estimates. Call 616-250-8044",
    areas: ["East Grand Rapids", "Grand Rapids", "Wyoming", "Ada"],
  },
  {
    slug: "snow-removal",
    name: "Snow Removal",
    icon: Snowflake,
    image: "/images/snow-removal-truck.webp",
    alt: "Commercial and residential snow removal service East Grand Rapids MI",
    cardDescription:
      "Don't let Michigan winters slow you down. Our reliable snow removal services include plowing, salting, ice management, and sidewalk clearing for both residential and commercial properties. Contract-based service with guaranteed response times.",
    intro:
      "Jack of All Blades keeps Grand Rapids properties clear through Michigan winters. Our snow removal includes plowing, salting, ice management, and sidewalk clearing for both residential and commercial properties, on contract-based service with guaranteed response times. Free on-site estimates across Grand Rapids and West Michigan.",
    included: [
      "Plowing",
      "Salting",
      "Ice management",
      "Sidewalk clearing",
      "Contract-based service",
      "Guaranteed response times",
    ],
    faqs: [
      {
        q: "Is your snow removal contract-based?",
        a: "Yes. Our snow removal is contract-based with guaranteed response times for both residential and commercial properties.",
      },
      {
        q: "Do you offer free estimates for snow removal?",
        a: "Yes. Jack of All Blades provides free, no-obligation on-site estimates for snow removal across Grand Rapids and West Michigan.",
      },
      {
        q: "Which areas do you cover for snow removal?",
        a: SERVED_AREAS_SENTENCE,
      },
    ],
    metaTitle: "Snow Removal Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Contract snow plowing, salting and sidewalk clearing in Grand Rapids & West Michigan with guaranteed response times. Residential & commercial. Call 616-250-8044",
    areas: ["East Grand Rapids", "Grand Rapids", "Kentwood", "Grandville"],
  },
  {
    slug: "seasonal-cleanup",
    name: "Seasonal Cleanup",
    icon: Scissors,
    image: "/images/IMG_7394-preview.webp",
    alt: "Fall and spring yard cleanup service East Grand Rapids Michigan",
    cardDescription:
      "Prepare your property for every season with our thorough cleanup services. Spring and fall cleanups include leaf removal, garden bed clearing, perennial cutbacks, debris removal, and complete yard detailing to keep your landscape healthy year-round.",
    intro:
      "Jack of All Blades prepares Grand Rapids properties for every season. Our spring and fall cleanups include leaf removal, garden bed clearing, perennial cutbacks, debris removal, and complete yard detailing to keep your landscape healthy year-round. We serve residential and commercial properties with free on-site estimates across Grand Rapids and West Michigan.",
    included: [
      "Leaf removal",
      "Garden bed clearing",
      "Perennial cutbacks",
      "Debris removal",
      "Complete yard detailing",
    ],
    faqs: [
      {
        q: "Do you offer free estimates for seasonal cleanup?",
        a: "Yes. We provide free, no-obligation on-site estimates for spring and fall cleanups throughout Grand Rapids and West Michigan.",
      },
      {
        q: "Do you handle both residential and commercial cleanups?",
        a: "Yes. Jack of All Blades serves both homes and businesses in the Grand Rapids area.",
      },
      {
        q: "Which areas do you serve for seasonal cleanup?",
        a: SERVED_AREAS_SENTENCE,
      },
    ],
    metaTitle: "Seasonal Cleanup Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Spring and fall yard cleanups in Grand Rapids & West Michigan: leaf removal, bed clearing, cutbacks and detailing. Residential & commercial. Call 616-250-8044",
    areas: ["East Grand Rapids", "Kentwood", "Walker", "Cascade"],
  },
  {
    slug: "storm-cleanup",
    name: "Storm Clean Up",
    icon: CloudRain,
    image: "/images/tree-trimming-chainsaw.webp",
    alt: "Storm damage and debris cleanup service East Grand Rapids Michigan",
    cardDescription:
      "After severe weather, we're here to help restore your property. Our storm clean up services include branch and debris removal, downed limb cleanup, and yard restoration so you can get back to normal quickly and safely.",
    intro:
      "After severe weather, Jack of All Blades helps Grand Rapids property owners restore their yards. Our storm clean up covers branch and debris removal, downed limb cleanup, and yard restoration so you can get back to normal quickly and safely. We offer free on-site estimates across Grand Rapids and West Michigan.",
    included: [
      "Branch removal",
      "Debris removal",
      "Downed limb cleanup",
      "Yard restoration",
    ],
    faqs: [
      {
        q: "Do you offer free estimates for storm clean up?",
        a: "Yes. Jack of All Blades provides free, no-obligation on-site estimates for storm clean up across Grand Rapids and West Michigan.",
      },
      {
        q: "Do you clean up storm damage for businesses too?",
        a: "Yes. We handle both residential and commercial storm clean up in the Grand Rapids area.",
      },
      {
        q: "Which areas do you serve for storm clean up?",
        a: SERVED_AREAS_SENTENCE,
      },
    ],
    metaTitle: "Storm Clean Up Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Storm clean up in Grand Rapids & West Michigan: branch and debris removal, downed limb cleanup and yard restoration by Jack of All Blades. Call 616-250-8044",
    areas: ["East Grand Rapids", "Grand Rapids", "Kentwood", "Cascade"],
  },
  {
    slug: "hedge-and-bush-trimming",
    name: "Hedge and Bush Trimming",
    shortName: "Hedge & Bush Trimming",
    icon: Shrub,
    image: "/images/IMG_4267.webp",
    alt: "Professional hedge and bush trimming service East Grand Rapids MI",
    cardDescription:
      "Keep your hedges and shrubs looking sharp and healthy. We provide precise shaping, pruning, and trimming for foundation plantings, privacy hedges, and ornamental bushes. Clean, even cuts that promote growth and enhance your property's curb appeal.",
    intro:
      "Jack of All Blades keeps hedges and shrubs sharp and healthy across Grand Rapids and West Michigan. We provide precise shaping, pruning, and trimming for foundation plantings, privacy hedges, and ornamental bushes, with clean, even cuts that promote growth and enhance curb appeal. Free on-site estimates for residential and commercial properties.",
    included: [
      "Precise shaping",
      "Pruning",
      "Hedge and shrub trimming",
      "Foundation plantings",
      "Privacy hedges",
      "Ornamental bushes",
    ],
    faqs: [
      {
        q: "Do you offer free estimates for hedge and bush trimming?",
        a: "Yes. We provide free, no-obligation on-site estimates for hedge and bush trimming across Grand Rapids and West Michigan.",
      },
      {
        q: "Do you trim hedges for commercial properties?",
        a: "Yes. Jack of All Blades serves both residential and commercial properties in the Grand Rapids area.",
      },
      {
        q: "Which areas do you serve for hedge and bush trimming?",
        a: SERVED_AREAS_SENTENCE,
      },
    ],
    metaTitle: "Hedge & Bush Trimming Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Hedge and bush trimming in Grand Rapids & West Michigan: precise shaping, pruning and clean cuts for homes and businesses by Jack of All Blades. Call 616-250-8044",
    areas: ["East Grand Rapids", "Grand Rapids", "Kentwood", "Cascade"],
  },
  {
    slug: "tree-trimming-and-removal",
    name: "Tree Trimming / Removal",
    shortName: "Tree Trimming & Removal",
    icon: TreePine,
    image: "/images/tree-removal-truck.webp",
    alt: "Professional tree trimming and removal service East Grand Rapids MI",
    cardDescription:
      "Protect your property and improve its appearance with professional tree services. We handle trimming, shaping, full tree removal, and stump grinding. Licensed and insured for safe, efficient work that transforms your yard.",
    intro:
      "Jack of All Blades provides professional tree services across Grand Rapids and West Michigan. We handle trimming, shaping, full tree removal, and stump grinding, and our tree work is licensed and insured for safe, efficient work. Free on-site estimates for homes and businesses.",
    included: [
      "Tree trimming",
      "Shaping",
      "Full tree removal",
      "Stump grinding",
      "Licensed and insured work",
    ],
    faqs: [
      {
        q: "Is your tree work licensed and insured?",
        a: "Yes. Our tree trimming and removal is licensed and insured for safe, efficient work.",
      },
      {
        q: "Do you offer free estimates for tree work?",
        a: "Yes. Jack of All Blades provides free, no-obligation on-site estimates for tree trimming and removal across Grand Rapids and West Michigan.",
      },
      {
        q: "Do you handle tree work for businesses as well as homes?",
        a: "Yes. We serve both residential and commercial properties in the Grand Rapids area.",
      },
      {
        q: "Which areas do you serve for tree work?",
        a: SERVED_AREAS_SENTENCE,
      },
    ],
    metaTitle: "Tree Trimming & Removal Grand Rapids MI | Jack of All Blades",
    metaDescription:
      "Licensed, insured tree trimming, removal and stump grinding in Grand Rapids & West Michigan by Jack of All Blades. Free on-site estimates. Call 616-250-8044",
    areas: ["East Grand Rapids", "Grand Rapids", "Ada", "Rockford"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
