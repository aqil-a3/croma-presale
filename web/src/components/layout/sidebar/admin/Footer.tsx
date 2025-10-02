import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAccount, useDisconnect } from "wagmi";

export function AdminDashboardSidebarFooter() {
  const router = useRouter();

  const logoutHandler = async (callBackUrl = "/dashboard") => {
    try {
      await axios.post("/api/auth/logout");
      router.replace(callBackUrl);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { address } = useAccount();
  const { disconnect } = useDisconnect({
    mutation: {
      onError: (err) => {
        console.error(err);
        toast.error("Something wrong");
      },
      onSuccess: async () => {
        await logoutHandler("/home");
        toast.success("Wallet Disconnected! Thanks for Using Cromachain");
      },
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>More...</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{address}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => {
            disconnect();
            router.replace("/home");
          }}
        >
          Disconnect Wallet
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => {
            logoutHandler();
            toast.success("Leave admin dashboard success");
          }}
        >
          Leave Admin Dashboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
