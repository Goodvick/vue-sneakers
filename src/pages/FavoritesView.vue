<script setup>
import { onMounted, ref, inject, watch } from "vue";
import axios from "axios";

import CardListSneakers from "../components/CardListSneakers.vue";

const favorites = ref([])

const { cart, items, removeFromCart, addToCart } = inject('cart', 'items')

//Добавление/удаление товара из корзины
const onClickAddCart = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}
// Добавление/удаление в/из избранное
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        sneakersId: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://bd23efde655de19b.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://bd23efde655de19b.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }

}

onMounted(async () => {
  try {
    const { data } = await axios.get('https://bd23efde655de19b.mokky.dev/favorites')

    favorites.value = data.map(obj => obj.item)
  } catch (err) {
    console.log(err)
  }
})

watch(cart, () => {
  items.value = items.value.map(item => ({
    ...item,
    isAdded: false
  }))
})

</script>


<template>
  <CardListSneakers :items="favorites" @add-to-favorite="addToFavorite" @on-click-add-cart="onClickAddCart" />


</template>
