import { defineStore } from "pinia";

export const cartStore = defineStore("cartStore", {
  state: () => {
    return {
      cart: [],
      isCartFull: false,
    };
  },

  actions: {
    async checkout(order) {
      const res = await fetch(`http://localhost:5000/orders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      this.cart = [];
      this.isCartFull = false;
    },
    addToCart(item) {
      this.isCartFull = true;
      this.cart = [...this.cart, item];
      // console.log(this.cart);
    },

    delCartItem(itemId) {
      this.cart.splice(itemId, 1);
      console.log(this.cart);
    },

    getCartTotal() {
      let total = 0;
      for (let i of this.cart) {
        total = total + i.itemPrice;
      }
      return total.toFixed(2);
    },
  },
});
