import { FAQApiTypes } from "../interface";
import { createNewFAQ } from "./createNewFAQ";
import { editFAQ } from "./editFAQ";
import { getAllFAQ } from "./getAllFAQ";

export const apiFAQ: FAQApiTypes = {
  getAllFAQ,
  createNewFAQ,
  editFAQ
};
