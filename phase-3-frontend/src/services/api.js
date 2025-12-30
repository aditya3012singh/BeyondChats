import axios from "axios";

const API_URL = "https://beyondchats-noi2.onrender.com/articles"; // Laravel / Phase-1 API

export const fetchArticles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
