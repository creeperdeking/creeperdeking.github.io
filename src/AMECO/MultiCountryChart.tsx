import React from "react";
import { ChartProps, MultiCountryRow } from "./Chart";

export const MultiCountryChart: React.FC<{
  data: MultiCountryRow[] | undefined;
  chart: React.FC<ChartProps>;
}> = ({ data, chart: Chart }) => {
  if (!data) return null;

  return (
    <>
      {data.map((countryData) => (
        <div key={countryData.country}>
          <h4>{countryData.country}</h4>
          <Chart data={countryData.data} />
        </div>
      ))}
    </>
  );
};
