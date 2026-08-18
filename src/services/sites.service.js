import { instance } from "./api";

export async function getDisciplines() {
  const { data } = await instance.get("api/disciplines/");
  return data;
}

export async function getInfrastructures() {
  const { data } = await instance.get("api/infrastructures/");
  return data;
}