import React, { useState } from "react";
import "./reset.css";
import "./PostIndustrialSociety.css";
import { parse } from "papaparse";

import { ArticleHeader } from "../components/ArticleHeader";
import PyramidChart, { DataPoint } from "./PopulationPyramid";

const DemographicCollapse: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parse(file, {
        complete: (result) => {
          const parsedData = result.data as string[][];
          const data = parsedData.map((row) => ({
            label: row[0],
            value: parseInt(row[1], 10),
          }));
          setData(data);
        },
        error: (error) => console.error(error),
      });
    }
  };
  return (
    <>
      <ArticleHeader
        title="Demographic collapse"
        subtitle="Will the Amish inherit the world?"
        image=""
        author={{
          name: "Alexis Gros",
          email: "alexis.gros99@gmail.com",
          website: "https://alexisgros.fr",
        }}
        creationDate="2024-09-14"
        updatedDate="2024-09-22"
        version="1.0"
      />
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      <hr />

      <br />
      <h2 id="introduction">Introduction: We live in Hermann Kahn's World A</h2>
      <PyramidChart data={data} />

      <p>
        If humans don't reproduce, humanity cease to exist. If humans's females
        make, on average, less than 2 children that get to reproducing age, the
        population decreases exponentially. If the TFR (total fertility rate) is
        below roughly 2.1, the population becomes older. We already have the
        oldest population in human history. If you refuse to procreate in order
        to "save the planet", who are you saving the planet for? Fertility is
        collapsing all around the world.
      </p>
      <iframe
        src="https://ourworldindata.org/grapher/children-per-woman-un?tab=chart&time=1950..latest&country=OWID_WRL~IND~Europe+%28UN%29~KOR~JPN~HKG~TWN~CHN~IRN~EGY~Africa+%28UN%29~SAU~ARE"
        loading="lazy"
        style={{ width: "100%", height: "600px", border: "0px none" }}
        allow="web-share; clipboard-write"
        title="Fertility in the world"
      />
    </>
  );
};

export default DemographicCollapse;
