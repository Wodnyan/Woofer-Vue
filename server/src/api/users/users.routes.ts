import { Router } from "express";
import { checkAuth } from "../../middlewares/middlewares";
import { verify } from "../../lib/jwt";
import Users from "./users.model";

const router = Router();

export const messages = {
  get: "All Users",
  one: "One User",
};

router.get("/", async (_, res, next) => {
  try {
    const users = await Users.query().select(
      "id",
      "handle",
      "email",
      "username",
      "image_url"
    );
    res.json({
      message: messages.get,
      users,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/check", checkAuth, async (req, res, next) => {
  const { token } = req.cookies;
  const userInfo = await verify(token);
  const user = await Users.query()
    .where({ id: userInfo.id })
    .select("id", "handle", "email", "username", "image_url")
    .first();
  res.json({
    message: messages.one,
    user,
  });
});

export default router;
