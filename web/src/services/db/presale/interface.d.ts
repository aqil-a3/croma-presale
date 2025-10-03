import { FaqClient } from "@/featured/admin/faq/interface";
import { PresaleDb } from "@/featured/admin/presale/interface";

export interface PresaleApiTypes {
  getAllPresale: () => Promise<PresaleDb[]>;
  getActivePresale: () => Promise<PresaleDb>;
  createNewPresale: (data: PresaleClient) => Promise<void>;
}

export interface FAQApiTypes {
  getAllFAQ: () => Promise<FaqClient[]>;
}
