"use client";
import { ReferralWithdrawRequestDb } from "@/@types/referrals";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { DataTable } from "@/components/organisms/data-table";
import { referralWithdrawColumns } from "@/featured/admin/referral-withdraw/components/columns";

interface Props {
  data: ReferralWithdrawRequestDb[];
}

export const mockReferralWithdrawRequests: ReferralWithdrawRequestDb[] = [
  {
    id: "a1f2c3d4-e5f6-47a8-9123-abcde001",
    user_id: "user-101",
    wallet_address: "0xA12f9E7C4B92D8EDeF1cA9fE3F6a0E5B7A9B2cE0",
    amount: 50,
    status: "pending",
    created_at: "2025-10-25T10:12:34Z",
    updated_at: "2025-10-25T10:12:34Z",
  },
  {
    id: "b2e3f4a5-c6d7-48b9-8345-bbcde002",
    user_id: "user-102",
    wallet_address: "0xB83a1D4e5C67a89F03FAbE10a3F4b5A6C8E1dC2F",
    amount: 120,
    status: "success",
    admin_id: "admin-01",
    reviewed_at: "2025-10-26T08:21:10Z",
    tx_hash:
      "0x9f87ad54b8e12c45c1f2a3e8e6cbbacde19f456abcde1234ff567890aabbccdd",
    created_at: "2025-10-24T09:50:00Z",
    updated_at: "2025-10-26T08:21:10Z",
  },
  {
    id: "c3f4a5b6-d7e8-49c0-9567-cbcde003",
    user_id: "user-103",
    wallet_address: "0xC65b7aE2bD98f7A8eEcAf52F1B23e7E19C3f7E5D",
    amount: 75,
    status: "failed",
    admin_id: "admin-02",
    reviewed_at: "2025-10-27T07:45:22Z",
    fail_reason: "Insufficient contract balance",
    created_at: "2025-10-26T14:31:00Z",
    updated_at: "2025-10-27T07:45:22Z",
  },
  {
    id: "d4a5b6c7-e8f9-40d1-a789-dbcde004",
    user_id: "user-104",
    wallet_address: "0xD94aC12D56aE98F3bCdF2E9D34A1C4B6E5E4F6A1",
    amount: 200,
    status: "pending",
    created_at: "2025-10-27T09:00:00Z",
    updated_at: "2025-10-27T09:00:00Z",
  },
  {
    id: "e5b6c7d8-f9a0-41e2-b890-ebcde005",
    user_id: "user-105",
    wallet_address: "0xE21fCb43E1Bf7aC9a34B8eF20E7D6C8A3B9D0A4E",
    amount: 35,
    status: "success",
    admin_id: "admin-03",
    reviewed_at: "2025-10-26T11:22:45Z",
    tx_hash:
      "0xabc123def4567890abcd1234ef567890aa11223344556677889900aabbccddeeff",
    created_at: "2025-10-25T13:10:00Z",
    updated_at: "2025-10-26T11:22:45Z",
  },
  {
    id: "f6c7d8e9-a0b1-42f3-c901-fbcde006",
    user_id: "user-106",
    wallet_address: "0xF76E9D13E2aF5B6C7D8A9E0C1B2A3F4E5D6C7B8A",
    amount: 180,
    status: "failed",
    admin_id: "admin-02",
    reviewed_at: "2025-10-27T15:31:00Z",
    fail_reason: "Gas fee too high",
    created_at: "2025-10-26T20:12:00Z",
    updated_at: "2025-10-27T15:31:00Z",
  },
  {
    id: "g7d8e9f0-b1c2-43g4-d012-gbcde007",
    user_id: "user-107",
    wallet_address: "0xA45bCdE23C7a8E1D6F90b123CdEfB6aC7A9E2D1F",
    amount: 90,
    status: "success",
    admin_id: "admin-01",
    reviewed_at: "2025-10-27T08:14:40Z",
    tx_hash:
      "0x33445566778899aabbccddeeff00112233445566778899aabbccddeeff001122",
    created_at: "2025-10-25T10:00:00Z",
    updated_at: "2025-10-27T08:14:40Z",
  },
  {
    id: "h8e9f0a1-c2d3-44h5-e123-hbcde008",
    user_id: "user-108",
    wallet_address: "0xB21fE3D4B9E8C7A6F5D4E3C2B1A0D9E8F7C6B5A4",
    amount: 250,
    status: "pending",
    created_at: "2025-10-28T04:55:00Z",
    updated_at: "2025-10-28T04:55:00Z",
  },
  {
    id: "i9f0a1b2-d3e4-45i6-f234-ibcde009",
    user_id: "user-109",
    wallet_address: "0xC34aB7D9E8C7A6F5D4E3C2B1A0D9E8F7C6B5A4C3",
    amount: 60,
    status: "failed",
    admin_id: "admin-04",
    reviewed_at: "2025-10-27T23:41:00Z",
    fail_reason: "Invalid address format",
    created_at: "2025-10-27T15:10:00Z",
    updated_at: "2025-10-27T23:41:00Z",
  },
  {
    id: "j0a1b2c3-e4f5-46j7-g345-jbcde010",
    user_id: "user-110",
    wallet_address: "0xD87fB1E2C3D4A5F6E7B8C9D0A1B2C3D4E5F6A7B8",
    amount: 500,
    status: "success",
    admin_id: "admin-05",
    reviewed_at: "2025-10-28T06:30:20Z",
    tx_hash:
      "0xdeadbeefcafebabefeedface1234567890abcdef9876543210fedcba12345678",
    created_at: "2025-10-27T14:00:00Z",
    updated_at: "2025-10-28T06:30:20Z",
  },
];

export default function AdminReferralWithdrawTemplate({ data }: Props) {
  return (
    <AdminContainer className="space-y-4">
      <TitleAndSub
        title="Referral Withdraw Request"
        sub="Withdraw request from users"
      />
      <DataTable columns={referralWithdrawColumns} data={data.length === 0 ? mockReferralWithdrawRequests : data} />
    </AdminContainer>
  );
}
