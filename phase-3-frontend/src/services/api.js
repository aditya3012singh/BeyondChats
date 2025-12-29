import axios from "axios";

const API_URL = "http://localhost:3000/articles"; // Laravel / Phase-1 API

export const fetchArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
