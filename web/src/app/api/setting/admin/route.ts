import { SettingAdminDbKey } from "@/@types/setting-admin";
import { getWalletAuth } from "@/lib/auth/wallet";
import { apiSiteSettings } from "@/services/db/site-settings";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { isAdmin } = await getWalletAuth();

  if (!isAdmin)
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  const allowedKeys: SettingAdminDbKey[] = [
    "payment_methods",
    "referral_average_buy_amount",
    "fake_top_buyers",
  ];
  const body = await req.json();
  const settingKey: SettingAdminDbKey = body.settingKey;
  const value: unknown = body.value;
  if (!settingKey)
    return NextResponse.json(
      { message: "Setting Key required" },
      { status: 400 }
    );

  if (!allowedKeys.includes(settingKey))
    return NextResponse.json({ message: "Invalid key" }, { status: 400 });

  const { editSiteSettings } = apiSiteSettings;
  try {
    await editSiteSettings(settingKey, value);
    return NextResponse.json({ message: "Edit Success" });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
