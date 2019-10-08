import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burgerbuilder-2731c.firebaseio.com/"
});

export default instance;