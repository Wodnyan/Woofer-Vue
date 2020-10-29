import jwt from "jsonwebtoken";
import { User } from "../types";

export const sign = (payload: Object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      // NOTE: If it's not an object it will throw an error
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
};

export const verify = (token: string) => {
  return new Promise((resolve: (user: User) => void, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded: any) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};
