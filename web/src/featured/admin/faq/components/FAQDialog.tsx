import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { FaqForm } from "./FAQForm";
import { apiFAQ } from "@/services/db/faq";
import { toast } from "sonner";
import { FaqFormValues } from "../schema";
import { useRouter } from "next/navigation";

export function FAQDialog() {
  const { createNewFAQ } = apiFAQ;
  const router = useRouter();

  const handleAdd = async (data: FaqFormValues) => {
    try {
      await createNewFAQ(data);
      toast.success("Add FAQ data success");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something error");
      throw error;
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-black">
          <Plus /> Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Faq Data</DialogTitle>
        </DialogHeader>

        <FaqForm onSubmit={handleAdd} />
      </DialogContent>
    </Dialog>
  );
}

// export function PresaleEditDialog({
//   open,
//   setOpen,
//   row,
// }: {
//   open: boolean;
//   setOpen: React.Dispatch<SetStateAction<boolean>>;
//   row: Row<PresaleDb>;
// }) {
//   // const { createNewPresale } = apiPresale;
//   const defaultValues = mapDbDataToClienData(row.original);
//   console.log(defaultValues)
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Presale Data</DialogTitle>
//         </DialogHeader>

//         <PresaleForm
//           defaultValues={defaultValues}
//           onSubmit={async (val) => console.log(val)}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// }
