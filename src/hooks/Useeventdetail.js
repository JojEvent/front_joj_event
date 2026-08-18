import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../services/events.service";

export function useEventById(id) {
  const query = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

  return query;
}