// axios.ts
import axios, { type AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "https://cricket.sportmonks.com/api/v2.0/",
  timeout: 1000,
});

export default instance;
export type { AxiosResponse };
