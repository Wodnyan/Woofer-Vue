import { Router } from "express";
import Users from "./users.model";

const router = Router();

export const messages = {
  get: "All Users",
};

router.get("/", async (_, res, next) => {
  try {
    const users = await Users.query();
    res.json({
      message: messages.get,
      users,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
