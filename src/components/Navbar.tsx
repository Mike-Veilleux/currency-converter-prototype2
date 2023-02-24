import {
  Typography,
  Button,
  TextField,
  Autocomplete,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { Definition } from "../interfaces/interfaces";
import {
  useStoreSelectedCurrency,
  useStoreDefinitions,
  useStoreAmountToConvert,
  useStoreActions,
} from "../store/useStore";

const Navbar = () => {
  const definitionsStore = useStoreDefinitions();
  const selectedCurrencyStore = useStoreSelectedCurrency();
  const amountToConvertStore = useStoreAmountToConvert();
  const storeActions = useStoreActions();

  const calculateRates = () => {
    storeActions.fetchRates();
  };
  const onChangeCurrency = (val: Definition) => {
    storeActions.setSelectedCurrency(val);
    storeActions.setCurrencyCode(val[0]);
  };

  useEffect(() => {
    storeActions.fetchDefinitions();
  }, []);

  return (
    <Stack
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      padding={2}
      sx={{ flexGrow: 1, backgroundColor: "#202020" }}
      gap={2}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Currency Converter
      </Typography>
      {definitionsStore && (
        <Autocomplete
          sx={{ width: 300 }}
          value={selectedCurrencyStore}
          onChange={(e, val) => onChangeCurrency(val!)}
          options={definitionsStore!}
          getOptionLabel={(options) => {
            return `${options[0]} - ${options[1]}`;
          }}
          renderInput={(params) => <TextField {...params} label="Currencies" />}
        />
      )}
      <TextField
        label={"Amount"}
        type={"number"}
        value={amountToConvertStore}
        onChange={(e) =>
          storeActions.setAmountToConvert(parseInt(e.target.value!))
        }
      />
      <Button
        variant={"contained"}
        color={"primary"}
        size="large"
        onClick={() => calculateRates()}
      >
        Convert
      </Button>
    </Stack>
  );
};

export default Navbar;
