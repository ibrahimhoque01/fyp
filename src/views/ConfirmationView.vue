<template>
  <div class="container">
    <div class="header__options">
      <router-link class="header__checkout" to="/">
        <img class="header__icons" src="@/assets/arrow.svg" alt=""
      /></router-link>
    </div>

    <div class="order">
      <h2 class="order__title">Thanks for Ordering</h2>
      <h4 class="order__number">Your Order Number is #{{ orderId }}</h4>

      <button @click="returnToHome" class="order__btn">Return to Home</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { userStore } from "@/stores/userStore";
export default {
  name: "ConfirmationView",
  data() {
    return {
      orderId: this.$route.params.orderNumber,
    };
  },
  computed: {
    ...mapState(userStore, ["userId", "userName"]),
  },
  methods: {
    returnToHome() {
      this.$router.push("/");
    },
  },
  mounted() {
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

.order__title {
  font-size: 3rem;
  color: #f8aa0d;
}

.order {
  width: 75%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.order__btn {
  margin: 15px 0;
  width: 75%;
  padding: 5px 10px;

  border: 1px solid #f8aa0d;
  border-radius: 5px;
  background: none;
  font-family: inherit;
  font-weight: 500;
  color: #f8aa0d;
  font-size: 1.4rem;
}

.order__btn:hover,
.order__btn:active {
  background: #f8aa0d;
  color: #fff;
}
</style>
