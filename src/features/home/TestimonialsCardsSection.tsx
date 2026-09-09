import { getHomeTestimonials } from "@/lib/homeData";
import TestimonialsList from "./TestimonialsList";

export default async function TestimonialsCardsSection() {
  const testimonials = await getHomeTestimonials();
  return <TestimonialsList testimonials={testimonials} />;
}
