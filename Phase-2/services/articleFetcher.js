import axios from "axios";

export const fetchArticlesFromPhase1 = async () => {
  try {
    const response = await axios.get(process.env.PHASE1_API_URL);

    if (!Array.isArray(response.data)) {
      throw new Error("Invalid articles response");
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles from Phase-1 API");
    throw error;
  }
};
