import React, { useState } from "react";
import { parse } from "papaparse";
import PopulationPyramid, { DataPoint } from "./PopulationPyramid";

// Sample data for the population pyramid
const data2 = [
  { age: "0-4", male: -1000000, female: 1000000 },
  { age: "5-9", male: -1200000, female: 1100000 },
  { age: "10-14", male: -1300000, female: 1200000 },
  { age: "15-19", male: -1100000, female: 1300000 },
  { age: "20-24", male: -1500000, female: 1400000 },
  { age: "25-29", male: -1600000, female: 1500000 },
  { age: "30-34", male: -1400000, female: 1600000 },
  { age: "35-39", male: -1200000, female: 1400000 },
  { age: "40-44", male: -1100000, female: 1300000 },
  // Add more age groups as needed
];

const Demography: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [tfr, setTfr] = useState<number>(2.1);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parse(file, {
        complete: (result) => {
          const parsedData = result.data as string[][];
          const data = parsedData.map((row) => ({
            age: row[0],
            male: -Math.abs(Number(row[1])),
            female: Math.abs(Number(row[2])),
          }));
          setData(data);
        },
        error: (error) => console.error(error),
      });
    }
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <input
        type="number"
        placeholder="Total Fertility Rate"
        onChange={(e) => setTfr(Number(e.target.value))}
        value={tfr}
      />

      <PopulationPyramid data={data2} />
    </>
  );
};

export default Demography;
