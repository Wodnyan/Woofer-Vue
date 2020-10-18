import supertest, { Test } from "supertest";
import { messages } from "./auth.routes";
import app from "../../app";

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
  it("should respond with a message and a token", async () => {
    const resp = await supertest(app)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .set("Accept", "application/json")
      .expect(200);
    expect(resp.body.message).toEqual(messages.signUp);
    expect(resp.body.user).toEqual(testUser);
  });
  it("should respond with error code of 400", async () => {
    const resp = await supertest(app)
      .post("/api/v1/auth/signup")
      .send(testUserBadRequest)
      .set("Accept", "application/json")
      .expect(400);
    expect(resp.body.errors.length).toEqual(4);
  });
});
