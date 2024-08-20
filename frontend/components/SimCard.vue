<template>

    <div :class="sim.status === 'available' ? '' : 'opacity-50'" class="w-full lg:w-[300px] h-[280px] bg-[#FFF5F5] rounded-3xl pb-5">
        <div class="flex pt-5 h-3/5 justify-center gap-5 lg:gap-9">
            <div class="">
                <h1 class="font-bold text-2xl mb-2">{{ sim.plan.name }}</h1>
                <h2 class="font-bold">{{ sim.plan.dataMonth }}/ tháng</h2>
                <p>{{ sim.plan.dataDay }}/ ngày</p>
                <p>{{ sim.plan.price }} đ/ tháng</p>
            </div>
            <div class="">
                <button class="bg-rose-600 w-full h-5/6 ml-4 px-3 py-16 flex items-center justify-center rounded-2xl">
                    <h1 class="font-bold text-white text-4xl">{{ sim.plan.name }}</h1>
                </button>
            </div>
        </div>
        <div class="flex flex-col px-6">
            <div class="text-rose-500 font-bold text-xl py-2">{{ sim.simPrice }} đ/ SIM</div>
            <div class="quantity-selector flex gap-2">
                <button :disabled="sim.status !== 'available'" @click="decreaseQuantity" class="minus text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor" class="size-12">
                        <path fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <input type="number" v-model="quantity" min="0" readonly
                    class="quantity w-2/3 rounded-xl text-center font-bold" />
                <button :disabled="sim.status !== 'available'" @click="increaseQuantity" class="plus text-[#FF353C]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor" class="size-12">
                        <path fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCartStore } from '~/stores/cart';

const props = defineProps(['sim']);
const { updateCart, getCartItems } = useCartStore();
const quantity = ref(0);

onMounted(() => {
  const itemInCart = getCartItems().find(item => item._id === props.sim._id);
  if (itemInCart) {
    quantity.value = itemInCart.quantity;
  }
});
watch(quantity, (newQuantity) => {
  updateCart({ ...props.sim, quantity: newQuantity });
});

const increaseQuantity = () => {
  quantity.value++;
  updateCart({ ...props.sim, quantity: quantity.value });
};

const decreaseQuantity = () => {
  if (quantity.value > 0) {
    quantity.value--;
    updateCart({ ...props.sim, quantity: quantity.value });
  }
};
</script>

<style scoped></style>