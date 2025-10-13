"use client";
import { SettingAdminDb } from "@/@types/setting-admin";
import { TitleAndSub } from "@/components/atoms/title/TitleAndSub";
import { AdminContainer } from "@/components/layout/container/AdminContainer";
import { PannelContainer } from "@/components/layout/container/PanelContainer";
import { NumberSetting } from "@/featured/admin/site-setting/components/NumberSetting";
import { AdminSettingProvider } from "@/featured/admin/site-setting/provider";

interface Props {
  settings: SettingAdminDb[];
}

export default function AdminSettingTemplate({ settings }: Props) {
  return (
    <AdminSettingProvider settings={settings}>
      <AdminContainer className="space-y-6">
        <TitleAndSub title="Admin Setting" sub="Setting" />
        <PannelContainer>
          <NumberSetting settingKey="referral_average_buy_amount" />
        </PannelContainer>
      </AdminContainer>
    </AdminSettingProvider>
  );
}
