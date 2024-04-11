import Client from "../database";
import orderProductQueries from "../utils/queries/orderProductQueries";
import orderQueries from "../utils/queries/orderQueries";

export type Order = {
  status: string;
  userId: number;
};

export type OrderProduct = {
  quantity: number;
  orderId: number;
  productId: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(orderQueries.getAllOrders);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get all orders. Error: ${err}`);
    }
  }

  async show(userId: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(orderQueries.getOrdersByUserId, [userId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to find orders from user ${userId}. Error: ${err}`
      );
    }
  }

  async createOrder(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(orderQueries.create, [o.status, o.userId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to create order. Error: ${err}`);
    }
  }

  async deleteOrder(orderId: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(orderQueries.delete, [orderId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Unable to delete order ${orderId}. Error: ${err}`);
    }
  }

  async createOrderProduct(o: OrderProduct): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(orderProductQueries.create, [
        o.quantity,
        o.orderId,
        o.productId,
      ]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to add product ${o.productId} to order ${o.orderId}: ${err}`
      );
    }
  }

  async deleteOrderProduct(orderProductId: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(orderProductQueries.delete, [orderProductId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to delete order product ${orderProductId}. Error: ${err}`
      );
    }
  }
}