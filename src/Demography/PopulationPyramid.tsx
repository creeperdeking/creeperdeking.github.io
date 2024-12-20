import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface DataPoint {
  age: string;
  male: number;
  female: number;
}

const PopulationPyramid = ({ data }: { data: DataPoint[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          tickFormatter={(value) => Math.abs(value).toString()}
        />
        <YAxis type="category" dataKey="age" />
        <Tooltip formatter={(value) => Math.abs(Number(value)).toString()} />
        <Bar dataKey="male" fill="#8884d8" label="Male" />
        <Bar dataKey="female" fill="#82ca9d" label="Female" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PopulationPyramid;
