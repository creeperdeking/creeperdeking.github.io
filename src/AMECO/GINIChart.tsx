import React from "react";
import { AmecoRow, LineChart, RowWithTitles, makeChartData } from "./Chart";

export const makeGINIChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const rawChartData: RowWithTitles[] = [
    {
      title: "GINI after taxes and transfers",
      row: baseData["Gini coefficient"],
    },
  ];

  return rawChartData;
};

const GINIChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <LineChart
      title="GINI after taxes and transfers"
      axisTitle="GINI"
      chartData={makeChartData(data, ["Gini coefficient"], makeGINIChartData)}
    />
  );
};

export default GINIChart;
