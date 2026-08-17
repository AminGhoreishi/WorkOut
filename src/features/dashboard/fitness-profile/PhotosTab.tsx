import { Camera, Trash2, Plus } from "lucide-react";
import type { PhotosTabProps } from "@/types/fitness-profile";

export default function PhotosTab({
  register,
  bodyPhotos,
  handlePhotoUpload,
  removePhoto,
}: PhotosTabProps) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label className="block text-neutral-300 text-xs mb-3 font-medium flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-amber-400" />
          تصاویر وضعیت فیزیکی شما (اختیاری)
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {bodyPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square border border-amber-500/20 rounded-xl overflow-hidden group"
            >
              <img
                src={photo}
                alt="Physical state"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {bodyPhotos.length < 4 && (
            <label className="aspect-square border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/5 transition-all">
              <Plus className="w-5 h-5 text-neutral-400 mb-1" />
              <span className="text-[10px] text-neutral-400">
                افزودن تصویر
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                multiple
              />
            </label>
          )}
        </div>
        <p className="text-[10px] text-neutral-400 leading-relaxed">
          می‌توانید تا حداکثر ۴ تصویر از وضعیت بدنی خود (جلو، پشت، پهلوها)
          بارگذاری کنید.
        </p>
      </div>

      <div>
        <label className="block text-neutral-300 text-xs mb-2 font-medium">
          یادداشت‌های اضافی برای مربی (اختیاری)
        </label>
        <textarea
          rows={4}
          {...register("notes")}
          placeholder="بیماری خاص، آسیب‌دیدگی‌ها، حساسیت‌های غذایی یا نکته مهمی اگر هست اینجا بنویسید..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500/50 resize-none"
        />
      </div>
    </div>
  );
}
