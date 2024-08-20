<template>
    <div>
        <div class=" grid grid-cols-4">
            <div class="col-span-4 lg:col-span-3 md:ml-10 ">
                <header
                    class="grid grid-cols-2 grid-flow-col py-2 lg:py-2 fixed top-0 bg-white border-b  ">
                    <div class="col-span-1 flex items-center pl-8">
                        <button @click="handleRoute"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" class="size-5 hover:text-rose-500">
                                <path fill-rule="evenodd"
                                    d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
                                    clip-rule="evenodd" />
                            </svg></button>

                    </div>
                    <!-- logo -->
                    <div class="col-span-2"><img alt="Local" class="text-rose-500 w-2/6 md:w-1/6  h-auto "
                            src="/logo-local1.png" style="color: transparent;"></div>
                    <!-- giỏ hàng mobile -->
                     <div>
                        <button @click="stateForm" class="lg:hidden px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                                <path
                                    d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                            </svg>
                        </button>
                    </div>
                </header>
            </div>
            <div class="hidden lg:block col-span-1 text-black bg-gray-100">
                <div class=" px-2 flex items-center h-full font-bold">
                    Giỏ hàng
                </div>
            </div>

        </div>
        <div v-if="isForm" @click="stateForm" class="fixed bottom-0 bg-[#0005] w-screen h-screen mt-20">
            <div class="fixed bottom-0 w-full h-fit bg-white border-t-2 rounded-t-3xl">
                <p class="p-2 text-2xl"><b>Giỏ hàng</b></p>
                <div v-if="cartNumber === 0" class="p-2 py-4 text-slate-500">Không có sản phẩm</div>
                <div v-for="item in cartItems" :key="item._id" class="border-b-2 py-5 p-2 ">
                    <h1 class="font-bold py-2">SIM Local . Gói {{ item.plan.name }}</h1>
                    <div class="flex justify-between text-xl">
                        <p>Số lượng: {{ item.quantity }}</p>
                        <p class="font-bold">{{ item.quantity * item.simPrice }} đ</p>
                    </div>
                </div>

            </div>
        </div>
        <slot />
        <!-- <div class="grid grid-cols-4 border-t-2"> -->
        <!-- <div class="col-span-3 ml-10"> -->
        <!-- <slot />                 -->
        <!-- </div>
            <Cart /> -->
        <!-- </div> -->
    </div>
</template>

<script setup>
    import { useStepStore } from '~/stores/steps';
    import { navigateTo } from 'nuxt/app';
    
    const {currentStep , setStep, setIsForm ,isForm} = useStepStore();
    
    const stateForm = () => {
        console.log('Trước khi đổi:', isForm.value); // In giá trị trước khi thay đổi
    setIsForm(!isForm.value);
        console.log('Sau khi đổi:', isForm.value); // In giá trị sau khi thay đổi
};
   

    const handleRoute = () =>{
        if(currentStep.value === 1){
            navigateTo('/')
        }else{
            if(currentStep.value > 1){
                setStep(currentStep.value - 1)
            }
        }
    }

    import { computed } from 'vue';
    import { useCartStore } from '~/stores/cart';

  const { getCartItems } = useCartStore();
  
  const cartItems = computed(() => getCartItems());
  const cartNumber = computed(() => cartItems.value.length);
</script>

<style scoped></style>