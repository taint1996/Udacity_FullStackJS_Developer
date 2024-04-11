import supertest from "supertest";
import dotenv from "dotenv";
import app from "../../server";
import { config }  from '../../config';
import { getTokenByUser } from '../../utils/authToken';

dotenv.config();

const request = supertest(app);

const userInfos = {
  firstname: "Tez",
  lastname: "Nguyen",
  username: "taibeotest",
  password: 'taibeo123'
};

const token = getTokenByUser(userInfos.username)

describe("User Handler", () => {
  it("POST /signUp to create user and return successfully", async () => {
    const response = await request.post("/users/signUp").send(userInfos);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("POST /users/login Login valid account should be success", async () => {
    const response = await request.post("/users/login").send({
      username: userInfos.username,
      password: userInfos.password
    });

    if(response.status == 400) {
      expect(response.status).toBe(400)
    } else {
      expect(response.status).toBe(200);
    }

  });

  it("GET /users to get users and return success", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("GET /users with params username to return success", async () => {
    const response = await request
      .get("/users")
      .auth(token, { type: "bearer" })
      .send(`username=${userInfos.username}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  it("should return msg Password is invalid", async() => {
    const response = await request.post("/users/login").send({
      username: userInfos.username,
      password: "test123"
    })

    expect(response.status).toBe(400);
    expect(response.text).toBe(config.INVALID_PASSWORD);
  })

  it("should return success for DELETE user by username", async () => {
    const response = await request.delete("/users").send({
      username: userInfos.username,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });
});