"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Send,
  Trash2,
  Paperclip,
  Dumbbell,
  Utensils,
  Eye,
  HeartPulse,
  Headset,
  AlertCircle,
  FileCheck,
  Users,
} from "lucide-react";
import { showAlert } from "@/utils/alert";
import type {
  AdminSendTicketFormValues,
  AdminSendTicketProps,
  AdminSubscriberUser,
} from "@/types/ticket";

const categoryList = [
  {
    id: "workout",
    label: "برنامه و سوال تمرینی",
    icon: Dumbbell,
    color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
  },
  {
    id: "nutrition",
    label: "برنامه و سوال تغذیه",
    icon: Utensils,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "form_check",
    label: "بررسی فرم و تکنیک",
    icon: Eye,
    color: "from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/30",
  },
  {
    id: "injury",
    label: "آسیب‌دیدگی و درد",
    icon: HeartPulse,
    color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30",
  },
  {
    id: "technical",
    label: "پشتیبانی و حساب کاربری",
    icon: Headset,
    color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
  },
] as const;

export default function AdminSendTicket({ initialUserId }: AdminSendTicketProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryUserId = initialUserId || searchParams.get("userId") || "";

  const [subscriberUsers, setSubscriberUsers] = useState<AdminSubscriberUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdminSendTicketFormValues>({
    defaultValues: {
      userId: queryUserId,
      subject: "",
      category: "workout",
      description: "",
      status: "answered",
      file: null,
    },
  });

  const currentUserId = watch("userId");
  const currentCategory = watch("category");
  const currentSubject = watch("subject");
  const currentDescription = watch("description");
  const currentStatus = watch("status");
  const currentFile = watch("file");
  const attachedFile = currentFile && currentFile.length > 0 ? currentFile[0] : null;

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoadingUsers(true);
        const res = await fetch("/api/admin/ticket/users");
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          setSubscriberUsers(data.users || []);
        }
      } catch {
        setSubscriberUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchSubscribers();
  }, []);

  useEffect(() => {
    if (queryUserId) {
      setValue("userId", queryUserId, { shouldValidate: true });
    }
  }, [queryUserId, setValue]);

  const selectedUserObj = subscriberUsers.find((u) => u._id === currentUserId);

  const onSubmit = async (values: AdminSendTicketFormValues) => {
    if (!values.userId) {
      showAlert("انتخاب کاربر الزامی است", "لطفاً کاربری که می‌خواهید برای او تیکت ارسال کنید را از لیست انتخاب نمایید.", "warning");
      return;
    }

    if (!values.subject.trim() || !values.description.trim()) {
      showAlert("فیلدهای الزامی", "لطفاً موضوع و متن تیکت را وارد کنید.", "warning");
      return;
    }

    if (attachedFile && attachedFile.size > 50 * 1024 * 1024) {
      showAlert("حجم فایل بیش از حد مجاز است", "حداکثر حجم مجاز برای ضمیمه ۵۰ مگابایت می‌باشد.", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", values.userId);
      formData.append("subject", values.subject.trim());
      formData.append("description", values.description.trim());
      formData.append("category", values.category);
      formData.append("status", values.status || "answered");
      if (attachedFile) {
        formData.append("file", attachedFile);
      }

      const res = await fetch("/api/admin/ticket/send", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok && resData.success) {
        reset();
        await showAlert("موفقیت", "تیکت با موفقیت ایجاد و برای کاربر ارسال گردید.", "success");
        startTransition(() => {
          router.push("/admin/tickets");
          router.refresh();
        });
      } else {
        throw new Error(resData.message || "خطا در ارسال تیکت");
      }
    } catch (err: any) {
      showAlert("خطا در ارسال", err.message || "ارسال تیکت با مشکل مواجه شد.", "error");
    }
  };

  return (
    <div className="min-h-screen text-white font-danaMed pb-16" dir="rtl">
      <div className="container mx-auto pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/admin/tickets"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-300 transition-colors bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg"
              >
                <ArrowRight className="w-4 h-4" />
                <span>بازگشت به لیست تیکت‌ها</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-morabbaReg text-white flex items-center gap-3">
              ارسال تیکت جدید به کاربر
            </h1>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              پیام، برنامه یا اطلاع‌رسانی اختصاصی را در قالب تیکت پشتیبانی برای کاربر یا ورزشکار ارسال کنید.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  انتخاب کاربر
                  <span className="text-amber-400 text-xs">*</span>
                </label>
                <select
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 text-sm cursor-pointer"
                  disabled={loadingUsers}
                  {...register("userId", { required: true })}
                >
                  <option value="">
                    {loadingUsers ? "در حال دریافت لیست کاربران..." : "-- انتخاب نام کاربر --"}
                  </option>
                  {subscriberUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.fullName || user.username}
                    </option>
                  ))}
                </select>
                {errors.userId && (
                  <span className="text-amber-400 text-xs mt-1.5 block">
                    انتخاب کاربر الزامی است.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  موضوع تیکت
                  <span className="text-amber-400 text-xs mr-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: برنامه تمرینی جدید / پاسخ به پرسش ارزیابی"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                  {...register("subject", { required: true })}
                />
                {errors.subject && (
                  <span className="text-amber-400 text-xs mt-1.5 block">
                    وارد کردن موضوع تیکت الزامی است.
                  </span>
                )}
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  دسته‌بندی موضوع تیکت
                  <span className="text-amber-400 text-xs mr-1">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {categoryList.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = currentCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setValue("category", cat.id as any)}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-right cursor-pointer ${
                          isSelected
                            ? `${cat.color} bg-white/10 shadow-lg scale-[1.01]`
                            : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white/10" : "bg-white/5"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-2">
                    وضعیت اولیه تیکت
                  </label>
                  <select
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 text-sm cursor-pointer"
                    {...register("status")}
                  >
                    <option value="answered">پیام از مربی (ارسال مستقیم به کاربر)</option>
                    <option value="pending">در انتظار بررسی</option>
                    <option value="closed">بسته شده</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-2">
                    ضمیمه فایل یا ویدیو (اختیاری)
                  </label>
                  <div className="relative border border-dashed border-white/20 hover:border-amber-500/50 rounded-xl bg-white/[0.02] p-2.5 text-center transition-colors">
                    <input
                      type="file"
                      accept="video/*,image/*,application/pdf"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      {...register("file")}
                    />
                    {attachedFile ? (
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2 text-xs text-amber-400 truncate">
                          <FileCheck className="w-4 h-4 shrink-0" />
                          <span className="truncate">{attachedFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setValue("file", null);
                          }}
                          className="text-red-400 hover:text-red-300 p-1 text-xs shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-white/60 text-xs py-1">
                        <Paperclip className="w-4 h-4 text-amber-400" />
                        <span>انتخاب فایل (ویدیو، تصویر یا PDF تا ۵۰MB)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-2">
                  متن پیام / شرح تیکت
                  <span className="text-amber-400 text-xs mr-1">*</span>
                </label>
                <textarea
                  rows={7}
                  placeholder="متن کامل پیام یا دستورالعمل‌های تمرینی و تغذیه‌ای را برای کاربر یادداشت نمایید..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 text-sm resize-none transition-all leading-relaxed"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-amber-400 text-xs mt-1.5 block">
                    نوشتن شرح پیام الزامی است.
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isPending}
                  className="w-full sm:flex-1 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-neutral-950 font-bold py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting || isPending ? "در حال ثبت و ارسال تیکت..." : "ارسال تیکت به کاربر"}</span>
                </button>
                <Link
                  href="/admin/tickets"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm text-center transition-colors"
                >
                  انصراف
                </Link>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-morabbaReg">
                <Eye className="w-4 h-4 text-amber-400" />
                پیش‌نمایش زنده تیکت
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/5 space-y-3">
                  <div>
                    <span className="text-white/40 block text-[11px] mb-1">گیرنده پیام:</span>
                    {selectedUserObj ? (
                      <span className="text-white font-semibold">
                        {selectedUserObj.fullName || selectedUserObj.username}
                      </span>
                    ) : (
                      <span className="text-white/30 italic">هنوز کاربری انتخاب نشده است</span>
                    )}
                  </div>

                  <div>
                    <span className="text-white/40 block text-[11px] mb-1">موضوع:</span>
                    <span className="text-amber-300 font-semibold">
                      {currentSubject || "بدون موضوع"}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/40 block text-[11px] mb-1">دسته‌بندی:</span>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 text-white/80 text-[11px]">
                      {categoryList.find((c) => c.id === currentCategory)?.label || currentCategory}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/40 block text-[11px] mb-1">وضعیت:</span>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-[11px]">
                      {currentStatus === "answered" ? "پیام از مربی" : currentStatus === "pending" ? "در انتظار" : "بسته"}
                    </span>
                  </div>

                  {attachedFile && (
                    <div>
                      <span className="text-white/40 block text-[11px] mb-1">فایل ضمیمه:</span>
                      <span className="text-emerald-400 font-medium truncate block">
                        {attachedFile.name}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-white/40 block text-[11px] mb-1">متن پیام:</span>
                    <p className="text-white/70 whitespace-pre-wrap line-clamp-4 leading-relaxed">
                      {currentDescription || "متن پیام در اینجا نمایش داده خواهد شد..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 text-xs text-amber-300/90 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <AlertCircle className="w-4 h-4" />
                نکات ارسال تیکت از پنل مدیریت
              </div>
              <ul className="space-y-1.5 text-white/70 list-disc list-inside">
                <li>کاربر بلافاصله این تیکت را در بخش تیکت‌های پنل کاربری خود مشاهده خواهد کرد.</li>
                <li>در صورت نیاز کاربر می‌تواند به این تیکت پاسخ دهد و گفتگو ادامه یابد.</li>
                <li>فایل‌های ویدیویی، تصویری یا PDF به صورت مستقیم در سرورهای ابری ذخیره می‌شوند.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
