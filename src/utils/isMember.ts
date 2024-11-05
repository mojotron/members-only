import { Request } from "express";
import { AppUserType } from "../types/userTypes";

const isMember = (req: Request): boolean => {
  if (req.user === undefined) return false;
  const user = req.user as AppUserType;

  return user.member;
};

export default isMember;
