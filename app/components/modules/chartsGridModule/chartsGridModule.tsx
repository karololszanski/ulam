import { Container, Fab, Grid, Typography } from "@mui/material";
import { getCoinsPrice } from "api/getCoinsPrice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "store/hooks";
import { SECONDS_MILISECONDS } from "constants/projectConstants";
import ChartTile from "components/elements/tiles/chartTile/chartTile";
import SearchTile from "components/elements/tiles/searchTile/searchTile";

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
    let isSubscribed = true;

    if (selectedCryptocurrencies?.length > 0) {
      retrieveCoinsPrices(isSubscribed);
      interval = setInterval(() => {
        retrieveCoinsPrices(isSubscribed);
      }, 30 * SECONDS_MILISECONDS);
    } else {
      setSelectedCryptocurrenciesWithPrice([]);
    }
    return () => {
      clearInterval(interval);
      isSubscribed = false;
    };
  }, [selectedCryptocurrencies]);

  const retrieveCoinsPrices = (isSubscribed: boolean) => {
    // Issue when coin id was empty and was downloading all coins
    selectedCryptocurrencies.map((coin: any) => coin.id).join(",") !== "" &&
      getCoinsPrice(
        selectedCryptocurrencies.map((coin: any) => coin.id).join(","),
        (data) => {
          data &&
            isSubscribed &&
            setSelectedCryptocurrenciesWithPrice(
              selectedCryptocurrencies.map((coin: any) => {
                return {
                  ...coin,
                  ...(data as Array<{ id: string }>).find(
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
            <Grid item xs={12} md={6} key={index}>
              <ChartTile
                cryptocurrency={{ ...cryptocurrency, color: colors[index] }}
              />
            </Grid>
          );
        })}
        {selectedCryptocurrenciesWithPrice?.length < 5 && (
          <>
            <SearchTile
              openDialog={openDialog}
              handleClose={() => setOpenDialog(false)}
            />
            <Fab
              color="primary"
              aria-label="add"
              data-testid="add-button"
              role="button"
              sx={() => {
                const isEmpty = selectedCryptocurrenciesWithPrice.length === 0;
                return {
                  position: "fixed",
                  bottom: isEmpty ? "50%" : 30,
                  right: isEmpty ? "50%" : 30,
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
