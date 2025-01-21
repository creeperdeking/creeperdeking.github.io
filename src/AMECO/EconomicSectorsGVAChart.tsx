import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
  transformAmecoRows,
} from "./Chart";

export const makeEconomicSectorsChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const buildingConstruction = transformAmecoRows(
    baseData["Gross value added at current prices: building and construction"]
      ?.data,
    baseData["Price deflator gross value added: building and construction"]
      ?.data,
    (value1, value2) => value1 / (value2 / 100)
  );
  const industryExcludingBuildingConstruction = transformAmecoRows(
    baseData[
      "Gross value added at current prices: industry excluding building and construction"
    ]?.data,
    baseData[
      "Price deflator gross value added: industry excluding building and construction"
    ]?.data,
    (value1, value2) => value1 / (value2 / 100)
  );
  const agricultureForestryAndFisheryProducts = transformAmecoRows(
    baseData[
      "Gross Value Added at current prices: agriculture, forestry and fishery products"
    ]?.data,
    baseData[
      "Price deflator gross value added: agriculture, forestry and fishery products"
    ]?.data,
    (value1, value2) => value1 / (value2 / 100)
  );
  const services = transformAmecoRows(
    baseData["Gross value added at current prices: services"]?.data,
    baseData["Price deflator gross value added: services"]?.data,
    (value1, value2) => value1 / (value2 / 100)
  );
  const rawChartData: RowWithTitles[] = [
    {
      title: "Building and construction",
      row: {
        title: "Building and construction",
        data: buildingConstruction,
      },
    },
    {
      title: "Industry excluding building and construction",
      row: {
        title: "Industry excluding building and construction",
        data: industryExcludingBuildingConstruction,
      },
    },
    {
      title: "Services",
      row: {
        title: "Services",
        data: services,
      },
    },
    {
      title: "Agriculture, forestry and fishery products",
      row: {
        title: "Agriculture, forestry and fishery products",
        data: agricultureForestryAndFisheryProducts,
      },
    },
  ];

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return rawChartDataWithPercentage;
};

const EconomicSectorsGVAChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Economic Sectors (GVA)"
      axisTitle="Percentage of total GVA"
      chartData={makeChartData(
        data,
        [
          "Price deflator gross value added: agriculture, forestry and fishery products",
          "Price deflator gross value added: industry excluding building and construction",
          "Price deflator gross value added: building and construction",
          "Price deflator gross value added: services",
          "Gross Value Added at current prices: agriculture, forestry and fishery products",
          "Gross value added at current prices: industry excluding building and construction",
          "Gross value added at current prices: building and construction",
          "Gross value added at current prices: services",
        ],
        makeEconomicSectorsChartData
      )}
    />
  );
};

export default EconomicSectorsGVAChart;
