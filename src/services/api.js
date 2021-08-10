import axios from 'axios';

const BACKEND_ENDPOINT = 'https://leaderboard-be.herokuapp.com';

const instance = axios.create({
    baseURL: BACKEND_ENDPOINT
});

export default instance;