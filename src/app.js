import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

// Common middlewares
app.use(express.json({ limit: "500kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ limit: "500kb", extended: true }));
app.use(cookieParser());

// Routes
import userRouter from "./routes/users.routes.js";
app.use("/api/v1/users", userRouter);

export { app };
