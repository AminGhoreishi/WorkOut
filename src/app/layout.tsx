import type { Metadata } from "next";
import "@/styles/globals.css";
import { danaMedium, danaLight, danaBold, morabbaReg } from "./fonts";
import NextTopLoader from "nextjs-toploader";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "استار فیت | سامانه تخصصی تناسب اندام و بدنسازی",
    template: "%s | استار فیت",
  },
  description:
    "استار فیت؛ پلتفرم تخصصی برنامه‌ریزی هوشمند تمرینی، تغذیه و مربیگری اختصاصی.",
  verification: {
    google: "googlee29da57a8e735d16",
  },
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={cn("font-sans", geist.variable)}>
      <body
        className={`${danaMedium.variable} ${danaLight.variable} ${danaBold.variable} ${morabbaReg.variable} min-h-screen bg-neutral-950 text-white selection:bg-amber-500 selection:text-black`}
      >
        <NextTopLoader
          color="#eab308"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #eab308,0 0 5px #eab308"
        />
        {children}
      </body>
    </html>
  );
}
