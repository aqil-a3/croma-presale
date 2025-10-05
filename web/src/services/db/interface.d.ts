import { FaqClient, FaqDb } from "@/featured/admin/faq/interface";
import { PresaleClient, PresaleDb } from "@/featured/admin/presale/interface";

export interface PresaleApiTypes {
  createNewPresale: (data: PresaleClient) => Promise<void>;
  editPresaleData: (data: PresaleClient, presaleId: number) => Promise<void>;
  getActivePresale: () => Promise<PresaleDb>;
  getAllPresale: () => Promise<PresaleDb[]>;
  patchPresaleStatus: (presaleId: number) => Promise<void>;
}

export interface FAQApiTypes {
  getAllFAQ: () => Promise<FaqDb[]>;
  createNewFAQ: (data: FaqClient) => Promise<void>;
}

export interface UserApiTypes {
  createNewUser: (wallet_address: string) => Promise<void>;
}
