import { instance } from "./api";

export async function getDisciplines() {
  const { data } = await instance.get("disciplines/");
  return data;
}

export async function getInfrastructures(params = {}) {
  const { data } = await instance.get("infrastructures/", { params });
  return data;
}

// Récupère la liste des sites olympiques (ex: Dakar, Diamniadio, Saly).
// ?actif=true : on ne remonte que les sites actuellement actifs côté admin,
// utile pour la page publique "Carte".
export async function getSites() {
  const { data } = await instance.get("sites/", {
    params: { actif: true },
  });
  return data;
}