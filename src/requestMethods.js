import axios from "axios";

const BASE_URL = "https://api.hnpwa.com/v0/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
