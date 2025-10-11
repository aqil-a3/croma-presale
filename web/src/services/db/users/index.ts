import { UserApiTypes } from "../interface";
import { createNewUser } from "./createNewUser";
import { getUserByAddress } from "./getUserByAddress";
import { getUserStatisticByAddress } from "./getUserStatisticByAddress";

export const apiUser: UserApiTypes = {
  createNewUser,
  getUserByAddress,
  getUserStatisticByAddress,
};
