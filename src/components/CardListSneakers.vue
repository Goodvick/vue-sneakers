<script setup>
import CardSneakers from "./CardSneakers.vue";

defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite', 'onClickAddCart'])

</script>

<template>
  <!-- Блок кросовок -->
  <div class="block-grid mt-4 sm:mt-8 gap-2 sm:gap-5 md:gap-8 duration-600" v-auto-animate>
    <CardSneakers v-for="item in items" :key="item.id" :id="item.id" :imageUrl="item.imageUrl" :title="item.title"
      :price="item.price" :onClickAdd="() => emit('onClickAddCart', item)"
      :onClickFavorite="() => emit('addToFavorite', item)" :isAdded="item.isAdded" :isFavorite="item.isFavorite" />

  </div>
</template>
