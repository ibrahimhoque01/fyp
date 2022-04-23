<template>
  <div class="item" @click="goToItem(menuItem.id)">
    <div class="item__hero">
      <img
        class="item__img"
        :src="require('@/' + menuItem.img)"
        alt="menu item image"
      />
    </div>

    <div class="item__info">
      <div class="item__desc">
        <h4 class="item__name">{{ menuItem.name }}</h4>
        <h5 class="item__category">{{ menuItem.category }}</h5>
      </div>

      <h3 class="item__price">£{{ menuItem.price }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    menuItem: Object,
  },
  methods: {
    goToItem(id) {
      this.$router.push({
        name: "ItemView",
        params: { itemId: id },
      });
    },
  },
};
</script>

<style scoped>
.item {
  margin: 25px 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 8px 2px#dadada;
}

.item__img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.item__info {
  display: flex;
  align-items: center;
  padding: 10px 10px 25px;
}

.item__desc {
  flex: 1;
  line-height: 1.2;
}

.item__price {
  color: #f8aa0d;
}

.item__name {
  font-size: 1.75rem;
}

.item__category {
  font-weight: 400;
  font-size: 1.65rem;
}

.routerLink {
  text-decoration: none;
  color: #000;
}
</style>
