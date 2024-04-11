import jwt, {Secret} from "jsonwebtoken"
import {NextFunction, Request, Response} from "express"
import { config } from "../config";

const SECRET = process.env.TOKEN_SECRET as Secret
const { JWT_TOKEN_SECRET } = process.env;

export const getTokenByUser = (username: string): string => {
  return jwt.sign({ username: username }, JWT_TOKEN_SECRET as unknown as string);
};

export const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  const authorizationHeader = req.headers.authorization; // OR req.header("authorization")

  const token = authorizationHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. Token missing.");
  }

  try {
    jwt.verify(token, JWT_TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
    return;
  }
};

export const checkAuthHeader = (req: Request, res: Response, next: NextFunction): (void | boolean) => {
  if (!req.headers.authorization) {
    res.status(401)
    res.json(config.ACCESS_DENINE_W_INVALID_TOKEN)

    return false
  }

  try {
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, SECRET)

    next()
  } catch (err) {
    console.error(err)

    res.status(401)
    res.json(config.ACCESS_DENINE_W_INVALID_TOKEN)

    return false
  }
}