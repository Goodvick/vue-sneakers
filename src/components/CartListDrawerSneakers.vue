<script setup>
import { inject } from "vue";

import CartDrawerSneakers from "./CartDrawerSneakers.vue";

const { cart, removeFromCart } = inject('cart')
</script>

<template>
  <div class="max-w-full max-h-7/10 sm:max-h-8/11 mt-5 overflow-y-auto duration-600" v-auto-animate>
    <CartDrawerSneakers v-for="item in cart" :key="item.id" :id="item.id" :imageUrl="item.imageUrl" :title="item.title"
      :price="item.price" @remove-from-cart="() => removeFromCart(item)" />
  </div>
</template>
