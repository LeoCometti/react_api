import axios from 'axios'

const api = axios.create({
    baseURL: 'https://kneat-backend-cometti.herokuapp.com/GitHubRepository/',
    //baseURL: 'https://localhost:7198/GitHubRepository/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;