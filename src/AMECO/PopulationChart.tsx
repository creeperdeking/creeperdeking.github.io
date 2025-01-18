import _ from "lodash";
import React from "react";
import StackedAreaChart, { ChartData } from "./Chart";

interface YearData {
  year: string;
  value: number;
}

interface AmecoRow {
  country?: string;
  title: string;
  unit?: string;
  data: YearData[];
}

const EMPTY_CHART_DATA = [
  ["", ""],
  ["", 0],
];

const getBaseData = (amecoData: AmecoRow[], titles: string[]) => {
  return titles.reduce(
    (acc, title) => {
      acc[title] = amecoData.find((d) => {
        return d.title.includes(title);
      });

      return acc;
    },
    {} as Record<string, AmecoRow | undefined>
  );
};

interface RowWithTitles {
  title: string;
  row: AmecoRow | undefined;
}

export const sumData: (baseData: RowWithTitles[]) => AmecoRow = (
  baseData: RowWithTitles[]
) => {
  return {
    title: "Total",
    data: _.chain(baseData[0].row?.data || [])
      .map((yearData) => {
        const { year } = yearData;
        const sum = baseData.reduce((acc, d) => {
          return acc + (d.row?.data.find((d) => d.year === year)?.value || 0);
        }, 0);
        return { year, value: sum };
      })
      .value(),
  };
};

export const calculatePercentage: (
  baseData: RowWithTitles[]
) => RowWithTitles[] = (baseData: RowWithTitles[]) => {
  const dataSum = sumData(baseData);
  // now recalculate each data as a percentage of the sumData
  return baseData.map((d) => {
    return {
      ...d,
      row: {
        title: d.row?.title ?? d.title,
        data:
          d.row?.data.map((d) => ({
            ...d,
            value:
              (d.value /
                (dataSum.data.find((sd) => sd.year === d.year)?.value ?? 1)) *
              100,
          })) ?? [],
        country: d.row?.country,
        unit: d.row?.unit,
      },
    };
  });
};

const transformRawChartData = (data: RowWithTitles[]) => {
  return [
    ["Year", ...data.map((d) => d.title)],
    ..._.chain(data[0].row?.data || [])
      .map((yearData) => [
        yearData.year,
        ...data.map(
          (d) => d.row?.data.find((x) => x.year === yearData.year)?.value ?? 0
        ),
      ])
      .value(),
  ];
};

const makeGDPChartData = (amecoData: AmecoRow[]): ChartData => {
  const baseData = getBaseData(amecoData, [
    "Compensation of employees: total economy",
    "Taxes linked to imports and production minus subsidies: total economy",
    "Consumption of fixed capital at current prices: total economy",
    "Net operating surplus: total economy :- Adjusted for imputed compensation of self-employed",
    "Gross operating surplus: total economy",
    "Gross operating surplus: total economy :- Adjusted for imputed compensation of self-employed",
    "Net primary income from the rest of the world",
  ]);
  if (Object.values(baseData).some((d) => d === undefined)) {
    return EMPTY_CHART_DATA;
  }

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
  const netPrimaryIncome =
    baseData["Net primary income from the rest of the world"];

  const incomingForeignIncome = {
    title: "Net primary income from the rest of the world",
    data: netPrimaryIncome
      ? netPrimaryIncome.data.map((d) => {
          return { year: d.year, value: Math.max(d.value, 0) };
        })
      : [],
  };

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
      title: "Net primary foreign income",
      row: incomingForeignIncome,
    },
    {
      title: "Depreciation",
      row: baseData[
        "Consumption of fixed capital at current prices: total economy"
      ],
    },
    {
      title: "Net taxes on production",
      row: baseData[
        "Taxes linked to imports and production minus subsidies: total economy"
      ],
    },
  ];

  const rawChartDataWithPercentage = calculatePercentage(rawChartData);

  return transformRawChartData(rawChartDataWithPercentage);
};

const GNPIncomeChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  return (
    <StackedAreaChart
      chartData={data ? makeGDPChartData(data) : EMPTY_CHART_DATA}
    />
  );
};

export default GNPIncomeChart;
