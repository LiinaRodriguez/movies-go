import axiosClient from "./axiosClient";



export const getMovies = async (mediaType: string) => {
  try {
    const url = `/movies?type=${mediaType}`
    const response = await axiosClient.get(url);
    return response;
  } catch (error) {
    console.error("Error sending request", error)
        throw error;
  }
}