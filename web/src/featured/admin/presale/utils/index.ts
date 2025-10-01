import { PresaleApiTypes } from "../interface";
import { createNewPresale } from "./createNewPresale";
import { getAllPresale } from "./getAllPresale";

export const apiPresale: PresaleApiTypes = {
  getAllPresale: getAllPresale,
  createNewPresale:createNewPresale
};
