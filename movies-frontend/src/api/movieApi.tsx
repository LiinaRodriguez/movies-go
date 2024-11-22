import axiosClient from "./axiosClient";


export const getMovies = async () => {
  try {
    const url = '/movies'
    const response = await axiosClient.get(url);
    return response;
  } catch (error) {
    console.error("Error sending request", error)
        throw error;
  }
}