import Client from "../database";
import userQuery from "../utils/queries/userQueries"

export type User = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(userQuery.getAllUsers);
      const users = result.rows;

      conn.release();

      return users;
    } catch (err) {
      throw new Error(`Unable to get all users. Error: ${err}`);
    }
  }

  async show(username: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(userQuery.getUsersByUsername, [username]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to find user ${username}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<{ id: string; username: string }> {
    try {
      const conn = await Client.connect();

      const result = await conn.query(userQuery.create, [
        u.firstname,
        u.lastname,
        u.username,
        u.password,
      ]);

      const user = result.rows[0];

      conn.release();

      return { id: user.id, username: user.username };
    } catch (err) {
      throw new Error(`Unable to create user ${u.username}: ${err}`);
    }
  }

  async login(
    username: string
  ): Promise<{ id: string; username: string; password: string }> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(userQuery.getUsersByUsername, [username]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to login user ${username}: ${err}`);
    }
  }

  async delete(username: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(userQuery.delete, [username]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to delete user ${username}. Error: ${err}`);
    }
  }
}