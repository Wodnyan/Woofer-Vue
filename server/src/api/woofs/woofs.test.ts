import supertest from "supertest";
import app from "../../app";
import { messages } from "./woofs.routes";

describe("GET /api/v1/woofs", () => {
  it("should respond with a message and the list of all woofs", async () => {
    const resp = await supertest(app).get("/api/v1/woofs").expect(200);
    expect(resp.body.message).toEqual(messages.getAll);
    expect(resp.body.woofs.length).toBeGreaterThanOrEqual(0);
  });
});
