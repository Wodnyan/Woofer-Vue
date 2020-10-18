import { Router } from "express";
import users from "./users/users.routes";

const router = Router();
router.use("/users", users);

export const messages = {
  get: "Woofer API version 1",
};

router.get("/", (_, res) => {
  res.json({
    message: messages.get,
  });
});

export default router;
