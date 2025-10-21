import { UserApiTypes } from "../interface";
import { createNewMigrationData } from "./createNewMigrationData";
import { createNewUser } from "./createNewUser";
import { createNewUserWithReferral } from "./createNewUserWithReferral";
import { getMigrationDataByAddress } from "./getMigrationDataByAddress";
import { getUserByAddress } from "./getUserByAddress";
import { getUserByReferralCode } from "./getUserByReferralCode";
import { getUserStatisticByAddress } from "./getUserStatisticByAddress";

export const apiUser: UserApiTypes = {
  createNewUser,
  createNewMigrationData,
  getUserByAddress,
  getUserStatisticByAddress,
  getUserByReferralCode,
  createNewUserWithReferral,
  getMigrationDataByAddress,
};
