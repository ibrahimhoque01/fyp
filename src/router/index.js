import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ItemView from "../views/ItemView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import OrderView from "../views/OrderView.vue";
import RegisterView from "../views/RegisterView.vue";
import ConfirmationView from "../views/ConfirmationView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/item/:itemId",
    name: "ItemView",
    component: ItemView,
    params: true,
  },
  {
    path: "/checkout",
    name: "CheckoutView",
    component: CheckoutView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },

  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
  },
  {
    path: "/order/:orderId",
    name: "OrderView",
    component: OrderView,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  {
    path: "/confirmation/:orderNumber",
    name: "ConfirmationView",
    component: ConfirmationView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
