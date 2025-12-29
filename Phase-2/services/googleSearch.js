import axios from "axios";

const GOOGLE_SEARCH_URL = "https://www.googleapis.com/customsearch/v1";

export const searchGoogleForArticles = async (query) => {
  try {
    const response = await axios.get(GOOGLE_SEARCH_URL, {
      params: {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_CX,
        q: query,
        num: 5,
      },
    });

    if (!response.data.items) return [];

    // Filter only blogs / articles
    const results = response.data.items
      .filter((item) => {
        const link = item.link.toLowerCase();
        return (
          link.includes("blog") ||
          item.pagemap?.article ||
          item.pagemap?.metatags
        );
      })
      .slice(0, 2)
      .map((item) => ({
        title: item.title,
        url: item.link,
        snippet: item.snippet,
      }));

    return results;
  } catch (error) {
    console.error("Google Search API failed:", error.message);
    return [];
  }
};
