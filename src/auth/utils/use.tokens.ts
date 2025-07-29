import { AuthTokenResult, IuseToken } from '../interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IuseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'token is invalid';
  }
};
