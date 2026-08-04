import axios from 'axios'
import useAuthStore from '../store/authStore'

const useApi = axios.create({
    baseURL: 'http://localhost:3000'
})

useApi.interceptors.request.use((config) => {

    const token = useAuthStore.getState().token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default useApi