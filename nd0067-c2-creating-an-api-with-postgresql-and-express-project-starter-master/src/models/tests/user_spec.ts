import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, UserStore } from "../user";
import dotenv from "dotenv";

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, JWT_TOKEN_SECRET } = process.env;
const store = new UserStore();

const userInfos = {
  firstname: "Tez",
  lastname: "Nguyen",
  username: "taibeotest"
}

const userPwdInstance = 'taibeo123'

dotenv.config();

describe("User Model Spec", () => {
  it("should defined an INDEX method", () => {
    expect(store.index).toBeDefined();
  });

  it("should defined a SHOW method", () => {
    expect(store.show).toBeDefined();
  });

  it("should defined a CREATE method", () => {
    expect(store.create).toBeDefined();
  });

  it("should defined a LOGIN method", () => {
    expect(store.login).toBeDefined();
  });

  it("should defined a DELETE method", () => {
    expect(store.delete).toBeDefined();
  });

  it("CREATE should add a user", async () => {
    const pepperedPwd = `${userPwdInstance}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPwd = bcrypt.hashSync(pepperedPwd, salt);

    const user: User = {
      ...userInfos,
      password: hashPwd as string,
    };

    const { username } = await store.create(user);

    expect({ username }).toEqual({
      username: userInfos.username,
    });
  });

  it("INDEX should return a list of users", async () => {
    const userList = await store.index();
    const { firstname, lastname, username } = userList[0];

    expect([{ firstname, lastname, username }]).toEqual([userInfos]);
  });

  it("SHOW should return a user by username", async () => {
    let { firstname, lastname, username } = await store.show(
      userInfos.username
    );

    expect({ firstname, lastname, username }).toEqual(userInfos);
  });

  it("LOGIN should return a token", async () => {
    const foundUser = await store.login(userInfos.username);
    expect(foundUser).toBeDefined();

    const pepperedPwd = `${userPwdInstance}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperedPwd,
      foundUser.password
    );
    expect(validPassword).toBeTrue();

    const token = jwt.sign(
      { username: foundUser.username },
      JWT_TOKEN_SECRET as string
    );

    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");

    expect(JSON.parse(payload.toString()).username).toBe(userInfos.username);
  });

  it("DELETE should delete a user by username", async () => {
    await store.delete(userInfos.username);
    const result = await store.show(userInfos.username);

    // @ts-ignore
    expect(result).toBe(undefined);
  });
});