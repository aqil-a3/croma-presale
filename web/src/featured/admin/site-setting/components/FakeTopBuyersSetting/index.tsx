import { SettingAdminDb } from "@/@types/setting-admin";
import { useAdminSetting } from "../../provider";
import { InvestmentLeaderboardItem } from "@/@types/investment";
import { FakeBuyerSheet } from "./FakeBuyerSheet";

export function FakeTopBuyersSetting() {
  const { settings } = useAdminSetting();
  const fakeTopBuyers = settings.find(
    (setting) => setting.key === "fake_top_buyers"
  ) as SettingAdminDb<InvestmentLeaderboardItem[]> | undefined;
  if (!fakeTopBuyers) return null;

  return (
    <div className="space-y-4">
      <p className="font-semibold">{fakeTopBuyers.label}</p>
      <FakeBuyerSheet fakeBuyers={fakeTopBuyers.value} />
    </div>
  );
}
