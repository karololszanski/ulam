import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { height } from "@mui/system";

const Chart = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        width: "100%",
        px: 2,
      }}
    >
      <Grid container sx={{ pt: 2 }}>
        <Grid item xs={10}>
          <Typography>AAPL</Typography>
          <Typography>Apple Inc.</Typography>
        </Grid>
        <Grid item xs={2}>
          <Item>xs=5</Item>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography>175,51</Typography>
          <Typography>+0,75</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <ButtonGroup size="small" fullWidth aria-label="small button group">
          <Button key="one">1D</Button>
          <Button key="two">1W</Button>
          <Button key="three">1M</Button>
          <Button key="three">3M</Button>
          <Button key="three">6M</Button>
          <Button key="three">1Y</Button>
          <Button key="three">MAX</Button>
        </ButtonGroup>
      </Grid>
    </Box>
  );
};

export default Chart;
