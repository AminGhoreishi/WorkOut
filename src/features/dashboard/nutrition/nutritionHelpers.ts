import type { FoodUnitInfo, ManualFoodUnitOption } from "@/types/nutrition";

export const MANUAL_FOOD_UNITS: ManualFoodUnitOption[] = [
  {
    value: "عدد",
    label: "عدد",
    baseQty: 1,
    step: 1,
    minQty: 0.5,
    placeholderName: "مثال: تخم‌مرغ، سیب...",
    placeholderCal: "مثال: ۷۵",
  },
  {
    value: "گرم",
    label: "گرم",
    baseQty: 100,
    step: 25,
    minQty: 5,
    placeholderName: "مثال: سینه مرغ، برنج پخته...",
    placeholderCal: "مثال: ۱۶۵",
  },
  {
    value: "قاشق غذاخوری",
    label: "قاشق غذاخوری",
    baseQty: 1,
    step: 1,
    minQty: 0.5,
    placeholderName: "مثال: روغن زیتون، کره بادام‌زمینی...",
    placeholderCal: "مثال: ۱۲۰",
  },
  {
    value: "قاشق چای‌خوری",
    label: "قاشق چای‌خوری",
    baseQty: 1,
    step: 1,
    minQty: 0.5,
    placeholderName: "مثال: عسل، شکر...",
    placeholderCal: "مثال: ۲۵",
  },
  {
    value: "لیوان / فنجان",
    label: "لیوان / فنجان",
    baseQty: 1,
    step: 0.5,
    minQty: 0.25,
    placeholderName: "مثال: شیر، ماست، آبمیوه...",
    placeholderCal: "مثال: ۱۲۰",
  },
  {
    value: "کف دست",
    label: "کف دست",
    baseQty: 1,
    step: 1,
    minQty: 0.5,
    placeholderName: "مثال: نان سنگک، بربری...",
    placeholderCal: "مثال: ۸۰",
  },
  {
    value: "میلی‌لیتر",
    label: "میلی‌لیتر",
    baseQty: 100,
    step: 25,
    minQty: 10,
    placeholderName: "مثال: شیر، دوغ، نوشیدنی...",
    placeholderCal: "مثال: ۵۰",
  },
  {
    value: "واحد",
    label: "واحد / سهم",
    baseQty: 1,
    step: 1,
    minQty: 0.5,
    placeholderName: "مثال: میوه، پروتئین‌بار...",
    placeholderCal: "مثال: ۱۰۰",
  },
];

export function parseFoodUnit(unitStr?: string): FoodUnitInfo {
  if (!unitStr || !unitStr.trim()) {
    return { isWeight: true, unitLabel: "گرم", baseQty: 100 };
  }

  const raw = unitStr.trim();

  const isWeightOnly = /^(?:[۰-۹\d.]+\s*)?(?:گرم|میلی‌لیتر|g|gram|ml)$/i.test(raw);
  if (isWeightOnly) {
    const numMatch = raw.match(/([۰-۹\d.]+)/);
    let num = 100;
    if (numMatch) {
      const p2e = numMatch[1].replace(/[۰-۹]/g, (d) =>
        String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      );
      num = parseFloat(p2e) || 100;
    }
    const unitLabel = /میلی‌لیتر|ml/i.test(raw) ? "میلی‌لیتر" : "گرم";
    return { isWeight: true, unitLabel, baseQty: num };
  }

  const beforeParen = raw.split(/[\(（]/)[0].trim();

  let baseQty = 1;
  if (beforeParen.startsWith("نصف")) {
    baseQty = 0.5;
  } else {
    const numMatch = beforeParen.match(/^([۰-۹\d.]+)/);
    if (numMatch) {
      const p2e = numMatch[1].replace(/[۰-۹]/g, (d) =>
        String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))
      );
      baseQty = parseFloat(p2e) || 1;
    }
  }

  let cleanUnit = beforeParen.replace(/^(?:نصف|[۰-۹\d.]+)\s*/, "").trim();
  if (!cleanUnit) {
    cleanUnit = "واحد";
  }

  return { isWeight: false, unitLabel: cleanUnit, baseQty };
}
