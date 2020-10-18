import supertest from "supertest";
import app from "../../app";
import { messages } from "./users.routes";

describe("GET /api/v1/users", () => {
  it("should respond with a message and the list of all users", async () => {
    const resp = await supertest(app).get("/api/v1/users").expect(200);
    expect(resp.body.message).toEqual(messages.get);
    expect(resp.body.users.length).toBeGreaterThanOrEqual(0);
  });
});
