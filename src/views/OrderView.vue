<template>
  <div class="container">
    <div class="header__options">
      <router-link class="header__checkout" to="/profile">
        <img class="header__icons" src="@/assets/arrow.svg" alt=""
      /></router-link>
    </div>

    <div class="order">
      <h2 class="order__number">Order #{{ orderId }}</h2>
      <div v-for="item in cart" :key="item.orderNumber" class="order__items">
        <div class="order__item">
          <div class="order__placeholder">
            <img
              :src="require('@/' + item.itemImg)"
              alt=""
              class="order__img"
            />
          </div>
          <div class="order__info">
            <h4>{{ item.itemName }}</h4>

            <p class="order__quantity">Qty: {{ item.itemQuantity }}</p>
            <div
              v-for="extra in item.itemExtras"
              :key="extra"
              class="order__extras"
            >
              <p class="order__extra">{{ extra }}</p>
            </div>
          </div>

          <div class="order__price">
            <h3>£{{ item.itemPrice }}</h3>
          </div>
        </div>
      </div>
    </div>

    <h3>Total: £{{ orderDetails.totalPrice }}</h3>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  name: "OrderView",
  data() {
    return {
      orderId: this.$route.params.orderId,
      cart: [],
    };
  },

  computed: {
    ...mapState(userStore, ["orders", "userName"]),
    orderDetails() {
      const orderNumber = this.orderId;
      return this.orders[0].find((item) => item.orderNumber == orderNumber);
    },
  },

  mounted() {
    this.cart = [...this.orderDetails.cart];
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

.order__number {
  font-size: 3rem;
  color: #f8aa0d;
}

.order__items {
  margin: 15px 0;
}

.order__item {
  padding: 10px 0;
  border-top: 0.5px solid rgb(201, 201, 201);
  display: flex;
  align-items: center;
}

.order__placeholder {
  width: 70px;
  height: 70px;

  margin: 0 5px 0 0;
}

.order__img {
  object-fit: cover;
  border-radius: 15px;
  height: 100%;
  width: 100%;
}

.order__info {
  margin-left: 5px;
  flex: 1;
}

.order__extras {
  display: flex;
  align-items: center;
}

.order__extra {
  color: #f8aa0d;
  font-size: 1.1rem;
}

.order__quantity {
  margin-right: 10px;
}
</style>
