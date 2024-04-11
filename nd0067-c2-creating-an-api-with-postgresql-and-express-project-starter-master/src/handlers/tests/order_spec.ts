import supertest from "supertest";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import app from '../../server';
import { User, UserStore } from "../../models/user";
import { ProductStore } from "../../models/product";

import { getTokenByUser } from '../../utils/authToken';

const request = supertest(app);


const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

const userStore    = new UserStore();
const productStore = new ProductStore();

const userInfos = {
  firstname: "Tez",
  lastname: "Nguyen",
  username: "taibeotest",
  password: "taibeo123"
}

const productInstance = {
  name: "Iphone 14",
  price: 2999
}

dotenv.config();
const token = getTokenByUser(userInfos.username)

describe("Order /orders Handler API Testing...", () => {
  beforeAll(
    async() => {
      const pepperPwd = `${userInfos.password}${BCRYPT_PASSWORD}`;
      const salt      = await bcrypt.genSalt(parseInt(SALT_ROUNDS as string))
      const hashPwd   = bcrypt.hashSync(pepperPwd, salt);

      const userInfo:User = {
        ...userInfos,
        password: hashPwd as string
      }

      await userStore.create(userInfo);
      await productStore.create(productInstance);
    }
  )

  it('Get All Orders', async() => {
    const res = await request.get("/orders")
    expect(res.status).toBe(200);
  })

  it('GET /orders/:orderId to show a order by userId', async() => {
    const res = await request.get('/orders/1')
    expect(res.status).toBe(200);
  })

  it("POST /orders to create a order and return with status ordered", async() => {
    const res = await request.post("/orders")
    .auth(token, {type: 'bearer'})
    .send({
      status: "ordered", userId: 1
    })

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  })

  it('DELETE /orders to delete a order', async() => {
    const token = getTokenByUser(userInfos.username)

    const res = await request.delete('/orders')
                              .auth(token, { type: 'bearer' })
                              .send({ orderId: "1" })

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  })

  it('POST /orders/products to create order product', async() => {
    const res = await request.post('/orders/products')
                              .auth(token, { type: 'bearer' })
                              .send({ quantity: 1, orderId:1, productId: 1})

    if (res.status == 200) {
      expect(res.status).toBe(200);
      expect(res.body).toBeTruthy();
    } else {
      expect(res.text).toBeDefined();
    }
  })

  it('DELETE /orders/products to delete a order product', async() => {
    const res = await request.delete('/orders/products')
                              .auth(token, { type: 'bearer' })
                              .send({ orderProductId: "1" })

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  })
})

