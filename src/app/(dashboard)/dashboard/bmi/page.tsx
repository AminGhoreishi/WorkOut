import BMICalculator from "@/modules/dashboard/bmi/BMICalculator";

export const metadata = {
  title: "استارفیت | محاسبه شاخص توده بدنی (BMI)",
  description:
    "محاسبه هوشمند شاخص توده بدنی (BMI) و تحلیل هوشمند تناسب اندام در استارفیت",
};

export default function BMIPage() {
  return <BMICalculator />;
}
