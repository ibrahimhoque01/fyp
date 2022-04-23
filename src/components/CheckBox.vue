<template>
  <div class="selection">
    <label :for="topping">{{ topping }}</label>
    <input
      class="selection__check"
      type="checkbox"
      :name="topping"
      :id="topping"
      :value="topping"
      v-model="model"
    />
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { menuStore } from "@/stores/menuStore";

export default {
  name: "CheckBox",
  props: {
    modelValue: Array,
    topping: String,
  },
  emits: ["update:modelValue"],
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>

<style scoped>
.selection {
  padding: 7.5px 10px;
  border-top: 1px solid rgb(216, 216, 216);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.selection label {
  flex: 1;
}
</style>
