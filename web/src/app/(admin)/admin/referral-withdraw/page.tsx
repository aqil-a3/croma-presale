import AdminReferralWithdrawTemplate from "@/components/templates/admin/AdminReferralWithdrawTemplate";
import { getDashboardSession } from "@/services/auth/server.auth";
import { apiReferrals } from "@/services/db/referrals";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Referral Withdraw",
};

export default async function ReferralWithdrawPage() {
  const adminSession = await getDashboardSession();
  if (!adminSession) return notFound();

  const { getAdminReferralWDRequest } = apiReferrals;
  const data = await getAdminReferralWDRequest({ from: 1, to: 100 });

  return <AdminReferralWithdrawTemplate data={data} />;
}
