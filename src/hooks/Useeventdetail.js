//hook personnalisé React qui utilise TanStack Query pour récupérer un événement à partir de son id
//useQuery est une fonction de TanStack Query qui permet de gérer une requête API.
// lancer la requête ;
// gérer le chargement ;
// gérer les erreurs ;
// conserver les données en cache ;
// éviter certaines requêtes inutiles ;
// permettre de refaire la requête
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../services/events.service";

export function useEventById(id) {
  //useQuery retourne beaucoup d'informations:
  /*{
  data,
  isLoading,
  isError,
  error,
  refetch,
  isSuccess,
  ...
}*/
  const query = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

  return query;
}