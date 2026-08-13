import axios from "axios";
import useSWR from "swr";

const fetchUser = (url: string) => axios.get(url).then((res) => res.data);

export function useGetUser() {
  const { data, isLoading, error } = useSWR("/api/auth/user", fetchUser);

  return { user: data, isLoading: isLoading, isError: error };
}
