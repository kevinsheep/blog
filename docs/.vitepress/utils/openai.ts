import axios from 'axios';

const baseURL = 'https://api.ceil.top:8000';
// const baseURL = 'http://localhost:8000';
const axiosService = axios.create({ baseURL });

export const DEFAULT_CHAT = 'Human:你叫什么名字？\nAI:';

export const generateChat = async (words: string) => {
    const url = '/chat';
    const res = await axiosService({ method: 'post', url, data: { words } });

    if (res && res.data) {
        return `${words}${res.data}\n\nHuman:`;
    }

    return words;
};
