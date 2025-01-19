import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ArticleHeader } from "../components/ArticleHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/pagestyle.css";
import PublicSpendingChart from "./PublicSpendingChart";
import GINIChart from "./GINIChart";
import GNPIncomeChart from "./GNPIncomeChart";
import GNPExpenditureChart from "./GNPExpenditureChart";
import PopulationChart from "./PopulationChart";

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

const useCSVData = (filePath: string) => {
  const [amecoData, setAmecoData] = useState<AmecoRow[] | undefined>(undefined);

  useEffect(() => {
    const loadData = async (filePath: string) => {
      const response = await fetch(filePath);
      const csv = await response.text();

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
                row.country || row.title || row.unit || row.data.length > 0
            );

          setAmecoData(parsedData);
        },
      });
    };

    loadData(filePath).catch(console.error);
  }, [filePath]);

  return {
    countries: Array.from(new Set(amecoData?.map((row) => row.country))).sort(),
    csvData: amecoData,
  };
};

const CountrySelector: React.FC<{
  countries: string[];
  setSelectedCountry: (searchTerm: string) => void;
}> = ({ countries, setSelectedCountry }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
    </>
  );
};

const Ameco: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [selectedGiniCountry, setSelectedGiniCountry] = useState<
    string | undefined
  >(undefined);
  const { countries, csvData: amecoData } = useCSVData("/ameco_data.csv");
  const { countries: giniCountries, csvData: giniData } =
    useCSVData("/gini_ameco.csv");

  const filteredData = selectedCountry
    ? amecoData?.filter((d) => d.country === selectedCountry)
    : undefined;
  const filteredGiniData = selectedGiniCountry
    ? giniData?.filter((d) => d.country === selectedGiniCountry)
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

      {amecoData && amecoData.length > 0 && (
        <>
          <CountrySelector
            countries={countries}
            setSelectedCountry={setSelectedCountry}
          />
          <GNPIncomeChart data={filteredData} />
          <PopulationChart data={filteredData} />
          <GNPExpenditureChart data={filteredData} />
          <PublicSpendingChart data={filteredData} />
        </>
      )}

      {giniData && giniData.length > 0 && (
        <>
          <CountrySelector
            countries={giniCountries}
            setSelectedCountry={setSelectedGiniCountry}
          />
          <GINIChart data={filteredGiniData} />
        </>
      )}
    </>
  );
};

export default Ameco;
