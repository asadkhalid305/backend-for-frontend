import { logClient } from "@repo/logger";
import type { Country } from "@repo/types";
import { useEffect, useState } from "react";

interface CountriesData {
  countries: Country[]; // or string[] if countries are represented as strings
}

export default function useCountries(): { countries: Country[] } {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function getCountries(): Promise<CountriesData> {
      const response = await fetch("/api/countries");
      const data = (await response.json()) as CountriesData;
      return data;
    }

    getCountries()
      .then((data) => {
        setCountries(data.countries);
      })
      .catch((error) => {
        logClient(error);
      });
  }, []);

  return { countries };
}
