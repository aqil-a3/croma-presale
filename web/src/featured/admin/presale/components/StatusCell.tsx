import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Row } from "@tanstack/react-table";
import { PresaleDb } from "../interface";
import React, { useState } from "react";
import { useAdminPresaleContext } from "../provider";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiPresale } from "@/services/db/presale";
import { useRouter } from "next/navigation";

export function StatusCell({ row }: { row: Row<PresaleDb> }) {
  const { presales } = useAdminPresaleContext();
  const activePresale = presales.find((presale) => presale.is_active);

  const status = row.original.is_active;
  const id = row.original.id;

  const [open, setOpen] = useState<boolean>(false);

  const label = status ? "Active" : "Non Active";

  const checkedChangeHandler = () => {
    if (status)
      return toast.error(
        "You can only have one active presale. Editing another will automatically deactivate this one."
      );

    setOpen(true);
  };

  return (
    <div className="flex items-center space-x-2 justify-center">
      <Switch
        checked={status}
        onCheckedChange={checkedChangeHandler}
        id={`${id}-presale-status`}
      />
      <Label htmlFor={`${id}-presale-status`}>{label}</Label>
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        activePresale={activePresale}
        row={row}
      />
    </div>
  );
}

const ConfirmationDialog: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  row: Row<PresaleDb>;
  activePresale?: PresaleDb;
}> = ({ open, setOpen, activePresale, row }) => {
  const { patchPresaleStatus } = apiPresale;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clickHandler = async () => {
    try {
      setIsLoading(true);
      await patchPresaleStatus(row.original.id);

      toast.success("Edit Success");
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went Error!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Editing this to active will deactive another automatically
          </DialogDescription>
          {activePresale && (
            <div className="px-4 space-y-8">
              <p>
                <strong>Active Presale : </strong> Stage {activePresale.stage} -
                Phase {activePresale.phase}
              </p>

              <Button onClick={clickHandler} disabled={isLoading}>
                {isLoading ? "Editing..." : "Edit"}
              </Button>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
