import ReferralCodeTemplate from "@/components/templates/public/ReferralCodeTemplate";
import { apiUser } from "@/services/db/users";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ code: string }>;
}

export const metadata: Metadata = {
  title: "Join With Referral",
};

export default async function RefCodePage({ params }: Props) {
  const { getUserByReferralCode } = apiUser;
  const { code } = await params;
  const userData = await getUserByReferralCode(code);

  if(!userData) redirect("/home")

  return <ReferralCodeTemplate referrer={userData} />;
}
