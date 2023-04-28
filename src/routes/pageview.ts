import express, { Request, Response, NextFunction } from "express";
import pg from "pg";
import { promisify } from "util";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();
import { addToSession } from "../utils/validate.js";
import { validate } from "../utils/validator.js";

router.post(
  "/create",
  validate(addToSession),
  authenticate,
  async function (req: Request, res: Response, next: NextFunction) {
    const sql = `INSERT INTO pageview(session_id, website_id, view_timestamp, time_zone, device, browser_language, browser_name, os_name, url)
      VALUES($1, $2, $3, $4,$5, $6, $7, $8, $9)`;
    const pool: pg.Pool = req.app.get("pool");
    const promiseQuery = promisify(pool.query.bind(pool));

    const {
      session_id,
      website_id,
      view_timestamp,
      time_zone,
      device,
      browser_language,
      browser_name,
      os_name,
      url,
      // created_at,
      // expiration,
    } = req.body;

    const values = [
      session_id,
      website_id,
      view_timestamp,
      time_zone,
      device,
      browser_language,
      browser_name,
      os_name,
      url,
    ];

    try {
      await promiseQuery(sql, values);
      res.status(201).send({ data: "Successfully created the session" });
    } catch (err) {
      //console.error(err);
      res.status(500).send({ data: { message: "Something went wrong" } });
    }
  }
);

export default router;
