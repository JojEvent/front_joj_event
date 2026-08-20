import { useQuery } from "@tanstack/react-query";
import articleService from "../services/articles.service";

export function useArticles(params = {}) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => articleService.getArticles(params),
  });
}