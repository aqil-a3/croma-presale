import MyReferralTemplate from "@/components/templates/dashboard/MyReferralTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral",
};

export default function MyReferralPage(){
    return <MyReferralTemplate />
}