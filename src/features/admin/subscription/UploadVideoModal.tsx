"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Check } from "lucide-react";
import type { UploadVideoModalProps } from "@/types/workout";
import { showAlert } from "@/utils/alert";
import { extractVideoFirstFrame } from "@/utils/video";

export default function UploadVideoModal({
  onClose,
  onUploadSuccess,
}: UploadVideoModalProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailBlob, setThumbnailBlob] = useState<Blob | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [extractingThumbnail, setExtractingThumbnail] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDesc, setNewVideoDesc] = useState("");
  const [newVideoLevel, setNewVideoLevel] = useState("beginner");
  const [newVideoDuration, setNewVideoDuration] = useState("");
  const [newVideoTags, setNewVideoTags] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleFileChange = async (file: File | null) => {
    setVideoFile(file);
    if (!file) {
      setThumbnailBlob(null);
      setThumbnailPreview(null);
      return;
    }

    setExtractingThumbnail(true);
    try {
      const result = await extractVideoFirstFrame(file);
      setThumbnailBlob(result.thumbnailBlob);
      setThumbnailPreview(result.previewUrl);
      if (result.durationSec > 0) {
        setNewVideoDuration(String(result.durationSec));
      }
    } catch {
      setThumbnailBlob(null);
      setThumbnailPreview(null);
    } finally {
      setExtractingThumbnail(false);
    }
  };

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !newVideoTitle) {
      showAlert({
        title: "هشدار",
        text: "لطفاً فایل ویدیو و عنوان را وارد کنید",
        icon: "warning",
      });
      return;
    }
    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      if (thumbnailBlob) {
        formData.append("thumbnailFile", thumbnailBlob, "thumbnail.jpg");
      }
      formData.append("title", newVideoTitle);
      formData.append("description", newVideoDesc);
      formData.append("level", newVideoLevel);
      formData.append("durationSec", newVideoDuration || "60");

      const tagsArray = newVideoTags
        ? newVideoTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
      formData.append("tags", JSON.stringify(tagsArray));

      const res = await fetch("/api/admin/video", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        showAlert({
          title: "موفقیت",
          text: "ویدیو با موفقیت آپلود شد",
          icon: "success",
        });
        onUploadSuccess();
        onClose();
      } else {
        const err = await res.json().catch(() => ({}));
        showAlert({
          title: "خطا",
          text: err.message || "خطا در آپلود ویدیو",
          icon: "error",
        });
      }
    } catch {
      showAlert({
        title: "خطا",
        text: "خطا در آپلود ویدیو",
        icon: "error",
      });
    } finally {
      setUploadingVideo(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-danaMed" dir="rtl">
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-white/10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-neutral-900/80 backdrop-blur-lg">
          <h2 className="text-sm sm:text-xl text-white font-bold font-morabbaReg">
            آپلود ویدیوی ورزشی جدید
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white cursor-pointer"
            disabled={uploadingVideo}
          >
            ✕
          </button>
        </div>

        {uploadingVideo ? (
          <div className="p-12 text-center text-white space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-amber-400 mx-auto" />
            <div className="font-bold text-sm">
              در حال آپلود ویدیو...
            </div>
            <p className="text-white/50 text-xs">
              لطفاً پنجره را نبندید. آپلود فایل‌های حجیم ممکن است چند دقیقه طول بکشد.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUploadVideo} className="p-6 space-y-4">
            <div>
              <label className="block text-white/80 text-sm sm:text-xs mb-2 font-medium">
                فایل ویدیو (MP4)*
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  handleFileChange(e.target.files?.[0] || null)
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm sm:text-xs focus:outline-none focus:border-amber-400"
                required
              />
              {extractingThumbnail && (
                <div className="flex items-center gap-2 text-xs text-amber-400 mt-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>در حال ساخت خودکار تامبنیل از فریم اول ویدیو...</span>
                </div>
              )}
              {thumbnailPreview && !extractingThumbnail && (
                <div className="relative aspect-video max-h-36 rounded-xl overflow-hidden border border-white/10 bg-black mt-2">
                  <Image
                    src={thumbnailPreview}
                    alt="پیش‌نمایش تامبنیل"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 z-10">
                    <Check className="w-3 h-3" />
                    تامبنیل خودکار از فریم اول ویدیو
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-white/80 text-xs mb-2 font-medium">
                عنوان ویدیو*
              </label>
              <input
                type="text"
                placeholder="مثال: جلو بازو دمبل تناوبی تمرکزی"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-xs mb-2 font-medium">
                توضیحات حرکت
              </label>
              <textarea
                placeholder="توضیح دهید حرکت چگونه انجام می‌شود..."
                value={newVideoDesc}
                onChange={(e) => setNewVideoDesc(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 resize-none h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-xs mb-2 font-medium">
                  سطح سختی*
                </label>
                <select
                  value={newVideoLevel}
                  onChange={(e) => setNewVideoLevel(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="beginner">مبتدی (Beginner)</option>
                  <option value="intermediate">
                    متوسط (Intermediate)
                  </option>
                  <option value="advanced">حرفه‌ای (Advanced)</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-xs mb-2 font-medium">
                  مدت زمان (ثانیه)
                </label>
                <input
                  type="number"
                  placeholder="۶۰"
                  value={newVideoDuration}
                  onChange={(e) => setNewVideoDuration(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400 ss02"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-xs mb-2 font-medium">
                تگ‌ها (با ویرگول انگلیسی جدا کنید)
              </label>
              <input
                type="text"
                placeholder="مثال: بازو, دمبل, سینه, سرشانه"
                value={newVideoTags}
                onChange={(e) => setNewVideoTags(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold py-2.5 rounded-xl hover:opacity-90 text-sm cursor-pointer"
              >
                شروع فرآیند آپلود
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl border border-white/10 text-sm cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
