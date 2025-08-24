<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
})

</script>

<template>
  <div class="flex justify-between items-end sm:items-center p-1.5 mb-2 bg-gray-400 rounded-sm duration-600">
    <div class="flex flex-wrap sm:flex-nowrap justify-center">
      <img class="w-26 h-24 rounded-lg" :src="imageUrl" alt="sneakers">
      <div class="px-1 sm:px-2 pt-2 sm:pt-0">
        <p class="text-[9.5px]/2.5 lg:text-[11px]/3 text-justify font-medium text-white">{{ title }}</p>
        <span class="text-[11px] lg:text-[13px] font-semibold">{{ price }} руб.</span>
      </div>
    </div>
    <img class="cursor-pointer shadow-[0_0_6px_0_rgba(0,0,0,0.6)] hover:shadow-[0] rounded-2xl duration-300"
      @click="$emit('removeFromCart')" src="/close.svg" alt="del">
  </div>
</template>
