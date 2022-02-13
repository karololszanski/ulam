import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  TextField,
} from "@mui/material";
import useAllCoins from "api/useAllCoins";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { addCryptocurrency } from "store/app/app-slice";
import { useAppSelector } from "store/hooks";

type SearchProps = {
  openDialog: boolean;
  handleClose: () => void;
};

const SearchTile: React.FC<SearchProps> = ({ openDialog, handleClose }) => {
  const dispatch = useAppDispatch();
  const { selectedCryptocurrencies } = useAppSelector((store) => store.app);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<
    Array<{
      id: string;
      symbol: string;
      name: string;
    }>
  >([]);
  const [selectedCoin, setSelectedCoin] = useState<{
    id: string;
    symbol: string;
    name: string;
  } | null>(null);
  const { data, error } = useAllCoins();

  useEffect(() => {
    if (open && data && data?.length !== 0) {
      setCoins(
        data.filter((coin: { id: string; name: string; symbol: string }) => {
          return coin?.id && coin?.name && coin?.symbol;
        })
      );
      setLoading(false);
    } else if (open && data?.length === 0) {
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
            data-testid="autocomplete"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={onItemChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(coin: any) =>
              `${coin.name} (${coin.symbol.toUpperCase()})`
            }
            filterOptions={(coins, value) =>
              coins.filter((coin) => {
                if (value.inputValue?.length > 0) {
                  return (
                    coin.symbol
                      .toLowerCase()
                      .startsWith(value.inputValue.toLowerCase()) ||
                    coin.name
                      .toLowerCase()
                      .startsWith(value.inputValue.toLowerCase()) ||
                    `${coin.name} (${coin.symbol.toUpperCase()})`
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
                placeholder="Select coin"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
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
            data-testid="add-button-coin"
            onClick={() => {
              if (selectedCoin) {
                if (
                  !selectedCryptocurrencies.some(
                    (coin) => selectedCoin?.id === coin?.id
                  )
                ) {
                  dispatch(addCryptocurrency({ cryptocurrency: selectedCoin }));
                  handleClose();
                } else {
                  toast.warning("Coin already selected", {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId: "Coin4Error",
                  });
                }
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

export default SearchTile;
