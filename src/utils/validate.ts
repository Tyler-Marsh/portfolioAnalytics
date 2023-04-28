import { body } from "express-validator";

const validateCreateSession = [
  body("website_id")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Numeric website_id required"),
  body("time_zone")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("time_zone required"),
  body("browser_name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("browser name required"),
  body("browser_language")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("browser_language required"),
  body("url")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 1 })
    .withMessage("url required"),
  body("view_timestamp")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("view_timestamp required"),
  body("device")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 2 })
    .withMessage("device required"),
  body("os_name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("os_name required"),
  body("created_at")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("create_at is a required string"),
  body("expiration")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("expiration is a require string"),
];

const addToSession = [
  body("website_id")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Numeric website_id required"),
  body("time_zone")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("time_zone required"),
  body("browser_name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("browser name required"),
  body("browser_language")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("browser_language required"),
  body("url")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 1 })
    .withMessage("url required"),
  body("view_timestamp")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("view_timestamp required"),
  body("device")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 2 })
    .withMessage("device required"),
  body("os_name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("os_name required"),
  body("session_id")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 })
    .withMessage("os_name required"),
];

export { addToSession, validateCreateSession };
