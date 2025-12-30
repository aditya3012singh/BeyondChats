import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import { Moon, Sun } from "lucide-react";

const ArticlesPage = () => {
  const [original, setOriginal] = useState([]);
  const [enhanced, setEnhanced] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

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

  const SkeletonCard = () => (
    <div className={`${
      isDark 
        ? 'bg-zinc-900 border-zinc-800' 
        : 'bg-white border-gray-200'
    } border-2 rounded-xl p-6 animate-pulse`}>
      <div className={`h-5 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} rounded w-3/4 mb-3`}></div>
      <div className={`h-4 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} rounded w-full mb-2`}></div>
      <div className={`h-4 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} rounded w-5/6 mb-4`}></div>
      <div className={`h-3 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'} rounded w-1/4`}></div>
    </div>
  );

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-gray-50'
      }`}>
        <header className={`${
          isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
        } border-b transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                BeyondChats Articles
              </h1>
              <p className={`text-sm mt-1 ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}>
                Original and AI-Enhanced Articles
              </p>
            </div>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          <section>
            <div className="flex items-center mb-6">
              <div className={`w-1 h-8 ${
                isDark ? 'bg-white' : 'bg-black'
              } mr-4`}></div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Original Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-6">
              <div className={`w-1 h-8 ${
                isDark ? 'bg-white' : 'bg-black'
              } mr-4`}></div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                Enhanced Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <header className={`${
        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
      } border-b transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              BeyondChats Articles
            </h1>
            <p className={`text-sm mt-1 ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Original and AI-Enhanced Articles
            </p>
          </div>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDark 
                ? 'bg-zinc-800 hover:bg-zinc-700 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Original Articles */}
        <section>
          <div className="flex items-center mb-6">
            <div className={`w-1 h-8 ${
              isDark ? 'bg-white' : 'bg-black'
            } mr-4`}></div>
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              Original Articles
            </h2>
          </div>

          {original.length === 0 ? (
            <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
              No original articles found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {original.map(article => (
                <ArticleCard key={article.id} article={article} isDark={isDark} />
              ))}
            </div>
          )}
        </section>

        {/* Enhanced Articles */}
        <section>
          <div className="flex items-center mb-6">
            <div className={`w-1 h-8 ${
              isDark ? 'bg-white' : 'bg-black'
            } mr-4`}></div>
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              Enhanced Articles
            </h2>
          </div>

          {enhanced.length === 0 ? (
            <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
              No enhanced articles available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enhanced.map(article => (
                <ArticleCard key={article.id} article={article} isDark={isDark} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className={`${
        isDark ? 'bg-zinc-900 border-zinc-800 text-gray-500' : 'bg-white border-gray-200 text-gray-600'
      } border-t mt-20`}>
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm">
          © 2024 BeyondChats. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ArticlesPage;