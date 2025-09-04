<script setup>
import CartListDrawerSneakers from "./CartListDrawerSneakers.vue";
import InfoBlock from "./InfoBlock.vue";

defineProps({
  totalPrice: Number,
  cartButtonDisabled: Boolean
})

</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-60"></div>
  <div
    class="fixed bg-zinc-200 w-3/4 sm:w-5/10 lg:w-3/8 xl:w-2/6 h-9/10 sm:h-full rounded-b-2xl sm:rounded-b-[0px] shadow-[0_0_10px_0.2px_white] top-0 left-[50%] translate-x-[-50%] sm:translate-x-0 sm:left-0 z-11 p-2 sm:p-4 duration-600">
    <div class="flex justify-center sm:justify-between items-center">
      <h2
        class="text-[15px] sm:text-[13px] md:text-[16px] lg:text-[20px] xl:text-[28px] text-center sm:text-start font-semibold duration-600">
        Корзина</h2>
      <div @click="$emit('closeCart')" class="h-[25px] pt-2">
        <svg
          class="-rotate-90 sm:rotate-180 sm:opacity-60 sm:hover:opacity-100 ml-4 sm:ml-0 cursor-pointer hover:-translate-x-1 duration-300"
          width="7" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1l5 5-5 5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

    </div>

    <div v-if="!totalPrice" class="h-full flex items-center">
      <InfoBlock title="Корзина пуста" description="Добавьте товар в корзину, чтобы он отобразился здесь"
        imageUrl="/package-icon.png" />
    </div>

    <div v-else>
      <CartListDrawerSneakers />

      <div v-if="totalPrice" class="mt-5 sm:mt-3 duration-600">
        <div class="flex justify-between mb-3 sm:mb-5 items-center duration-600">
          <span>Итого:</span>
          <b>{{ totalPrice }} руб.</b>
        </div>
        <button :disabled="cartButtonDisabled" @click="() => $emit('createOrder')"
          class="w-full bg-green-500 text-center py-2 rounded-lg disabled:bg-slate-300 hover:opacity-50 duration-600">Оформить
          заказ</button>
      </div>
    </div>

  </div>
</template>
