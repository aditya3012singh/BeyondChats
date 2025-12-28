import axios from "axios";
import * as cheerio from "cheerio";
import prisma from "../config/prisma.js";

const START_PAGE = 15;
const BASE_URL = "https://beyondchats.com/blogs/page/";

async function scrapeBlogs() {
  try {
    console.log("Starting blog scrape...");

    let blogs = [];
    let currentPage = START_PAGE;

    while (blogs.length < 5 && currentPage > 0) {
      const pageUrl = `${BASE_URL}${currentPage}/`;
      console.log(`Scraping page ${currentPage}...`);

      const { data } = await axios.get(pageUrl);
      const $ = cheerio.load(data);

      $("article").each((_, element) => {
        if (blogs.length >= 5) return false;

        const title = $(element)
          .find("h2, h3, .entry-title")
          .text()
          .trim();

        const url = $(element).find("a").attr("href");

        const excerpt =
          $(element).find("p").first().text().trim() || null;

        const dateText =
          $(element).find("time").attr("datetime") ||
          $(element).find(".entry-date").text();

        if (title && url) {
          blogs.push({
            title,
            url,
            excerpt,
            publishedDate: dateText ? new Date(dateText) : null,
          });
        }
      });
    //for moving to the previous page
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
