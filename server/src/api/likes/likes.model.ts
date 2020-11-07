import { Model } from "objection";

class Likes extends Model {
  id!: number;
  users_id!: number;
  woofs_id!: number;

  static get tableName() {
    return "likes";
  }
}

export default Likes;
