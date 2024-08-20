<template>
    <div>
      <div class="grid grid-cols-3">
        <form @submit="handleSubmit" class="col-span-3 lg:col-span-2 p-4 space-y-3 pb-16 lg:pb-0">
          <h1 class="font-semibold pt-8 pb-3">Thông tin cá nhân:</h1>
          <div class="flex flex-col">
            <label for="name" class="mb-2 font-semibold">Họ và tên:<span class="text-rose-500">*</span></label>
            <input
              placeholder="Tên của bạn là gì"
              id="name"
              v-model="form.name"
              type="text"
              class="p-2 border rounded outline-none"
              @input="clearError('name')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.name" class="text-red-500 text-xs">{{ errors.name }}</span>
          </div>
          <div class="flex flex-col">
            <label for="phone" class="mb-2 font-semibold">Số điện thoại:<span class="text-rose-500">*</span></label>
            <input
              placeholder="+84..."
              id="phone"
              v-model="form.phone"
              type="text"
              class="p-2 border rounded"
              @input="clearError('phone')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.phone" class="text-red-500 text-xs">{{ errors.phone }}</span>
          </div>
          <div class="flex flex-col">
            <label for="email" class="mb-2 font-semibold">Địa chỉ email:<span class="text-rose-500">*</span></label>
            <input
              placeholder="Địa chỉ email của bạn là..."
              id="email"
              v-model="form.email"
              type="email"
              class="p-2 border rounded"
              @input="clearError('email')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
          </div>
          <h1 class="font-semibold pt-8 pb-3">Địa chỉ giao hàng:</h1>
          <div class="flex flex-col">
            <label for="city" class="mb-2 font-semibold">Tỉnh/ Thành phố:<span class="text-rose-500">*</span></label>
            <input
              placeholder="Tỉnh/ thành phố của bạn là gì"
              id="city"
              v-model="form.city"
              type="text"
              class="p-2 border rounded outline-none"
              @input="clearError('city')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.city" class="text-red-500 text-xs">{{ errors.city }}</span>
          </div>
          <div class="flex flex-col">
            <label for="district" class="mb-2 font-semibold">Quận/ Huyện:<span class="text-rose-500">*</span></label>
            <input
              placeholder="Quận/ Huyện của bạn là gì"
              id="district"
              v-model="form.district"
              type="text"
              class="p-2 border rounded outline-none"
              @input="clearError('district')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.district" class="text-red-500 text-xs">{{ errors.district }}</span>
          </div>
          <div class="flex flex-col">
            <label for="ward" class="mb-2 font-semibold">Phường/ Xã:<span class="text-rose-500">*</span></label>
            <input
              placeholder="Xã của bạn là gì"
              id="ward"
              v-model="form.ward"
              type="text"
              class="p-2 border rounded outline-none"
              @input="clearError('ward')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.ward" class="text-red-500 text-xs">{{ errors.ward }}</span>
          </div>
          <div class="flex flex-col">
            <label for="address" class="mb-2 font-semibold">Địa chỉ:<span class="text-rose-500">*</span></label>
            <input
              placeholder="Số nhà, tên đường..."
              id="address"
              v-model="form.address"
              type="text"
              class="p-2 border rounded outline-none text-sm"
              @input="clearError('address')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.address" class="text-red-500 text-xs">{{ errors.address }}</span>
          </div>
          <div class="flex flex-col">
            <label for="note" class="mb-2 font-semibold">Ghi chú:</label>
            <textarea
              placeholder="Ghi chú cho người giao hàng"
              id="note"
              maxlength="505"
              v-model="form.note"
              class="h-[132px] p-2 border rounded outline-none"
              @input="clearError('note')"
              :readonly="isReadOnly"
            />
            <span v-if="errors.note" class="text-red-500 text-xs">{{ errors.note }}</span>
          </div>
          <!-- Hiển thị nút button nếu form hợp lệ -->
           <!-- web -->
          <div :class="currentStep === 3 ? 'hidden' : ''" class="hidden lg:flex justify-end py-8 text-white">
            <button
              :disabled="!isFormValid || isReadOnly"
              :class="!isFormValid || isReadOnly ? 'opacity-50' : ''"
              type="submit"
              class="p-2 bg-[#FF353C] rounded-lg flex items-center"
            >
              <p class="">Tiếp tục</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 h-full">
                <path
                  fill-rule="evenodd"
                  d="M10 2a.75.75 0 0 1 .75.75v12.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <!-- btn mobile -->
          <div :class="currentStep === 3 ? 'hidden' : ''" class="lg:hidden fixed bottom-0 w-full flex justify-center text-white ">
            <button
              :disabled="!isFormValid || isReadOnly"
              :class="!isFormValid || isReadOnly ? 'opacity-50' : ''"
              type="submit"
              class="w-full m-1 mr-7 p-4 bg-[#FF353C] rounded-lg flex items-center justify-center"
            >
              <p class="">Tiếp tục</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 h-full">
                <path
                  fill-rule="evenodd"
                  d="M10 2a.75.75 0 0 1 .75.75v12.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref, computed, watchEffect} from 'vue'
  import * as Yup from 'yup'
  import { useStepStore } from '~/stores/steps'
  
  const { currentStep, setStep } = useStepStore()
  
  // Khởi tạo state cho form và lỗi
  const form = reactive({
    name: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    note: '',
    payment: ''
  })
  
  const errors = ref({})
  
  // Biến trạng thái chỉ đọc
  const isReadOnly = ref(false)
  watchEffect(() => {
  isReadOnly.value = currentStep.value > 2
})
  // Xác thực form với Yup
  const schema = Yup.object().shape({
    name: Yup.string()
      .trim('Tên không được chứa khoảng trắng ở đầu hoặc cuối')
      .min(2, 'Tên phải có ít nhất 2 ký tự')
      .max(50, 'Tên không được vượt quá 50 ký tự')
      .required('Tên là bắt buộc'),
  
    email: Yup.string()
      .trim('Email không được chứa khoảng trắng ở đầu hoặc cuối')
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
  
    phone: Yup.string()
      .matches(/^(?:\+84|0)(3[2-9]|5[6-9]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/, 
          'Số điện thoại phải bắt đầu bằng +84 hoặc 0 và thuộc các nhà mạng hợp lệ tại Việt Nam')
      .required('Số điện thoại là bắt buộc'),
  
    city: Yup.string()
      .required('Tỉnh/Thành phố là bắt buộc')
      .max(100, 'Tỉnh/Thành phố không được vượt quá 100 ký tự'),
  
    district: Yup.string()
      .required('Quận/Huyện là bắt buộc')
      .max(100, 'Quận/Huyện không được vượt quá 100 ký tự'),
  
    ward: Yup.string()
      .required('Phường/Xã là bắt buộc')
      .max(100, 'Phường/Xã không được vượt quá 100 ký tự'),
  
    address: Yup.string()
      .required('Địa chỉ là bắt buộc')
      .max(255, 'Địa chỉ không được vượt quá 255 ký tự')
  })
  
  const isFormValid = computed(() => {
    try {
      schema.validateSync(form, { abortEarly: false })
      return true
    } catch (err) {
      errors.value = {}
      err.inner.forEach((e) => {
        errors.value[e.path] = e.message
      })
      return false
    }
  })
  
  // Xử lý sự kiện gửi form
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid.value){
        console.log('invalid')
        return
    }  
    console.log('valid form')
    console.log('formData:',form)
    
    sessionStorage.setItem('formData', JSON.stringify(form))
    setStep(3)
    isReadOnly.value = true
    
    // Emit event with form data
  }
  
  // Xóa lỗi khi người dùng nhập
  const clearError = (field) => {
    delete errors.value[field]
  }
  </script>
  