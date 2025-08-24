<script setup>
import { inject, ref, reactive, watch, onMounted, provide } from "vue";
import axios from "axios";

import CardListSneakers from "../components/CardListSneakers.vue";

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const { cart, removeFromCart, addToCart } = inject('cart')

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
// Параметры сортировки по критериям
const onChangeSelect = event => {
  filters.sortBy = event.target.value
}
// Параметры сортировки по названию
const onChangeSearchInput = event => {
  filters.searchQuery = event.target.value
}
// Поиск избранного товара
const fetchFavotites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://bd23efde655de19b.mokky.dev/favorites`)
    items.value = items.value.map(item => {
      const favorite = favorites.find(favorite => favorite.sneakersId === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
    console.log(favorites)
  } catch (err) {
    console.log(err)
  }
}
// Выборка товара из API и его сортировка
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://bd23efde655de19b.mokky.dev/items`, {
      params
    }
    )

    items.value = data.map(obj => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (err) {
    console.log(err)
  }
}
// Вывод товара и отображение избраности(like) на карточке товара
onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavotites()

  items.value = items.value.map(item => ({
    ...item,
    isAdded: cart.value.some(cartItem => cartItem.id === item.id)
  }))
})


watch(filters, fetchItems)
watch(cart, () => {
  items.value = items.value.map(item => ({
    ...item,
    isAdded: false
  }))
})

provide('items', {
  items,
})
</script>

<template>
  <div class="flex items-center justify-between flex-wrap">
    <b class="text-[18px] sm:text-[22px] md:text-[28px] duration-600">Все виды кроссовок</b>
    <div class="flex gap-3 items-center flex-wrap">
      <select @change="onChangeSelect" class="text-[14px] border border-gray-400 rounded-md pl-1 py-[7px] outline-none"
        name="" id="">
        <option value="title">По названию</option>
        <option value="price">По стоимости (убв)</option>
        <option value="-price">По стоимости (возр)</option>
      </select>
      <div class="relative">
        <img class="absolute left-2.5 top-2" src="/search.svg" alt="search">
        <input @input="onChangeSearchInput"
          class="border border-gray-400 rounded-md py-1 pr-2 pl-9 outline-none focus:border-gray-800" type="text"
          placeholder="Поиск...">
      </div>
    </div>
  </div>
  <CardListSneakers :items="items" @add-to-favorite="addToFavorite" @on-click-add-cart="onClickAddCart" />
</template>
