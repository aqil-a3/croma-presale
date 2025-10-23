import { Row } from "@tanstack/react-table";
import { FaqClient } from "../interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useState } from "react";
import { FAQDialog } from "./FAQDialog";
import { FaqFormValues } from "../schema";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FaqDropDownMenu({ row }: { row: Row<FaqClient> }) {
  const [editForm, setEditForm] = useState<boolean>(false);
  const router = useRouter();

  const data: FaqFormValues = {
    title: row.original.title,
    description: row.original.description,
  };

  const handleEdit = async (data: FaqFormValues) => {
    try {
      await axios.put("/api/faq", { data, old: row.original });
      toast.success("Edit FAQ data success");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something error");
      throw error;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setEditForm(true)}>
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FAQDialog
        isOpen={editForm}
        setIsOpen={setEditForm}
        onSubmit={(val) => handleEdit(val)}
        defaultValues={data}
      />
    </>
  );
}
