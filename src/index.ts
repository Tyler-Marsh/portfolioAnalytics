import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import { pool } from "./utils/database.js";
import sessionRoute from "./routes/session.js";
import pageview from "./routes/pageview.js";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(helmet());
app.enable("trust proxy");

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("pool", pool);

app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});

app.use("/session", sessionRoute);
app.use("/pageview", pageview);
