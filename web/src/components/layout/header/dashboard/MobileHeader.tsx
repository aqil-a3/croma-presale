import { PANEL_BG_TW } from "@/config/variables";
import { DropdownMenuMobile } from "./DropdownMobile";
import { Button } from "@/components/ui/button";
import { fontPoppins } from "@/config/fonts";
import { shortenAddress } from "@/utils/shortenAddress";
import { useAccount, useDisconnect } from "wagmi";
import { Bell, Copy, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const dummyAddress = "0xc0ffee254729296a45a3885639AC7E10F9d54979"; // FOR DEV MODE

export function MobileHeader() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect({
    mutation: {
      onError: (err) => {
        console.error(err);
        toast.error("Something wrong");
      },
      onSuccess: () =>
        toast.success("Wallet Disconnected! Thanks for Using Cromachain"),
    },
  });
  const router = useRouter();

  return (
    <header
      className={`fixed z-50 w-full ${PANEL_BG_TW} backdrop-blur-3xl p-4 flex justify-between`}
    >
      <DropdownMenuMobile />
      <Button className="bg-white/10 border border-gray-600 rounded-xl">
        <span
          className={`${fontPoppins.className} font-semibold text-[#FFFFFF80] text-sm`}
        >
          {shortenAddress(address ?? dummyAddress)}
        </span>
        <Copy />
      </Button>

      <div className="flex gap-2">
        <Button
          size={"icon"}
          className="bg-white/10 border border-gray-600 rounded-xl"
        >
          <Bell />
        </Button>
        <Button
          size={"icon"}
          className="bg-white/10 border border-gray-600 rounded-xl"
          onClick={() => router.push("/profile")}
        >
          <User />
        </Button>
      </div>
    </header>
  );
}
