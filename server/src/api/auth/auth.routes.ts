import { Router } from "express";
import Users from "../users/users.model";
import bcrypt from "bcrypt";
import { simpleErrorMessage } from "../../lib/error";
const yup = require("yup");

const router = Router();

export const messages = {
  signUp: "New User Created",
  login: "Successful Login",
  invalidLoginAttemptError: "Invalid Login Attempt",
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
    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      message: messages.signUp,
    });
  } catch (error) {
    if (error.constraint === "users_email_unique") {
      return simpleErrorMessage(res, next, "Email in use.", 409);
    } else if (error.name === "ValidationError") {
      res.status(400);
      next(error);
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  try {
    await schema.validate(
      {
        username: "Don't need it here",
        email,
        password,
      },
      {
        abortEarly: false,
      }
    );
    const user = await Users.query().where({ email }).first();
    if (user) {
      const dehash = await bcrypt.compare(password, user.password);
      if (dehash) {
        res.json({
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
          message: messages.login,
        });
      } else {
        return simpleErrorMessage(
          res,
          next,
          messages.invalidLoginAttemptError,
          400
        );
      }
    } else {
      return simpleErrorMessage(
        res,
        next,
        messages.invalidLoginAttemptError,
        400
      );
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return simpleErrorMessage(
        res,
        next,
        messages.invalidLoginAttemptError,
        400
      );
    } else {
      next(error);
    }
  }
});

export default router;