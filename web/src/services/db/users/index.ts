import { UserApiTypes } from "../interface";
import { createNewUser } from "./createNewUser";
import { createNewUserWithReferral } from "./createNewUserWithReferral";
import { getUserByAddress } from "./getUserByAddress";
import { getUserByReferralCode } from "./getUserByReferralCode";
import { getUserStatisticByAddress } from "./getUserStatisticByAddress";

export const apiUser: UserApiTypes = {
  createNewUser,
  getUserByAddress,
  getUserStatisticByAddress,
  getUserByReferralCode,
  createNewUserWithReferral,
};
