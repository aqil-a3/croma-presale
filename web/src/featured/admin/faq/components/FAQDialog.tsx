import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { FaqForm } from "./FAQForm";
import { FaqFormValues } from "../schema";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: {
    title: string;
    description: string;
  }) => void | Promise<void>;

  defaultValues?: FaqFormValues;
}

export function FAQDialog({
  isOpen,
  setIsOpen,
  defaultValues,
  onSubmit,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>FAQ Dialog</DialogTitle>
          <DialogDescription>Add and Edit FAQ Dialog</DialogDescription>
        </DialogHeader>

        <FaqForm defaultValues={defaultValues} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
