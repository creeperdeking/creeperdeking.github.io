import _ from "lodash";
import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
} from "./Chart";

export const makeEmploymentChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const other: AmecoRow = {
    title: "Other",
    data: _.chain(Object.values(baseData)[0]?.data || [])
      .map((yearData) => {
        const { year } = yearData;
        const students =
          (baseData["Population: 15 to 64 years"]?.data.find(
            (d) => d.year === year
          )?.value || 0) +
          (baseData["Population: 65 years and over"]?.data.find(
            (d) => d.year === year
          )?.value || 0) -
          (baseData["Employment, persons: total economy"]?.data.find(
            (d) => d.year === year
          )?.value || 0) -
          (baseData[
            "Total unemployment :- Member States: definition EUROSTAT"
          ]?.data.find((d) => d.year === year)?.value || 0);
        return { year, value: students };
      })
      .value(),
  };
  const rawChartData: RowWithTitles[] = [
    {
      title: "Population: 0 to 14 years",
      row: baseData["Population: 0 to 14 years"],
    },

    {
      title: "Employed population",
      row: baseData["Employment, persons: total economy"],
    },
    {
      title: "Unemployed population",
      row: baseData["Total unemployment :- Member States: definition EUROSTAT"],
    },
    {
      title: "Retirees, Students, out of workforce",
      row: other,
    },
  ];

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return rawChartDataWithPercentage;
};

const EmploymentChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Employment"
      axisTitle="Percentage of total population"
      chartData={makeChartData(
        data,
        [
          "Population: 0 to 14 years",
          "Population: 15 to 64 years",
          "Employment, persons: total economy",
          "Total unemployment :- Member States: definition EUROSTAT",
          "Population: 65 years and over",
        ],
        makeEmploymentChartData
      )}
    />
  );
};

export default EmploymentChart;
