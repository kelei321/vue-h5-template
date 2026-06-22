import { ref } from 'vue'

export function useRequest<TData, TArgs extends unknown[]>(
  service: (...args: TArgs) => Promise<TData>
) {
  const data = ref<TData>()
  const loading = ref(false)
  const error = ref<unknown>(null)

  const run = async (...args: TArgs) => {
    loading.value = true
    error.value = null
    try {
      const result = await service(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    run
  }
}
