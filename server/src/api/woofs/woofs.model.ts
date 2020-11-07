import { Model } from "objection";
import path from "path";
import Foobar from "../users/users.model";

class Woofs extends Model {
  id!: number;
  users_id!: number;
  woof!: string;
  created_at!: Date;
  likes!: number;

  static get tableName() {
    return "woofs";
  }
  static relationMappings = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname + "/../users/users.model"),
      join: {
        from: "users.id",
        to: "woofs.users_id",
      },
    },
    // likes: {
    //   relation: Model.,
    //   modelClass: path.join(__dirname + "/../likes/likes.model"),
    //   join: {
    //     from: "likes.woofs_id",
    //     to: "woofs.id",
    //   },
    // },
  };
}
export default Woofs;
