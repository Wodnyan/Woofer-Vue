import { Router, Response, NextFunction } from "express";
import { simpleErrorMessage } from "../../lib/error";
import Woofs from "./woofs.model";
import Users from "../users/users.model";
import { checkAuth } from "../../middlewares/middlewares";
import * as jwt from "../../lib/jwt";
import * as yup from "yup";

const router = Router();
export const messages = {
  getAll: "All woofs",
  getOne: (id: number) => `Woof with the id of ${id}`,
  post: "Created a new woof",
  delete: "Woof deleted",
  liked: "Liked",
  disliked: "Disliked",
};

const schema = yup.object().shape({
  woof: yup.string().trim().min(1).max(256).required(),
  userId: yup.number().positive().required(),
});

const badRequest = (res: Response, next: NextFunction) =>
  simpleErrorMessage(res, next, "Bad Request", 400);

router.get("/", async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = await jwt.verify(token);
    const { handle } = req.query;
    const woofs = await Woofs.query()
      .leftJoinRelated("[user, likes]")
      .select([
        "woofs.id",
        "user.username",
        "user.handle",
        "woofs.woof",
        "woofs.created_at",
      ])
      .count("likes.users_id as likes")
      .groupBy("likes.woofs_id", "user.username", "woofs.id", "user.handle")
      .orderBy("woofs.id", "desc");
    res.json({
      message: messages.getAll,
      woofs,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const woof = await Users.query()
      .join("woofs", "users.id", "=", "woofs.users_id")
      .where({ "woofs.id": id })
      .skipUndefined()
      .select(
        "woofs.id",
        "users.username",
        "users.handle",
        "woofs.woof",
        "woofs.created_at"
      )
      .first();
    if (!woof) {
      return simpleErrorMessage(res, next, "Not Found", 404);
    }
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

router.post("/", checkAuth, async (req, res, next) => {
  const { userId, woof } = req.body as { woof: string; userId: number };
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
    const newWoof = await Woofs.query().insertAndFetch({
      users_id: userId,
      woof,
    });
    const user = await Users.query().where({ id: newWoof.users_id }).first();
    res.status(201).json({
      message: messages.post,
      woof: {
        id: newWoof.id,
        woof: newWoof.woof,
        created_at: newWoof.created_at,
        user: {
          username: user.username,
          handle: user.handle,
        },
      },
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

router.delete("/:id", checkAuth, async (req, res, next) => {
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
