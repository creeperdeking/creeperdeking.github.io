import React from "react";
import { AmecoRow, LineChart, RowWithTitles, makeChartData } from "./Chart";

export const makePopulationChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const rawChartData: RowWithTitles[] = [
    {
      title: "Population: 0 to 14 years",
      row: baseData["Population: 0 to 14 years"],
    },
    {
      title: "Population: 15 to 64 years",
      row: baseData["Population: 15 to 64 years"],
    },
    {
      title: "Population 65+ years",
      row: baseData["Population: 65 years and over"],
    },
  ];

  return rawChartData;
};

const AbsolutePopulationChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <LineChart
      title="Population"
      axisTitle="1000 people"
      chartData={makeChartData(
        data,
        [
          "Population: 0 to 14 years",
          "Population: 15 to 64 years",
          "Population: 65 years and over",
        ],
        makePopulationChartData
      )}
    />
  );
};

export default AbsolutePopulationChart;
