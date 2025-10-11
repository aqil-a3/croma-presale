import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fontOrbitron, fontPoppins } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

interface Props {
    referralLink: string,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function QRDialog({open, referralLink, setOpen} : Props
) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black border border-orange-500">
        <DialogHeader>
          <DialogTitle className={cn(fontOrbitron.className, "text-white text-2xl text-center")}>Your QR Code</DialogTitle>
          <DialogDescription className={cn(fontPoppins.className, "text-white text-xl text-center")}>
            Thiss will redirect you to your referral link
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">

        <QRCodeSVG size={256} value={referralLink} className="bg-white/50 p-2 rounded-2xl" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
