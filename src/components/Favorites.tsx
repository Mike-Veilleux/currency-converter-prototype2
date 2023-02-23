import {
  Autocomplete,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Definition } from "../interfaces/interfaces";
import {
  useStoreActions,
  useStoreDefinitions,
  useStoreFavoriteRates,
  useStoreRates,
} from "../store/useStore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Favorites = () => {
  const definitionsStore = useStoreDefinitions();
  const ratesStore = useStoreRates();
  const storeActions = useStoreActions();
  const favoritesStore = useStoreFavoriteRates();
  const [selctedFav, setSelctedFav] = useState<[string, string] | undefined>();

  const onSelectFav = (val: Definition) => {
    storeActions.setAddToFavorites(val[0]);
  };

  const renderFavs = favoritesStore?.map((item, index) => {
    const match = ratesStore!.find((r) => r.code === item);
    return (
      <Box
        key={index}
        borderRadius={4}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "strecth",
          background: "#323232",
          boxShadow: "3px 5px 5px #455a7a",
        }}
      >
        <Stack display={"flex"} direction={"row"} alignItems={"stretch"}>
          <Box width={40} />
          <Typography
            variant="h6"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexGrow={1}
          >{`${match!.fullName}`}</Typography>
          <IconButton
            onClick={() => storeActions.setRemoveFromFavorites(index)}
          >
            <HighlightOffIcon />
          </IconButton>
        </Stack>
        <Divider />
        <Typography
          variant="h4"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexGrow={1}
          paddingY={1}
        >{`${match!.value.toFixed(2)}`}</Typography>
      </Box>
    );
  });

  return (
    <Stack
      display={"flex"}
      direction={"column"}
      width={"100%"}
      alignItems={"center"}
      padding={5}
    >
      <Box width={450} display={"flex"} flexDirection={"column"} gap={3}>
        <>{renderFavs}</>
        {definitionsStore && (
          <Autocomplete
            sx={{ width: "100%" }}
            value={selctedFav!}
            onChange={(e, val) => onSelectFav(val!)}
            options={definitionsStore!}
            getOptionLabel={(options) => {
              return `${options[0]} - ${options[1]}`;
            }}
            renderInput={(params) => (
              <TextField {...params} label="Add Currencies" />
            )}
          />
        )}
      </Box>
    </Stack>
  );
};

export default Favorites;
