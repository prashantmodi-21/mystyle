import axios from "axios";

const URL = import.meta.env.VITE_SERVER_URL
const TOKEN = localStorage.getItem('persist:root') && JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.tokenKey
export const publicRequest = axios.create({
    baseURL: URL,
  });

  let userRequest = axios.create({
      baseURL: URL,
  });

  userRequest.interceptors.request.use(function (config) {
    config.headers["token"] = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.tokenKey;
    return config;
  });

  export {userRequest}
