import { Container, Fab, Grid, Typography } from "@mui/material";
import { getCoinsPrice } from "api/getCoinsPrice";
import Tile from "components/elements/tile/tile";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

const ChartsGridModule = () => {
  const [selectedCryptoCurrencies, setSelectedCryptoCurrencies] = useState([]);
  const [cryptoCurrenciesWithPrice, setCryptoCurrenciesWithPrice] = useState(
    []
  );

  // Retrive selected cryptocurrnecies from local storage
  useEffect(() => {
    if (typeof localStorage.getItem("selectedCoins") === "string") {
      const selectedCoins = JSON.parse(
        localStorage.getItem("selectedCoins") as string
      );
      console.log("Selected cryptocurrencies2: ", selectedCoins);
      setSelectedCryptoCurrencies(selectedCoins);
    }
  }, [typeof window !== "undefined" && localStorage.getItem("selectedCoins")]);

  // Fetch current price for selected currencies
  useEffect(() => {
    console.log(
      "SelectedCrypto: ",
      selectedCryptoCurrencies,
      selectedCryptoCurrencies.length
    );
    if (selectedCryptoCurrencies?.length > 0) {
      retrieveCoinsPrices();
      const interval = setInterval(() => {
        retrieveCoinsPrices();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [selectedCryptoCurrencies]);

  const retrieveCoinsPrices = () => {
    getCoinsPrice(
      selectedCryptoCurrencies.map((coin: any) => coin.id).join(","),
      (data) => {
        // console.log("Data: ", data);
        data && setCryptoCurrenciesWithPrice(data);
      },
      (error) => {
        console.log("Error occured while fetching coins data: ", { error });
        toast.warning("Error occured while fetching coins data", {
          position: "top-center",
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          toastId: "Coin2Error",
        });
      }
    );
  };

  return (
    <Container sx={{ pb: 10 }}>
      <Typography m={4} variant="h3" color="white">
        Ulam Labs recruitment task
      </Typography>
      <Grid container p={2} spacing={2}>
        {cryptoCurrenciesWithPrice.map((cryptocurrency) => {
          return (
            <Grid item xs={12} sm={6}>
              <Tile cryptocurrency={cryptocurrency} />
            </Grid>
          );
        })}
        {cryptoCurrenciesWithPrice.length < 5 && (
          <>
            <Grid item xs={12} sm={6}>
              <Tile cryptocurrency={null} />
            </Grid>
            <Fab
              color="primary"
              aria-label="add"
              sx={{ position: "fixed", bottom: 50, right: 50 }}
            >
              <AddIcon />
            </Fab>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ChartsGridModule;
