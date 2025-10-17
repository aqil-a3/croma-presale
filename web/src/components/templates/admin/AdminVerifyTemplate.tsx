"use client";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useAccount, useSignMessage } from "wagmi";

export default function AdminVerifyTemplate() {
  return (
    <AdminContainer>
      <SiweLoginButton />
    </AdminContainer>
  );
}

export function SiweLoginButton() {
  const { isConnected, address } = useAccount();
  const { signMessageAsync, isPending } = useSignMessage({
    mutation: {
      onSuccess: async (signature, { account, message }) => {
        if (!account) throw new Error("Account is required");
        try {
          await axios.post("/api/auth/verify", {
            address: account,
            siweFor: "croma_presale_admin_dashboard",
            signature,
            message,
          });

          toast.success("You got permission to enter Admin Dashboard");
        } catch (error) {
          console.error(error);
          if (isAxiosError(error)) {
            const data = error.response?.data;

            toast.error(data.message ?? "Something went error");
          }
        }
      },
    },
  });

  const handleSiwe = async () => {
    await signMessageAsync({
      account: address,
      message: "Permission for access admin dashboard",
    });
  };
  return (
    <button onClick={handleSiwe} disabled={!isConnected || isPending}>
      {isPending ? "Signing…" : "Verify wallet"}
    </button>
  );
}
