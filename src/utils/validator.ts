import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";

const validate = (checks) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(checks.map((check) => check.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

export { validate };
