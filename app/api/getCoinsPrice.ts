import axios from "axios";
import { API_ENDPOINT } from "constants/projectConstants";

export function getCoinsPrice(
  coins: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) {
  axios
    .get(`${API_ENDPOINT}/coins/markets`, {
      params: {
        vs_currency: "usd",
        ids: coins,
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}
