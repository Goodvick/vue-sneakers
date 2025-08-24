<script setup>
import { ref, provide, watch, computed } from 'vue'
import axios from "axios";

import HeaderSneakers from "./components/HeaderSneakers.vue";
import DrawerSneakers from "./components/DrawerSneakers.vue";

/* Корзина (начало)*/
const cart = ref([])
const cartOpen = ref(false)
const isCreatingOrder = ref(false)

const totalPrice = computed(
  () => cart.value.reduce((acc, item) => acc + item.price, 0)
)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cart.value.length === 0)

const closeCart = () => {
  cartOpen.value = false
}
const openCart = () => {
  cartOpen.value = true
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://bd23efde655de19b.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}
// Функция для добавления товара в корзину
const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
// Функция для удаления товара из корзины
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
},
  { deep: true }
)


provide('cart', {
  cart,
  addToCart,
  removeFromCart,
})
/* Корзина (конец) */


</script>

<template>
  <!-- Крозина -->
  <DrawerSneakers v-if="cartOpen" @close-cart="closeCart" :totalPrice="totalPrice" @create-order="createOrder"
    :cart-button-disabled="cartButtonDisabled" />
  <!-- Шапка -->
  <div class="w-4/5 min-h-screen m-auto mt-10 bg-white rounded-t-xl shadow-xl shadow-orange-600">
    <HeaderSneakers @open-cart="openCart" :totalPrice="totalPrice" />
    <!-- Блок с кросовками -->
    <div class="w-full max-w-9/10 m-auto mt-18 pb-20">
      <RouterView />
    </div>

  </div>
</template>

<style>
@import "tailwindcss";
</style>
