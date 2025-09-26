"use client";
import { DashboardContainer } from "@/components/layout/container/DashboardContainer";
import { EmailVerification } from "@/featured/dashboard/profile/components/EmailVerification";
import { PersonalInformation } from "@/featured/dashboard/profile/components/PersonalInformation";
import { ProfileTitle } from "@/featured/dashboard/profile/components/title";
import { WalletSettings } from "@/featured/dashboard/profile/components/WalletSettings";

export default function   ProfileTemplate() {
  return (
    <DashboardContainer className="space-y-8">
      <ProfileTitle />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-10">
        <PersonalInformation />
        <div className="space-y-4">
          <EmailVerification />
          <WalletSettings />
        </div>
      </div>
    </DashboardContainer>
  );
}
