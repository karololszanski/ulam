import axios from "axios";
import { API_ENDPOINT } from "constants/projectConstants";
import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((response) => response.json());
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useAllCoins = () => {
  const { data, error } = useSWR(`${API_ENDPOINT}/coins/list`, fetcher, {
    revalidateOnFocus: false,
  });

  return { data, error };
};

export default useAllCoins;
