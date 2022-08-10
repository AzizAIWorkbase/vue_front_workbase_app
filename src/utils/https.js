import axios from "axios";
const https =  axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
    "Accept-Language": 'ru',
    'Access-Control-Allow-Origin':'*'
  }
});

export default https;