import React from "react";
import { ChartProps, MultiCountryRow } from "./Chart";

export const MultiCountryChart: React.FC<{
  data: MultiCountryRow[] | undefined;
  chart: React.FC<ChartProps>;
}> = ({ data, chart: Chart }) => {
  if (!data) return null;

  return (
    <div className="pb-3">
      {data.map((countryData) => (
        <div key={countryData.country} className="border p-2 mt-0">
          {data.length > 1 && <h5 className="m-0">{countryData.country}</h5>}
          <Chart data={countryData.data} />
        </div>
      ))}
    </div>
  );
};
