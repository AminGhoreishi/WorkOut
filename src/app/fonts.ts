import localFont from "next/font/local";

export const danaMedium = localFont({
  src: "../../public/fonts/woff2/Dana-Medium.woff2",
  display: "swap",
  variable: "--font-danaMed",
});

export const danaLight = localFont({
  src: "../../public/fonts/woff2/Dana-Light.woff2",
  display: "swap",
  variable: "--font-danaLight",
  preload: false,
});

export const danaBold = localFont({
  src: "../../public/fonts/woff2/Dana-DemiBold.woff2",
  display: "swap",
  variable: "--font-danaDemiBold",
  preload: false,
});

export const morabbaReg = localFont({
  src: "../../public/fonts/woff2/Morabba-Regular.woff2",
  display: "swap",
  variable: "--font-morabbaReg",
});
