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
import React, { SetStateAction } from "react";
import { Row } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import { mapDbDataToClienData } from "../mapper";

export function PresaleDialog() {
  const { createNewPresale } = apiPresale;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-black">
          <Plus /> Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Presale Data</DialogTitle>
        </DialogHeader>

        <PresaleForm onSubmit={async (val) => await createNewPresale(val)} />
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
  // const { createNewPresale } = apiPresale;
  const defaultValues = mapDbDataToClienData(row.original);
  console.log(defaultValues)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Presale Data</DialogTitle>
        </DialogHeader>

        <PresaleForm
          defaultValues={defaultValues}
          onSubmit={async (val) => console.log(val)}
        />
      </DialogContent>
    </Dialog>
  );
}
