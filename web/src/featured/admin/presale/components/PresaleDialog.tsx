import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { PresaleForm } from "./PresaleForm";
import { apiPresale } from "../../../../services/db/presale";
import React, { SetStateAction, useState } from "react";
import { Row } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import { mapDbDataToClienData } from "../mapper";
import { PresaleFormValues } from "../schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// TODO : Ini waktunya bermasalah. Ga sesuai dengan yang dipilih

export function PresaleDialog() {
  const { createNewPresale } = apiPresale;
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (val: PresaleFormValues) => {
    try {
      await createNewPresale(val);
      toast.success("Add Presale Success!");
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-black">
          <Plus /> Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Presale Data</DialogTitle>
        </DialogHeader>

        <PresaleForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export function PresaleEditDialog({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  row: Row<PresaleDb>;
}) {
  const { editPresaleData } = apiPresale;
  const defaultValues = mapDbDataToClienData(row.original);
  const router = useRouter();

  const handleSubmit = async (val: PresaleFormValues) => {
    try {
      await editPresaleData(val, row.original.id);
      toast.success("Edit Presale Success!");
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Presale Data</DialogTitle>
        </DialogHeader>

        <PresaleForm defaultValues={defaultValues} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
