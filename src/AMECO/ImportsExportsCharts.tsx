import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
  transformAmecoRows,
} from "./Chart";

export const makeImportsChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const gdpDeflated = transformAmecoRows(
    baseData["Gross domestic product at current prices"]?.data,
    baseData["Price deflator gross domestic product"]?.data,
    (value1, value2) => value1 / (value2 / 100)
  );
  const importsOfGoods = transformAmecoRows(
    transformAmecoRows(
      baseData["Imports of goods at current prices"]?.data,
      baseData["Price deflator imports of goods"]?.data,
      (value1, value2) => value1 / (value2 / 100)
    ),
    gdpDeflated,
    (value1, value2) => (value1 / value2) * 100
  );

  const importsOfServices = transformAmecoRows(
    transformAmecoRows(
      baseData["Imports of services at current prices"]?.data,
      baseData["Price deflator imports of services"]?.data,
      (value1, value2) => value1 / (value2 / 100)
    ),
    gdpDeflated,
    (value1, value2) => (value1 / value2) * 100
  );

  const rawChartData: RowWithTitles[] = [
    {
      title: "Imports of goods",
      row: {
        title: "Imports of goods",
        data: importsOfGoods,
      },
    },
    {
      title: "Imports of services",
      row: {
        title: "Imports of services",
        data: importsOfServices,
      },
    },
  ];
  console.log(rawChartData);

  return rawChartData;
};

export const ImportsChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Imports"
      axisTitle="Percentage of total GDP"
      chartData={makeChartData(
        data,
        [
          "Imports of goods at current prices",
          "Price deflator imports of goods",
          "Imports of services at current prices",
          "Price deflator imports of services",
          "Gross domestic product at current prices",
          "Price deflator gross domestic product",
        ],
        makeImportsChartData
      )}
    />
  );
};

export const makeExportsChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  console.log(baseData);
  const gdpDeflated = transformAmecoRows(
    baseData["Gross domestic product at current prices"]?.data,
    baseData["Price deflator gross domestic product"]?.data,
    (value1, value2) => value1 / (value2 / 100)
  );
  const exportsOfGoods = transformAmecoRows(
    transformAmecoRows(
      baseData["Exports of goods at current prices"]?.data,
      baseData["Price deflator exports of goods"]?.data,
      (value1, value2) => value1 / (value2 / 100)
    ),
    gdpDeflated,
    (value1, value2) => (value1 / value2) * 100
  );
  const exportsOfServices = transformAmecoRows(
    transformAmecoRows(
      baseData["Exports of services at current prices"]?.data,
      baseData["Price deflator exports of services"]?.data,
      (value1, value2) => value1 / (value2 / 100)
    ),
    gdpDeflated,
    (value1, value2) => (value1 / value2) * 100
  );

  const rawChartData: RowWithTitles[] = [
    {
      title: "Exports of goods",
      row: {
        title: "Exports of goods",
        data: exportsOfGoods,
      },
    },
    {
      title: "Exports of services",
      row: {
        title: "Exports of services",
        data: exportsOfServices,
      },
    },
  ];

  return rawChartData;
};

export const ExportsChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Exports"
      axisTitle="Percentage of total GDP"
      chartData={makeChartData(
        data,
        [
          "Exports of goods at current prices",
          "Price deflator exports of goods",
          "Exports of services at current prices",
          "Price deflator exports of services",
          "Gross domestic product at current prices",
          "Price deflator gross domestic product",
        ],
        makeExportsChartData
      )}
    />
  );
};
