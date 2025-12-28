import {
  getAllArticlesService,
  getArticleByIdService,
  createArticleService,
  updateArticleService,
  deleteArticleService,
} from "../services/article.service.js";

export const getAllArticles = async (req, res) => {
  try {
    const articles = await getAllArticlesService();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArticleById= async (req, res) => {
    try {
        const article = await getArticleByIdService(req.params.id);
        if (article) {
        res.json(article);
        } 
        else {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const newArticle = await createArticleService(req.body);
    res.status(201).json(newArticle);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

export const updateArticle = async (req, res) => {
  try {
    const updatedArticle = await updateArticleService(req.params.id, req.body);
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

export const deleteArticle = async (req, res) => {
  try {
    await deleteArticleService(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};