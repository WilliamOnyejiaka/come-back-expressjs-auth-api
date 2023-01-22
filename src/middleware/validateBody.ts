import { Validator } from "../modules/modules";
import { Request, Response, NextFunction } from "express";

const validateBody =
  (neededAttributes: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validationResponse = new Validator().validateBody(
      req.body,
      neededAttributes
    );

    validationResponse["error"]
      ? (() => res.status(400).json(validationResponse))()
      : next();
  };

export default validateBody;
