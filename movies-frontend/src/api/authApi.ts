

import axiosClient from './axiosClient';

export const registerUser = async (user: { name: string, email: string, password: string }) => {
    try {
        const response = await axiosClient.post('/register', user);
        return response;
    } catch (error) {
        console.error('Error during register:', error);
        throw error;
    }
}

export const logUser = async (user: { email: string, password: string }) => {
    try {
        const response = await axiosClient.post('/login', user)
        return response
    }catch (error) {
        console.error("Error during log", error)
        throw error;
    }
}