import { DashboardContainer } from "@/components/layout/container/DashboardContainer";

export default function DashboardLoader() {
  return (
    <DashboardContainer>
      <div className="flex h-full w-full items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
      </div>
    </DashboardContainer>
  );
}
