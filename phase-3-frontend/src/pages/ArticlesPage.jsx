import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";

const ArticlesPage = () => {
  const [original, setOriginal] = useState([]);
  const [enhanced, setEnhanced] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const articles = await fetchArticles();

        setOriginal(
          articles.filter(a => !a.title.includes("Enhanced"))
        );

        setEnhanced(
          articles.filter(a => a.title.includes("Enhanced"))
        );
      } catch (error) {
        console.error("Failed to load articles");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading articles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            BeyondChats Articles
          </h1>
          <p className="text-gray-500 text-sm">
            Original and AI-Enhanced Articles
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Original Articles */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Original Articles
          </h2>

          {original.length === 0 ? (
            <p className="text-gray-500">No original articles found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {original.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>

        {/* Enhanced Articles */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Enhanced Articles
          </h2>

          {enhanced.length === 0 ? (
            <p className="text-gray-500">
              No enhanced articles available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enhanced.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ArticlesPage;
