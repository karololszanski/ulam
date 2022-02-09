import { Container, Grid, Typography } from "@mui/material";
import Chart from "components/elements/chart/chart";
import Tile from "components/elements/tile/tile";
import React, { useState } from "react";

const ChartsGridModule = () => {
  const [selectedCryptoCurrencies, setSelectedCryptoCurrencies] = useState([
    "btc",
    "ecn",
  ]);

  return (
    <Container>
      <Typography m={4} variant="h3" color="primary">
        Crypto Currencies
      </Typography>
      <Grid container p={2} spacing={2}>
        <Grid item xs={12} sm={6}>
          <Tile cryptocurrency={{ name: "bitcoin" }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tile cryptocurrency={null} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChartsGridModule;
