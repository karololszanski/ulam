import { Container, Fab, Grid, Typography } from "@mui/material";
import { getCoinsPrice } from "api/getCoinsPrice";
import Tile from "components/elements/tile/tile";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "store/hooks";
import Search from "components/elements/search/search";

const ChartsGridModule = () => {
  const { selectedCryptocurrencies } = useAppSelector((store) => store.app);
  const [
    selectedCryptocurrenciesWithPrice,
    setSelectedCryptocurrenciesWithPrice,
  ] = useState<Array<any>>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const colors = ["#ff6384", "#388e3c", "#42a5f5", "#f57c00", "#ab47bc"];

  let interval: NodeJS.Timer;
  // Fetch current price for selected currencies
  useEffect(() => {
    console.log(
      "SelectedCrypto: ",
      selectedCryptocurrencies,
      selectedCryptocurrencies.length
    );
    if (selectedCryptocurrencies?.length > 0) {
      retrieveCoinsPrices();
      interval = setInterval(() => {
        retrieveCoinsPrices();
      }, 20000);
    } else {
      setSelectedCryptocurrenciesWithPrice([]);
    }
    return () => {
      clearInterval(interval);
    };
  }, [selectedCryptocurrencies]);

  const retrieveCoinsPrices = () => {
    // Issue when coin id was empty and was downloading all coins
    selectedCryptocurrencies.map((coin: any) => coin.id).join(",") !== "" &&
      getCoinsPrice(
        selectedCryptocurrencies.map((coin: any) => coin.id).join(","),
        (data) => {
          console.log("Data: ", data);
          data &&
            setSelectedCryptocurrenciesWithPrice(
              selectedCryptocurrencies.map((coin: any) => {
                return {
                  ...coin,
                  ...(data as Array<any>).find(
                    (dataCoin) => dataCoin?.id === coin?.id
                  ),
                };
              })
            );
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
      <Typography m={3} variant="h3" color="white" sx={{ fontWeight: "700" }}>
        Ulam Labs recruitment task
      </Typography>
      <Grid container p={2} spacing={2}>
        {selectedCryptocurrenciesWithPrice.map((cryptocurrency, index) => {
          return (
            <Grid item xs={12} md={6}>
              <Tile
                cryptocurrency={{ ...cryptocurrency, color: colors[index] }}
              />
            </Grid>
          );
        })}
        {selectedCryptocurrenciesWithPrice.length < 5 && (
          <>
            {/* <Grid item xs={12} sm={6}>
              <Tile cryptocurrency={null} />
            </Grid> */}
            <Search
              openDialog={openDialog}
              handleClose={() => setOpenDialog(false)}
            />
            <Fab
              color="primary"
              aria-label="add"
              sx={() => {
                const isEmpty = selectedCryptocurrenciesWithPrice.length === 0;
                return {
                  position: "fixed",
                  bottom: isEmpty ? "50%" : 50,
                  right: isEmpty ? "50%" : 50,
                  width: isEmpty ? "100px" : "56px",
                  height: isEmpty ? "100px" : "56px",
                  transition:
                    "bottom 3s, right 3s, width 3s, height 3s, -ms-transform 3s, transform 3s",
                  MsTransform: isEmpty ? "translate(50%, 50%)" : "initial",
                  transform: isEmpty ? "translate(50%, 50%)" : "initial",
                };
              }}
              onClick={() => setOpenDialog(true)}
            >
              <AddIcon
                sx={
                  selectedCryptocurrenciesWithPrice.length > 0
                    ? { fontSize: "30px" }
                    : { fontSize: "40px" }
                }
              />
            </Fab>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ChartsGridModule;
