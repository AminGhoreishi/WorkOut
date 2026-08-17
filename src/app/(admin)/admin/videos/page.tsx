import type { Metadata } from "next";
import VideosPageModule from "@/features/admin/videos/VideosPageModule";

export const metadata: Metadata = {
  title: "مدیریت ویدیوها | استار فیت",
  description: "بانک کلیه ویدیوهای آموزشی حرکات ورزشی و بدنسازی استار فیت",
};

export default function AdminVideosPage() {
  return <VideosPageModule />;
}
