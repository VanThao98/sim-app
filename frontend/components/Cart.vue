<!-- components/cart.vue -->
<template >
    <div  class="hidden col-span-1 min-h-screen h-auto bg-gray-100 px-2 pt-1 lg:flex flex-col justify-between">
      <div v-if="cartItems.length === 0" class="p-16">Chưa có sản phẩm</div>
      <div v-else>
        <div v-for="item in cartItems" :key="item._id" class="border-b-2 py-5">
          <h1 class="font-bold py-2">SIM Local . Gói {{ item.plan.name }}</h1>
          <div class="flex justify-between">
            <p>Số lượng: {{ item.quantity }}</p>
            <p class="font-bold">{{ item.quantity * item.simPrice }} đ</p>
          </div>
        </div>
      </div>
      
      <div v-if="cartItems.length > 0" :class="currentStep !== 3 ? 'border-t-2':''" class=" pb-16 pt-2">
        <div v-if="currentStep >= 3">
          <div class="flex justify-between">
              <p>{{ cartNumber }} sản phẩm</p>
              <p>{{ totalAmount }} đ</p>
          </div>
          <div class="flex justify-between pb-5">
            <p>Phí vận chuyển</p>
            <p>30000 đ</p>
          </div>
        </div>
        <div :class="currentStep >= 3 ? 'border-t-2':''" class="flex justify-between font-bold">
          <h1>TẠM TÍNH </h1>
          <p v-if="currentStep >= 3" class="font-bold text-rose-500">{{ totalAmount + 30000 }} đ</p>
          <p v-if="currentStep < 3" class="font-bold text-rose-500">{{ totalAmount }} đ</p>
        </div>
        <p class="text-xs">Đã bao gồm VAT</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useCartStore } from '~/stores/cart';
  import { useStepStore } from '~/stores/steps';

  const { currentStep } = useStepStore();
  const { getCartItems } = useCartStore();
  
  const cartItems = computed(() => getCartItems());
  const cartNumber = computed(() => cartItems.value.length);
  
  const totalAmount = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + (item.quantity * item.simPrice), 0);
  });


  </script>
  
  <style scoped></style>
  