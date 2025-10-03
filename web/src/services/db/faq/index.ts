import { FAQApiTypes } from "../presale/interface";
import { createNewFAQ } from "./createNewFAQ";
import { getAllFAQ } from "./getAllFAQ";

export const apiFAQ: FAQApiTypes = {
  getAllFAQ: getAllFAQ,
  createNewFAQ: createNewFAQ,
};
