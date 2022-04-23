<template>
  <div vclass="container">
    <div class="details">
      <div class="details__hero">
        <router-link class="header__checkout" to="/">
          <img class="header__icons" src="@/assets/arrow.svg" alt=""
        /></router-link>
        <img
          :src="require('@/' + itemDetails.img)"
          alt=""
          class="details__img"
        />
      </div>

      <div class="details__content">
        <div class="details__headings">
          <h3>{{ itemDetails.name }}</h3>
          <p class="details__description">{{ itemDetails.description }}</p>
        </div>

        <div class="details__quantity">
          <button @click="decrement" class="btn__quantity btn__minus">-</button>
          <h2 class="qty">{{ quantity }}</h2>
          <button @click="increment" class="btn__quantity btn__plus">+</button>
        </div>
      </div>

      <div v-show="hasExtras" class="details__extra">
        <h3 class="form-title">Select Toppings</h3>

        <CheckBox
          v-for="topping in itemDetails?.extras"
          :key="topping"
          v-model="toppings"
          :topping="topping"
        />
      </div>

      <div class="details__checkout">
        <div class="details__price">
          <h4>Total Cost</h4>
          <h3>{{ itemDetails.price }}</h3>
        </div>

        <button @click="addItem" class="btn__checkout">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from "../components/CheckBox.vue";
import { mapState, mapActions } from "pinia";
import { menuStore } from "@/stores/menuStore";
import { cartStore } from "@/stores/cartStore";

export default {
  name: "ItemView",
  components: {
    CheckBox,
  },
  data() {
    return {
      id: this.$route.params.itemId,
      quantity: 0,
      toppings: [],
      isCartEmpty: true,
    };
  },
  computed: {
    ...mapState(menuStore, { menu: "menu" }),
    ...mapState(cartStore, { cart: "cart" }),

    itemDetails() {
      const itemId = this.id;
      return this.menu.find((item) => item.id == itemId);
    },
    hasExtras() {
      return this.itemDetails.hasOwnProperty("extras");
    },
  },

  methods: {
    ...mapActions(menuStore, ["getMenu"]),
    ...mapActions(cartStore, ["addToCart"]),
    decrement() {
      this.quantity = this.quantity <= 0 ? 0 : this.quantity - 1;
    },
    increment() {
      this.quantity++;
    },
    addItem() {
      if (this.quantity > 0) {
        const item = {
          itemId: this.id,
          itemName: this.itemDetails.name,
          itemPrice: +(this.itemDetails.price * this.quantity).toFixed(2),
          itemExtras: this.toppings,
          itemQuantity: this.quantity,
          itemImg: this.itemDetails.img,
        };

        this.addToCart(item);
        this.$router.push("/");
      }
    },
  },
  created() {
    this.getMenu();
  },
};
</script>

<style scoped>
.details__hero {
  z-index: -100;
  display: block;
}

.header__checkout {
  position: absolute;
  top: 1%;
  left: 2.5%;
}

.details__img {
  width: 100%;

  object-fit: cover;
}

.details__content {
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: space-around;
  z-index: 100;
  background-color: #fff;
  margin-top: -25px;
  border-radius: 25px 25px 0 0;
}

.details__headings {
  flex: 0 0 80%;
  padding: 25px 0;
}

.details__quantity {
  display: flex;
  align-items: center;
  padding: 25px 0;
}

.btn__quantity {
  border: none;
  margin: 0 5px;
  width: 20px;
  height: 20px;
  border-radius: 2.5px;
}

.btn__minus {
  background: #000;
  color: #fff;
}

.btn__plus {
  background: #f8aa0d;
  color: #fff;
}

.details__description {
  color: rgb(129, 128, 128);
}

.form-title {
  display: block;
  background-color: #000;
  color: #fff;
  font-size: 1.5rem;
  padding: 10px 10px;
}

.btn__checkout {
  background-color: #f8aa0d;
  border: none;
  color: #fff;
  font-size: 1.75rem;
  padding: 10px;
  flex: 0 0 75%;
  border-radius: 5px;
  font-weight: 600;
  box-shadow: 2px 2px 4px rgb(228, 228, 228);
  margin: 0 15px;
}

.details__checkout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 10px 0;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
}
</style>
