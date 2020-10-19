import { Router } from "express";
import Users from "../users/users.model";
import bcrypt from "bcrypt";
const yup = require("yup");

const router = Router();

export const messages = {
  signUp: "New User Created",
};

const schema = yup.object().shape({
  username: yup.string().trim().min(2).max(100).required(),
  email: yup.string().email().required(),
  password: yup.string().trim().min(8).max(200).required(),
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body as {
    username: string;
    email: string;
    password: string;
  };
  try {
    await schema.validate(
      {
        username,
        email,
        password,
      },
      {
        abortEarly: false,
      }
    );
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.query().insert({
      username,
      email,
      password: hashedPassword,
    });
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      message: messages.signUp,
    });
  } catch (error) {
    if (error.constraint === "users_email_unique") {
      const error = new Error("Email in use.");
      res.status(409);
      return next(error);
    } else if (error.name === "ValidationError") {
      res.status(400);
      next(error);
    }
    next(error);
  }
});

router.post("/login", (req, res, next) => {});

export default router;
