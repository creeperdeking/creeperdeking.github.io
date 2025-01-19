import _ from "lodash";
import React from "react";
import StackedAreaChart, {
  AmecoRow,
  LineChart,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
} from "./Chart";

export const makeGINIChartData = (
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
      title: "Population: 65 years and over",
      row: baseData["Population: 65 years and over"],
    },
  ];

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return rawChartDataWithPercentage;
};

const GINIChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <LineChart
      title="GINI"
      axisTitle="GINI"
      chartData={[
        ["Year", "GINI"],
        ["2010", 30],
        ["2015", ""],
        ["2022", 31],
        ["2023", 31],
      ]}
    />
  );
};

export default GINIChart;
