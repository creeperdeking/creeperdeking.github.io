import _ from "lodash";
import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
} from "./Chart";

const makeGNPIncomeChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const compensationSelfEmployed: AmecoRow = {
    title: "Imputed compensation of self-employed",
    data: _.chain(Object.values(baseData)[0]?.data || [])
      .map((yearData) => {
        const { year } = yearData;
        const compensationSelfEmployed =
          (baseData["Gross operating surplus: total economy"]?.data.find(
            (d) => d.year === year
          )?.value || 0) -
          (baseData[
            "Gross operating surplus: total economy :- Adjusted for imputed compensation of self-employed"
          ]?.data.find((d) => d.year === year)?.value || 0);
        return { year, value: compensationSelfEmployed };
      })
      .value(),
  };
  /* const netPrimaryIncome =
    baseData["Net primary income from the rest of the world"];

  const incomingForeignIncome = {
    title: "Net primary income from the rest of the world",
    data: netPrimaryIncome
      ? netPrimaryIncome.data.map((d) => {
          return { year: d.year, value: Math.max(d.value, 0) };
        })
      : [],
  }; */

  const rawChartData: RowWithTitles[] = [
    {
      title: "Compensation of employees",
      row: baseData["Compensation of employees: total economy"],
    },
    {
      title: "Compensation of self-employed",
      row: compensationSelfEmployed,
    },
    {
      title: "Net operating surplus",
      row: baseData[
        "Net operating surplus: total economy :- Adjusted for imputed compensation of self-employed"
      ],
    },
    {
      title: "Depreciation",
      row: baseData[
        "Consumption of fixed capital at current prices: total economy"
      ],
    },
    {
      title: "Net taxes on production and imports",
      row: baseData[
        "Taxes linked to imports and production minus subsidies: total economy"
      ],
    },
  ];

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return rawChartDataWithPercentage;
};

const GNPIncomeChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Gross Domestic Product (income approach)"
      axisTitle="Percentage of GDP"
      chartData={makeChartData(
        data,
        [
          "Compensation of employees: total economy",
          "Taxes linked to imports and production minus subsidies: total economy",
          "Consumption of fixed capital at current prices: total economy",
          "Net operating surplus: total economy :- Adjusted for imputed compensation of self-employed",
          "Gross operating surplus: total economy",
          "Gross operating surplus: total economy :- Adjusted for imputed compensation of self-employed",
          "Net primary income from the rest of the world",
        ],
        makeGNPIncomeChartData
      )}
    />
  );
};

export default GNPIncomeChart;
