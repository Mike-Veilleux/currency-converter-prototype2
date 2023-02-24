import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
  Definition,
  ICurrencyData,
  CalculatedRates,
} from "../interfaces/interfaces";

export type dataStore = {
  definitions: Definition[] | undefined;
  rates: CalculatedRates | undefined;
  selectedCurrency: Definition | undefined;
  currencyCode: string | undefined;
  amountToConvert: number | undefined;
  favoriteRates: string[] | undefined;
  actions: {
    fetchDefinitions: () => Promise<void>;
    fetchRates: () => Promise<void>;
    fetchFavorites: () => void;
    setSelectedCurrency: (_definition: Definition) => void;
    setCurrencyCode: (_code: string | undefined) => void;
    setAmountToConvert: (_amount: number) => void;
    setAddToFavorites: (_string: string) => void;
    setRemoveFromFavorites: (_index: number) => void;
  };
};

const useStore = create<dataStore>((set, get) => ({
  definitions: undefined,
  rates: undefined,
  selectedCurrency: ["btc", "Bitcoin"],
  currencyCode: "btc",
  amountToConvert: 1,
  favoriteRates: [],
  // favoriteRates: ["usd", "cad", "hkd", "eur", "gbp"],
  actions: {
    fetchDefinitions: async () => {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      )
        .then((response) => response.json())
        .then((data) => {
          let def: Definition[] | undefined = Object.entries(data);
          set((state) => ({ definitions: def }));
        });
    },

    fetchRates: async () => {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${
          get().currencyCode
        }.json`
      )
        .then((response) => response.json())
        .then((data) => {
          const _rateData = data[get().currencyCode!];
          const result = get().definitions!.map((item) => {
            const newEntry: ICurrencyData = {
              code: item[0],
              fullName: item[1],
              rate: _rateData[item[0]],
              value: get().amountToConvert! * _rateData[item[0]],
            };
            return newEntry;
          });

          set((state) => ({ rates: result }));
        });
    },
    fetchFavorites() {
      set((state) => ({
        favoriteRates: JSON.parse(localStorage.getItem("names")!),
      }));
    },
    setSelectedCurrency(_definition) {
      set((state) => ({ selectedCurrency: _definition }));
    },
    setCurrencyCode(_code) {
      set((state) => ({ currencyCode: _code }));
    },
    setAmountToConvert(_amount) {
      set((state) => ({ amountToConvert: _amount }));
    },
    setAddToFavorites(_string) {
      const xFav = get().favoriteRates!;
      if (!xFav.includes(_string)) {
        let newFavs: string[] | undefined;
        if (xFav !== null) {
          newFavs = [...get().favoriteRates!, _string];
        } else {
          newFavs = [_string];
        }
        localStorage.setItem("FavCurrencies", JSON.stringify(newFavs));
        // console.log(JSON.stringify(newFavs));
        set((state) => ({ favoriteRates: newFavs }));
      }
    },
    setRemoveFromFavorites(_index) {
      const newFavs = [...get().favoriteRates!];
      newFavs.splice(_index, 1);
      localStorage.setItem("FavCurrencies", JSON.stringify(newFavs));
      // console.log(JSON.stringify(newFavs));
      set((state) => ({ favoriteRates: newFavs }));
    },
  },
}));

export const useStoreDefinitions = () => useStore((state) => state.definitions);
export const useStoreRates = () => useStore((state) => state.rates);
export const useStoreSelectedCurrency = () =>
  useStore((state) => state.selectedCurrency);
export const useStoreCurrencyCode = () =>
  useStore((state) => state.currencyCode);
export const useStoreAmountToConvert = () =>
  useStore((state) => state.amountToConvert);
export const useStoreFavoriteRates = () =>
  useStore((state) => state.favoriteRates);
export const useStoreActions = () => useStore((state) => state.actions);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("DataStore", useStore);
}
