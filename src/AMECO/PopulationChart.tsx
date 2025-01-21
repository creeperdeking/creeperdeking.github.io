import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
} from "./Chart";

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

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return rawChartDataWithPercentage;
};

const PopulationChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Population"
      axisTitle="Percentage of total population"
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

export default PopulationChart;
