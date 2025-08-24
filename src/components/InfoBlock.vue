<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
})
</script>

<template>
  <div class="w-4/6 flex flex-col items-center text-center m-auto ">
    <img class="w-30 h-30" :src="imageUrl" alt="emoji">
    <h2 class="mt-3 text-xl font-medium">{{ title }}</h2>
    <p class="text-gray-500 text-sm">{{ description }}</p>
  </div>

</template>
