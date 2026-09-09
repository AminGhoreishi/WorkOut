import { Suspense } from "react";
import TestimonialsCardsSection from "./TestimonialsCardsSection";
import TestimonialsCardsSkeleton from "./TestimonialsCardsSkeleton";
import TestimonialsList from "./TestimonialsList";
import type { TestimonialsProps } from "@/types/components";

export default function Testimonials({
  testimonials,
}: TestimonialsProps = {}) {
  if (testimonials) {
    return <TestimonialsList testimonials={testimonials} />;
  }

  return (
    <Suspense fallback={<TestimonialsCardsSkeleton />}>
      <TestimonialsCardsSection />
    </Suspense>
  );
}

