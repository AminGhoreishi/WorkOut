<div align="center">

# ⚡ StarFit | استار فیت

### پلتفرم پیشرفته و جامع مدیریت تمرین، تغذیه و مربیگری آنلاین
**Advanced Full-Stack Fitness, Workout & Nutrition Management Platform**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-f59e0b?style=for-the-badge&logo=pwa&logoColor=white)](https://developer.mozilla.org/)

</div>

---

## 📖 معرفی پروژه (Overview)

**استار فیت (StarFit)** یک سامانه مدرن، فول‌استک و مقیاس‌پذیر برای ارائه برنامه‌های ورزشی و رژیم غذایی شخصی‌سازی شده است. این پلتفرم با تمرکز بر تجربه کاربری روان (UX)، انیمیشن‌های مینیمال و تم تیره لوکس با المان‌های طلایی طراحی شده و ارتباط مستقیم ورزشکار با مربی را از طریق سیستم تیکتینگ و ارزیابی پیشرفت میسر می‌سازد.

---

## ✨ امکانات و قابلیت‌های کلیدی (Key Features)

### 🏋️‍♂️ مدیریت برنامه‌های تمرینی (Workout Engine)
- **برنامه‌ریزی ماهانه و هفتگی:** تقویم جلسات تمرین، دسته‌بندی حرکات، تعداد ست، تکرار، وزنه‌ها و نکات مربی
- **ثبت رکوردهای شخصی (PR):** پیگیری پیشرفت فیزیکی و ثبت رکوردهای جدید ورزشکار
- **بازخورد جلسات (Session Feedback):** امکان ارسال فیدبک پایان تمرین برای تنظیم فشار توسط مربی

### 🥗 مدیریت تغذیه و رژیم غذایی (Meal Plans & Nutrition)
- **برنامه غذایی اختصاصی:** تفکیک وعده‌های اصلی و میان‌وعده‌ها همراه با ارزش غذایی
- **پایگاه داده خوراکی‌ها (Food DB):** فهرست جامع مواد غذایی، کالری و درشت‌مغذی‌ها
- **ثبت گزارش تغذیه روزانه (Nutrition Logs):** رهگیری کالری و ماکروهای مصرفی روزانه

### 💳 بسته‌ها و مدیریت اشتراک (Subscriptions & Packages)
- **پکیج‌های متنوع مربیگری:** نمایش امکانات، مقایسه پلن‌ها و مزایای ویژه هر سطح
- **تخفیف‌ها و کوپن‌های هوشمند:** سیستم اعتبارسنجی کدهای تخفیف در مرحله پرداخت
- **تاریخچه خرید و تراکنش‌ها:** آرشیو پرداخت‌ها و دوره‌های اشتراک فعال/منقضی

### 🎫 تیکتینگ و ارتباط اختصاصی با مربی (Ticketing System)
- چت مستقیم و ارسال پیام بین ورزشکار و مربی / پشتیبانی
- پیوست فایل، عکس و ویدیو جهت اصلاح تکنیک‌های ورزشی
- تغییر وضعیت تیکت‌ها (در انتظار پاسخ، پاسخ داده‌شده، بسته)

### 📝 وبلاگ و مجله تخصصی (Blog & Magazine)
- مقالات ورزشی و مقالات تغذیه با دسته‌بندی‌های موضوعی
- محاسبه خودکار زمان مطالعه، تاریخ شمسی، بخش نظرات و امتیازدهی
- ویرایشگر حرفه‌ای متنی بر پایه CKEditor 5 و بارگذاری مدیا در فضای ابری S3

### 🛡️ احراز هویت و امنیت (Authentication & Security)
- ورود امن بدون رمز با شماره همراه و ارسال کد تایید یکبار مصرف (OTP)
- یکپارچه‌سازی با سامانه پیامکی SMS.ir و ایران‌پیامک
- کنترل سطح دسترسی مبتنی بر نقش (**RBAC**: User / Coach / Admin)
- سشن‌های توکنیزه و ایمن تحت **NextAuth.js**

---

## 🛠️ پشته فناوری (Tech Stack)

| لایه | تکنولوژی‌های استفاده‌شده |
| :--- | :--- |
| **Frontend Core** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling & UI** | Tailwind CSS v4, Lucide React, Framer Motion |
| **Typography** | فونت‌های فارسی شبنم، دانا (Dana) و مربا (Morabba) |
| **Data Fetching** | SWR (Caching, Deduplication & Optimistic UI) |
| **Backend & APIs** | Next.js API Routes, Server Actions |
| **Database & ODM** | MongoDB, Mongoose |
| **Authentication** | NextAuth.js, Bcrypt |
| **Cloud Storage** | AWS S3 SDK (یکپارچه‌شده با ابر آروان و پارس‌پک) |
| **PWA & Offline** | Serwist / PWA Service Worker |
| **Validation** | Fastest-Validator, React Hook Form |

---

## 📁 ساختار پوشه‌های پروژه (Directory Architecture)

```text
workout/
├── public/                # فونت‌ها، تصاویر ایستا، آیکون‌ها و Manifest
├── src/
│   ├── app/               # ساختار مسیردهی Next.js App Router
│   │   ├── (admin)/       # صفحات پنل مدیریت (داشبورد، مالی، کاربران، تیکت‌ها)
│   │   ├── (auth)/        # صفحات ورود، ثبت‌نام و تایید کد OTP
│   │   ├── (dashboard)/   # داشبورد اختصاصی ورزشکار و سوابق
│   │   ├── (main)/        # صفحات اصلی (خانه، مقالات، جزئیات پکیج، مربیان)
│   │   └── api/           # اندپوینت‌های بک‌اند و وب‌هوک‌ها
│   ├── components/        # کامپوننت‌های عمومی و UI مشترک (Modal, Input, Button)
│   ├── constants/         # مقادیر ثابت و گزینه‌های سراسری
│   ├── features/          # ماژول‌های تفکیک‌شده فیچرها (Packages, Home, Admin, ...)
│   ├── hooks/             # هوک‌های اختصاصی کلاینت
│   ├── lib/               # راه‌اندازی دیتابیس، کانفیگ‌های سرور و سرویس‌های S3
│   ├── models/            # مدل‌ها و اسکیمای Mongoose (بیش از ۳۰ مدل)
│   ├── styles/            # استایل‌های سراسری، توکن‌های رنگی و فونت‌ها
│   ├── types/             # تایپ‌ها و اینترفیس‌های تفکیک‌شده TypeScript
│   ├── utils/             # توابع کمکی محاسباتی، تاریخ شمسی، اعداد و الرت‌ها
│   └── validators/        # اعتبارسنجی ورودی‌ها و فرم‌ها
├── .env.example           # الگوی متغیرهای محیطی
├── next.config.ts         # تنظیمات Next.js و ماژول‌ها
└── package.json           # وابستگی‌ها و اسکریپت‌های پروژه
```

---

## 🚀 راهنمای نصب و راه‌اندازی (Getting Started)

### ۱. پیش‌نیازها
- **Node.js** نسخه `v20.x` یا بالاتر
- مدیر بسته **pnpm** (یا npm / yarn)
- پایگاه داده **MongoDB** فعال

### ۲. کلون و دریافت مخزن
```bash
git clone https://github.com/aminQureshi8/WorkOut.git
cd WorkOut
```

### ۳. نصب وابستگی‌ها
```bash
pnpm install
```

### ۴. تنظیم متغیرهای محیطی
یک فایل `.env.local` در ریشه پروژه ایجاد کرده و متغیرهای مورد نیاز را مقداردهی نمایید:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/starfit

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Object Storage (S3 / Arvan / ParsPack)
S3_ENDPOINT=https://s3.ir-thr-at1.arvanstorage.ir
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=workout
S3_PUBLIC_URL=https://your-bucket-url.com

# SMS Gateway (OTP)
SMS_IR_USERNAME=your_sms_user
SMS_IR_PASSWORD=your_sms_password
SMS_IR_LINE=your_sms_line
```

### ۵. اجرای سرور توسعه
```bash
pnpm dev
```
برنامه در آدرس [http://localhost:3000](http://localhost:3000) در دسترس خواهد بود.

---

## 📜 اسکریپت‌های اصلی (Available Scripts)

| دستور | توضیح عملکرد |
| :--- | :--- |
| `pnpm dev` | اجرای سرور محلی توسعه به همراه Turbopack |
| `pnpm build` | کامپایل و تولید خروجی نسخه پروداکشن بهینه‌سازی شده |
| `pnpm start` | اجرای نسخه بیلد شده پروداکشن |
| `pnpm lint` | بررسی کیفی و تحلیل کدهای پروژه با ESLint |

---

<div align="center">

ساخته شده با ❤️ برای جامعه ورزش و تناسب اندام **StarFit**

</div>
