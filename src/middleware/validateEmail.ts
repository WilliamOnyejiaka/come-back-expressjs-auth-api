import { Validator } from "../modules/modules";
import { Request, Response, NextFunction } from "express";

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  !(new Validator()).emailValidator(req.body["email"])
    ? (() =>
        res.status(400).json({
          error: true,
          message: "valid email needed",
        }))()
    : next();
};

export default validateEmail;
