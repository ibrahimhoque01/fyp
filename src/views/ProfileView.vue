<template>
  <div class="container">
    <div class="header__options">
      <router-link class="header__checkout" to="/">
        <img class="header__icons" src="@/assets/arrow.svg" alt=""
      /></router-link>
    </div>
  </div>

  <h2 class="order__history">Order History</h2>
  <div v-for="order in orders[0]" :key="order" class="order">
    <h2 class="order__number">Order #{{ order.orderNumber }}</h2>
    <button @click="goToOrder(order.orderNumber)" class="btn__view">
      View
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  name: "ProfileView",
  computed: {
    ...mapState(userStore, ["orders", "userId", "userName"]),
  },
  methods: {
    ...mapActions(userStore, ["orderHistory"]),
    goToOrder(orderNumber) {
      this.$router.push({
        name: "OrderView",
        params: { orderId: orderNumber },
      });
    },
  },

  mounted() {
    this.orderHistory();
    if (!this.userName) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped>
.container {
  margin: 0 10px;
}

.header__options {
  display: flex;
  justify-content: space-between;
  margin: 15px 0 5px;
}

.order {
  padding: 10px 0;
  border-top: 0.5px solid rgb(201, 201, 201);
  border-bottom: 0.5px solid rgb(201, 201, 201);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order__number {
  margin: 0 10px;
  font-size: 1.75rem;
  color: #000;
}

.order__history {
  font-size: 2.5rem;
  margin: 5px 10px 15px;
  color: #f8aa0d;
}

.btn__view {
  width: 15%;
  margin: 0 10px;
  padding: 5px 10px;

  border: 1px solid #f8aa0d;
  border-radius: 5px;
  background: none;
  font-family: inherit;
  font-weight: 500;
  color: #f8aa0d;
  font-size: 1.4rem;
}

.btn__view:hover,
.btn__view:active {
  background: #f8aa0d;
  color: #fff;
}
</style>
