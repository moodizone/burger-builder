import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://udemy-burger-builder-a89d7.firebaseio.com/',
});

export default instance;