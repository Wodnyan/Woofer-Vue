import jwt from "jsonwebtoken";

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
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
};
