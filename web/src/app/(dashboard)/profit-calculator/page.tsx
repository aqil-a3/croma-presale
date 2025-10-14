import ProfitCalculatorTemplate from "@/components/templates/dashboard/ProfitCalculatorTemplate";
import { apiPresale } from "@/services/db/presale";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Calculator",
};

export default async function ProfitCalculatorPage() {
  const { getAllPresale } = apiPresale;
  const presales = await getAllPresale();
  return <ProfitCalculatorTemplate presales={presales} />;
}
