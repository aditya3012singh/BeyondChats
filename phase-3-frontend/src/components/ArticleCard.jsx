import { useState } from "react";

const ArticleCard = ({ article, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const excerpt = article.excerpt || "";
  const shouldShowReadMore = excerpt.length > 300;

  return (
    <div className={`${
      isDark 
        ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    } border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-xl`}>
      <h3 className={`text-lg font-bold mb-2 ${
        isDark ? 'text-white' : 'text-black'
      }`}>
        {article.title}
      </h3>

      <p className={`text-sm mb-3 ${
        isDark ? 'text-gray-500' : 'text-gray-600'
      }`}>
        {article.publishedDate
          ? new Date(article.publishedDate).toDateString()
          : "Unknown date"}
      </p>

      <p className={`text-sm mb-4 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {isExpanded ? excerpt : `${excerpt.slice(0, 300)}${shouldShowReadMore ? '...' : ''}`}
      </p>

      <div className="flex items-center gap-3">
        {shouldShowReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-sm font-medium transition-colors ${
              isDark 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {isExpanded ? '← Show Less' : 'Read More →'}
          </button>
        )}

        {article.url && !article.title.includes("Enhanced") && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium transition-colors ${
              isDark 
                ? 'text-emerald-400 hover:text-emerald-300' 
                : 'text-emerald-600 hover:text-emerald-700'
            }`}
          >
            Visit Article →
          </a>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;