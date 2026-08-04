import useApi from '../customHooks/useApi'

export const register = async (user) => {

    const response = await useApi.post(
        '/auth/register',
        user
    )

    return response.data
}

export const login = async (user) => {

    const response = await useApi.post(
        '/auth/login',
        user
    )

    return response.data
}

export const verifyToken = async () => {

    const response = await useApi.get(
        '/auth/verify'
    )

    return response.data
}

export const forgotPassword = async (email) => {

    const response = await useApi.post(
        '/auth/forgot-password',
        { email }
    )

    return response.data
}

export const resetPassword = async (token, password) => {

    const response = await useApi.post(
        '/auth/reset-password',
        {
            token,
            password
        }
    )

    return response.data
}