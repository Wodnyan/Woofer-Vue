import db from "./db";

beforeAll(async (done) => {
  await db.migrate.rollback();
  await db.migrate.latest();
  done();
});
afterAll(async (done) => {
  await db.destroy();
  done();
});
