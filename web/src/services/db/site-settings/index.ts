import { SiteSettingApiTypes } from "../interface";
import { editSiteSettings } from "./editSiteSettings";
import { getAllSiteSettings } from "./getAllSiteSettings";
import { getReferralAverageBuyAmount } from "./getReferralAverageBuyAmount";

export const apiSiteSettings: SiteSettingApiTypes = {
  getReferralAverageBuyAmount,
  getAllSiteSettings,
  editSiteSettings,
};
