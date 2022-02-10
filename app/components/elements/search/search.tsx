import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import useAllCoins from "api/useAllCoins";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { addCryptocurrency } from "store/app/app-slice";

type SearchProps = {
  openDialog: boolean;
  handleClose: () => void;
};

const Search: React.FC<SearchProps> = ({ openDialog, handleClose }) => {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    setSelectedCoin(null);
  }, [openDialog]);

  const onItemChange = (e: any, value: any) => {
    setSelectedCoin(value);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={openDialog}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            minWidth: 250,
            maxWidth: 400,
            width: "80vw",
            backgroundColor: "#28292B",
          }}
        >
          <Autocomplete
            sx={{
              width: "100%",
              borderRadius: "5px",
              color: "red",
              backgroundColor: "primary.500",
              "& .Mui-focused": {
                color: "black",
              },
            }}
            color="red"
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
                sx={{
                  borderRadius: "50px",
                  color: "red",
                  backgroundColor: "primary",
                }}
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
              console.log("Selected coin: ", selectedCoin);
              if (selectedCoin) {
                dispatch(addCryptocurrency({ cryptocurrency: selectedCoin }));
                handleClose();
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
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default Search;
