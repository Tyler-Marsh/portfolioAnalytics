import express, { Request, Response, NextFunction } from "express";
import pg from "pg";
import { promisify } from "util";
import { authenticate } from "../middleware/authenticate.js";
import crypto from "crypto";
const router = express.Router();
import { validateCreateSession, addToSession } from "../utils/validate.js";
import { validate } from "../utils/validator.js";

router.post(
  "/create",
  validate(validateCreateSession),
  authenticate,
  async function (req: Request, res: Response, next: NextFunction) {
    //const session_id = crypto.randomUUID();
    const sql = `INSERT INTO pageview(session_id, website_id, view_timestamp, time_zone, device, browser_language, browser_name, os_name, url)
    VALUES($1, $2, $3, $4,$5, $6, $7, $8, $9)`;
    const pool: pg.Pool = req.app.get("pool");
    const promiseQuery = promisify(pool.query.bind(pool));

    const {
      website_id,
      view_timestamp,
      time_zone,
      device,
      browser_language,
      browser_name,
      os_name,
      url,
      created_at,
      expiration,
      session_id,
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
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "INSERT INTO sessiontable(session_id, created_at, expiration) VALUES($1, $2, $3)",
        [session_id, created_at, expiration]
      );
      await client.query(sql, values);
      await client.query("COMMIT");

      res.status(201).send({ data: "Successfully created the session" });
    } catch (err) {
      await client.query("ROLLBACK");
      //   console.error(err);
      let message = "";
      if (err.contains("pageview_session_id_fkey")) {
        message = "invalid uuid";
      }
      res.status(500).send({ data: { message } });
    } finally {
      client.release();
    }
  }
);

export default router;
