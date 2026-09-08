import { getHomeTestimonials } from "@/lib/homeData";
import TestimonialsList from "./TestimonialsList";
import type { TestimonialsProps } from "@/types/components";

export default async function Testimonials({
  testimonials,
}: TestimonialsProps = {}) {
  const data = testimonials || (await getHomeTestimonials());
  return <TestimonialsList testimonials={data} />;
}
