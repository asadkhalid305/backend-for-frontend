"use client";

import useCountries from "../hooks/use-countries";

export default function PlayerApp(): JSX.Element {
  const { countries } = useCountries();
  return (
    <div className="container">
      <h1 className="title">
        <span>Countries</span>
      </h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}
