import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  selectedCryptocurrencies: Array<any>;
}

const initialState: AppState = {
  selectedCryptocurrencies:
    typeof window !== "undefined" &&
    typeof localStorage.getItem("selectedCoins") === "string"
      ? JSON.parse(localStorage.getItem("selectedCoins") as string)
      : [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedCryptocurrencies(
      state,
      action: PayloadAction<{
        selectedCoins: Array<any>;
      }>
    ) {
      localStorage.setItem(
        "selectedCoins",
        JSON.stringify(action.payload.selectedCoins)
      );
      state.selectedCryptocurrencies = action.payload.selectedCoins;
    },
    addCryptocurrency(
      state,
      action: PayloadAction<{
        cryptocurrency: any;
      }>
    ) {
      const newArray =
        state.selectedCryptocurrencies.length > 0
          ? state.selectedCryptocurrencies.concat([
              action.payload.cryptocurrency,
            ])
          : [action.payload.cryptocurrency];
      localStorage.setItem("selectedCoins", JSON.stringify(newArray));
      state.selectedCryptocurrencies = newArray;
    },
    removeCryptocurrency(
      state,
      action: PayloadAction<{
        cryptocurrency: { id: string };
      }>
    ) {
      const newArray = state.selectedCryptocurrencies.filter(
        (coin: { id: string }) => coin?.id !== action.payload.cryptocurrency?.id
      );
      localStorage.setItem("selectedCoins", JSON.stringify(newArray));
      state.selectedCryptocurrencies = newArray;
    },
  },
});

export const {
  setSelectedCryptocurrencies,
  addCryptocurrency,
  removeCryptocurrency,
} = appSlice.actions;
export default appSlice.reducer;
