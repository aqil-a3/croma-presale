"use client";

import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { DataTable } from "@/components/organisms/data-table";
import { Button } from "@/components/ui/button";
import { AdminFaqColumns } from "@/featured/admin/faq/components/columnDef";
import { FAQDialog } from "@/featured/admin/faq/components/FAQDialog";
import { FaqClient } from "@/featured/admin/faq/interface";
import { FaqFormValues } from "@/featured/admin/faq/schema";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminFAQTemplate({ data }: { data: FaqClient[] }) {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const router = useRouter();

  const handleAdd = async (data: FaqFormValues) => {
    try {
      await axios.post("/api/faq", data);
      toast.success("Add FAQ data success");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something error");
      throw error;
    }
  };

  return (
    <AdminContainer className="space-y-4">
      <TitleAndSub title="Admin FAQ" sub="Setting FAQ" />
      <Button
        variant={"outline"}
        className="text-black"
        onClick={() => setIsOpenDialog(true)}
      >
        <Plus /> Data
      </Button>
      <DataTable columns={AdminFaqColumns} data={data} />
      <FAQDialog
        onSubmit={handleAdd}
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
      />
    </AdminContainer>
  );
}
