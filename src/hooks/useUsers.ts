import { useQuery } from "@tanstack/react-query"
import { usersApi } from "../services/api"
import { QUERY_KEYS } from "../constants"

export const useUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: usersApi.getAll,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useUser = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
