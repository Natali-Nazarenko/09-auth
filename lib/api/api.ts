import axios from 'axios';

const myKey = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common['accept'] = 'application/json';

export const nextServer = axios.create({
    baseURL: `${myKey}/api`,
    withCredentials: true,
});
