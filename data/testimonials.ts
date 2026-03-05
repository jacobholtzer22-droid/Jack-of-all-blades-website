export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Nicholas M.",
    text: "Michael and his workers did a great job with our property, he was very helpful and respectful. Would highly recommend his work!",
    rating: 5,
    service: "Property Maintenance",
  },
  {
    name: "Barbara H.",
    text: "My experience with Jack of All Blades has been excellent. I used this business for both my landscaping and plowing needs. I found the Owner and his Staff to be very professional and wanting to provide the best service possible. They were timely with lawn care and snow removal, staying in contact with their customers to meet any additional needs. I found the staff was respectful to my property and willing to do any additional projects requested. They always left the site clean and were easy to connect with if needed. I would highly recommend this creative and personable Team!",
    rating: 5,
    service: "Landscaping & Snow Removal",
  },
  {
    name: "Erica A.",
    text: "Jack of All Blades is excellent! They are responsive, friendly and incredibly hardworking. All their work is top notch! Highly recommend!",
    rating: 5,
    service: "Landscaping",
  },
  {
    name: "Lee B.",
    text: "Top notch service! Michael and his team do great work at a very competitive price. They are very communicative and their work is not done until you are completely satisfied. Highly recommend!!",
    rating: 5,
    service: "Landscaping",
  },
  {
    name: "Carson S.",
    text: "Very professional work, great with communication, and they have great attention to detail. I would highly recommend.",
    rating: 5,
    service: "Landscaping",
  },
  {
    name: "James D.",
    text: "Jack of All Blades is an outstanding company, they do great work and I have 0 complaints. One thing that stands out is they continue to prove themselves how much they care.",
    rating: 5,
    service: "Landscaping",
  },
  {
    name: "Barb W.",
    text: "Jack of All Blades is owned by Michael Hazzard, who is an energetic, enterprising young man in year 3 of his thriving business which includes landscaping, hardscaping and snowplow services. He and his crew are punctual, reliable and attend to the details when servicing your property. Michael built a beautiful patio in my front yard and another in the back as a platform to hold my raised planters. Both were affordable, well done and completed quickly and on schedule. My yard and landscaping are done completely and on time. Several times, Michael has contacted me directly for feedback on how he and his crew are doing. He aims to please! I highly recommend Jack of All Blades for the care and maintenance of your property year round.",
    rating: 5,
    service: "Hardscaping & Landscaping",
  },
];

export const GOOGLE_REVIEW_URL =
  "https://g.page/r/Cf9VBnv72_3iEAI/review";
