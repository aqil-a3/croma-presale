"use client";

import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { DataTable } from "@/components/organisms/data-table";
import { AdminFaqColumns } from "@/featured/admin/faq/components/columnDef";
import { FAQDialog } from "@/featured/admin/faq/components/FAQDialog";
import { FaqClient } from "@/featured/admin/faq/interface";

export default function AdminFAQTemplate({ data }: { data: FaqClient[] }) {
  return (
    <AdminContainer className="space-y-4">
      <TitleAndSub title="Admin FAQ" sub="Setting FAQ" />
      <FAQDialog />
      <DataTable columns={AdminFaqColumns} data={data} />
    </AdminContainer>
  );
}
