import * as express from "express";

export function simpleErrorMessage(
  res: express.Response,
  next: express.NextFunction,
  message: string,
  statusCode: number = 500
) {
  const error = new Error(message);
  res.status(statusCode);
  return next(error);
}
