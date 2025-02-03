import _ from "lodash";
import React from "react";
import { Chart } from "react-google-charts";

export type ChartData = (string | number)[][];

export interface YearData {
  year: string;
  value: number;
}

export interface AmecoRow {
  country?: string;
  title: string;
  unit?: string;
  data: YearData[];
}

export interface MultiCountryRow {
  country: string;
  data: AmecoRow[] | undefined;
}

export interface ChartProps {
  data: AmecoRow[] | undefined;
}

export const EMPTY_CHART_DATA = [
  ["", ""],
  ["", 0],
];

export interface RowWithTitles {
  title: string;
  row: AmecoRow | undefined;
}

export const getBaseData = (amecoData: AmecoRow[], titles: string[]) => {
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

export const calculatePercentageIncrease: (
  baseData: RowWithTitles[]
) => RowWithTitles[] = (baseData: RowWithTitles[]) => {
  // now recalculate each data as a percentage of the sumData
  return baseData.map((d) => {
    const firstData = d.row?.data[0];
    return {
      ...d,
      row: {
        title: d.row?.title ?? d.title,
        data:
          d.row?.data.map((d) => ({
            ...d,
            value: (d.value / (firstData?.value ?? 1)) * 100,
          })) ?? [],
        country: d.row?.country,
        unit: d.row?.unit,
      },
    };
  });
};

export const transformAmecoRows = (
  row1?: YearData[],
  row2?: YearData[],
  func?: (value1: number, value2: number) => number
): YearData[] => {
  if (!row1 || !row2 || !func) {
    return [];
  }
  return row1
    .filter((d) => row2.find((d2) => d.year === d2.year)?.value)
    .map((d) => {
      const row2Value = row2.find((d2) => d.year === d2.year)?.value;
      return {
        ...d,
        value: row2Value ? func(d.value, row2Value) : 0,
      };
    });
};

export const transformRawChartData = (data: RowWithTitles[]) => {
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

export const makeChartData = (
  amecoData: AmecoRow[] | undefined,
  titles: string[],
  transformer: (data: Record<string, AmecoRow | undefined>) => RowWithTitles[]
): ChartData => {
  if (!amecoData) {
    return EMPTY_CHART_DATA;
  }

  const baseData = getBaseData(amecoData, titles);
  if (Object.values(baseData).some((d) => d === undefined)) {
    return EMPTY_CHART_DATA;
  }

  const rawChartData = transformer(baseData);

  return transformRawChartData(rawChartData);
};

export const LineChart: React.FC<{
  title: string;
  axisTitle: string;
  chartData: ChartData;
  format?: string;
}> = ({ title, axisTitle, chartData, format }) => {
  return (
    <Chart
      options={{
        title: title,
        vAxis: {
          title: axisTitle,
          format: format,
        },
        legend: {
          position: "top",
          maxLines: 3,
          textStyle: {
            whiteSpace: "nowrap",
            fontSize: 12,
          },
        },
      }}
      chartType="LineChart"
      data={chartData}
      width="100%"
      height="20em"
    />
  );
};

const StackedAreaChart: React.FC<{
  title: string;
  axisTitle: string;
  chartData: ChartData;
}> = ({ title, axisTitle, chartData }) => {
  return (
    <Chart
      chartType="SteppedAreaChart"
      data={chartData}
      options={{
        title: title,
        isStacked: true,
        legend: {
          position: "top",
          maxLines: 3,
          textStyle: {
            whiteSpace: "nowrap",
            fontSize: 12,
          },
        },
        vAxis: {
          title: axisTitle,
          format: "#.##'%'",
        },
        tooltip: {
          isHtml: true,
          trigger: "focus",
        },
      }}
      width="100%"
      height="20em"
    />
  );
};

export default StackedAreaChart;
