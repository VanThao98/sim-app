// composables/fetchSims.js
import { ref } from 'vue'

export const useFetchSims = async () => {
  const sims = ref([])

  try {
    const { data } = await useFetch('https://sim-server.onrender.com/api/sims/')
    sims.value = data._value.data
  } catch (error) {
    console.error('Error fetching sims:', error)
  }

  return { sims }
}
