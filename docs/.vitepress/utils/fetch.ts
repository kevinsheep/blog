import axios from 'axios';
import { notify } from './index';

const OWNER = 'kevinsheep';
const REPO = 'blog';

const client_id = 'Iv1.c81fcafbda51d6d6';

const remoteHost = 'https://github.com/';
const baseURL = 'https://api.github.com/';

const redirect_uri = `${__REDIRECT_URI__}/login.html`; // 登录中转页

const eggHost = 'https://api.ceil.top:8000';

const axiosService = axios.create({ baseURL });

export const REDIRECT_KEY = 'REDIRECT_PAGE';
export const TOKEN_KEY = 'TOKEN_DATA';

export const getLS = (key: string, defaultData: string = '{}') => {
    const LS = JSON.parse(window.localStorage.getItem(key) || defaultData);
    return LS;
};

export const setLS = (key: string, data: object | string) => {
    window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeLS = (key: string) => {
    window.localStorage.removeItem(key);
};

// 三方认证页面
export const link_get_code = () => {
    removeLS(TOKEN_KEY);
    return `${remoteHost}login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
};

// 使用用户授权码，通过后端服务中转，向认证服务器获取 `access_token`
export const getAccessToken = async (code: string) => {
    const data = { code };
    const res = await axiosService({ method: 'post', url: eggHost, data });

    if (res.data && res.data.access_token) {
        setLS(TOKEN_KEY, res.data);
    }

    return res.data;
};

// 使用 `refresh_token`，刷新 `access_token`
export const refreshAccessToken = async (refresh_token: string) => {
    const grant_type = 'refresh_token';
    const res = await axiosService({
        method: 'post',
        url: eggHost,
        params: { grant_type, refresh_token },
    });

    if (res.data.access_token) {
        setLS(TOKEN_KEY, res.data);
    }
    return res.data;
};

// 获取所有、某条 issue
export const getIssue = async (number?: number) => {
    const url = `/repos/${OWNER}/${REPO}/issues${number ? '/' + number : ''}`;
    return await axiosService({ url, method: 'get', params: {} });
};

axiosService.interceptors.request.use(
    (config) => {
        const { access_token } = getLS(TOKEN_KEY);

        if (access_token) {
            config.headers = {
                Authorization: `Bearer ${access_token}`,
                accept: 'application/vnd.github+json',
            };
        }

        return config;
    }
    // (error) => {
    //     console.log({ requestError: error });
    //     Promise.reject(error);
    // }
);

axiosService.interceptors.response.use(
    (response) => {
        // console.log({ response });
        return response;
    },
    async (error) => {
        console.log(error.response);
        // 如果未授权
        if ([401].includes(error?.response?.status)) {
            console.log(error.config);
            // 如果已刷新过，仍出错，则重新获取授权码
            if (error.config?.params.grant_type === 'refresh_token') {
                removeLS(TOKEN_KEY);
                location.href = link_get_code();
            }
            // 尝试刷新一次 token
            else {
                const { refresh_token } = getLS(TOKEN_KEY);
                const res = await refreshAccessToken(refresh_token);
                // 刷新 `access_token` 后再次请求
                if (res.access_token) {
                    return await axiosService(error.config);
                } else {
                    console.log('The code passed is incorrect or expired.');
                }
            }
        } else {
            notify('github 失联了，请稍后再试');
            location.href = `/${REPO}/index`;
            Promise.reject(error);
        }
    }
);

// 获取某条 issue 的所有评论
export const getComments = async (number: number) => {
    const url = `/repos/${OWNER}/${REPO}/issues/${number}/comments`;
    return await axiosService({ url, method: 'get', params: {} });
};

export const addComment = async (number: number, body: string) => {
    const owner = OWNER;
    const repo = REPO;
    const url = `/repos/${OWNER}/${REPO}/issues/${number}/comments`;
    return await axiosService({
        url,
        method: 'post',
        data: { owner, repo, issue_number: number, body },
    });
};

export const addIssue = async (title: string, body?: string) => {
    const owner = OWNER;
    const repo = REPO;
    const labels = ['blog'];
    const url = `/repos/${OWNER}/${REPO}/issues`;
    return await axiosService({
        url,
        method: 'post',
        data: { owner, repo, title, labels, body },
    });
};

export default axiosService;
