import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CancelIcon from "@mui/icons-material/Cancel";
import { getCoinChart } from "api/getCoinChart";
import { toast } from "react-toastify";

const DAY = 24;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  pointBorderWidth: 0,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
  },
};

type ChartProps = {
  cryptocurrency: any;
};

const Chart: React.FC<ChartProps> = ({ cryptocurrency }) => {
  const [selectedRange, setSelectedRange] = useState({
    key: "1d",
    value: "1",
    hours: 0,
  });
  const [chartData, setChartData] = useState<Array<Array<number>>>([]);

  useEffect(() => {
    if (cryptocurrency?.id && selectedRange?.value) {
      getCoinChart(
        cryptocurrency?.id,
        selectedRange?.value,
        (data) => {
          console.log("Chart data: ", data);
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
  }, [selectedRange?.key, cryptocurrency?.id]);

  const onItemChange = (key: string, hours: number) => {
    setSelectedRange({
      key,
      value: hours ? (hours <= 24 ? "1" : (hours / DAY).toString()) : "max",
      hours,
    });
  };

  return (
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
          <Typography>{cryptocurrency?.symbol.toUpperCase()}</Typography>
          <Typography>{cryptocurrency?.name}</Typography>
        </Grid>

        <IconButton
          size="large"
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CancelIcon fontSize="inherit" />
        </IconButton>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Typography>{cryptocurrency?.current_price ?? "No data"}</Typography>
          <Typography>
            {cryptocurrency?.price_change_percentage_24h > 0 && "+"}
            {cryptocurrency?.price_change_percentage_24h}
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mb: 1 }}>
        <ButtonGroup size="small" fullWidth>
          <Button
            onClick={() => onItemChange("1h", 1)}
            key="1h"
            variant={selectedRange.key === "1h" ? "contained" : "outlined"}
          >
            1H
          </Button>
          <Button
            onClick={() => onItemChange("12h", 12)}
            key="12h"
            variant={selectedRange.key === "12h" ? "contained" : "outlined"}
          >
            12H
          </Button>
          <Button
            onClick={() => onItemChange("1d", DAY)}
            key="1d"
            variant={selectedRange.key === "1d" ? "contained" : "outlined"}
          >
            1D
          </Button>
          <Button
            onClick={() => onItemChange("1w", DAY * 7)}
            key="1w"
            variant={selectedRange.key === "1w" ? "contained" : "outlined"}
          >
            1W
          </Button>
          <Button
            onClick={() => onItemChange("1m", DAY * 30)}
            key="1m"
            variant={selectedRange.key === "1m" ? "contained" : "outlined"}
          >
            1M
          </Button>
          <Button
            onClick={() => onItemChange("1y", DAY * 365)}
            key="1y"
            variant={selectedRange.key === "1y" ? "contained" : "outlined"}
          >
            1Y
          </Button>
          <Button
            onClick={() => onItemChange("max", 0)}
            key="max"
            variant={selectedRange.key === "max" ? "contained" : "outlined"}
          >
            MAX
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid container sx={{ pb: 2 }}>
        <Line
          options={options}
          data={{
            labels:
              chartData &&
              chartData?.map((data) => {
                return new Date(data[0]).toLocaleString();
              }),
            datasets: [
              {
                label: cryptocurrency?.symbol.toUpperCase(),
                data: chartData && chartData?.map((data) => data[1]),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      </Grid>
    </Box>
  );
};

export default Chart;
