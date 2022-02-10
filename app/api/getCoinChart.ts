import axios from "axios";
import { API_ENDPOINT } from "constants/projectConstants";

export function getCoinChart(
  coin: string,
  day: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) {
  axios
    .get(`${API_ENDPOINT}/coins/${coin}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: day,
      },
    })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}
