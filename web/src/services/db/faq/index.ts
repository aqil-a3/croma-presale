import { FAQApiTypes } from "../interface";
import { createNewFAQ } from "./createNewFAQ";
import { getAllFAQ } from "./getAllFAQ";

export const apiFAQ: FAQApiTypes = {
  getAllFAQ,
  createNewFAQ,
};
