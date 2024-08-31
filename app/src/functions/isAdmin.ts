import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

export const isAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "You Are Not The Admin!" });
  }
};
