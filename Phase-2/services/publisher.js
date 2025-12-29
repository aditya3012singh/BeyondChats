import axios from "axios";

export const publishEnhancedArticle = async ({
  title,
  content,
  references,
}) => {
  const formattedContent = `
${content}

---

## References
${references.map((ref, i) => `${i + 1}. ${ref}`).join("\n")}
`;

  const payload = {
    title,
    url: `${title.toLowerCase().replace(/\s+/g, "-")}-enhanced`,
    excerpt: formattedContent,
    publishedDate: new Date(),
  };

  const response = await axios.post(
    process.env.PHASE1_API_URL,
    payload
  );

  return response.data;
};
