import React from "react";
import { Chart } from "react-google-charts";

export type ChartData = (string | number)[][];

const StackedAreaChart: React.FC<{
  chartData: ChartData;
}> = ({ chartData }) => {
  return (
    <>
      <Chart
        chartType="SteppedAreaChart"
        data={chartData}
        options={{
          title: "Components of GNP as percentage",
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
            title: "Percentage of GNP",
            format: "#.##'%'",
          },
        }}
        width="100%"
        height="400px"
        style={{ zIndex: 1 }}
      />
    </>
  );
};

export default StackedAreaChart;
