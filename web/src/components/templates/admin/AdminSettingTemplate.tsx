"use client";
import { SettingAdminDb } from "@/@types/setting-admin";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { NumberSetting } from "@/featured/admin/site-setting/components/NumberSetting";
import { PaymentMethod } from "@/featured/admin/site-setting/components/PaymentMethodSetting";
import { AdminSettingProvider } from "@/featured/admin/site-setting/provider";
import { useHasHydrated } from "@/hooks/use-has-hydrated";

interface Props {
  settings: SettingAdminDb[];
}

export default function AdminSettingTemplate({ settings }: Props) {
  const hasHydrated = useHasHydrated;

  if (!hasHydrated) return null;
  return (
    <AdminSettingProvider settings={settings}>
      <AdminContainer className="space-y-6">
        <TitleAndSub title="Admin Setting" sub="Setting" />
        <PannelContainer>
          <NumberSetting settingKey="referral_average_buy_amount" />
          <PaymentMethod />
        </PannelContainer>
      </AdminContainer>
    </AdminSettingProvider>
  );
}
