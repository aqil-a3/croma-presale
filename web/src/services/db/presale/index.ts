import { createNewPresale } from "./createNewPresale";
import { getActivePresale } from "./getActivePresale";
import { getAllPresale } from "./getAllPresale";
import { patchPresaleStatus } from "./patchPresaleStatus";
import { PresaleApiTypes } from "../interface";
import { editPresaleData } from "./editPresaleData";
import { getRemainingCRM } from "./getRemainingCRM";

export const apiPresale: PresaleApiTypes = {
  getAllPresale,
  createNewPresale,
  getActivePresale,
  patchPresaleStatus,
  editPresaleData,
  getRemainingCRM
};
