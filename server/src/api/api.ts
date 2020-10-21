import { Router } from "express";
import users from "./users/users.routes";
import auth from "./auth/auth.routes";
import woofs from "./woofs/woofs.routes";

const router = Router();
router.use("/users", users);
router.use("/auth", auth);
router.use("/woofs", woofs);

export const messages = {
  get: "Woofer API version 1",
};

router.get("/", (_, res) => {
  res.json({
    message: messages.get,
  });
});

export default router;
