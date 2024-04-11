import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";
import { getTokenByUser } from '../../utils/authToken';

dotenv.config();

const request = supertest(app);

const product = {
  name: "pepper",
  price: 10,
};

const userInfos = {
  firstname: "Tez",
  lastname: "Nguyen",
  username: "taibeotest",
  password: 'taibeo123'
};
const token = getTokenByUser(userInfos.username)

describe("Product /products API Handler Testing...", () => {
  it("POST /products to create a product and success", async () => {
    const res = await request
      .post("/products")
      .auth(token, { type: "bearer" })
      .send(product);

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it("GET /products to show all of products in the system", async () => {
    const res = await request.get("/products");

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it("Get /products with param productName to be success", async () => {
    const res = await request
      .get("/products")
      .send(`productName=${product.name}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it("DELETE /products with bearer token and success", async () => {
    const res = await request
      .delete("/products")
      .auth(token, { type: "bearer" })
      .send({ productName: product.name });

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });
});
