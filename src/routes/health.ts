import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    console.log("health route hit");
    return res.sendStatus(200);
  }
);

export default router;
