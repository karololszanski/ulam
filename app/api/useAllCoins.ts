import axios from "axios";
import { API_ENDPOINT, SECONDS_MILISECONDS } from "constants/projectConstants";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useAllCoins = () => {
  const { data, error } = useSWR(`${API_ENDPOINT}/coins/list`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: SECONDS_MILISECONDS * 60 * 10,
  });

  return { data, error };
};

export default useAllCoins;
