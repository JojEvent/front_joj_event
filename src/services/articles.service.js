import instanceApi from "./api";

/**
 * Service de gestion des articles respectant le principe de responsabilité unique (SRP).
 * Centralise tous les appels API liés aux articles et aux disciplines.
 */
export const articlesService = {
  /**
   * Récupère la liste des articles
   * @param {Object} params - Paramètres de filtre (statut, discipline, limit, etc.)
   */
  async getArticles(params = {}) {
    const response = await instanceApi.get("articles/", { params });
    return response.data;
  },

  /**
   * Récupère les détails d'un article par son identifiant
   * @param {string|number} id - Identifiant de l'article
   */
  async getArticleById(id) {
    const response = await instanceApi.get(`articles/${id}/`);
    return response.data;
  },

  /**
   * Crée un nouvel article (gère le format FormData pour les images)
   * @param {FormData|Object} articleData - Données de l'article à créer
   */
  async createArticle(articleData) {
    const response = await instanceApi.post("articles/", articleData);
    return response.data;
  },

  /**
   * Met à jour un article existant
   * @param {string|number} id - Identifiant de l'article
   * @param {FormData|Object} articleData - Données à mettre à jour
   */
  async updateArticle(id, articleData) {
    const response = await instanceApi.put(`articles/${id}/`, articleData);
    return response.data;
  },

  /**
   * Supprime un article par son identifiant
   * @param {string|number} id - Identifiant de l'article
   */
  async deleteArticle(id) {
    const response = await instanceApi.delete(`articles/${id}/`);
    return response.data;
  },

  /**
   * Récupère la liste des disciplines sportives pour les articles
   */
  async getDisciplines() {
    const response = await instanceApi.get("disciplines/");
    return response.data;
  },
};

export default articlesService;
