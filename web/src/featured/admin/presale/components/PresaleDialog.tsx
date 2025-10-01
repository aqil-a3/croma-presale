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
import { apiPresale } from "../utils";

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
