<template>
  <header>
    <div class="header__main">
      <h3 class="header__msg">Welcome Back</h3>
      <h1 class="header__name">{{ userName }}</h1>
    </div>

    <div class="header__options">
      <router-link class="header__checkout" to="/checkout">
        <img class="header__icons" src="@/assets/checkout-default.svg" alt=""
      /></router-link>
      <router-link class="header__profile" to="/profile">
        <img class="header__icons" src="@/assets/profile.svg" alt=""
      /></router-link>
    </div>
  </header>

  <div class="filter">
    <button
      @click="changeFilter('All')"
      :class="[activateBtn('All'), 'filter__btn']"
      type="button"
    >
      All
    </button>
    <button
      @click="changeFilter('Burgers')"
      :class="[activateBtn('Burgers'), 'filter__btn']"
      type="button"
    >
      Burgers
    </button>
    <button
      @click="changeFilter('Sides')"
      :class="[activateBtn('Sides'), 'filter__btn']"
      type="button"
    >
      Sides
    </button>
    <button
      @click="changeFilter('Drinks')"
      :class="[activateBtn('Drinks'), 'filter__btn']"
      type="button"
    >
      Drinks
    </button>
  </div>

  <div class="menu" v-for="item in filterMenu" :key="item.id">
    <Item :menuItem="item" />
  </div>

  <div v-show="isCartFull" class="checkout__option">
    <button @click="goToCheckout" class="checkout__btn">
      Checkout ({{ cart.length }})
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import Item from "../components/Item.vue";
import { mapState, mapActions } from "pinia";
import { menuStore } from "@/stores/menuStore";
import { cartStore } from "@/stores/cartStore";
import { userStore } from "@/stores/userStore";

export default {
  name: "HomeView",
  components: { Item },
  data() {
    return {
      filterCategory: "All",
      menuFilter: [],
      activeBtn: "All",
    };
  },
  computed: {
    ...mapState(menuStore, { menu: "menu" }),
    ...mapState(userStore, { userName: "userName" }),
    ...mapState(cartStore, { cart: "cart", isCartFull: "isCartFull" }),
    filterMenu() {
      if (this.filterCategory === "All") {
        this.menuFilter = [...this.menu];
      } else {
        this.menuFilter = this.menu.filter(
          (item) => item.category === this.filterCategory
        );
      }
      return this.menuFilter;
    },
  },
  methods: {
    ...mapActions(menuStore, ["getMenu"]),
    changeFilter(category) {
      this.filterCategory = category;
      this.activeBtn = category;
    },

    activateBtn(id) {
      return this.activeBtn === id ? "active" : "";
    },

    goToCheckout() {
      this.$router.push("/checkout");
    },
  },
  created() {
    this.getMenu();
  },

  mounted() {
    if (!this.userName) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  margin: 15px 10px;
}

.header__main {
  flex: 1;
  line-height: 1.1;
}

.header__msg {
  font-weight: 400;
}

.header__name {
  font-weight: 600;
  color: #f8aa0d;
}

.header__icons {
  padding: 0 5px;
}

.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 10px;
}

.filter__btn {
  font-size: 1.6rem;
  padding: 5px 10px;
  width: fit-content;
  background-color: #fff;
  border: 1.5px solid #f8aa0d;
  border-radius: 15px;
}

.active {
  color: #fff;
  background-color: #f8aa0d;
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
