import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import useAllCoins from "api/useAllCoins";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Search = () => {
  const [addMode, setAddMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { data, error } = useAllCoins();

  useEffect(() => {
    // console.log("Data0: ", open, data, error);
    if (open && data && data?.length !== 0) {
      //   console.log("Data1: ", data);
      setCoins(data);
      setLoading(false);
    } else if (open && coins?.length === 0) {
      setLoading(true);
    } else if (error) {
      toast.error("Error occured while fetching coins data");
      console.log("Error: ", { error });
      setLoading(false);
    }
  }, [open, data, error]);

  const onItemChange = (e: any, value: any) => {
    setSelectedCoin(value);
  };

  return (
    <>
      {addMode ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Autocomplete
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={onItemChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(coin: any) => coin.name}
            filterOptions={(coins, value) =>
              coins.filter((coin) => {
                if (value.inputValue?.length > 1) {
                  return (
                    coin.symbol
                      .toLowerCase()
                      .startsWith(value.inputValue.toLowerCase()) ||
                    coin.name
                      .toLowerCase()
                      .startsWith(value.inputValue.toLowerCase())
                  );
                } else return true;
              })
            }
            options={coins}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select coin"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <Button
            variant="contained"
            sx={{
              mt: 4,
            }}
            onClick={() => {
              if (selectedCoin) {
                const selectedCoins = localStorage.getItem("selectedCoins");
                console.log(selectedCoin);
                localStorage.removeItem("selectedCoins");
                localStorage.setItem(
                  "selectedCoins",
                  selectedCoins && typeof JSON.parse(selectedCoins) === "object"
                    ? JSON.stringify(
                        JSON.parse(selectedCoins).concat([selectedCoin])
                      )
                    : JSON.stringify([selectedCoin])
                );
              } else {
                toast.warning("No coin selected", {
                  position: "top-center",
                  autoClose: 3000,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  toastId: "Coin1Error",
                });
              }
            }}
          >
            Add
          </Button>
          <Button
            variant="text"
            component="div"
            sx={{ mt: 2 }}
            onClick={() => setAddMode(false)}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            margin: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            MsTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Button variant="outlined" onClick={() => setAddMode(true)}>
            Add cryptocurrency
          </Button>
        </Box>
      )}
    </>
  );
};

export default Search;
