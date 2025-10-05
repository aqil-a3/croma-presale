import { FaqClient, FaqDb } from "@/featured/admin/faq/interface";
import { PresaleDb } from "@/featured/admin/presale/interface";

export interface PresaleApiTypes {
  getAllPresale: () => Promise<PresaleDb[]>;
  getActivePresale: () => Promise<PresaleDb>;
  createNewPresale: (data: PresaleClient) => Promise<void>;
}

export interface FAQApiTypes {
  getAllFAQ: () => Promise<FaqDb[]>;
  createNewFAQ: (data: FaqClient) => Promise<void>;
}

export interface UserApiTypes {
  createNewUser: (wallet_address: string) => Promise<void>;
}
