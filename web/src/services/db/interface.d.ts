import { UserDb } from "@/@types/auth";
import {
  GetInvestmentLeaderboardRequest,
  InvestmentLeaderboardItem,
  InvestmentSummary,
} from "@/@types/investment";
import { FullMigrationData } from "@/@types/migration";
import { ReferralDb, ReferralRewardsDB } from "@/@types/referrals";
import { SettingAdminDbKey } from "@/@types/setting-admin";
import { UserFrom, UserReferralStatistic } from "@/@types/user";
import { FaqClient, FaqDb } from "@/featured/admin/faq/interface";
import { PresaleClient, PresaleDb } from "@/featured/admin/presale/interface";
import { AdminInvestmentQuery } from "./investment/getTransactions";

export interface FAQApiTypes {
  getAllFAQ: () => Promise<FaqDb[]>;
  createNewFAQ: (data: FaqClient) => Promise<void>;
}

export interface InvestmentApiTypes {
  getInvestmentSummary(wallet_address: string): Promise<InvestmentSummary>;
  getInvestmentLeaderboard(
    config: GetInvestmentLeaderboardRequest
  ): Promise<InvestmentLeaderboardItem[]>;
  getAllTransactions(config:AdminInvestmentQuery): Promise<InvestmentDb[]>;
  getAllTransactionByAddress(wallet_address: string): Promise<InvestmentDb[]>;
  createNewInvestment(payload: InvestmentClient): Promise<void>;
}

export interface PresaleApiTypes {
  createNewPresale: (data: PresaleClient) => Promise<void>;
  editPresaleData: (data: PresaleClient, presaleId: number) => Promise<void>;
  getActivePresale: () => Promise<PresaleDb>;
  getAllPresale: () => Promise<PresaleDb[]>;
  patchPresaleStatus: (presaleId: number) => Promise<void>;
}

export interface ReferralApiTypes {
  getNewestReferrals: () => Promise<ReferralDb[]>;
  getReferralRewardById: (referrer_id: string) => Promise<ReferralRewardsDB[]>;
}

export interface SiteSettingApiTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editSiteSettings: (key: SettingAdminDbKey, value: any) => Promise<void>;
  getAllSiteSettings: () => Promise<SettingAdminDb[]>;
  getAllAvailablePaymentMethodSettings: () => Promise<string[]>;
  getReferralAverageBuyAmount: () => Promise<number>;
}

export interface UserApiTypes {
  createNewUser: (wallet_address: string) => Promise<void>;
  createNewUserWithReferral: (
    wallet_address: string,
    referral_code: string
  ) => Promise<void>;
  getUserByAddress: (wallet_address?: string) => Promise<UserDb | null>;
  getUserByReferralCode: (referral_code?: string) => Promise<UserDb | null>;
  getUserStatisticByAddress: (
    wallet_address?: string
  ) => Promise<UserReferralStatistic | null>;
  getMigrationDataByAddress: (
    wallet_address: string,
    source: UserFrom
  ) => Promise<FullMigrationData | null>;
}
