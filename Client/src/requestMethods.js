import axios from "axios";

const URL = 'http://localhost:3000'
const TOKEN = localStorage.getItem('persist:root') && JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.tokenKey

export const publicRequest = axios.create({
    baseURL: URL,
  });

export const userRequest = axios.create({
      baseURL: URL,
      headers: {token: TOKEN}
  });