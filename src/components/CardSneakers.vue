<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})

</script>

<template>
  <div
    class="content-grid relative shadow-[0_0_10px_0_black] translate-y-3 hover:shadow-[0] hover:translate-y-0 rounded-xl duration-600">
    <img
      class="content-grid_img w-8 h-8 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 cursor-pointer absolute top-0 right-1 duration-600"
      @click="onClickFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="like">
    <img class="m-auto max-h-[173.93px] p-1" :src="imageUrl" alt="sneaker">
    <p
      class="min-h-[36px] text-[10px]/3 md:text-[12px]/4 xl:text-[14px]/4 2xl:text-[16px]/4 font-medium mx-2 duration-600">
      {{ title }} </p>
    <div class="flex justify-between mx-2 mb-1.5 items-center">
      <div class="leading-3 md:leading-4 flex flex-wrap items-center">
        <span class="text-[11px] md:text-[13px] xl:text-[15px] 2xl:text-[17px] font-semibold duration-600">{{ price }}
          руб.</span>
      </div>
      <img class="w-7 h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 border-1 rounded-xl cursor-pointer duration-600"
        @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="add">
    </div>
  </div>

</template>
