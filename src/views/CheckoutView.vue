<template>
  <div class="container">
    <div class="header__options">
      <router-link class="header__checkout" to="/">
        <img class="header__icons" src="@/assets/arrow.svg" alt=""
      /></router-link>
      <router-link class="header__profile" to="/profile">
        <img class="header__icons" src="@/assets/profile.svg" alt=""
      /></router-link>
    </div>

    <div class="cart">
      <h2 class="cart__title">Cart Summary</h2>
      <div v-for="item in cart" :key="item.itemId" class="cart__items">
        <div class="cart__item">
          <div class="item__placeholder">
            <img :src="require('@/' + item.itemImg)" alt="" class="item__img" />
          </div>
          <div class="item">
            <h4>{{ item.itemName }}</h4>
            <div class="item__info">
              <p class="item__qty">Qty: {{ item.itemQuantity }}</p>
              <p class="item__price">• £{{ item.itemPrice }}</p>
            </div>
          </div>

          <div class="details__quantity">
            <button @click="deleteItem(cart.indexOf(item))" class="btn__del">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="checkout__option">
      <button @click="confirmOrder" class="checkout__btn">Place Order</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { cartStore } from "@/stores/cartStore";
import { userStore } from "@/stores/userStore";

export default {
  name: "CheckoutView",
  computed: {
    ...mapState(cartStore, { cart: "cart" }),
    ...mapState(userStore, { userId: "userId" }),
  },
  methods: {
    ...mapActions(cartStore, ["getCartTotal", "checkout", "delCartItem"]),
    ...mapActions(userStore, ["orderHistory"]),
    deleteItem(itemId) {
      console.log(itemId);
      this.delCartItem(itemId);
    },

    confirmOrder() {
      if (this.cart.length > 0) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const order = {
          userId: this.userId,
          orderNumber: randomNumber,
          totalPrice: this.getCartTotal(),
          cart: this.cart,
        };

        this.checkout(order);
        this.$router.push({
          name: "ConfirmationView",
          params: { orderNumber: randomNumber },
        });
      }
    },
  },

  mounted() {
    if (this.cart.length === 0) {
      this.$router.push({ path: "/" });
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

.cart__title {
  font-size: 3rem;
  color: #f8aa0d;
}

.cart__items {
  margin: 15px 0;
}

.cart__item {
  padding: 10px 0;
  border-top: 0.5px solid rgb(201, 201, 201);
  border-bottom: 0.5px solid rgb(201, 201, 201);
  display: flex;
  align-items: center;
}

.item__placeholder {
  width: 70px;
  height: 70px;

  margin: 0 5px 0 0;
}

.item__img {
  object-fit: cover;
  border-radius: 15px;
  height: 100%;
  width: 100%;
}

.item {
  margin-left: 5px;
  flex: 1;
}

.item__info {
  display: flex;
  align-items: center;
}

.item__qty {
  margin-right: 10px;
}

.btn__del {
  width: 100%;
  padding: 5px 10px;

  border: 1px solid #f8aa0d;
  border-radius: 5px;
  background: none;
  font-family: inherit;
  font-weight: 500;
  color: #f8aa0d;
  font-size: 1.4rem;
}

.btn__del:hover,
.btn__del:active {
  background: #f8aa0d;
  color: #fff;
}

.checkout__option {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.checkout__btn {
  margin: 10px auto;
  flex: 0 0 65%;
  background-color: #f8aa0d;
  border: none;
  padding: 10px 0;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 5px;
}
</style>
