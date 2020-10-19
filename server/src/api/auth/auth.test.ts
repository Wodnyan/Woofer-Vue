import supertest, { Test } from "supertest";
import { messages } from "./auth.routes";
import app from "../../app";
import { send } from "process";

interface TestUser {
  id?: number;
  username: string;
  password: string;
  email: string;
}

const testUser: TestUser = {
  id: 1,
  username: "test",
  password: "test12345678",
  email: "test@test.com",
};
const testUserBadRequest: TestUser = {
  id: 1,
  username: "",
  password: "sjlkafd",
  email: "testtest.com",
};

describe("Sign Up", () => {
  it("should respond with a message, the created user and a token", async () => {
    const resp = await supertest(app)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .set("Accept", "application/json")
      .expect(201);
    expect(resp.body.message).toEqual(messages.signUp);
    expect(resp.body.user.id).toEqual(1);
    expect(resp.body.user.username).toEqual(testUser.username);
    expect(resp.body.user.email).toEqual(testUser.email);
  });
  it("should respond with error code of 400 and 4 error messages", async () => {
    const resp = await supertest(app)
      .post("/api/v1/auth/signup")
      .send(testUserBadRequest)
      .set("Accept", "application/json")
      .expect(400);
    expect(resp.body.errors.length).toEqual(4);
  });
});

describe("Login", () => {
  it("should respond with a message and the user", async () => {
    const resp = await supertest(app)
      .post("/api/v1/auth/login")
      .send(testUser)
      .set("Accept", "application/json")
      .expect(200);
    expect(resp.body.message).toEqual(messages.login);
    expect(resp.body.user.id).toEqual(1);
    expect(resp.body.user.username).toEqual(testUser.username);
    expect(resp.body.user.email).toEqual(testUser.email);
  });
  it("should respond with error code of 400", async () => {
    const resp = await supertest(app)
      .post("/api/v1/auth/login")
      .send({
        email: testUser.email,
        password: "badPassword",
      })
      .set("Accept", "application/json")
      .expect(400);
  });
  it("should respond with error code of 400", async () => {
    const resp = await supertest(app)
      .post("/api/v1/auth/login")
      .send({
        email: "invalid@email.com",
        password: testUser.password,
      })
      .set("Accept", "application/json")
      .expect(400);
  });
});
