import axios from "axios";

const API = axios.create({
  baseURL: "https://buildmyhome-backend-1.onrender.com/api",
});

export default API;