import { logClient } from "@repo/logger";
import type { Country } from "@repo/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface CountriesData {
  countries: Country[]; // or string[] if countries are represented as strings
}

export default function useCountries(): {
  countries: Country[];
  loadingCountries: boolean;
} {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    async function getCountries(): Promise<CountriesData> {
      const response = await axios.get("/api/countries");
      const data = response.data as CountriesData;
      return data;
    }
    setLoadingCountries(true);
    getCountries()
      .then((data) => {
        setCountries(
          data.countries.sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch((error) => {
        logClient(error);
      })
      .finally(() => {
        setLoadingCountries(false);
      });
  }, []);

  return { countries, loadingCountries };
}
