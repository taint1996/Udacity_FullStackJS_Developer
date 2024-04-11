import Client from "../database";
import productQueries from "../utils/queries/productQueries";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(productQueries.getAll);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all products. Error: ${err}`);
    }
  }

  async show(productName: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(productQueries.getAllProductsByName, [productName]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to find product ${productName}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(productQueries.create, [p.name, p.price]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(productName: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(productQueries.delete, [productName]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Unable to delete product ${productName}. Error: ${err}`);
    }
  }
}