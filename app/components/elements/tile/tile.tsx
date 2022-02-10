import { Box, Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import theme from "styles/default";
import Chart from "../chart/chart";
import Search from "../search/search";
import { TileStyles } from "./tile.styles";

type TileProps = {
  cryptocurrency: any;
};

const Tile: React.FC<TileProps> = ({ cryptocurrency }) => {
  // const emptyTile = () => {
  //   return (
  //     <Container
  //       sx={{
  //         ...TileStyles,
  //         border: "3px dotted",
  //       }}
  //     >
  //       <Search />
  //     </Container>
  //   );
  // };

  const tileWithCrypto = () => {
    return (
      <Container
        sx={{
          ...TileStyles,
          backgroundColor: "#28292B",
        }}
      >
        <Chart cryptocurrency={cryptocurrency} />
      </Container>
    );
  };

  // return <>{cryptocurrency ? tileWithCrypto() : emptyTile()}</>;
  return <>{tileWithCrypto()}</>;
};

export default Tile;
