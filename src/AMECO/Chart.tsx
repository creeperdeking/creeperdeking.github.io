import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Chart } from "react-google-charts";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/pagestyle.css";

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
