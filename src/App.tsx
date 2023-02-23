import { Container, Stack } from "@mui/material";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import RateResults from "./components/RateResults";
import { useStoreRates } from "./store/useStore";

function App() {
  const ratesStore = useStoreRates();
  return (
    <Stack>
      <Navbar />
      {ratesStore !== undefined && <Favorites />}
    </Stack>
  );
}

export default App;
