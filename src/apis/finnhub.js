import axios from 'axios';

const TOKEN = "cgh8mphr01qv7vi3p4ggcgh8mphr01qv7vi3p4h0"

export default axios.create({
    baseURL : "https://finnhub.io/api/v1",
    params : {
        token:TOKEN
    }
})