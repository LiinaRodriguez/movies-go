import axiosClient from "./axiosClient";

const getType = (mediaType: string) => {
  if (mediaType == "Series") {
    return "tv";
  } else {
    return "movies";
  }
}

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