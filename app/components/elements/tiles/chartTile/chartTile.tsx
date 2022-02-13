import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { getCoinChart } from "api/getCoinChart";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { removeCryptocurrency } from "store/app/app-slice";
import { DAY_HOURS } from "constants/projectConstants";
import { TileStyles } from "components/elements/tiles/tile.styles";
import Chart from "./chart";

type ChartProps = {
  cryptocurrency: any;
};

const ChartTile: React.FC<ChartProps> = ({ cryptocurrency }) => {
  const [selectedRange, setSelectedRange] = useState<{
    key: string;
    value: string;
    hours: number;
  }>({
    key: "1d",
    value: "1",
    hours: 24,
  });
  const [chartData, setChartData] = useState<Array<Array<number>>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isSubscribed = true;

    if (cryptocurrency?.id && selectedRange?.value) {
      getCoinChart(
        cryptocurrency?.id,
        selectedRange?.value,
        (data) => {
          isSubscribed &&
            setChartData(
              data.prices.filter((record: number[]) => {
                if (selectedRange?.value !== "max") {
                  return (
                    Math.floor((Date.now() - record[0]) / 1000) <
                    selectedRange?.hours * 60 * 60
                  );
                } else {
                  return true;
                }
              })
            );
        },
        (error) => {
          console.log("Error occured while fetching coins data: ", { error });
          toast.warning("Error occured while fetching coin chart data", {
            position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: "Coin3Error",
          });
        }
      );
    }
    return () => {
      isSubscribed = false;
    };
  }, [selectedRange?.key, cryptocurrency?.id]);

  const onItemChange = (key: string, hours: number) => {
    setSelectedRange({
      key,
      value: hours
        ? hours < 24
          ? "1"
          : (hours / DAY_HOURS).toString()
        : "max",
      hours,
    });
  };

  return (
    <Container
      sx={{
        ...TileStyles,
        backgroundColor: "#28292B",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid container sx={{ pt: 2 }}>
          <Grid item xs={10}>
            <Typography
              color="primary"
              data-testid="coin-symbol"
              sx={{
                fontWeight: "700",
                fontSize: "34px",
                display: "inline-block",
                pr: 2,
              }}
            >
              {cryptocurrency?.symbol.toUpperCase()}
            </Typography>
            <Typography
              color="primary.dark"
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                display: "inline-block",
              }}
            >
              {cryptocurrency?.name}
            </Typography>
          </Grid>

          <IconButton
            size="large"
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              color: "primary.dark",
            }}
            onClick={() => {
              dispatch(removeCryptocurrency({ cryptocurrency }));
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid container pb={1}>
          <Grid item xs={12}>
            <Typography
              color="primary"
              sx={{
                fontWeight: "700",
                fontSize: "20px",
                display: "inline-block",
                pr: 1,
              }}
            >
              {cryptocurrency?.current_price ?? "No data"}
            </Typography>
            <Typography
              color={
                cryptocurrency?.price_change_percentage_24h > 0
                  ? "green"
                  : "red"
              }
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                display: "inline-block",
              }}
            >
              {cryptocurrency?.price_change_percentage_24h > 0 && "+"}
              {cryptocurrency?.price_change_percentage_24h?.toFixed(2)}
              {cryptocurrency?.price_change_percentage_24h && "%"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 1 }}>
          <ButtonGroup size="small" fullWidth>
            {[
              { key: "1h", value: 1 },
              { key: "12h", value: 12 },
              { key: "1d", value: DAY_HOURS },
              { key: "1w", value: DAY_HOURS * 7 },
              { key: "1m", value: DAY_HOURS * 30 },
              { key: "1y", value: DAY_HOURS * 365 },
              { key: "max", value: 0 },
            ].map((item: { key: string; value: number }, index) => (
              <Button
                onClick={() => onItemChange(item.key, item.value)}
                key={index}
                variant={
                  selectedRange.key === item.key ? "contained" : "outlined"
                }
              >
                {item.key.toUpperCase()}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid container sx={{ pb: 2 }}>
          <Chart cryptocurrency={cryptocurrency} chartData={chartData} />
        </Grid>
      </Box>
    </Container>
  );
};

export default ChartTile;
