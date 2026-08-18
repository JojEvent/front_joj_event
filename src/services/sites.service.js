import { instance } from "./api";

export async function getDisciplines() {
  const { data } = await instance.get("disciplines/");
  return data;
}

export async function getInfrastructures() {
  const { data } = await instance.get("infrastructures/");
  return data;
}