import axios from "axios";

export const API = axios.create({
  baseURL: "https://dummyapi.io/data/v1/",
  headers: {
    "app-id": process.env.VUE_APP_ID,
  },
});

export default API;
