<template>
  <div class="register">
    <h1 class="register__title">Register</h1>
    <input
      type="text"
      class="register__name"
      placeholder="Name"
      v-model="name"
    />
    <input
      type="email"
      class="register__email"
      placeholder="Email"
      v-model="email"
    />

    <input
      type="password"
      class="register__password"
      placeholder="Password"
      v-model="password"
    />

    <button class="register__btn" @click="registerUser(name, email, password)">
      Create Account
    </button>
  </div>

  <div class="login">
    <spam>Already have an account yet?</spam
    ><button @click="loginAccount" class="login__btn">Log In</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(userStore, ["registerUser"]),
    loginAccount() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.register {
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

.register__title {
  text-transform: uppercase;
  color: #f9ab0c;
  font-size: 3.5rem;
}

.register__name,
.register__email,
.register__password {
  width: 100%;
  padding: 10px;
  margin: 10px auto;
  border: 0;
  font-family: inherit;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
}

.register__btn {
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

.login {
  display: block;
  position: fixed;
  bottom: 2.5%;
  width: 100%;

  font-size: 1.4rem;
  text-align: center;
}

.login__btn {
  border: none;
  background: none;
  font-family: inherit;
  font-weight: 500;
  color: #f9ab0c;
  padding: 5px;
}
</style>
