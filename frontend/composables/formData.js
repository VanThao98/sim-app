// composables/formData.js
import { ref, watch } from 'vue'

export function useFormStore() {
  const formData =ref({
    name: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    note: '',
    payment: ''
    // Thêm các trường khác trong form của bạn
  })

  // Hàm để cập nhật giá trị của form
  const updateForm = (field, value) => {
    formData.value[field] = value
  }
  const FORM = ref({ ...formData.value })

  watch(formData, (newValue) => {
    FORM.value = { ...newValue }
  }, { deep: true })
  // Hàm để đặt lại form
  const resetForm = () => {
    formData.value = {
        name: '',
        phone: '',
        email: '',
        city: '',
        district: '',
        ward: '',
        address: '',
        note: '',
        payment: ''
      // Đặt lại các trường khác về giá trị mặc định
    }
    FORM.value = Object.values(formData.value)
  }

  return {
    formData,
    updateForm,
    resetForm,
    FORM
  }
}
