import type { VideoThumbnailResult } from "@/types/video";

export const extractVideoFirstFrame = (
  file: File
): Promise<VideoThumbnailResult> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    let isCaptured = false;

    const capture = () => {
      if (isCaptured) return;
      isCaptured = true;

      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error("Canvas context is not available"));
          return;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const durationSec = Math.round(video.duration || 0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);
            if (blob) {
              const previewUrl = URL.createObjectURL(blob);
              resolve({
                thumbnailBlob: blob,
                previewUrl,
                durationSec,
              });
            } else {
              reject(new Error("Failed to create thumbnail blob"));
            }
          },
          "image/jpeg",
          0.85
        );
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(err);
      }
    };

    video.onloadeddata = () => {
      if (video.duration && video.duration > 0) {
        video.currentTime = Math.min(0.2, video.duration / 2);
      } else {
        capture();
      }
    };

    video.onseeked = () => {
      capture();
    };

    video.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    setTimeout(() => {
      if (!isCaptured && video.readyState >= 2) {
        capture();
      }
    }, 2500);
  });
};
