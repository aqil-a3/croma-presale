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
import React, { SetStateAction, useState } from "react";
import { Row } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import { mapDbDataToClienData } from "../mapper";
import { PresaleFormValues } from "../schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

// TODO : Ini waktunya bermasalah. Ga sesuai dengan yang dipilih

export function PresaleDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (val: PresaleFormValues) => {
    try {
      await axios.post("/api/presale", val)
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
      <DialogContent className="max-w-[75%] sm:max-w-[75%]">
        <DialogHeader>
          <DialogTitle>Add Presale Data</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px]">
          <PresaleForm onSubmit={handleSubmit} />
        </ScrollArea>
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
  const defaultValues = mapDbDataToClienData(row.original);
  const router = useRouter();

  const handleSubmit = async (val: PresaleFormValues) => {
    try {
      await axios.put(`/api/presale/${row.original.id}/edit`, val)
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
      <DialogContent className="max-w-[75%] sm:max-w-[75%]">
        <DialogHeader>
          <DialogTitle>Edit Presale Data</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px]">
          <PresaleForm defaultValues={defaultValues} onSubmit={handleSubmit} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
