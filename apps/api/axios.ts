import axios from "axios";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN || "";
const BASE_URL = "https://cricket.sportmonks.com/api/v2.0";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_token: API_TOKEN,
  },
});

export default instance;
