import { Model } from "objection";
import db from "../../db";
import jsonSchema from "./users.schema.json";

const connection = async () => {
  await db("users");
};

class Users extends Model {
  static get tableName() {
    return "users";
  }
  static get jsonSchema() {
    return jsonSchema;
  }
}
export default Users;
