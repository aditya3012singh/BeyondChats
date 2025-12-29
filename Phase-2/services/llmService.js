import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Rewrite article using competitor references
 */
export const rewriteArticleWithLLM = async ({
  originalTitle,
  originalContent,
  competitorContents,
}) => {
  try {
    const prompt = `
You are a professional content editor and SEO writer.

ORIGINAL ARTICLE:
Title: ${originalTitle}
Content:
${originalContent}

REFERENCE ARTICLES (for style & structure only):
${competitorContents
  .map((c, i) => `Reference ${i + 1}:\n${c}`)
  .join("\n\n")}

TASK:
- Rewrite and enhance the original article
- Improve formatting (headings, bullet points, paragraphs)
- Improve clarity and SEO
- DO NOT copy any text verbatim from references
- Produce original content
- Output only the rewritten article content
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("LLM rewrite failed:", error.message);
    throw error;
  }
};
