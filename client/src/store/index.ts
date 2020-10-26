import { createStore } from "vuex";
import { User, Woof } from "@/types";

export interface State {
  user: User | null;
  jwt: null | string;
  woofs: Woof[] | [];
}

const state: State = {
  user: null,
  jwt: null,
  woofs: [],
};

export default createStore({
  state,
  mutations: {},
  actions: {},
  modules: {},
});
