import prisma from "../config/prisma.js";

// get all article service ordered by oldest first 
export const getAllArticlesService = async () => {
  return prisma.article.findMany({
    orderBy: {
      publishedDate: "asc", // oldest first
    },
  });
};

// get article by ID service 
export const getArticleByIdService = async (id) => {
  return prisma.article.findUnique({
    where: {
      id: Number(id),
    },
  });
};

// create article service 
export const createArticleService = async (data) => {
  const { title, url, excerpt, publishedDate } = data;

  return prisma.article.create({
    data: {
      title,
      url,
      excerpt,
      publishedDate: publishedDate ? new Date(publishedDate) : null,
    },
  });
};

// update article service 
export const updateArticleService = async (id, data) => {
  const { title, excerpt, publishedDate } = data;

  return prisma.article.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      excerpt,
      publishedDate: publishedDate ? new Date(publishedDate) : null,
    },
  });
};

// delete article service 
export const deleteArticleService = async (id) => {
  return prisma.article.delete({
    where: {
      id: Number(id),
    },
  });
};
