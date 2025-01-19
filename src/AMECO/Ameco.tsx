import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ArticleHeader } from "../components/ArticleHeader";
import GNPIncomeChart from "./GNPIncomeChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/pagestyle.css";
import PopulationChart from "./PopulationChart";
import GNPExpenditureChart from "./GNPExpenditureChart";
import PublicSpendingChart from "./PublicSpendingChart";
import GINIChart from "./GINIChart";

interface YearData {
  year: string;
  value: number;
}

interface AmecoRow {
  country: string;
  title: string;
  unit: string;
  data: YearData[];
}

const Ameco: React.FC = () => {
  const [amecoData, setAmecoData] = useState<AmecoRow[] | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("/ameco_data.csv");
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result?.value);

      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const parsedData: AmecoRow[] = results.data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((row: any) => {
              const yearData: YearData[] = [];
              // Start from 1960 to 2026
              for (let year = 1960; year <= 2026; year++) {
                const value = parseFloat(row[year.toString()]);
                if (!Number.isNaN(value)) {
                  yearData.push({ year: year.toString(), value });
                }
              }

              return {
                country: row.COUNTRY,
                title: row.TITLE,
                unit: row["UNIT.1"],
                data: yearData,
              };
            })
            // Filter out invalid entries
            .filter(
              (row) =>
                row.country && row.title && row.unit && row.data.length > 0
            );

          setAmecoData(parsedData);
        },
      });
    };

    loadData().catch(console.error);
  }, []);

  const countries = amecoData
    ? Array.from(new Set(amecoData.map((row) => row.country))).sort()
    : [];

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData = selectedCountry
    ? amecoData?.filter((d) => d.country === selectedCountry)
    : undefined;

  return (
    <>
      <ArticleHeader
        title="Economic statistics from AMECO"
        subtitle="AMECO database"
        image=""
        author={{
          name: "Alexis Gros",
          email: "alexis.gros99@gmail.com",
          website: "https://alexisgros.fr",
        }}
        creationDate="2025-01-17"
        updatedDate="2025-01-17"
        version="1.0"
      />
      {countries.length > 0 && (
        <Dropdown
          className="mb-3"
          show={isDropdownOpen}
          onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
        >
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-country"
            style={{ paddingRight: "12px" }}
          >
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(true);
              }}
              className="search-input"
              style={{
                border: "none",
                background: "transparent",
                color: "white",
                outline: "none",
                width: "100%",
              }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              width: "20em",
              height: "20em",
              overflow: "scroll",
            }}
          >
            {filteredCountries.map((country) => (
              <Dropdown.Item
                key={country}
                onClick={() => {
                  setSelectedCountry(country);
                  setSearchTerm(country);
                  setIsDropdownOpen(false);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  display: "block",
                  width: "100%",
                }}
              >
                {country}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {amecoData && amecoData.length > 0 && (
        <>
          <GINIChart data={filteredData} />
          <GNPIncomeChart data={filteredData} />
          <PopulationChart data={filteredData} />
          <GNPExpenditureChart data={filteredData} />
          <PublicSpendingChart data={filteredData} />
        </>
      )}
    </>
  );
};

export default Ameco;
