import { create } from 'zustand'

const useAuthStore = create((set) => ({

  
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,

  
    loginUser: (token, user) => {

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        set({
            token,
            user
        })
    },

    
    logoutUser: () => {

        localStorage.removeItem('token')
        localStorage.removeItem('user')

        set({
            token: null,
            user: null
        })
    }

}))

export default useAuthStore