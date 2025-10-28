"use client";
import { ReferralWithdrawRequestDb } from "@/@types/referrals";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { DataTable } from "@/components/organisms/data-table";
import { referralWithdrawColumns } from "@/featured/admin/referral-withdraw/components/columns";
import { mockReferralWithdrawRequests } from "@/featured/admin/referral-withdraw/dummy";

interface Props {
  data: ReferralWithdrawRequestDb[];
}

export default function AdminReferralWithdrawTemplate({ data }: Props) {
  return (
    <AdminContainer className="space-y-4">
      <TitleAndSub
        title="Referral Withdraw Request"
        sub="Withdraw request from users"
      />
      <DataTable
        columns={referralWithdrawColumns}
        data={data.length === 0 ? mockReferralWithdrawRequests : data}
      />
    </AdminContainer>
  );
}
