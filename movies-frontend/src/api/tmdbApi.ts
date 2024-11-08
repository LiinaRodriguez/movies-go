import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export const category = {
  movie: 'movie',
  tv: 'tv'
}

export const movieType = {
  upcoming: 'upcoming', 
  popular: 'popular',
  top_rated:'top_rated'
}

export const tvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air:'on_the_air'
}

interface Params {
  [key: string]: string | number;
}

const tmdbApi = {
  getMoviesList: (type: keyof typeof movieType, params: Params): Promise<AxiosResponse> => {
    const url = 'movie/' + movieType[type];
    return axiosClient.get(url, { params });
  },
  getTvList: (type: keyof typeof tvType, params: Params): Promise<AxiosResponse> => {
    const url = 'tv/' + tvType[type];
    return axiosClient.get(url, { params });
  },
  getVideos: (cate: keyof typeof category, id: string | number): Promise<AxiosResponse> => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosClient.get(url, { params: {} });
  },
  search: (cate: keyof typeof category, params: Params): Promise<AxiosResponse> => {
    const url = 'search/' + category[cate];
    return axiosClient.get(url, { params });
  },
  detail: (cate: keyof typeof category, id: string | number, params: Params): Promise<AxiosResponse> => {
    const url = category[cate] + '/' + id;
    return axiosClient.get(url, { params });
  },
  credits: (cate: keyof typeof category, id: string | number): Promise<AxiosResponse> => {
    const url = category[cate] + '/' + id + '/credits';
    return axiosClient.get(url, { params: {} })
  },
  similar: (cate: keyof typeof category, id: string | number): Promise<AxiosResponse> => {
    const url = category[cate] + '/' + id + '/similar';
    return axiosClient.get(url, { params :{}});
  }
};

export default tmdbApi;