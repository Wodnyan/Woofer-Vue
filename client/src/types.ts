export interface User {
  id: number;
  username: string;
  email: string;
}
export interface Woof {
  id: number;
  users_id: number;
  woof: string;
  created_at: Date;
}
