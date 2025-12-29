import axios from "axios";
import * as cheerio from "cheerio";

export const scrapeMainContent = async (url) => {
  try {
    console.log(`Scraping content from: ${url}`);

    const { data } = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Phase2Bot/1.0; +https://example.com)",
      },
    });

    const $ = cheerio.load(data);

    let content = "";

    // Priority-based extraction
    const selectors = [
      "article p",
      "main p",
      ".post-content p",
      ".entry-content p",
      ".blog-content p",
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 50) {
          content += text + "\n\n";
        }
      });

      if (content.length > 500) break;
    }

    // Fallback: grab all meaningful paragraphs
    if (!content) {
      $("p").each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 80) {
          content += text + "\n\n";
        }
      });
    }

    // Trim for LLM token safety
    return content.slice(0, 4000);
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    return "";
  }
};
