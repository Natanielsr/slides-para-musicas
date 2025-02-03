import axios from "axios";
import config from "../configApi.json"; // Importa o JSON

const BASE_URL = config.BASE_URL;

// Definição do tipo para musicList
interface MusicItem {
    name: string;
    link: string;
}

interface MusicList {
    params: MusicItem[];
}

export const fetchSearchResults = async (query : string) =>{
    try {
        const response = await axios.get(`${BASE_URL}/search/${encodeURIComponent(query)}`);
        return response.data.results;
    } catch (error : any) {
        const errorJson = formatErrorJson(error);
        console.error('Erro ao buscar dados: ', errorJson);
        throw new Error(errorJson);
    }
};

export const fetchLyric = async (url : string) =>{
    try {
        const response = await axios.get(`${BASE_URL}/lyric/${encodeURIComponent(url)}`);
        return response.data.lyric;
    } catch (error : any) {
        const errorJson = formatErrorJson(error);
        console.error('Erro ao buscar dados: ', errorJson);
        throw new Error(errorJson);
    }
};

export const generateSlides = async (musicList : MusicList) =>{
    try {
        const response = await axios.post(
            `${BASE_URL}/slides/generate/`,
             musicList);
        
        return response.data;
    } catch (error : any) {
        const errorJson = formatErrorJson(error);
        console.error('Erro ao buscar dados: ', errorJson);
        throw new Error(errorJson);
    }
};

function formatErrorJson(error: any): string {
    const errorMessage = error.response?.data?.error || error.message || 'Erro desconhecido';
    const errorDetails = {
        message: errorMessage,
        status: error.response?.status,
        headers: error.response?.headers,
        data: error.response?.data,
    };
    return JSON.stringify(errorDetails, null, 2);
}