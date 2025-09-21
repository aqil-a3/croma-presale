import ReferralTemplate from "@/components/templates/public/ReferralTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral",
};

export default function ReferralPage(){
    return <ReferralTemplate />
}