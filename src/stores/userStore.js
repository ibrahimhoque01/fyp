import { defineStore } from "pinia";
import router from "../router";

export const userStore = defineStore("userStore", {
  state: () => {
    return {
      userId: Number,
      userName: "",
      orders: [],
    };
  },

  actions: {
    async loginUser(email, password) {
      const res = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`
      );

      const data = await res.json();
      if (data.length > 0) {
        this.userId = data[0].id;
        this.userName = data[0].name;
        router.push({ path: "/" });
      }
    },

    async registerUser(userName, userEmail, userPassword) {
      const res = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });

      router.push({ path: "/" });
    },

    async orderHistory() {
      const res = await fetch(
        `http://localhost:5000/orders?userId=${this.userId}`
      );

      const data = await res.json();
      this.orders = [...this.orders, data];
    },
  },
});
