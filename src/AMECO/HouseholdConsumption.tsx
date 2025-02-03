import React from "react";
import {
  AmecoRow,
  LineChart,
  RowWithTitles,
  calculatePercentage,
  calculatePercentageIncrease,
  makeChartData,
  transformAmecoRows,
} from "./Chart";

export const makeHouseholdIncomeChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  const populationData = [
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

  const populationDataPercentage = calculatePercentage(populationData);

  const consumptionUnit = transformAmecoRows(
    populationDataPercentage[0].row?.data,
    transformAmecoRows(
      populationDataPercentage[1].row?.data,
      populationDataPercentage[2].row?.data,
      (a, b) => a + b
    ),
    (a, b) => (a * 0.3 + b * 0.85) * ((0.3 + 0.85) / 2)
  );

  const householdConsumption: AmecoRow = {
    title: "Household consumption",
    data: transformAmecoRows(
      transformAmecoRows(
        transformAmecoRows(
          baseData["Private final consumption expenditure at current prices"]
            ?.data,
          baseData["Price deflator private final consumption expenditure"]
            ?.data,

          (a, b) => a / (b / 100)
        ),
        baseData["Total population"]?.data,
        (a, b) => (a / b / 1000) * 1000000000
      ),
      consumptionUnit,
      (a, b) => a / b
    ),
  };

  const gdpPerCapita: AmecoRow = {
    title: "GDP per capita",
    data: transformAmecoRows(
      transformAmecoRows(
        transformAmecoRows(
          baseData["Gross domestic product at current prices"]?.data,
          baseData["Price deflator private final consumption expenditure"]
            ?.data,

          (a, b) => a / (b / 100)
        ),
        baseData["Total population"]?.data,
        (a, b) => (a / b / 1000) * 1000000000
      ),
      consumptionUnit,
      (a, b) => a / b
    ),
  };

  const hoursWorked = calculatePercentageIncrease([
    {
      title: "Average annual working hours per worker",
      row: baseData["Average annual working hours per worker"],
    },
  ]);

  const householdConsumptionPerWorker: AmecoRow = {
    title: "Household consumption",
    data: transformAmecoRows(
      transformAmecoRows(
        baseData["Private final consumption expenditure at current prices"]
          ?.data,
        baseData["Price deflator private final consumption expenditure"]?.data,

        (a, b) => a / (b / 100)
      ),
      baseData["Employment, persons: total economy"]?.data,
      (a, b) => (a / b / 1000) * 1000000000
    ),
  };

  const houseHoldIncomePerHour = {
    title: "Household consumption per worker per hour worked",
    data: transformAmecoRows(
      householdConsumptionPerWorker.data,
      hoursWorked[0].row?.data,
      (a, b) => a / b
    ),
  };

  const rawChartData: RowWithTitles[] = [
    {
      title: "household consumption per capita",
      row: {
        ...householdConsumption,
        data: householdConsumption.data,
      },
    },
    {
      title: "Household consumption per worker",
      row: householdConsumptionPerWorker,
    },
    {
      title: "Household consumption per worker per hour worked",
      row: houseHoldIncomePerHour,
    },
    {
      title: "GDP per capita",
      row: gdpPerCapita,
    },
  ];
  return calculatePercentageIncrease(rawChartData);
};

const HouseholdConsumptionChart: React.FC<{
  data: AmecoRow[] | undefined;
  format?: string;
}> = ({ data, format }) => {
  return (
    <LineChart
      title="Household consumption per capita"
      axisTitle="Household consumption"
      chartData={makeChartData(
        data,
        [
          "Average annual working hours per worker",
          "Price deflator private final consumption expenditure",
          "Private final consumption expenditure at current prices",
          "Population: 15 to 64 years",
          "Total population",
          "Employment, persons: total economy",
          "Population: 0 to 14 years",
          "Population: 65 years and over",
          "Gross domestic product at current prices",
        ],
        makeHouseholdIncomeChartData
      )}
      format={format}
    />
  );
};

export default HouseholdConsumptionChart;
