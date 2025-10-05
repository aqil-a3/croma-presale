import { createNewPresale } from "./createNewPresale";
import { getActivePresale } from "./getActivePresale";
import { getAllPresale } from "./getAllPresale";
import { patchPresaleStatus } from "./patchPresaleStatus";
import { PresaleApiTypes } from "../interface";

export const apiPresale: PresaleApiTypes = {
  getAllPresale,
  createNewPresale,
  getActivePresale,
  patchPresaleStatus,
};
