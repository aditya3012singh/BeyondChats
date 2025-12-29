const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {article.title}
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        {article.publishedDate
          ? new Date(article.publishedDate).toDateString()
          : "Unknown date"}
      </p>

      <p className="text-gray-600 text-sm mb-4">
        {article.excerpt?.slice(0, 160)}...
      </p>

      {article.url && (
        <a
          href={article.url}
          target="_blank"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          Read More →
        </a>
      )}
    </div>
  );
};

export default ArticleCard;
