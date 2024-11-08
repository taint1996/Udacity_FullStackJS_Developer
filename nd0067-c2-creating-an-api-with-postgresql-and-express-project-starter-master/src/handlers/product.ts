import express, { Request, Response, NextFunction } from "express";
import { Product, ProductStore } from "../models/product";
import { verifyAuthToken } from "../utils/authToken";

const store = new ProductStore();

const index = async(_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch(err) {
    res.status(400);
    res.json(err)
  }
};

const show = async(req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.productName);
    res.json(product);
  } catch(err) {
    res.status(400);
    res.json(err)
  }
};

const create = async(req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name as string,
      price: (req.body.price as unknown) as number,
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async(req: Request, res: Response) => {
  try {
    await store.delete(req.body.productName as string);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products", verifyAuthToken, destroy);
};

export default productRoutes;