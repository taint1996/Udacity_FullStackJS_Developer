import express, { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, UserStore } from "../models/user";
import { verifyAuthToken } from "../utils/authToken";

dotenv.config();
const { SALT_ROUNDS, BCRYPT_PEPPER, JWT_TOKEN_SECRET } = process.env;

const store = new UserStore();

const index = async(_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch(err) {
    res.status(400);
    res.json(err)
  }
};

const show = async(req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.username);
    res.json(user);
  } catch(err) {
    res.status(400);
    res.json(err)
  }
};

const signUp = async(req: Request, res: Response) => {
  const salt:string = await bcrypt.genSalt(parseInt(SALT_ROUNDS as string));
  const pepperPwd:string = `${req.body.password}${BCRYPT_PEPPER}`;
  const hashPassword:string = bcrypt.hashSync(pepperPwd, salt);

  try {
    const user: User = {
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      username: req.body.username as string,
      password: hashPassword as string,
    };

    const { id, username } = await store.create(user);
    res.json({ id, username });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const login = async(req: Request, res: Response) => {
  try {
    const login = await store.login(req.body.username as string);

    if (!login) {
      return res.status(400).send({ message: "Username is not existed in the system. Please try again"});
    }

    const pepperPwd = `${req.body.password}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperPwd,
      login.password
    );

    if (!validPassword) {
      return res.status(400).send("Password is invalid.");
    } else {
      const token = jwt.sign(
        { username: login.username },
        JWT_TOKEN_SECRET as string
      );

      res.header("auth-token", token).send({ token });
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async(req: Request, res: Response) => {
  try {
    await store.delete(req.body.username as string);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users/signUp", signUp);
  app.post("/users/login", login);
  app.delete("/users", destroy);
};

export default userRoutes;