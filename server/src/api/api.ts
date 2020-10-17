import { Router } from "express";

const router = Router();

export const messages = {
  get: "Woofer API version 1",
};

router.get("/", (_, res) => {
  res.json({
    message: messages.get,
  });
});

export default router;
