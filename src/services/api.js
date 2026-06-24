import axios from "axios";

const API = axios.create({
  baseURL: "https://buildmyhome-backend.onrender.com/api",
});

export default API;