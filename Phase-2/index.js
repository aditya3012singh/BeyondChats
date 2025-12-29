import "dotenv/config";

import { fetchArticlesFromPhase1 } from "./services/articleFetcher.js";
import { searchGoogleForArticles } from "./services/googleSearch.js";
import { scrapeMainContent } from "./services/contentScraper.js";
import { rewriteArticleWithLLM } from "./services/llmService.js";
import { publishEnhancedArticle } from "./services/publisher.js";

async function runPipeline() {
  console.log("🚀 Phase-2 Pipeline Started\n");

  const articles = await fetchArticlesFromPhase1();

  for (const article of articles) {
    try {
      console.log(`🔍 Processing: ${article.title}`);

      // 1. Google search
      const competitors = await searchGoogleForArticles(article.title);

      if (competitors.length < 2) {
        console.log("⚠️ Not enough competitor articles, skipping\n");
        continue;
      }

      // 2. Scrape competitor content
      const competitorContents = [];
      const referenceUrls = [];

      for (const comp of competitors) {
        const content = await scrapeMainContent(comp.url);
        if (content) {
          competitorContents.push(content);
          referenceUrls.push(comp.url);
        }
      }

      if (competitorContents.length < 2) {
        console.log("⚠️ Failed to scrape competitors, skipping\n");
        continue;
      }

      // 3. Rewrite using LLM
      const enhancedContent = await rewriteArticleWithLLM({
        originalTitle: article.title,
        originalContent: article.excerpt || "",
        competitorContents,
      });

      // 4. Publish enhanced article
      await publishEnhancedArticle({
        title: `${article.title} (Enhanced)`,
        content: enhancedContent,
        references: referenceUrls,
      });

      console.log("✅ Enhanced article published\n");
    } catch (err) {
      console.error("❌ Failed for article:", article.title);
      console.error(err.message, "\n");
    }
  }

  console.log("🎉 Phase-2 Pipeline Completed");
}

runPipeline();
