import { Router, Response, NextFunction } from "express";
import { simpleErrorMessage } from "../../lib/error";
import Woofs from "./woofs.model";
import * as yup from "yup";

const router = Router();
export const messages = {
  getAll: "All woofs",
  getOne: (id: number) => `Woof with the id of ${id}`,
  post: "Created a new woof",
  delete: "Woof deleted",
};

const schema = yup.object().shape({
  woof: yup.string().trim().min(1).max(256).required(),
  userId: yup.number().positive().required(),
});

const badRequest = (res: Response, next: NextFunction) =>
  simpleErrorMessage(res, next, "Bad Request", 400);

router.get("/", async (req, res, next) => {
  const { userId } = req.query;
  try {
    const woofs = await Woofs.query()
      .where({ users_id: userId })
      .skipUndefined();
    res.json({
      userId,
      message: messages.getAll,
      woofs,
    });
  } catch (error) {
    if (error.nativeError.code === "22P02") {
      return badRequest(res, next);
    }
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const woof = await Woofs.query().where({ id }).first();
    if (!woof) {
      return simpleErrorMessage(res, next, "Not Found", 404);
    }
    console.log(woof);
    res.json({
      message: messages.getOne(Number(id)),
      woof,
    });
  } catch (error) {
    if (error.nativeError.code === "22P02") {
      return badRequest(res, next);
    }
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { userId, woof } = req.body;
  try {
    await schema.validate(
      {
        woof,
        userId,
      },
      {
        abortEarly: false,
      }
    );
    const newWoof = await Woofs.query().insert({
      users_id: userId,
      woof,
    });
    res.status(201).json({
      message: messages.post,
      newWoof,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
      return next(error);
    } else if (error.nativeError.code === "23503") {
      return badRequest(res, next);
    }
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Woofs.query().where({ id }).delete();
    res.json({
      message: messages.delete,
    });
  } catch (error) {
    if (error.nativeError.code === "22P02") {
      return badRequest(res, next);
    }
  }
});

export default router;
