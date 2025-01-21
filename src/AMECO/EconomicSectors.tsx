import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
} from "./Chart";

export const makeEconomicSectorsChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const rawChartData: RowWithTitles[] = [
    {
      title: "Building and construction",
      row: baseData["Employment, persons: building and construction"],
    },
    {
      title: "Industry excluding building and construction",
      row: baseData[
        "Employment, persons: industry excluding building and construction"
      ],
    },
    {
      title: "Services",
      row: baseData["Employment, persons: services"],
    },
    {
      title: "Agriculture, forestry and fishery products",
      row: baseData[
        "Employment, persons: agriculture, forestry and fishery products"
      ],
    },
  ];

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return rawChartDataWithPercentage;
};

const EconomicSectorsChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      title="Economic Sectors (employment)"
      axisTitle="Percentage of total workforce"
      chartData={makeChartData(
        data,
        [
          "Employment, persons: agriculture, forestry and fishery products",
          "Employment, persons: industry excluding building and construction",
          "Employment, persons: building and construction",
          "Employment, persons: services",
        ],
        makeEconomicSectorsChartData
      )}
    />
  );
};

export default EconomicSectorsChart;
