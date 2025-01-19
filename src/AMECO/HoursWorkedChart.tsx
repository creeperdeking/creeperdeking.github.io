import React from "react";
import { AmecoRow, LineChart, RowWithTitles, makeChartData } from "./Chart";

export const makeHoursWorkedChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const rawChartData: RowWithTitles[] = [
    {
      title: "Average annual working hours per worker",
      row: baseData["Average annual working hours per worker"],
    },
  ];

  return rawChartData;
};

const HoursWorkedChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <LineChart
      title="Average annual working hours per worker"
      axisTitle="Hours"
      chartData={makeChartData(
        data,
        ["Average annual working hours per worker"],
        makeHoursWorkedChartData
      )}
    />
  );
};

export default HoursWorkedChart;
