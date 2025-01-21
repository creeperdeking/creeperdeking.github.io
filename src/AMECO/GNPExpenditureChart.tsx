import _ from "lodash";
import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
} from "./Chart";

export const makeGNPExpenditureChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const netCapitalFormation: AmecoRow = {
    title: "Net capital formation",
    data: _.chain(Object.values(baseData)[0]?.data || [])
      .map((yearData) => {
        const { year } = yearData;
        const netCapitalFormation =
          (baseData[
            "Gross capital formation at current prices: total economy"
          ]?.data.find((d) => d.year === year)?.value || 0) -
          (baseData[
            "Consumption of fixed capital at current prices: total economy"
          ]?.data.find((d) => d.year === year)?.value || 0);
        return { year, value: Math.max(netCapitalFormation, 0) };
      })
      .value(),
  };
  const netExports =
    baseData["Net exports of goods and services at current prices"];

  const positiveNetExports = {
    title: "Net exports of goods and services at current prices",
    data: netExports
      ? netExports.data.map((d) => {
          return { year: d.year, value: Math.max(d.value, 0) };
        })
      : [],
  };

  const rawChartData: RowWithTitles[] = [
    {
      title: "Household Spending",
      row: baseData["Private final consumption expenditure at current prices"],
    },
    {
      title: "Public Spending (health, education, housing...)",
      row: baseData[
        "Individual consumption of general government at current prices"
      ],
    },
    {
      title: "Public Spending (defence, police, justice...)",
      row: baseData[
        "Collective consumption of general government at current prices"
      ],
    },
    {
      title: "Investment",
      row: netCapitalFormation,
    },
    {
      title: "Depreciation",
      row: baseData[
        "Consumption of fixed capital at current prices: total economy"
      ],
    },
    {
      title: "Exports",
      row: positiveNetExports,
    },
  ];

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return rawChartDataWithPercentage;
};

const GNPExpenditureChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Gross Domestic Product (expenditure approach)"
      axisTitle="Percentage of GDP"
      chartData={makeChartData(
        data,
        [
          "Private final consumption expenditure at current prices",
          "Individual consumption of general government at current prices",
          "Collective consumption of general government at current prices",
          "Gross capital formation at current prices: total economy",
          "Consumption of fixed capital at current prices: total economy",
          "Net exports of goods and services at current prices",
        ],
        makeGNPExpenditureChartData
      )}
    />
  );
};

export default GNPExpenditureChart;
