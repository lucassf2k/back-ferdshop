import * as JWT from 'jsonwebtoken';

export type UserPayload = {
  user: {
    id: string;
    email: string;
    role: string;
  };
};
export type JwtPayload = UserPayload & { iat: number; exp: number };

export const JwtService = Object.freeze({
  sign: JWT.sign,
  verify: JWT.verify,
});
