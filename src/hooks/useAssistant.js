//useMutation est une fonctionnalité de TanStack Query qui sert à effectuer une opération qui modifie ou déclenche quelque chose
//Différence entre useQuery et useMutation:
//useQuery sert principalement à récupérer/lire des données.
//useMutation sert à déclencher une action, souvent avec des données envoyées au backend.
//Par défaut, useQuery s'exécute automatiquement lorsque le composant est monté.
//useMutation ne lance pas l'action automatiquement. Tu dois déclencher.
import { useMutation } from "@tanstack/react-query";

import { askAssistant } from "../services/assistant.service";

export const useAssistant = () => {
  //on crée une mutation (une opération qui déclenche une action côté serveur)
  return useMutation({
    mutationFn: askAssistant,
  });
};

/*
TanStack Query te retourne un objet:
{
lancer la requête
  mutate,

récupérer la réponse
  data,

récupérer l'erreur
  error,

savoir si c'est en cours
  isPending,

savoir si ça a échoué
  isError,

savoir si ça a réussi
  isSuccess,
  ...
}
*/