"use client";

import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { DataTable } from "@/components/organisms/data-table";
import { adminPresaleColumns } from "@/featured/admin/presale/components/ColumnDef";
import { PresaleDialog } from "@/featured/admin/presale/components/PresaleDialog";
import { PresaleDb } from "@/featured/admin/presale/interface";

export default function AdminPresaleTemplate({data}:{data:PresaleDb[]}) {
  return (
    <AdminContainer className="space-y-4">
      <TitleAndSub title="Admin Presale" sub="Setting presale stage" />
      <PresaleDialog />
      <DataTable columns={adminPresaleColumns} data={data} />
    </AdminContainer>
  );
}
