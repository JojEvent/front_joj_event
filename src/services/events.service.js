import { instance } from "./api"; 

const EVENTS_ENDPOINT = "api/evenements/";

export async function getEvents(filters = {}) {
  const { data } = await instance.get(EVENTS_ENDPOINT, { params: filters });
  return data;
}

export async function getEventById(id) {
  const { data } = await instance.get(`${EVENTS_ENDPOINT}${id}/`);
  return data;
}

export async function toggleFavorite(id) {
  const { data } = await instance.post(`${EVENTS_ENDPOINT}${id}/favorite/`);
  return data;
}