"use client";

import { useState, useRef } from "react";
import VideosManagement from "@/modules/admin/subscription/VideosManagement";
import UploadVideoModal from "@/modules/admin/subscription/UploadVideoModal";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import type { VideoInfo, VideosManagementRef } from "@/types/workout";

export default function VideosPageModule() {
  const [showUploadVideoModal, setShowUploadVideoModal] = useState(false);
  const [watchingVideo, setWatchingVideo] = useState<VideoInfo | null>(null);
  const videosManagementRef = useRef<VideosManagementRef>(null);

  const handleUploadSuccess = () => {
    videosManagementRef.current?.fetchVideos();
  };

  return (
    <div className="overflow-hidden font-danaMed" dir="rtl">
      <div className="container mx-auto pt-8">
        <div className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2 font-morabbaReg">
            مدیریت ویدیوهای ورزشی
          </h1>
          <p className="text-white/60 text-sm">
            بانک کلیه ویدیوهای آموزشی حرکات ورزشی و بدنسازی را آپلود، مشاهده و مدیریت کنید.
          </p>
        </div>

        <VideosManagement
          ref={videosManagementRef}
          setShowUploadVideoModal={setShowUploadVideoModal}
          setWatchingVideo={setWatchingVideo}
        />

        {showUploadVideoModal && (
          <UploadVideoModal
            onClose={() => setShowUploadVideoModal(false)}
            onUploadSuccess={handleUploadSuccess}
          />
        )}

        {watchingVideo && (
          <VideoPlayerModal
            video={watchingVideo}
            onClose={() => setWatchingVideo(null)}
          />
        )}
      </div>
    </div>
  );
}
