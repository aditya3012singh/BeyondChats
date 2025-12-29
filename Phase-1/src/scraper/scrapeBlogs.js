import axios from "axios";
import * as cheerio from "cheerio";
import prisma from "../config/prisma.js";

const START_PAGE = 15;
const BASE_URL = "https://beyondchats.com/blogs/page/";

async function scrapeBlogs() {
  try {
    console.log("Starting blog scrape...");

    const blogs = [];
    let currentPage = START_PAGE;

    while (blogs.length < 5 && currentPage > 0) {
      const pageUrl = `${BASE_URL}${currentPage}/`;
      console.log(`Scraping page ${currentPage}...`);

      const response = await axios.get(pageUrl, {
        timeout: 10000,
      });

      if (!response.data || typeof response.data !== "string") {
        console.log(`Invalid HTML on page ${currentPage}, skipping...`);
        currentPage--;
        continue;
      }

      const $ = cheerio.load(response.data);

      // Reverse articles so we scrape OLDEST first
      const articles = $("article").toArray().reverse();

      for (const element of articles) {
        if (blogs.length >= 5) break;

        const title =
          $(element).find("h2").first().text().trim() ||
          $(element).find("h3").first().text().trim() ||
          $(element).find(".entry-title").first().text().trim();

        const url = $(element).find("a").first().attr("href");

        const excerpt =
          $(element).find("p").first().text().trim() || null;

        const dateText =
          $(element).find("time").attr("datetime") ||
          $(element).find(".entry-date").first().text();

        if (title && url) {
          blogs.push({
            title,
            url,
            excerpt,
            publishedDate: dateText ? new Date(dateText) : null,
          });
        }
      }

      // move to previous page
      currentPage--;
    }

    console.log(`Collected ${blogs.length} oldest articles`);

    for (const blog of blogs) {
      await prisma.article.upsert({
        where: { url: blog.url },
        update: {},
        create: blog,
      });

      console.log(`Saved: ${blog.title}`);
    }

    console.log("Scraping completed successfully.");
  } catch (error) {
    console.error("Error during blog scraping:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

scrapeBlogs();
