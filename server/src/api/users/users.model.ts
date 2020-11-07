import { Model } from "objection";
import db from "../../db";
import Woofs from "../woofs/woofs.model";
import Likes from "../likes/likes.model";
import jsonSchema from "./users.schema.json";

const connection = async () => {
  await db("users");
};

class Users extends Model {
  id!: number;
  email!: string;
  username!: string;
  password!: string;
  handle!: string;

  static get tableName() {
    return "users";
  }
  static get jsonSchema() {
    return jsonSchema;
  }
  static relationMappings = {
    woofs: {
      relation: Model.HasManyRelation,
      modelClass: Woofs,
      join: {
        from: "users.id",
        to: "woofs.users_id",
      },
    },
    likes: {
      relation: Model.HasManyRelation,
      modelClass: Likes,
      join: {
        from: "users.id",
        to: "likes.users_id",
      },
    },
  };
}
export default Users;
