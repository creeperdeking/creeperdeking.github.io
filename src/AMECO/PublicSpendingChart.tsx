import _ from "lodash";
import React from "react";
import StackedAreaChart, {
  AmecoRow,
  RowWithTitles,
  calculatePercentage,
  makeChartData,
  sumData,
} from "./Chart";

export const makePublicSpendingChartData = (
  baseData: Record<string, AmecoRow | undefined>
): RowWithTitles[] => {
  console.log("hello");
  const otherExpenditure = {
    title: "Other current expenditure",
    row: baseData["Other current expenditure: general government :- ESA 2010"],
  };
  const otherCapitalExpenditure = {
    title: "Other capital expenditure",
    row: baseData[
      "Other capital expenditure, including capital transfers: general government :- ESA 2010"
    ],
  };
  const subsidies = {
    title: "Subsidies",
    row: baseData["Subsidies: general government :- ESA 2010"],
  };
  const socialBenefits = {
    title: "Social benefits",
    row: baseData[
      "Social benefits other than social transfers in kind: general government :- ESA 2010"
    ],
  };
  const socialTransfers = {
    title: "Social transfers",
    row: baseData[
      "Social transfers in kind supplied to households via market producers: general government :- ESA 2010"
    ],
  };
  const rawChartData: RowWithTitles[] = [
    {
      title: "Social Benefits & Transfers",
      row: sumData([socialBenefits, socialTransfers]),
    },
    {
      title: "Compensation of employees",
      row: baseData[
        "Compensation of employees: general government :- ESA 2010"
      ],
    },
    {
      title: "Intermediate consumption",
      row: baseData["Intermediate consumption: general government :- ESA 2010"],
    },
    {
      title: "Other expenditure + subsidies",
      row:
        otherExpenditure && otherCapitalExpenditure
          ? sumData([otherExpenditure, otherCapitalExpenditure, subsidies])
          : undefined,
    },
    {
      title: "Gross fixed capital formation",
      row: baseData[
        "Gross fixed capital formation: general government :- ESA 2010"
      ],
    },
    {
      title: "Interest",
      row: baseData["Interest: general government :- ESA 2010"],
    },
  ];

  return rawChartData;
};

const PublicSpendingChart: React.FC<{
  data: AmecoRow[] | undefined;
}> = ({ data }) => {
  console.log("wat");
  return (
    <StackedAreaChart
      title="Public spending"
      chartData={makeChartData(
        data,
        [
          "Subsidies: general government :- ESA 2010",
          "Social benefits other than social transfers in kind: general government :- ESA 2010",
          "Social transfers in kind supplied to households via market producers: general government :- ESA 2010",
          "Interest: general government :- ESA 2010",
          "Compensation of employees: general government :- ESA 2010",
          "Intermediate consumption: general government :- ESA 2010",
          "Other current expenditure: general government :- ESA 2010",
          "Gross fixed capital formation: general government :- ESA 2010",
          "Other capital expenditure, including capital transfers: general government :- ESA 2010",
        ],
        makePublicSpendingChartData
      )}
    />
  );
};

export default PublicSpendingChart;
