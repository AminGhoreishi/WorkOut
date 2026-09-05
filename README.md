<div align="center">

# ⚡ StarFit

### Advanced Full-Stack Fitness, Workout & Nutrition Management Platform

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-f59e0b?style=for-the-badge&logo=pwa&logoColor=white)](https://developer.mozilla.org/)

</div>

---

## 📖 Overview

**StarFit** is an enterprise-grade, full-stack fitness and online coaching platform engineered to deliver personalized workout routines and nutrition plans. Built on top of **Next.js 16 (App Router)** and **React 19**, StarFit combines a sleek dark-luxury visual identity, micro-interactions, and real-time coaching support with a resilient data architecture powered by MongoDB and S3-compatible cloud storage.

---

## ✨ Key Features

### 🏋️ Workout & Training Engine
- **Custom Programs & Schedules:** Structured monthly and weekly training programs with exercise details, sets, reps, load, and coach guidance.
- **Personal Records (PR):** Track lifting progression, milestones, and personal bests over time.
- **Session Feedback:** Post-workout feedback submission to let coaches fine-tune workout intensity dynamically.

### 🥗 Nutrition & Meal Planning
- **Personalized Meal Plans:** Macro-optimized meal breakdowns across breakfast, lunch, dinner, and snacks.
- **Food & Nutrition Database:** Extensive nutritional data with calorie and macronutrient metrics.
- **Daily Nutrition Logs:** Real-time user intake logging with historical progress visualization.

### 💳 Subscriptions, Packages & Billing
- **Tiered Coaching Packages:** Feature matrices, comparative package tiers, and dynamic badge statuses.
- **Smart Promo Codes & Discounts:** Coupon validation engine with category-specific or package-specific rules.
- **Purchase History & Invoicing:** Complete order and transaction tracking with active and expired subscription handling.

### 🎫 Direct Coach Ticketing & Messaging
- **Real-Time Communication:** Direct support tickets between athletes and coaches or support team.
- **Media Attachments:** Upload photos and videos for exercise form checks and assessments.
- **Status Lifecycle:** Live status tracking (Pending, Answered, Closed).

### 📝 Health & Fitness Magazine
- **Rich Content Management:** Categorized health, fitness, and nutrition articles.
- **Interactive Reading:** Estimated reading time, Persian/Gregorian date formatting, and reader comments.
- **Rich Text Authoring:** CKEditor 5 WYSIWYG integration paired with direct S3 media storage.

### 🛡️ Authentication & Role-Based Access Control (RBAC)
- **Passwordless OTP Login:** Phone number verification via integrated SMS gateways.
- **Strict Role Authorization:** Granular permissions across **Athlete**, **Coach**, and **Admin** tiers.
- **Session Security:** Tokenized sessions managed by **NextAuth.js**.

### 📱 Progressive Web App (PWA) & Mobile-First UX
- Fully responsive mobile-first interface styled with Tailwind CSS v4.
- Offline-ready asset caching via Serwist service workers.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & Core** | [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Framer Motion](https://motion.dev/) |
| **State & Data Fetching** | [SWR](https://swr.vercel.app/) (caching, deduplication, optimistic updates) |
| **Database & ORM** | [MongoDB](https://www.mongodb.com/), [Mongoose 9](https://mongoosejs.com/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/), [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| **Object Storage** | AWS S3 SDK (integrated with ArvanCloud and ParsPack S3) |
| **Messaging & OTP** | SMS.ir & IranPayamak APIs |
| **Rich Text Editor** | [CKEditor 5 Classic](https://ckeditor.com/ckeditor-5/) |
| **PWA & Caching** | [Serwist](https://serwist.pages.dev/) |
| **Schema Validation** | Fastest-Validator, React Hook Form |

---

## 📁 Architecture & Directory Structure

```text
workout/
├── public/                # Static assets, fonts, icons, manifest
├── src/
│   ├── app/               # Next.js App Router root
│   │   ├── (admin)/       # Administration panel (orders, packages, meal plans, users)
│   │   ├── (auth)/        # Authentication routes (login, OTP verification)
│   │   ├── (dashboard)/   # Athlete dashboard (profile, active workouts, nutrition)
│   │   ├── (main)/        # Public pages (home, packages, articles, about)
│   │   └── api/           # Backend REST endpoints & webhook handlers
│   ├── components/        # Reusable UI elements (Modals, Inputs, Buttons, Layout)
│   ├── constants/         # Static configuration, navigation items, category lists
│   ├── features/          # Domain-driven feature modules (Packages, Articles, Admin, etc.)
│   ├── hooks/             # Custom client-side React hooks
│   ├── lib/               # Database connectors, S3 client configuration, auth setup
│   ├── models/            # 30+ Mongoose models (Users, Workouts, Meals, Packages, etc.)
│   ├── styles/            # Global design tokens and typography rules
│   ├── types/             # Explicit TypeScript interfaces and models
│   ├── utils/             # Helper utilities (date formatting, price calculation, alerts)
│   └── validators/        # Input and request validation schemas
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js runtime configuration
└── package.json           # Dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** `v20.x` or higher
- **pnpm** package manager (recommended)
- Active **MongoDB** instance

### 2. Clone the Repository
```bash
git clone https://github.com/aminQureshi8/WorkOut.git
cd WorkOut
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the project root based on [.env.example](.env.example):

```env
# Database
MONGODB_URI=mongodb://localhost:27017/starfit

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# S3 Compatible Storage
S3_ENDPOINT=https://your-s3-endpoint.com
S3_ACCESS_KEY_ID=your_access_key
S3_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=workout
S3_PUBLIC_URL=https://your-public-s3-url.com

# SMS Gateway (OTP)
SMS_IR_USERNAME=your_sms_user
SMS_IR_PASSWORD=your_sms_password
SMS_IR_LINE=your_sms_line
```

### 5. Run the Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js development server with Turbopack |
| `pnpm build` | Compiles and optimizes the project for production |
| `pnpm start` | Launches the built production server |
| `pnpm lint` | Runs ESLint to verify code quality and style standards |

---

<div align="center">

Crafted with ❤️ for the **StarFit** fitness community.

</div>
