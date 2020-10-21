import { Model } from "objection";
import Users from "../users/users.model";

class Woofs extends Model {
  id!: number;
  users_id!: number;
  woof!: string;

  static get tableName() {
    return "woofs";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "animals.user_id",
          to: "users.id",
        },
      },
    };
  }
}
export default Woofs;
