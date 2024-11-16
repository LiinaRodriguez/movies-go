
// ts


import axiosClient from './axiosClient'

export const registerUser = async (user: { name: string, email: string, password: string }) => {
    const response = await axiosClient.post('/api/register', user)
    return response
}

