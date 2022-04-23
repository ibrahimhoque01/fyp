import { defineStore } from "pinia";

export const menuStore = defineStore("menuStore", {
  state: () => ({
    menu: [],
  }),

  actions: {
    async getMenu() {
      const res = await fetch("http://localhost:5000/menu");
      const data = await res.json();
      this.menu = data;
    },
  },
});
