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

export const findMovie = async (title: string) => {
  try {
    const url = `/find?movietitle=${title}`
    const response = await axiosClient.get(url)
    return response;
  } catch (error) {
    console.log("Error sending request", error)
    throw error
  }
}

export const getForyou = async (user: { user_id: number, email: string, token: string }) => {
  try {
    const response = await axiosClient.post('/foryou', user)
    return response
}catch (error) {
    console.error("Error during log", error)
    throw error;
}
}

export const addFavorite = async (favorite: { user_id: number, movie_id: string })=>{
  try {
    console.log(favorite)
    const response = await axiosClient.post('/favorites/add', favorite)
    console.log("add fav", response)
  }
  catch (error) {
    console.error("Error sending request", error)
    throw error;
  }
}

export const removeFavorite = async (favorite: { user_id: number, movie_id: string })=>{
  try {
    const response = await axiosClient.post('/favorites/remove', favorite)
    console.log("remove fav", response)
  }
  catch (error) {
    console.error("Error sending request", error)
    throw error;
  }
}

export const getFavorites = async (user: { user_id: number, email: string, token: string }) => {
  try {
    const response = await axiosClient.post("/favorites", user)
    return response
  } catch (error) {
    console.error("Error sending request", error)
    throw error
  }
  
}

export const getRated = async (user: { user_id: number, page: number, pageSize: number }) => {
  try {
    const response = await axiosClient.post('/rated', user)
    return response
  } catch (error) {
    console.error("Error sending request", error)
    throw error
  }
}


export const addRate = async (rating: { user_id: number, movie_id: string, rating:number })=>{
  try {
    console.log(rating)
    const response = await axiosClient.post('/rate', rating)
    console.log("add rate", response)
  }
  catch (error) {
    console.error("Error sending request", error)
    throw error;
  }
}

export const removeRate = async (rating: { user_id: number, movie_id: string,  rating:number })=>{
  try {
    const response = await axiosClient.post('/rate/remove', rating)
    console.log("remove fav", response)
  }
  catch (error) {
    console.error("Error sending request", error)
    throw error;
  }
}