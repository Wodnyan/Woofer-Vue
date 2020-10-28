import { NextFunction, Response, Request } from "express";
import { verify } from "../lib/jwt";
import { simpleErrorMessage } from "../lib/error";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    code: statusCode,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    errors: error.errors || undefined,
  });
}

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  try {
    const isTokenValid = await verify(token);
    next();
  } catch (error) {
    simpleErrorMessage(res, next, "Forbidden", 403);
  }
}
