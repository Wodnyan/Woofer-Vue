import { createStore } from "vuex";
import { User, Woof } from "@/types";

export interface State {
  user: User | null;
  woofs: Woof[] | [];
}

const state: State = {
  user: null,
  woofs: [],
};

export default createStore({
  state,
  mutations: {},
  actions: {},
  modules: {},
});
