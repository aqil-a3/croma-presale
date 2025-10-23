import { UserDb } from "@/@types/auth";
import {
  GetInvestmentLeaderboardRequest,
  InvestmentLeaderboardItem,
  InvestmentSummary,
} from "@/@types/investment";
import { MigrationPresaleDb } from "@/@types/migration";
import {
  ReferralBuyBonusDb,
  ReferralDb,
  ReferralRewardsDB,
  ReferralWithdrawRequestUser,
} from "@/@types/referrals";
import { SettingAdminDbKey } from "@/@types/setting-admin";
import { UserFrom, UserReferralStatistic } from "@/@types/user";
import { FaqClient, FaqDb } from "@/featured/admin/faq/interface";
import { PresaleClient, PresaleDb } from "@/featured/admin/presale/interface";
import { AdminInvestmentQuery } from "./investment/getTransactions";

export interface FAQApiTypes {
  createNewFAQ: (data: FaqClient) => Promise<void>;
  editFAQ: (data: FaqDb) => Promise<void>;
  getAllFAQ: () => Promise<FaqDb[]>;
}

export interface InvestmentApiTypes {
  createNewInvestment(payload: InvestmentClient): Promise<void>;
  getAllTransactions(config: AdminInvestmentQuery): Promise<InvestmentDb[]>;
  getAllTransactionByAddress(wallet_address: string): Promise<InvestmentDb[]>;
  getInvestmentSummary(wallet_address: string): Promise<InvestmentSummary>;
  getInvestmentLeaderboard(
    config: GetInvestmentLeaderboardRequest
  ): Promise<InvestmentLeaderboardItem[]>;
}

export interface PresaleApiTypes {
  createNewPresale: (data: PresaleClient) => Promise<void>;
  editPresaleData: (data: PresaleClient, presaleId: number) => Promise<void>;
  getActivePresale: () => Promise<PresaleDb>;
  getAllPresale: () => Promise<PresaleDb[]>;
  patchPresaleStatus: (presaleId: number) => Promise<void>;
}

export interface ReferralApiTypes {
  createNewReferralWithdrawRequest: (
    payload: ReferralWithdrawRequestUser
  ) => Promise<void>;
  getNewestReferrals: () => Promise<ReferralDb[]>;
  getReferralRewardById: (referrer_id: string) => Promise<ReferralRewardsDB[]>;
  getReferralBuyBonusByAddress(
    wallet_address: string
  ): Promise<ReferralBuyBonusDb[]>;
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
  createNewMigrationData: (data: MigrationPresaleDb) => Promise<void>;
  getUserByAddress: (wallet_address?: string) => Promise<UserDb | null>;
  getUserByReferralCode: (referral_code?: string) => Promise<UserDb | null>;
  getUserStatisticByAddress: (
    wallet_address?: string
  ) => Promise<UserReferralStatistic | null>;
  getMigrationDataByAddress: (
    wallet_address: string,
    source: UserFrom
  ) => Promise<MigrationPresaleDb | null>;
}
