import { defineStore } from "pinia";

export const menuStore = defineStore("menuStore", {
  state: () => ({
    menu: [],
  }),

  actions: {
    async getMenu() {
      const res = await fetch("https://my-json-server.typicode.com/ibrahimhoque01/db.json/menu");
      const data = await res.json();
      this.menu = data;
    },
  },
});
