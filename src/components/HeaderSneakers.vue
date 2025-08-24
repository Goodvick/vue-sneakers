<script setup>
defineProps({
  totalPrice: Number,
})
</script>

<template>
  <header
    class="flex justify-between items-center border-b-2 border-gray-700 px-2 sm:px-4 md:px-6 pt-4 pb-3 duration-600">

    <RouterLink to="/">
      <div class="flex items-center gap-1 sm:gap-3 duration-600">
        <img class="max-w-8 max-h-8 sm:max-w-12 sm:max-h-12 duration-600" src="/logo.png" alt="logo">
        <div>
          <h1 class="text-[18px] sm:text-[30px] mb-[-5px] sm:mb-[-13px] duration-600">KickZone</h1>
          <p class="text-[8.6px] sm:text-[13.6px] italic text-slate-700 duration-600">магазин кросовок</p>
        </div>
      </div>
    </RouterLink>
    <ul class="flex gap-4 sm:gap-12 lg:gap-15 duration-600 ">
      <li class="flex items-center duration-500 cursor-pointer gap-2 text-sm hover:text-gray-500"
        @click="$emit('openCart')">
        <img src="/cart.svg" alt="">
        <b class="hidden md:inline">{{ totalPrice }} руб.</b>
      </li>
      <RouterLink to="/favorites">
        <li class="flex items-center duration-500 cursor-pointer gap-2 text-sm hover:text-gray-500">
          <img src="/heart.svg" alt="">
          <span class="hidden md:inline">Избранное</span>
        </li>
      </RouterLink>
      <li class="flex items-center duration-500 cursor-pointer gap-2 text-sm  hover:text-gray-500">
        <img src="/profile.svg" alt="">
        <p class="hidden md:inline">Профиль</p>
      </li>
    </ul>
  </header>
</template>
