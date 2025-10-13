import { SiteSettingApiTypes } from "../interface";
import { editSiteSettings } from "./editSiteSettings";
import { getAllAvailablePaymentMethodSettings } from "./getAllAvailablePaymentMethodSettings";
import { getAllSiteSettings } from "./getAllSiteSettings";
import { getReferralAverageBuyAmount } from "./getReferralAverageBuyAmount";

export const apiSiteSettings: SiteSettingApiTypes = {
  getReferralAverageBuyAmount,
  getAllSiteSettings,
  editSiteSettings,
  getAllAvailablePaymentMethodSettings,
};
