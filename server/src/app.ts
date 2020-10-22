import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { notFoundHandler, errorHandler } from "./middlewares/middlewares";
import cors from "cors";
import api from "./api/api";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/v1", api);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
