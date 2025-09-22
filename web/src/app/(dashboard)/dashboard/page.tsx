import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return <DashboardContainer>OK</DashboardContainer>;
}
