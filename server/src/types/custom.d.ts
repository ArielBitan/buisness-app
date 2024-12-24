import { I_UserWithoutPassword } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserWithoutPassword;
    }
  }
}
