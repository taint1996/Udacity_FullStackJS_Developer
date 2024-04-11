import bcrypt from "bcrypt";
import { OrderStore } from "../order";
import { User, UserStore } from "../user";
import { ProductStore } from "../product";
import dotenv from "dotenv";

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER } = process.env;

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const userInfos = {
  firstname: "Tez",
  lastname: "Nguyen",
  username: "taibeotest",
  password: "taibeo123"
}

const productInstance = {
  name: "banana",
  price: 5
};

dotenv.config();

describe("Order Model Spec", () => {
  beforeAll(async () => {
    const pepperPwd = `${userInfos.password}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPwd = await bcrypt.hashSync(pepperPwd, salt);

    const user: User = {
      ...userInfos,
      password: hashPwd as string,
    };
    
    await userStore.create(user);

    await productStore.create(productInstance);
  });

  it("should defined an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should defined a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should defined a CREATE method", () => {
    expect(store.createOrder).toBeDefined();
  });

  it("should defined a DELETE method", () => {
    expect(store.deleteOrder).toBeDefined();
  });

  it("CREATE method should add an order", async () => {
    // @ts-ignore
    const { status, user_id } = await store.createOrder({
      status: "ordered", // ordered - shipped - delivered
      userId: 3,
    });

    expect({ status, user_id }).toEqual({
      status: "ordered",
      user_id: "3",
    });
  });

  it("INDEX method should return a list of all orders", async () => {
    // @ts-ignore
    const [{ status, user_id }] = await store.index();

    expect({ status, user_id }).toEqual({
      status: "ordered",
      user_id: "3",
    });
  });

  it("SHOW method should return the orders of a user", async () => {
    // @ts-ignore
    const { status, user_id } = await store.show("3");

    expect({ status, user_id }).toEqual({
      status: "ordered",
      user_id: "3",
    });
  });

  it("CREATE order product method should add an order with product quantity and product id", async () => {
    // @ts-ignore
    const { quantity, order_id, product_id } = await store.createOrderProduct({
      quantity: 4,
      orderId: 2,
      productId: 3,
    });

    expect({ quantity, order_id, product_id }).toEqual({
      quantity: 4,
      order_id: "2",
      product_id: "3",
    });
  });

  it("DELETE order product method should remove an order product based on orderProductId", async () => {
    const result = await store.deleteOrderProduct("3");
    // @ts-ignore
    expect(result).toBe(undefined);
  });

  afterAll(async () => {
    await orderStore.deleteOrderProduct("2");
    await productStore.delete(productInstance.name);
    await orderStore.deleteOrder("2");
    await userStore.delete(userInfos.username);
  });
});