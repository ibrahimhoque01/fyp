<template>
  <div class="login">
    <div class="login__logo">
      <img src="@/assets/logo.png" alt="" class="logo" />
    </div>

    <input
      type="email"
      class="login__email"
      placeholder="Email"
      v-model="email"
    />

    <input
      type="password"
      class="login__password"
      placeholder="Password"
      v-model="password"
    />

    <button class="login__btn" @click="loginUser(email, password)">
      Log In
    </button>
  </div>

  <div class="register">
    <spam>Don't have an account yet?</spam
    ><button @click="registerAccount" class="register__btn">Sign up</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    ...mapState(userStore, ["userName"]),
  },

  methods: {
    ...mapActions(userStore, ["loginUser"]),
    registerAccount() {
      this.$router.push("/register");
    },
  },
  mounted() {
    if (this.userName) {
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style scoped>
.login {
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

.login__logo {
  width: 225px;
  margin: 0 auto;
}

.login__logo img {
  display: block;
  width: 100%;
}

.login__email,
.login__password {
  width: 100%;
  padding: 10px;
  margin: 10px auto;
  border: 0;
  font-family: inherit;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
}

.login__btn {
  width: 100%;
  padding: 10px 0;
  margin: 25px auto 15px;

  border: none;
  border-radius: 5px;
  background-color: #f9ab0c;
  font-family: inherit;
  font-weight: 600;
  color: #fff;
  font-size: 1.4rem;
}

.register {
  display: block;
  position: fixed;
  bottom: 2.5%;
  width: 100%;

  font-size: 1.4rem;
  text-align: center;
}

.register__btn {
  border: none;
  background: none;
  font-family: inherit;
  font-weight: 500;
  color: #f9ab0c;
  padding: 5px;
}
</style>
