import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { REACT_APP_BARER_API } from "@env";
import { Movie } from "./Data";

type OptionType = {
  headers: {
    accept: string;
    "content-type"?: string;
    Authorization: string;
  };
  method: "GET" | "POST";
  body?: string;
};

export const fetcheOptions: OptionType = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${REACT_APP_BARER_API}`,
  },
};

export const postOptions: OptionType = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${REACT_APP_BARER_API}`,
  },
};

export function useFetchData<T>(
  url: string,
  queryKey: string,
  enabled?: boolean,
  fav?: boolean
) {
  const getData = async () => {
    try {
      const response = await fetch(url, fetcheOptions);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const { data, isError, isFetched, isFetching, refetch } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: getData,
    refetchOnReconnect: true,
    enabled: enabled ?? true,
  });
  return { data, isError, isFetched, isFetching, refetch };
}
