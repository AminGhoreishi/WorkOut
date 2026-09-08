"use client";

import { useState } from "react";
import TestimonialStats from "./TestimonialStats";
import TestimonialTable from "./TestimonialTable";
import ViewTestimonialModal from "./ViewTestimonialModal";
import type { AdminTestimonialItem } from "@/types/testimonial";

export default function AdminTestimonialsTable() {
  const [viewingTestimonial, setViewingTestimonial] =
    useState<AdminTestimonialItem | null>(null);

  return (
    <div className="space-y-6 font-danaMed" dir="rtl">
      <TestimonialStats />
      <TestimonialTable onView={(item) => setViewingTestimonial(item)} />
      <ViewTestimonialModal
        isOpen={Boolean(viewingTestimonial)}
        onClose={() => setViewingTestimonial(null)}
        testimonial={viewingTestimonial}
      />
    </div>
  );
}
