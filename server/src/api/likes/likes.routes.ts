import { Router } from "express";
import Likes from "./likes.model";

const router = Router();

router.post("/", async (req, res, next) => {
  const { usersId, woofsId } = req.body;
  try {
    await Likes.query().insert({
      users_id: usersId,
      woofs_id: woofsId,
    });
    res.json({
      message: "Hello World",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  const { usersId, woofsId } = req.body;
  try {
    await Likes.query()
      .where({
        users_id: usersId,
        woofs_id: woofsId,
      })
      .delete();
    res.json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
